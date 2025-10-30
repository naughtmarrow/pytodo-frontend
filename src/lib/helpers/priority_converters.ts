import type { Priority } from "$lib/types/priority"

export const priority_from_num = (num: number): Priority  =>  {
  switch (num) {
    case 1:
      return "URGENT"
    case 2:
      return "IMPORTANT"
    case 3:
      return "NORMAL"
    default:
      return "OPTIONAL"
  }
}

export const num_from_priority = (priority: Priority): number =>  {
  switch (priority) {
    case "URGENT":
      return 1
    case "IMPORTANT":
      return 2
    case "NORMAL":
      return 3
    default:
      return 4
  }
}
