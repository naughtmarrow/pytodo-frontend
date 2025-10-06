<!-- 

This sidebar is meant to render only the descriptions of the user's todo objects
categorized per time frame

-->

<script lang="ts">
import { TodoList } from "$lib/stores/todo_store";
import { onMount } from "svelte";
import type { TimeFrame } from "$lib/types/timeframe";

const timeframes: Map<number, TimeFrame> = new Map();

onMount(() => {
  const current_time: number = Date.now()
  const current_date: Date = new Date(current_time)

  const today = new Date(current_date)
  today.setHours(23, 59, 59);

  const tomorrow = new Date(current_date)
  tomorrow.setHours(23, 59, 59)
  tomorrow.setDate(today.getDate() + 1)

  const firstDayWeek = new Date(current_date)
  // set to first day of the current week
  firstDayWeek.setHours(0,0,0)
  firstDayWeek.setDate(firstDayWeek.getDate() - firstDayWeek.getDay())

  const firstDayMonth = new Date(current_date)
  // set to first day of the current month
  firstDayMonth.setHours(0,0,0)
  firstDayWeek.setDate(1)


  for (let todo of TodoList) {
    if (todo.date_due === undefined) {
      timeframes.set(todo.id, "NODATE")
      continue
    }

    let time_due = todo.date_due.getTime()

    let date_due = new Date(time_due)
    date_due.setHours(0,0,0) // the date just needs the day/month

    if (time_due - current_time < today.getTime()) {
        timeframes.set(todo.id, "TODAY")
        continue
    }

    if (time_due - current_time < tomorrow.getTime()) {
        timeframes.set(todo.id, "TOMORROW")
        continue
    }

    // set to the first day of the week of the todo date
    date_due.setDate(date_due.getDate() - date_due.getDay());
    if (date_due.getTime() === firstDayWeek.getTime()) {
      // if they are the same day then the todo's due week is the same as the current week
      timeframes.set(todo.id, "WEEK")
      continue
    }

    // set to the first day of the month
    date_due.setDate(1)
    if (date_due.getTime() === firstDayMonth.getTime()) {
      // same as before but for months
      timeframes.set(todo.id, "MONTH")
      continue
    }

    timeframes.set(todo.id, "LATER")
  }
});
</script>

<div class="sidebar"> 
  <h1>Todo</h1>
  <ul>
  </ul>
</div>

<style>

</style>
