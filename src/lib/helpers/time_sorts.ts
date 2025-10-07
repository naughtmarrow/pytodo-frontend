import type { Todo } from "$lib/types/todo";

import { dueToday } from "$lib/stores/todo_store.svelte";
import { dueTomorrow } from "$lib/stores/todo_store.svelte";
import { dueThisWeek } from "$lib/stores/todo_store.svelte";
import { dueThisMonth } from "$lib/stores/todo_store.svelte";
import { dueLater } from "$lib/stores/todo_store.svelte";
import { dueIndefinite } from "$lib/stores/todo_store.svelte";

export const TimeCategorizer = (todo: Todo) =>  {
  const current_time: number = Date.now();
  const current_date: Date = new Date(current_time);

  const today = new Date(current_date);
  today.setHours(23, 59, 59);

  const tomorrow = new Date(current_date);
  tomorrow.setHours(23, 59, 59);
  tomorrow.setDate(today.getDate() + 1);

  const firstDayWeek = new Date(current_date);
  // set to first day of the current week
  firstDayWeek.setHours(0, 0, 0, 0);
  firstDayWeek.setDate(firstDayWeek.getDate() - firstDayWeek.getDay());

  const firstDayMonth = new Date(current_date);
  // set to first day of the current month
  firstDayMonth.setHours(0, 0, 0, 0);
  firstDayMonth.setDate(1);

  if (todo.date_due === undefined) {
    dueIndefinite.list.push(todo);
    return;
  }

  let time_due = todo.date_due.getTime();

  let date_due = new Date(time_due);
  date_due.setHours(0, 0, 0, 0); // the date just needs the day/month

  if (time_due < today.getTime()) {
    dueToday.list.push(todo);
    return;
  }

  if (time_due < tomorrow.getTime()) {
    dueTomorrow.list.push(todo);
    return;
  }

  // set to the first day of the week of the todo date
  date_due.setDate(date_due.getDate() - date_due.getDay());
  if (date_due.getTime() === firstDayWeek.getTime()) {
    // if they are the same day then the todo's due week is the same as the current week
    dueThisWeek.list.push(todo);
    return;
  }

  // set to the first day of the month
  date_due.setDate(1);
  if (date_due.getTime() === firstDayMonth.getTime()) {
    // same as before but for months
    dueThisMonth.list.push(todo);
    return;
  }
  dueLater.list.push(todo);
}
