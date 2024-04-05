import { createSlice } from "@reduxjs/toolkit";

const StateSlice = createSlice({
    name: 'State',
    initialState: {
        showState: [],
    },
    reducers: {
        manageState: (state, action) => {
            state.showState.push(action.payload)
        },

        clearState: (state, action) => {
            state.showState.pop()
        }

    }

})

export const {manageState ,clearState } = StateSlice.actions;

export default StateSlice.reducer;