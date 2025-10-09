import type { Todo } from "$lib/types/todo";

import { resetList, TodoList } from "$lib/stores/todo_store.svelte";
import { TimeCategorizer } from "$lib/helpers/time_sorts";

export const setTodos = (sample_list: Todo[]) => {
  resetList();
  for (let x of sample_list) {
    TodoList.map.set(x.id, x);
    TimeCategorizer(x);
  }
};
