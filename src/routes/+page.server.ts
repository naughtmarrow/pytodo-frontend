import { getUserTodos } from "$lib/requests/user.server";

import { redirect } from "@sveltejs/kit";

import { AuthorizationError } from "$lib/server/errors";

import type { PageServerLoad } from "./$types";
import type { Todo } from "$lib/types/todo";

export const load: PageServerLoad = async () => {
  try {
    const todo_list: Todo[] = await getUserTodos();
    return { list: todo_list };
  } catch (error) {
    if (error instanceof AuthorizationError) {
      redirect(302, "/login");
    }

    console.log(error);
  }

  return { list: [] };
};
