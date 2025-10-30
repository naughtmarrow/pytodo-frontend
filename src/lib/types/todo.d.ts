import { Priority } from "./priority"
import type { TimeFrame } from "./timeframe"

export interface Todo {
  id: number
  description: string
  date_due?: Date
  priority: Priority
  completed: boolean

  time_category_key?: TimeFrame // HACK: This is so disgusting
}
