<script lang="ts">
export let data: {list: []};

import TodoCard from "$lib/components/TodoCard.svelte";
import Navbar from "$lib/components/Navbar.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";

import { TodoList } from "$lib/stores/todo_store.svelte";
import { setTodos } from "$lib/helpers/list_setter";
import { onMount } from "svelte";

import type { Todo } from "$lib/types/todo";

import { dueToday } from "$lib/stores/todo_store.svelte";
import { dueTomorrow } from "$lib/stores/todo_store.svelte";
import { dueThisWeek } from "$lib/stores/todo_store.svelte";
import { dueThisMonth } from "$lib/stores/todo_store.svelte";
import { dueLater } from "$lib/stores/todo_store.svelte";
import { dueIndefinite } from "$lib/stores/todo_store.svelte";

import { showMainToday } from "$lib/stores/todo_store.svelte";
import { showMainTomorrow } from "$lib/stores/todo_store.svelte";
import { showMainThisWeek } from "$lib/stores/todo_store.svelte";
import { showMainThisMonth } from "$lib/stores/todo_store.svelte";
import { showMainLater } from "$lib/stores/todo_store.svelte";
import { showMainIndefinite } from "$lib/stores/todo_store.svelte";

import { showSidebar } from "$lib/stores/general.svelte";

let screenWidth: number;

const returnTodo = (id: number): Todo => {
  const todo_obtained: Todo | undefined = TodoList.map.get(id);
  if (todo_obtained === undefined) {
    return {
      id: 0,
      description: "error",
      priority: "URGENT",
      completed: false,
    };
  } else {
    return todo_obtained;
  }
};

onMount(() => {
  setTodos(data.list);
});
</script>

<svelte:window bind:innerWidth={screenWidth}/>

<div class="content">
  {#if showSidebar.value || screenWidth >= 1080}
  <div class="left-side">
    <Sidebar />
  </div>
  {/if}
  <div class="right-side">
    <Navbar />
    <ul class="todo-list">
      {#if showMainToday.value}
      {#each dueToday.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "today"}}/>
      {/each}
      {/if}

      {#if showMainTomorrow.value}
      {#each dueTomorrow.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "tomorrow"}}/>
      {/each}
      {/if}

      {#if showMainThisWeek.value}
      {#each dueThisWeek.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "week"}}/>
      {/each}
      {/if}

      {#if showMainThisMonth.value}
      {#each dueThisMonth.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "month"}}/>
      {/each}
      {/if}

      {#if showMainLater.value}
      {#each dueLater.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "later"}}/>
      {/each}
      {/if}

      {#if showMainIndefinite.value}
      {#each dueIndefinite.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "indefinite"}}/>
      {/each}
      {/if}
    </ul>
  </div>

</div>

<style>

@media screen and (max-width: 1080px){
  .left-side {
    position: absolute;
    width: 300px;
    height: 100vh;
  }
}

@media screen and (min-width: 1080px){
  .left-side {
    flex: 1 0 300px;
    max-width: 350px;
  }
}

.content {
  display: flex;
  height: 100vh;
}

.right-side {
  flex: 1 1;
  display: flex;
  flex-direction: column;
}

.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

</style>
