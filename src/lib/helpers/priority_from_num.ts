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
