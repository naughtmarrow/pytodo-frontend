<!-- 

This sidebar is meant to render only the descriptions of the user's todo objects
categorized per time frame

-->

<script lang="ts">
import { dueToday } from "$lib/stores/todo_store.svelte";
import { dueTomorrow } from "$lib/stores/todo_store.svelte";
import { dueThisWeek } from "$lib/stores/todo_store.svelte";
import { dueThisMonth } from "$lib/stores/todo_store.svelte";
import { dueLater } from "$lib/stores/todo_store.svelte";
import { dueIndefinite } from "$lib/stores/todo_store.svelte";

import {TodoList} from "$lib/stores/todo_store.svelte";

</script>

<div class="sidebar"> 
  <h1>Todo</h1>
  <ul>
    <li>
      <h5>Due Today</h5>
      <hr>
      {#each dueToday.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due Tomorrow</h5>
      <hr>
      {#each dueTomorrow.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due This Week</h5>
      <hr>
      {#each dueThisWeek.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due This Month</h5>
      <hr>
      {#each dueThisMonth.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
    </li>
    <li>
      <h5>Due Later</h5>
      <hr>
      {#each dueLater.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
    </li>
    <li>
      <h5>No Due Date</h5>
      <hr>
      {#each dueIndefinite.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
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
