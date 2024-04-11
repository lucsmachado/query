import { http, HttpResponse } from "msw";
import todos from "./todos";

const handlers = [
  http.get("/todos/all", () => {
    return HttpResponse.json(todos);
  }),
];

export default handlers;
