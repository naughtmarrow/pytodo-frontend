<!-- 

This sidebar is meant to render only the descriptions of the user's todo objects
categorized per time frame

-->

<script lang="ts">
import { TodoList } from "$lib/stores/todo_store.svelte";
import { onMount } from "svelte";
import type { Todo } from "$lib/types/todo"

// will only hold the ids to avoid repetition of data
let dueToday: Todo[] = $state([]);
let dueTomorrow: Todo[] = $state([]);
let dueThisWeek: Todo[] = $state([]);
let dueThisMonth: Todo[] = $state([]);
let dueLater: Todo[] = $state([]);
let dueIndefinite: Todo[] = $state([]);

onMount(() => {
  const current_time: number = Date.now();
  const current_date: Date = new Date(current_time);

  const today = new Date(current_date);
  today.setHours(23, 59, 59);

  const tomorrow = new Date(current_date);
  tomorrow.setHours(23, 59, 59);
  tomorrow.setDate(today.getDate() + 1);

  const firstDayWeek = new Date(current_date);
  // set to first day of the current week
  firstDayWeek.setHours(0, 0, 0);
  firstDayWeek.setDate(firstDayWeek.getDate() - firstDayWeek.getDay());

  const firstDayMonth = new Date(current_date);
  // set to first day of the current month
  firstDayMonth.setHours(0, 0, 0);
  firstDayMonth.setDate(1);

  for (let todo of TodoList) {
    if (todo.date_due === undefined) {
      dueIndefinite.push(todo);
      continue;
    }

    let time_due = todo.date_due.getTime();

    let date_due = new Date(time_due);
    date_due.setHours(0, 0, 0); // the date just needs the day/month

    if (time_due < today.getTime()) {
      dueToday.push(todo);
      continue;
    }

    if (time_due < tomorrow.getTime()) {
      dueTomorrow.push(todo);
      continue;
    }

    // set to the first day of the week of the todo date
    date_due.setDate(date_due.getDate() - date_due.getDay());
    if (date_due.getTime() === firstDayWeek.getTime()) {
      // if they are the same day then the todo's due week is the same as the current week
      dueThisWeek.push(todo);
      continue;
    }

    // set to the first day of the month
    date_due.setDate(1);
    if (date_due.getTime() === firstDayMonth.getTime()) {
      // same as before but for months
      dueThisMonth.push(todo);
      continue;
    }
    dueLater.push(todo);
  }
});
</script>

<div class="sidebar"> 
  <h1>Todo</h1>
  <ul>
    <li>
      <h5>Due Today</h5>
      <hr>
      {#each dueToday as todo}
         <p>{todo.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due Tomorrow</h5>
      <hr>
      {#each dueTomorrow as todo}
         <p>{todo.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due This Week</h5>
      <hr>
      {#each dueThisWeek as todo}
         <p>{todo.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due This Month</h5>
      <hr>
      {#each dueThisMonth as todo}
         <p>{todo.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due Later</h5>
      <hr>
      {#each dueLater as todo}
         <p>{todo.description}</p>
      {/each}
    </li>
    <li>
      <h5>No Due Date</h5>
      <hr>
      {#each dueIndefinite as todo}
         <p>{todo.description}</p>
      {/each}
    </li>
  </ul>
 </div>

<style>
  .sidebar {
    width: 100%;
    height: 100%;
  }

  h1, h5, p {
    color: var(--global-foreground);
  }

</style>
