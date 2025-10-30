<script lang="ts">
import Cross from "$lib/assets/cross.svelte";

import { TodoList } from "$lib/stores/todo_store.svelte";
import { TimeCategorizer } from "$lib/helpers/time_sorts";

import type { Priority } from "$lib/types/priority";
import type { Todo } from "$lib/types/todo";

let { toggler } = $props();

let description = $state("");
let date_due = $state(undefined);
let priority = $state("OPTIONAL");

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  try {
    let todo_info: {description: string, date_due?: Date, priority: Priority} =  {
      description: description,
      priority: priority as Priority,
    };

    if (date_due) {
      todo_info.date_due = new Date(date_due);
    }

    const response = await fetch("http://localhost:5173/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo_info)
    });

    if (!response.ok) {
      console.log("response failed")
    }

    const body = await response.json()
    if (!body) {
      // TODO: FIGURE OUT HOW TO HANDLE THIS LATER
      console.log("response contained invalid json")
    }

    let new_todo: Todo = {
      id: body.id,
      completed: false,
      ...todo_info
    }

    TodoList.map.set(new_todo.id, new_todo);
    TimeCategorizer(new_todo);
  } catch (error) {
    console.log(error)
  }
};
</script>

<div class="main-background">
  <div class="top">
    <div class="cross" role="button" tabindex="0" onclick={toggler} onkeyup={toggler}>
      <Cross />
    </div>
  </div>

  <form onsubmit={handleSubmit}>
    <label for="description">
      Description:
      <input type="text" name="description" id="description" bind:value={description}>
    </label>

    <label for="date_due">
      Date Due:
      <input type="datetime-local" name="date_due" id="date_due" bind:value={date_due}>
    </label>

    <label for="priority">
      Priority Level:
      <select name="priority" id="priority" bind:value={priority}>
        <option value="URGENT">Urgent</option>
        <option value="IMPORTANT">Important</option>
        <option value="NORMAL">Normal</option>
        <option value="OPTIONAL">Optional</option>
      </select>
    </label>

    <input type="submit" value="Create" id="submit">
  </form>
</div>

<style>
  .main-background {
    background-color: var(--secondary-background);

    width: 100%;
    height: 100%;

    padding: 1em;

    border-radius: 15px;
  }

  .cross {
    color: var(--global-foreground);
    width: 32px;
    aspect-ratio: 1 1;
  }

  form {
    display: flex;
    flex-direction: column;

    align-items: center;

    label {
      color: var(--global-foreground);
      margin-bottom: 1em;
    }
  }

  input[type="submit"] {
    width: 8em;
  }
</style>
