import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const TodoFilter = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
} as const

export type TodoType = {
    id: string,
    name: string,
    date: string,
    isCompleted: boolean
}

type TodoState = {
    todos: TodoType[],
    filterTag: string
}

const initialState: TodoState = {
    todos: [],
    filterTag: TodoFilter.ALL
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                name: action.payload,
                date: new Date().toDateString(),
                isCompleted: false,
                id: crypto.randomUUID()
            })
        },

        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },

        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(t => t.id === action.payload)
            if (todo) {
                todo.isCompleted = !todo.isCompleted
            }
        },

        filterTodo: (state, action: PayloadAction<string>) => {
            state.filterTag = action.payload
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo, filterTodo } = todoSlice.actions
export default todoSlice.reducer