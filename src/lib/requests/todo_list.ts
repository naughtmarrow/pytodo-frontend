// TODO: add an actual request system
import type { Todo } from "$lib/types/todo";

import { resetList, TodoList } from "$lib/stores/todo_store.svelte";
import { TimeCategorizer } from "$lib/helpers/time_sorts";

const sample_list: Todo[] = [
  {
    id: 1,
    description: "a test todo",
    date_due: new Date("December 17, 2025 03:24:00"),
    priority: "URGENT",
    completed: false,
  },

  {
    id: 2,
    description: "another test todo",
    date_due: new Date("December 25, 2025 03:24:00"),
    priority: "IMPORTANT",
    completed: false,
  },

  {
    id: 3,
    description: "some other test todo",
    date_due: new Date("October 8, 2025 03:24:00"),
    priority: "NORMAL",
    completed: false,
  },

  {
    id: 4,
    description: "some other test todo this month",
    date_due: new Date("October 29, 2025 03:24:00"),
    priority: "NORMAL",
    completed: false,
  }
]

export const getTodos = () => {
  resetList()
  for (let x of sample_list) {
    TodoList.list.push(x)
    TimeCategorizer(x)
  }
}
