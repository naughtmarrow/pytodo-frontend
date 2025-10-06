import { Priority } from "./priority"

export interface Todo {
  id: number
  description: string
  date_due?: Date
  priority: Priority
  completed: boolean
}
