import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { Todo } from "@/types";

const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTodo"],
    mutationFn: createTodo,
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      const optimisticTodo: Todo = {
        id: parseInt(uuid().replace(/-/g, ""), 16),
        ...todo,
      };

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(
          ["todos"],
          [...previousTodos, optimisticTodo]
        );
      }

      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const createTodo = async (todo: Omit<Todo, "id">) => {
  const response = await fetch(import.meta.env.VITE_TODOS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data as Todo;
};

export default useCreateTodo;
