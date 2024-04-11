import { describe, test, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useTodos } from "@/hooks";
import { server, todos } from "@/mocks";
import { createWrapper } from "../utils";

describe("useTodos", () => {
  test("should return all todos when query is successful", async () => {
    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(todos.length);
    expect(result.current.data).toStrictEqual(todos);
  });

  test("should return an error when query fails", async () => {
    server.use(
      http.get("/todos/all", () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
