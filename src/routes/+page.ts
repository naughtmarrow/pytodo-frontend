import type { PageLoad } from "./$types";

import { getTodos } from "$lib/requests/todo_list";

export const load: PageLoad = () => {
  getTodos()
}
