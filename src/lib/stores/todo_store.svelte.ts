import type { Todo } from "$lib/types/todo";

// this map should take in the id and the todo separately
export let TodoList: { map: Map<number, Todo> } = $state({
  map: new Map<number, Todo>(),
});

export let dueToday: { list: number[] } = $state({ list: [] });
export let dueTomorrow: { list: number[] } = $state({ list: [] });
export let dueThisWeek: { list: number[] } = $state({ list: [] });
export let dueThisMonth: { list: number[] } = $state({ list: [] });
export let dueLater: { list: number[] } = $state({ list: [] });
export let dueIndefinite: { list: number[] } = $state({ list: [] });

export let showToday: { value: boolean } = $state({ value: false })
export let showTomorrow: { value: boolean } = $state({ value: false })
export let showThisWeek: { value: boolean } = $state({ value: false })
export let showThisMonth: { value: boolean } = $state({ value: false })
export let showLater: { value: boolean } = $state({ value: false })
export let showIndefinite: { value: boolean } = $state({ value: false })

// these are just arrays since we don't need any more information

export const resetList = () => {
  TodoList.map = new Map<number, Todo>();
  dueToday.list = [];
  dueTomorrow.list = [];
  dueThisWeek.list = [];
  dueThisMonth.list = [];
  dueLater.list = [];
  dueIndefinite.list = [];
};
