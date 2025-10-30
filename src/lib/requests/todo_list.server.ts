import { BACKEND_HOST, BACKEND_PORT } from "$env/static/private";
import type { Todo } from "$lib/types/todo";
import { AuthorizationError } from "$lib/server/errors";
import { num_from_priority } from "$lib/helpers/priority_converters";

const main_url: string = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

type Fetch = typeof fetch;
export const createTodo = async (todo: Todo, fetch: Fetch) => {
  const endpoint: string = main_url + "/todos";

  try {
    let body_todo: {description: string, date_due?: string, priority: number, completed: boolean} = {
      description: todo.description,
      priority: num_from_priority(todo.priority),
      completed: false,
    };

    if (todo.date_due) {
      const local = todo.date_due.getTime();
      const offset = todo.date_due.getTimezoneOffset() * 60000;
      const utc = new Date(local + offset);
      body_todo.date_due = utc.toLocaleString('sv')
    }

    const json_body = JSON.stringify(body_todo)
    console.log(json_body)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json_body,
    });

    if (!response.ok) {
      const error_json = await response.json();
      if (!error_json) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (error_json.code === 400) {
        console.log(error_json);
        throw new AuthorizationError(
          "CreationFailed",
          `Creation failed, error: ${error_json.message}`,
        );
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todo_id: number, fetch: Fetch) => {
  const endpoint: string = main_url + `/todos/${todo_id}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    credentials: 'include',
  })

  if (!response.ok) {
    const error_json = await response.json();
    if (!error_json) {
      throw new Error(`Response status: ${response.status}`);
    }

    console.log(error_json)

    if (error_json.code === 401) {
      throw new AuthorizationError(
        "UserRestricted",
        "Authorization failed, user is not logged in",
      );
    }
  }

  return response
};
