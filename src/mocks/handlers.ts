import { http, HttpResponse } from "msw";
import { Todo } from "@/types";
import todos from "./todos";

const allTodos = new Map<number, Todo>(
  todos.map((todo, index) => [index + 1, todo])
);

const handlers = [
  http.get("*/todos/all", () => {
    return HttpResponse.json(Array.from(allTodos.values()));
  }),
  http.post<never, Omit<Todo, "id">>("*/todos", async ({ request }) => {
    const body = await request.json();
    const createdTodo: Todo = {
      id: allTodos.size + 1,
      ...body,
    };
    allTodos.set(createdTodo.id, createdTodo);
    return HttpResponse.json(createdTodo, {
      status: 201,
    });
  }),
  http.delete<{ id: string }>("*/todos/:id", async ({ params }) => {
    const { id } = params;
    const parsedId = parseInt(id);
    const deletedTodo = allTodos.get(parsedId);
    if (!deletedTodo) {
      return new HttpResponse(null, { status: 404 });
    }
    allTodos.delete(parsedId);
    return HttpResponse.json(deletedTodo);
  }),
  http.patch<{ id: string }, Partial<Omit<Todo, "id">>>(
    "*/todos/:id",
    async ({ params, request }) => {
      const body = await request.json();
      const { id } = params;
      const parsedId = parseInt(id);
      const updatedTodo = allTodos.get(parsedId);
      if (!updatedTodo) {
        return new HttpResponse(null, { status: 404 });
      }
      const newTodo = { ...updatedTodo, ...body };
      allTodos.set(parsedId, newTodo);
      return HttpResponse.json(newTodo);
    }
  ),
];

export default handlers;
