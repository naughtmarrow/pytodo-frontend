import type { Todo } from "$lib/types/todo";

export let TodoList: Todo[] = $state([
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
  }
])
