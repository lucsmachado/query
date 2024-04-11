import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { Todo } from "@/types";

const useCreateTodo = (formRef: React.RefObject<HTMLFormElement>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTodo"],
    mutationFn: createTodo,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const optimisticTodo = {
        id: parseInt(uuid().replace(/-/g, ""), 16),
        ...variables,
      };

      queryClient.setQueryData(["todos"], (old: Todo[]) => [
        ...old,
        optimisticTodo,
      ]);

      return { optimisticTodo };
    },
    onSuccess: (result, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      queryClient.setQueryData(["todos"], (old: Todo[]) => {
        return old.map((todo) =>
          todo.id === context.optimisticTodo.id ? result : todo
        );
      });

      formRef.current?.reset();
    },
    onError: (_error, _variables, context) => {
      if (context?.optimisticTodo) {
        queryClient.setQueryData(["todos"], (old: Todo[]) => {
          return old.filter((todo) => todo.id !== context.optimisticTodo.id);
        });
      }
    },
  });
};

const createTodo = async (formData: FormData) => {
  return await fetch(import.meta.env.VITE_TODOS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
};

export default useCreateTodo;
