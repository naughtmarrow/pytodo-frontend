import type { Todo } from "$lib/types/todo";

// will only hold the ids to avoid repetition of data
export let dueToday: { list: Todo[] } = $state({ list: [] });
export let dueTomorrow: { list: Todo[] } = $state({ list: [] });
export let dueThisWeek: { list: Todo[] } = $state({ list: [] });
export let dueThisMonth: { list: Todo[] } = $state({ list: [] });
export let dueLater: { list: Todo[] } = $state({ list: [] });
export let dueIndefinite: { list: Todo[] } = $state({ list: [] });

export let TodoList: { list: Todo[] } = $state({ list: [] });
export const resetList = () => {
  dueToday.list = [];
  dueTomorrow.list = [];
  dueThisWeek.list = [];
  dueThisMonth.list = [];
  dueLater.list = [];
  dueIndefinite.list = [];
  TodoList.list = [];
};
