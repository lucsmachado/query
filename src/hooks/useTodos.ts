import { useQuery } from "@tanstack/react-query";
import { Todo } from "@/types";

const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });
};

const getAllTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${import.meta.env.VITE_TODOS_API_URL}/all`);
  return res.json();
};

export default useTodos;
