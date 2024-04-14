import { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editTodo"],
    mutationFn: editTodo,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const currentTodo = queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((todo) => todo.id === variables.id);
      const optimisticTodo = variables;

      queryClient.setQueryData(["todos"], (old: Todo[]) =>
        old.map((todo) =>
          todo.id === optimisticTodo.id ? optimisticTodo : todo
        )
      );

      return { currentTodo, optimisticTodo };
    },
    onSuccess: (result, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      queryClient.setQueryData(["todos"], (old: Todo[]) =>
        old.map((todo) =>
          todo.id === context.optimisticTodo.id ? result : todo
        )
      );
    },
    onError: (_error, _variables, context) => {
      if (context?.optimisticTodo) {
        queryClient.setQueryData(["todos"], (old: Todo[]) =>
          old.map((todo) =>
            todo.id === context.optimisticTodo.id ? context.currentTodo : todo
          )
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const editTodo = async ({
  id,
  todo,
}: {
  id: number;
  todo: Partial<Omit<Todo, "id">>;
}) => {
  return await fetch(`${import.meta.env.VITE_TODOS_API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export default useEditTodo;
