import { Priority } from "./priority"

export interface Todo {
  id: number
  description: string
  due_date: Date
  priority: Priority
  completed: boolean
}
