<!-- 

This sidebar is meant to render only the descriptions of the user's todo objects
categorized per time frame

-->

<script lang="ts">
import { TodoList } from "$lib/stores/todo_store";
import { onMount } from "svelte";
import type { TimeFrame } from "$lib/types/timeframe";


// const timeframes: 

onMount(() => {});

</script>

<div class="sidebar"> 
  <h1>Todo</h1>
  <ul>
    {#each TodoList as todo}
      <li>
        <p></p>
      </li>
    {/each}
  </ul>
</div>

<style>

</style>
