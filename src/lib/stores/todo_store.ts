import type { Todo } from "$lib/types/todo";

export let TodoList: Todo[] = $state([]) // might have to drop the whole list if user changes but who knows maybe not
