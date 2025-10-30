import { AuthorizationError, GenericError } from "$lib/server/errors";
import { createTodo, deleteTodo } from "$lib/requests/todo_list.server";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";
import type { Todo } from "$lib/types/todo";
import type { Priority } from "$lib/types/priority";

export const POST: RequestHandler = async ({ request, fetch }) => {
  try {
    const data = await request.json();
    const description: string = data.description as string;
    const date_due: Date | undefined = data.date_due ? new Date( data.date_due ) : undefined;
    const priority = data.priority as Priority;
    const completed = false;

    const todo: Todo = {
      id: 0,
      description: description,
      date_due: date_due,
      priority: priority,
      completed: completed
    }

    const response = await createTodo(todo, fetch);

    if (!response.ok) {
      throw GenericError
    }

    const body = await response.json()
    if (!body) {
      console.log("response body empty")
      throw GenericError
    }

    return json({
      id: body.id
    });

  } catch (error) {
    if (error instanceof AuthorizationError) {
      return new Response(`Authorization failed due to ${error}`, {
        status: 401,
      });
    }

    console.log(error);
    return new Response("Unkwown error", {
      status: 500,
    });
  }
};

export const DELETE: RequestHandler = async ({ request, fetch }) => {
  try {
    const data = await request.json();
    const id = data.id

    const result = await deleteTodo(id, fetch);
    if (result.status !== 200) {
      throw GenericError
    }

    return result
  }catch (error) {
    if (error instanceof AuthorizationError) {
      return new Response(`Authorization failed due to ${error}`, {
        status: 401,
      });
    }

    console.log(error);
    return new Response("Unkwown error", {
      status: 500,
    });
  }
}
