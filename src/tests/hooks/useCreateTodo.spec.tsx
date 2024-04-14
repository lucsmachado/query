import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { HttpResponse, http } from "msw";
import { useCreateTodo } from "@/hooks";
import { server } from "@/mocks";
import { createWrapper } from "../utils";

describe("useCreateTodo", () => {
  test("should return the created todo when mutation succeeds", async () => {
    const { result } = renderHook(() => useCreateTodo(), {
      wrapper: createWrapper(),
    });

    const todo = {
      title: "test todo title",
      content: "test todo content",
      done: false,
    };
    result.current.mutate(todo);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toStrictEqual({
      id: expect.any(Number),
      ...todo,
    });
  });

  test("should return an error when mutation fails", async () => {
    server.use(
      http.post("/todos", () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useCreateTodo(), {
      wrapper: createWrapper(),
    });

    const todo = {
      title: "test todo title",
      content: "test todo content",
      done: false,
    };
    result.current.mutate(todo);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
