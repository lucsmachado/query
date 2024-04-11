import { describe, test, expect } from "vitest";
import { HttpResponse, http } from "msw";
import { renderWithClient } from "../utils";
import { TodosList } from "@/components";
import { server, todos } from "@/mocks";

describe("<TodosList />", () => {
  test("should render list of todos when query is successful", async () => {
    const result = renderWithClient(<TodosList />);

    for (const todo of todos) {
      expect(await result.findByDisplayValue(todo.title)).toBeDefined();
    }
  });

  test("should render error message when query fails", async () => {
    server.use(
      http.get("/todos/all", () => {
        return HttpResponse.error();
      })
    );

    const result = renderWithClient(<TodosList />);

    expect(await result.findByText(/an error has occurred/i)).toBeDefined();
  });

  test("should render loading indicator while query is pending", () => {
    const result = renderWithClient(<TodosList />);

    expect(result.getByText(/loading/i)).toBeDefined();
  });
});
