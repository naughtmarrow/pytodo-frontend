<script lang="ts">
import Burger from "$lib/assets/burger.svelte";
import Eye from "$lib/assets/eye.svelte";
import User from "$lib/assets/user.svelte";

import './priority.css'
</script>

<nav class="nav">
  <div class="right-nav">
    <div class="burger"><Burger /></div>
  </div>
  <div class="left-nav">
    <div class="priority urgent"><Eye /></div>
    <div class="priority important"><Eye /></div>
    <div class="priority normal"><Eye /></div>
    <div class="priority optional"><Eye /></div>
    <div class="user"><User /></div>
  </div>
</nav>

<style>
/* mobile navbar */
@media screen and (max-width: 1080px) {
  .burger {
    color: var(--global-foreground);
    width: 32px;
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

</style>
