import { getUserTodos } from "$lib/requests/user.server";

import { redirect } from "@sveltejs/kit";

import { AuthorizationError } from "$lib/server/errors";

import type { PageServerLoad } from "./$types";
import type { Todo } from "$lib/types/todo";

export const load: PageServerLoad = async ({cookies, fetch}) => {
  try {
    const session = cookies.get('session')

    if (session === undefined || session === null) {
      throw AuthorizationError
    }

    const todo_list: Todo[] = await getUserTodos(session, fetch);

    return { list: todo_list };
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return redirect(302, "/login");
    }

    console.log(error);
    return redirect(302, "/login");
  }
};
