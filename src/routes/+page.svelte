<script lang="ts">
import TodoCard from "$lib/components/TodoCard.svelte";
import Navbar from "$lib/components/Navbar.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";

import { TodoList } from "$lib/stores/todo_store.svelte";

</script>

<div class="content">

  <div class="left-side">
    <Sidebar />
  </div>
  <div class="right-side">
    <Navbar />
    <ul class="todo-list">
      {#each TodoList as td}
        <TodoCard {...td}/>
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
}

</style>
