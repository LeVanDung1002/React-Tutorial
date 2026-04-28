import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user-info",
    initialState: { info: {} },
    reducers: {
        setUser: (state, action) => {
            state.info = action.payload
        },

        removeUser: (state) => {
            state.info = {}
        }
    }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer