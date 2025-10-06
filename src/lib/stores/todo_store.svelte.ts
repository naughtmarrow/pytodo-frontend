import type { Todo } from "$lib/types/todo";

const testTodo: Todo = {
  id: 1,
  description: "testtodo",
  date_due: new Date("December 17, 2026 03:24:00"),
  priority: "URGENT",
  completed: true
}

export let TodoList: Todo[] = $state([]) // might have to drop the whole list if user changes but who knows maybe not

TodoList.push(testTodo)
TodoList.push(testTodo)
