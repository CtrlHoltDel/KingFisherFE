import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tables: []
}

export const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTable: (state) => {
            state.tables = [...state.tables, { id: Math.random() }]
        },
        removeTable: (state) => {
            state.tables = state.tables.slice(0, -1)
        },
        reset: (state) => {
            state.tables = [];
        }
    }
})

export const { addTable, removeTable, reset } = tableSlice.actions;

export default tableSlice.reducer;