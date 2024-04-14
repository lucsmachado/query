import * as React from "react";
import { useCreateTodo } from "@/hooks";
import { Button, Form, Input, Label, Textarea } from ".";
import { Todo } from "@/types";

const CreateTodoForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const { mutate, isPending, isError, isSuccess, error } = useCreateTodo();

  const handleCreateTodo: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (e) e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newTodo: Omit<Todo, "id"> = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      done: formData.get("done") === "on",
    };
    mutate(newTodo);
  };

  if (isSuccess) formRef.current?.reset();

  return (
    <Form.Root onSubmit={handleCreateTodo} ref={formRef}>
      <Form.Field>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Remind me to..."
        />
      </Form.Field>
      <Form.Field>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Describe the task..."
        />
      </Form.Field>
      <Form.Field>
        <Input id="done" name="done" type="checkbox" />
        <Label htmlFor="done">Done</Label>
      </Form.Field>
      <Button type="submit">Create</Button>
      {isPending && <p>Adding todo...</p>}
      {isSuccess && <p>Todo added!</p>}
      {isError && <p>An error occurred: {error.message}</p>}
    </Form.Root>
  );
};

export default CreateTodoForm;
