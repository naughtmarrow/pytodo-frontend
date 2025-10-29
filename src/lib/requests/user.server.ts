import { AuthorizationError } from "$lib/server/errors";

import { BACKEND_HOST, BACKEND_PORT } from "$env/static/private";
import type { Todo } from "$lib/types/todo";
import { priority_from_num } from "$lib/helpers/priority_from_num";

const main_url: string = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

type Fetch = typeof fetch;
export const register = async (
  username: string,
  password: string,
  fetch: Fetch,
) => {
  const endpoint: string = main_url + "/users";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const error_json = await response.json();
      if (!error_json) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (error_json.code === 400) {
        console.log(error_json);
        throw new AuthorizationError(
          "RegistrationFailed",
          `Registration failed, error: ${error_json.msg}`,
        );
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async (session: string, fetch: Fetch) => {
  const endpoint: string = main_url + "/users/logout";
  try {
    const cookieHeader = `session=${session}`;

    const response = await fetch(endpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      const error_json = await response.json();
      if (!error_json) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (error_json.code === 401) {
        throw new AuthorizationError(
          "UserRestricted",
          "Authorization failed, user is not logged in",
        );
      }
    }

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (
  username: string,
  password: string,
  fetch: Fetch,
) => {
  const endpoint: string = main_url + "/users/login";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const error_json = await response.json();
      if (!error_json) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (error_json.code === 400) {
        console.log(error_json);
        throw new AuthorizationError(
          "LoginFailed",
          "Login failed, ensure input is correct",
        );
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserTodos = async (
  session: string,
  fetch: Fetch,
): Promise<Todo[]> => {
  // this endpoint requires valid cookies for an active session
  const endpoint: string = main_url + "/todos";
  let todo_list: Todo[] = [];

  try {
    const cookieHeader = `session=${session}`;

    const response = await fetch(endpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      const error_json = await response.json();
      if (!error_json) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (error_json.code === 401) {
        throw new AuthorizationError(
          "UserRestricted",
          "Authorization failed, user is not logged in",
        );
      }
    }

    const result = await response.json();
    for (const x of result.data) {
      todo_list.push({
        id: x.id as number,
        description: x.description as string,
        date_due: x.date_due ? new Date(x.date_due) : undefined,
        priority: priority_from_num(x.priority),
        completed: x.completed,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  return todo_list;
};
