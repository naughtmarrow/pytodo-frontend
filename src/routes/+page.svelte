<script lang="ts">
import TodoCard from "$lib/components/TodoCard.svelte";
import Navbar from "$lib/components/Navbar.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";

import { TodoList } from "$lib/stores/todo_store.svelte";
import type { Todo } from "$lib/types/todo";

import { dueToday } from "$lib/stores/todo_store.svelte";
import { dueTomorrow } from "$lib/stores/todo_store.svelte";
import { dueThisWeek } from "$lib/stores/todo_store.svelte";
import { dueThisMonth } from "$lib/stores/todo_store.svelte";
import { dueLater } from "$lib/stores/todo_store.svelte";
import { dueIndefinite } from "$lib/stores/todo_store.svelte";

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
</script>

<div class="content">

  <div class="left-side">
    <Sidebar />
  </div>
  <div class="right-side">
    <Navbar />
    <ul class="todo-list">
      {#each dueToday.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "today"}}/>
      {/each}
      {#each dueTomorrow.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "tomorrow"}}/>
      {/each}
      {#each dueThisWeek.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "week"}}/>
      {/each}
      {#each dueThisMonth.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "month"}}/>
      {/each}
      {#each dueLater.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "later"}}/>
      {/each}
      {#each dueIndefinite.list as id }
        <TodoCard {...{...returnTodo(id), timeframe: "indefinite"}}/>
      {/each}
    </ul>
  </div>

</div>

<style>

@media screen and (max-width: 1080px){
  .left-side {
    background-color: var(--secondary-background);
    display: none;
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
