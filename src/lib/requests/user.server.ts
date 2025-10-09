import { AuthorizationError } from "$lib/server/errors";

import { BACKEND_HOST, BACKEND_PORT } from "$env/static/private";
import type { Todo } from "$lib/types/todo"

const main_url: string = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

export const login = async () => {};

export const logout = async () => {};

export const getUserTodos = async (): Promise<Todo[]> => {
  // this endpoint requires valid cookies for an active session
  const endpoint: string = main_url + "/todos";
  let todo_list: Todo[] = []

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // TODO: check for 401 and act accordingly
      const error_json = await response.json()
      if (!error_json) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (error_json.code === 401) {
        throw new AuthorizationError("UserRestricted", "Authorization failed, user is not logged in")
      }

    }

    const result = await response.json();

    for(const x of result) {
      todo_list.push(x)
    }

  } catch (error) {
    console.log(error);
    throw error
  }

  return todo_list
};
