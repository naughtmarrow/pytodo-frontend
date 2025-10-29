<script lang="ts">
import Burger from "$lib/assets/burger.svelte";
import Eye from "$lib/assets/eye.svelte";
import EyeClosed from "$lib/assets/eye-closed.svelte";
import User from "$lib/assets/user.svelte";

import type { Priority } from "$lib/types/priority";

import { showUrgent } from "$lib/stores/todo_store.svelte";
import { showImportant } from "$lib/stores/todo_store.svelte";
import { showNormal } from "$lib/stores/todo_store.svelte";
import { showOptional } from "$lib/stores/todo_store.svelte";

import { showSidebar } from "$lib/stores/general.svelte";

import './priority.css'

const toggleShowPriority = (priority: Priority) => {
  switch (priority) {
    case "URGENT":
      showUrgent.value = !showUrgent.value;
      break;

    case "IMPORTANT":
      showImportant.value = !showImportant.value;
      break;

    case "NORMAL":
      showNormal.value = !showNormal.value;
      break;

    case "OPTIONAL":
      showOptional.value = !showOptional.value;
      break;
  }
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
}

</script>

<nav class="nav">
  <div class="right-nav">
    <div class="burger" role="button" tabindex="0" on:click={toggleSidebar} on:keyup={toggleSidebar}>
      <Burger />
    </div>
  </div>
  <div class="left-nav">
    <div class="priority urgent" role="button" tabindex="0" on:click={() => toggleShowPriority("URGENT")} on:keyup={() => toggleShowPriority("URGENT")}>
      {#if showUrgent.value}
      <Eye />
      {:else}
      <EyeClosed />
      {/if}
    </div>
    <div class="priority important" role="button" tabindex="0" on:click={() => toggleShowPriority("IMPORTANT")} on:keyup={() => toggleShowPriority("IMPORTANT")}>
      {#if showImportant.value}
      <Eye />
      {:else}
      <EyeClosed />
      {/if}
    </div> 
    <div class="priority normal" role="button" tabindex="0" on:click={() => toggleShowPriority("NORMAL")} on:keyup={() => toggleShowPriority("NORMAL")}>
      {#if showNormal.value}
      <Eye />
      {:else}
      <EyeClosed />
      {/if}
    </div> 
    <div class="priority optional" role="button" tabindex="0" on:click={() => toggleShowPriority("OPTIONAL")} on:keyup={() => toggleShowPriority("OPTIONAL")}>
      {#if showOptional.value}
      <Eye />
      {:else}
      <EyeClosed />
      {/if}
    </div> 
    <div class="user">
      <User />
      <div class="user-menu">
        <ul>
          <li><a id="logout" href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>

<style>
/* mobile navbar */
  @media screen and (max-width: 1080px) {
    .burger {
      color: var(--global-foreground);
      width: 32px;
      aspect-ratio: 1 1;
    }
  }

  @media screen and (min-width: 1080px) {
    .burger {
      display: none;
    }
  }

nav {
  display: flex;
  height: 69px;
  width: 100%;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
}

.right-nav {
  display: flex;
  flex: 1 1 100px;
  justify-content: flex-start;
  align-items: center;
}

.left-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1 0;
}

.user {
  color: var(--global-foreground);
  width: 54px;
  margin: 0 0 0 0.1em;
}

.user-menu {
  display: none;
  position: absolute;
  transform: translateX(-100px);
  width: 120px;
  height: auto;

  background-color: var(--secondary-background);

  ul {
    padding: 0.3em 0;
    width: 100%;
    list-style: none;
    vertical-align: center;
  }

  li {
    width: 100%;
    height: 30px;
    vertical-align: center;
    margin-top: 3px;
  }

  a, a:visited {
    display: block;
    width: 100%;
    height: 100%;
    color: var(--global-foreground);
    text-decoration: none;
    text-align: center;
  }
}

.user:hover .user-menu {
  display: block;
}

</style>
