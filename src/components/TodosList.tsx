import { useTodos } from "@/hooks";
import styles from "@/styles/Todos.module.css";
import { TodoItem } from ".";

const TodosList = () => {
  const { isPending, error, data } = useTodos();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <ul className={styles.list}>
      {data.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodosList;
