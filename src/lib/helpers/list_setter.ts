import type { Todo } from "$lib/types/todo";

import { resetList, TodoList } from "$lib/stores/todo_store.svelte";
import { TimeCategorizer } from "$lib/helpers/time_sorts";

import { dueToday } from "$lib/stores/todo_store.svelte";
import { dueTomorrow } from "$lib/stores/todo_store.svelte";
import { dueThisWeek } from "$lib/stores/todo_store.svelte";
import { dueThisMonth } from "$lib/stores/todo_store.svelte";
import { dueLater } from "$lib/stores/todo_store.svelte";
import { dueIndefinite } from "$lib/stores/todo_store.svelte";

export const setTodos = (list: Todo[]) => {
  resetList();
  for (let x of list) {
    TodoList.map.set(x.id, x);
    TimeCategorizer(x);
  }
};

// HACK: don't look at this... this is painful and shameful as a dev
export const unsetTodo = (id: number) => {
  const td: Todo | undefined = TodoList.map.get(id);
  if (td === undefined) {
    return; // ugh
  }

  switch (td.time_category_key) {
    case "INDEFINITE":
      dueIndefinite.list.forEach((x, i) => {
        if (x === id) {
          dueIndefinite.list.splice(i, 1)
        }
      })
      break;

    case "TODAY":
      dueToday.list.forEach((x, i) => {
        if (x === id) {
          dueToday.list.splice(i, 1)
        }
      })
      break;

    case "TOMORROW":
      dueTomorrow.list.forEach((x, i) => {
        if (x === id) {
          dueTomorrow.list.splice(i, 1)
        }
      })
      break;

    case "WEEK":
      dueThisWeek.list.forEach((x, i) => {
        if (x === id) {
          dueThisWeek.list.splice(i, 1)
        }
      })
      break;

    case "MONTH":
      dueThisMonth.list.forEach((x, i) => {
        if (x === id) {
          dueThisMonth.list.splice(i, 1)
        }
      })
      break;

    default:
      dueLater.list.forEach((x, i) => {
        if (x === id) {
          dueLater.list.splice(i, 1)
        }
      })
      break;
  }

  TodoList.map.delete(id);
};
