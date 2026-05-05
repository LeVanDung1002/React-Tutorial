import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
    id: string,
    name: string,
    date: string,
    isCompleted: boolean
}

type TodoState = {
    todos: TodoType[]
}

const initialState: TodoState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Omit<TodoType, "id">>) => {
            state.todos.push({
                ...action.payload,
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
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions
export default todoSlice.reducer