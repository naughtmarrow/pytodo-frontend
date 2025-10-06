<script lang="ts">
let username: string = $state("")
let password: string = $state("")
</script>

<div class="login">
  <input type="text" bind:value={username}/>
  <input type="text" bind:value={password}/>
</div>

<style>
</style>
