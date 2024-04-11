import { useEditTodo } from "@/hooks";
import styles from "@/styles/Todos.module.css";
import { Todo } from "@/types";
import { Button, DeleteTodoButton, Form, Input, Label, Textarea } from ".";

const TodoItem = ({ id, title, content, done }: Todo) => {
  const { mutate: editTodo, isPending, isError, error } = useEditTodo();

  const handleEditTodo: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (e) e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    editTodo({ id, formData });
  };

  return (
    <li className={styles.item}>
      <Form.Root onSubmit={handleEditTodo}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          placeholder="To do..."
          variant="ghost"
          style={{ fontWeight: 600, fontSize: "1rem" }}
        />
        <Textarea
          name="content"
          defaultValue={content}
          placeholder="Description..."
          variant="ghost"
        />
        <Form.Field>
          <Input id="done" name="done" type="checkbox" defaultChecked={done} />
          <Label htmlFor="done">Done</Label>
        </Form.Field>
        <div className={styles.actions}>
          <Button type="submit" style={{ backgroundColor: "var(--blue)" }}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
          {isError && <p>An error occurred: {error.message}</p>}
          <DeleteTodoButton todoId={id} />
        </div>
      </Form.Root>
    </li>
  );
};

export default TodoItem;
