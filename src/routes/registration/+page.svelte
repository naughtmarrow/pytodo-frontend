<script lang="ts">
import User from "$lib/assets/user.svelte";
import type { ActionData } from "./$types";

export let form: ActionData;
</script>

<div class="login">
  <form method="POST" action="?/registration">
    <div class="user">
      <User />
    </div>

    <div class="input-box">
    <label for="username">
      <input name="username" type="text" placeholder="Username" />
    </label>

    <label for="password">
      <input name="password" type="password" placeholder="Password" />
    </label>

    <button>Submit</button>
    </div>


    <a href="/login">Already have an account? Login</a>

    {#if form?.incorrect }
      <p class="error">Authorization failed, ensure the data entered is correct</p>
    {/if}
  </form>
</div>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
}

form {
  background-color: var(--faded-secondary-background);
  color: var(--global-foreground);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1 1;
  max-width: 700px;

  min-height: 50%;

  border-radius: 10px;

  padding: 4em 0;
  margin: 2em;

  .input-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-width: 85%;

    margin: 3em 0;
  }

  label {
    display: flex;
    flex-direction: column;

    margin-bottom: 1.5em;

    min-width: 100%;

    input {
      background-color: var(--secondary-background);
      color: var(--faded-global-foreground);

      border: none;
      border-radius: 15px;
      padding: 0.2em 1em;

      font-size: 1.3em;
    }
  }

  button {
    background-color: var(--global-foreground);
    color: var(--secondary-background);

    border: none;
    border-radius: 15px;
    padding: 0.2em;

    min-width: 40%;

    font-size: 1.2em;
    font-weight: 400;
  }
}

.user {
  color: var(--global-foreground);

  width: 96px;
  aspect-ratio: 1 1;
}

a {
  color: var(--global-foreground);
}

.error {
  color: var(--danger-background);
}
</style>
