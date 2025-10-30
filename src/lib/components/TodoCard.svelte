<script lang="ts">
import Trash from "$lib/assets/trash.svelte";
import type { Todo } from "$lib/types/todo";
import type { Priority } from "$lib/types/priority";

import "./priority.css";

import { showUrgent } from "$lib/stores/todo_store.svelte";
import { showImportant } from "$lib/stores/todo_store.svelte";
import { showNormal } from "$lib/stores/todo_store.svelte";
import { showOptional } from "$lib/stores/todo_store.svelte";
    import { unsetTodo } from "$lib/helpers/list_setter";

type _Props = Todo & { timeframe: string };

const todo: _Props = $props(); // receives a todo obj

const priority_string = todo.priority.toLowerCase();
const priority_printable =
  String(priority_string).charAt(0).toUpperCase() +
  String(priority_string).slice(1); // just makes the first letter uppercase

const calcHours = (time: number): number => {
  const now = Date.now();
  if (now >= time) {
    return 0;
  }

  return Math.round((time - now) / 1000 / 60 / 60);
};

const getDue = (timeframe: string): string => {
  if (todo.date_due === undefined) {
    return "whenever";
  }

  if (timeframe === "today") {
    return "in " + calcHours(todo.date_due.getTime()).toString() + " hours";
  }

  if (timeframe === "tomorrow") {
    return "tomorrow";
  }

  if (timeframe === "week") {
    return "this week";
  }

  if (timeframe === "month") {
    return "this month";
  }

  return "later";
};

const returnShowable = (priority: Priority): boolean => {
  if (priority === "URGENT" && !showUrgent.value) {
    return false;
  }
  if (priority === "IMPORTANT" && !showImportant.value) {
    return false;
  }
  if (priority === "NORMAL" && !showNormal.value) {
    return false;
  }
  if (priority === "OPTIONAL" && !showOptional.value) {
    return false;
  }

  return true;
};

const deleteTodo = async (id: number) => {
  const response = await fetch("http://localhost:5173/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    });

    if (!response.ok) {
      console.log("response failed")
    }else {
      unsetTodo(id)
    }
}

</script>

{#if returnShowable(todo.priority)}
<div class="todo-card">
  <div class="todo">
    <div class="top">
      <p>Due {getDue(todo.timeframe)}</p>
      <div class="priority-show">
        <p>{priority_printable}</p>
      <div class="priority {priority_string}"></div>
      </div>
    </div>
    <hr>
    <p class="margin-top">{todo.description}</p>
  </div>

  <div class="complete_delete">
    <input type="checkbox"> 
    <button onclick={() => deleteTodo(todo.id)}><Trash /></button>
  </div>
</div>
{/if}

<style>
@media screen and (max-width: 600px) {
  .todo-card {
    flex-direction: column;
    width: 100%;
  }

  button {
    margin: 0 0.4em;
  }

  .todo {
    flex: 1 1 100px;
    width: 100%;
  }
}

@media screen and (min-width: 600px) {
  .complete_delete {
    flex-direction: column;
  }

  button {
    margin: 0.4em 0;
  }

  .todo-card {
    width: 85%;
  }

  .todo {
    flex: 1 1 200px;
  }
}

p {
  font-size: 1.4em;
  color: var(--global-foreground);
}

hr {
  width: 100%;
}

.todo-card {
  display: flex;
  align-items: center;
  padding: 0.5em 2em;
}

.todo {
  background-color: var(--faded-secondary-background);

  display: flex;
  flex-direction: column;
  max-width: 710px;
  padding: 1.5em 2em;

  border-radius: 10px;

  margin: 0.5em 0.8em;
}

.top {
  display: flex;
  width: 100%;
  margin: 0.2em 0;

  align-items: flex-end;
  justify-content: space-between;
}

.priority-show {
  display: flex;
  align-items: flex-end;
}

.top p, .priority-show p {
  /* kinda hacky but works to reduce the gap between this and hr */
  line-height: 1.2;
}

.margin-top {
  margin-top: 0.4em;
}

/* side interactibles */

.complete_delete {
  display: flex;
}

button {
  width: 32px;
  aspect-ratio: 1 / 1;
  background-color: var(--danger-background);
  border: 0;
  border-radius: 5px;
}

hr {
  color: var(--faded-global-foreground)
}

</style>
