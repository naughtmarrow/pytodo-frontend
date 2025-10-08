<!-- 

This sidebar is meant to render only the descriptions of the user's todo objects
categorized per time frame

-->

<script lang="ts">
import ChevronDown from "$lib/assets/chevron-down.svelte";
import ChevronRight from "$lib/assets/chevron-right.svelte";
import Eye from "$lib/assets/eye.svelte";
import EyeClosed from "$lib/assets/eye-closed.svelte";

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

import { showMainToday } from "$lib/stores/todo_store.svelte";
import { showMainTomorrow } from "$lib/stores/todo_store.svelte";
import { showMainThisWeek } from "$lib/stores/todo_store.svelte";
import { showMainThisMonth } from "$lib/stores/todo_store.svelte";
import { showMainLater } from "$lib/stores/todo_store.svelte";
import { showMainIndefinite } from "$lib/stores/todo_store.svelte";

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

const toggleMainShow = (tf: TimeFrame) => {
  switch (tf) {
    case "TODAY":
      showMainToday.value = !showMainToday.value;
      break;

    case "TOMORROW":
      showMainTomorrow.value = !showMainTomorrow.value;
      break;

    case "WEEK":
      showMainThisWeek.value = !showMainThisWeek.value;
      break;

    case "MONTH":
      showMainThisMonth.value = !showMainThisMonth.value;
      break;

    case "LATER":
      showMainLater.value = !showMainLater.value;
      break;

    default: // indefinite
      showMainIndefinite.value = !showMainIndefinite.value;
      break;
  }
};
</script>

<div class="sidebar"> 
  <p class="title">Todo</p>
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
        <p class="due">Due Today</p>

        <div role="button" tabindex="0" class="chevron" on:click={() => toggleMainShow("TODAY")} on:keyup={() => toggleMainShow("TODAY")}>
        {#if showMainToday.value}
        <Eye />
        {:else}
        <EyeClosed />
        {/if}
        </div>
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
        <p class="due">Due Tomorrow</p>

        <div role="button" tabindex="0" class="chevron" on:click={() => toggleMainShow("TOMORROW")} on:keyup={() => toggleMainShow("TOMORROW")}>
        {#if showMainTomorrow.value}
        <Eye />
        {:else}
        <EyeClosed />
        {/if}
        </div>
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
        <p class="due">Due This Week</p>

        <div role="button" tabindex="0" class="chevron" on:click={() => toggleMainShow("WEEK")} on:keyup={() => toggleMainShow("WEEK")}>
        {#if showMainThisWeek.value}
        <Eye />
        {:else}
        <EyeClosed />
        {/if}
        </div>
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
        <p class="due">Due This Month</p>

        <div role="button" tabindex="0" class="chevron" on:click={() => toggleMainShow("MONTH")} on:keyup={() => toggleMainShow("MONTH")}>
        {#if showMainThisMonth.value}
        <Eye />
        {:else}
        <EyeClosed />
        {/if}
        </div>
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
        <p class="due">Due Later</p>

        <div role="button" tabindex="0" class="chevron" on:click={() => toggleMainShow("LATER")} on:keyup={() => toggleMainShow("LATER")}>
        {#if showMainLater.value}
        <Eye />
        {:else}
        <EyeClosed />
        {/if}
        </div>
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
        <p class="due">No Due Date</p>

        <div role="button" tabindex="0" class="chevron" on:click={() => toggleMainShow("INDEFINITE")} on:keyup={() => toggleMainShow("INDEFINITE")}>
        {#if showMainIndefinite.value}
        <Eye />
        {:else}
        <EyeClosed />
        {/if}
        </div>
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

    font-size: 1.1em;
    padding: 0.8em 0.3em;
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
    font-size: 1.3em;
    flex: 1 1;
  }

  .title {
    font-size: 2.1em;
    margin-bottom: 0.4em;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin-bottom: 0.7em;
  }

  p {
    color: var(--global-foreground);
  }

  hr {
    color: var(--faded-global-foreground);
    margin-bottom: 0.3em;
  }

</style>
