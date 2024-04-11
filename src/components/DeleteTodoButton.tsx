import { useDeleteTodo } from "@/hooks";
import { Button } from ".";

const DeleteTodoButton = ({ todoId }: { todoId: number }) => {
  const { mutate: deleteTodo, isPending, isError, error } = useDeleteTodo();

  return (
    <>
      <Button
        style={{ backgroundColor: "var(--red)" }}
        onClick={() => deleteTodo(todoId)}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
      {isError && <p>An error occurred: {error.message}</p>}
    </>
  );
};

export default DeleteTodoButton;
