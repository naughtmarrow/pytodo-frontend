<!-- 

This sidebar is meant to render only the descriptions of the user's todo objects
categorized per time frame

-->

<script lang="ts">
import ChevronDown from "$lib/assets/chevron-down.svelte";
import ChevronRight from "$lib/assets/chevron-right.svelte";

import { dueToday } from "$lib/stores/todo_store.svelte";
import { dueTomorrow } from "$lib/stores/todo_store.svelte";
import { dueThisWeek } from "$lib/stores/todo_store.svelte";
import { dueThisMonth } from "$lib/stores/todo_store.svelte";
import { dueLater } from "$lib/stores/todo_store.svelte";
import { dueIndefinite } from "$lib/stores/todo_store.svelte";

import { showToday } from "$lib/stores/todo_store.svelte";
import { showTomorrow } from "$lib/stores/todo_store.svelte";
import { showThisWeek } from "$lib/stores/todo_store.svelte";
import { showThisMonth } from "$lib/stores/todo_store.svelte";
import { showLater } from "$lib/stores/todo_store.svelte";
import { showIndefinite } from "$lib/stores/todo_store.svelte";

import { TodoList } from "$lib/stores/todo_store.svelte";

import type { TimeFrame } from "$lib/types/timeframe";

const toggleShow = (tf: TimeFrame) => {
  switch (tf) {
    case "TODAY":
      showToday.value = !showToday.value;
      break;

    case "TOMORROW":
      showTomorrow.value = !showTomorrow.value;
      break;

    case "WEEK":
      showThisWeek.value = !showThisWeek.value;
      break;

    case "MONTH":
      showThisMonth.value = !showThisMonth.value;
      break;

    case "LATER":
      showLater.value = !showLater.value;
      break;

    default: // indefinite
      showIndefinite.value = !showIndefinite.value;
      break;
  }
};
</script>

<div class="sidebar"> 
  <h1>Todo</h1>
  <ul>
    <li>
      <div class="top">
        <div role="button" tabindex="0" class="chevron" on:click={() => toggleShow("TODAY")} on:keyup={() => toggleShow("TODAY")}>
        {#if showToday.value}
        <ChevronDown />
        {:else}
        <ChevronRight />
        {/if}
        </div>
        <h5 class="due">Due Today</h5>
      </div>
      <hr>
      {#if showToday.value}
      {#each dueToday.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
      {/if}
    </li>
    <li>
      <div class="top">
       <div role="button" tabindex="0" class="chevron" on:click={() => toggleShow("TOMORROW")} on:keyup={() => toggleShow("TOMORROW")}> 
        {#if showTomorrow.value}
        <ChevronDown />
        {:else}
        <ChevronRight />
        {/if}
        </div>
        <h5 class="due">Due Tomorrow</h5>
      </div>
      <hr>
      {#if showTomorrow.value}
      {#each dueTomorrow.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
      {/if}
    </li>
    <li>
      <div class="top">
       <div role="button" tabindex="0" class="chevron" on:click={() => toggleShow("WEEK")} on:keyup={() => toggleShow("WEEK")}> 
        {#if showThisWeek.value}
        <ChevronDown />
        {:else}
        <ChevronRight />
        {/if}
        </div>
        <h5 class="due">Due This Week</h5>
      </div>
      <hr>
      {#if showThisWeek.value}
      {#each dueThisWeek.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
      {/if}
    </li>
    <li>
      <div class="top">
       <div role="button" tabindex="0" class="chevron" on:click={() => toggleShow("MONTH")} on:keyup={() => toggleShow("MONTH")}> 
        {#if showThisMonth.value}
        <ChevronDown />
        {:else}
        <ChevronRight />
        {/if}
        </div>
        <h5 class="due">Due This Month</h5>
      </div>
      <hr>
      {#if showThisMonth.value}
      {#each dueThisMonth.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
      {/if}
    </li>
    <li>
      <div class="top">
       <div role="button" tabindex="0" class="chevron" on:click={() => toggleShow("LATER")} on:keyup={() => toggleShow("LATER")}> 
        {#if showLater.value}
        <ChevronDown />
        {:else}
        <ChevronRight />
        {/if}
        </div>
        <h5 class="due">Due Later</h5>
      </div>
      <hr>
      {#if showLater.value}
      {#each dueLater.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
      {/if}
    </li>
    <li>
      <div class="top">
       <div role="button" tabindex="0" class="chevron" on:click={() => toggleShow("INDEFINITE")} on:keyup={() => toggleShow("INDEFINITE")}> 
        {#if showIndefinite.value}
        <ChevronDown />
        {:else}
        <ChevronRight />
        {/if}
        </div>
        <h5 class="due">No Due Date</h5>
      </div>
      <hr>
      {#if showIndefinite.value}
      {#each dueIndefinite.list as id}
         <p>{TodoList.map.get(id)?.description}</p>
      {/each}
      {/if}
    </li>
  </ul>
</div>

<style>
  .sidebar {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .top {
    display: flex;
    align-content: flex-end;
    text-align: bottom;
  }

  .chevron {
    color: var(--global-foreground);
    max-width: 26px;
    aspect-ratio: 1 1;
    flex: 1 0;

    margin-right: 0.2em;
  }

  .due {
    flex: 1 1;
  }

  h1, h5, p {
    color: var(--global-foreground);
  }

  p {
    margin-left: 1em;
  }

  hr {
    color: var(--faded-global-foreground)
  }

</style>
