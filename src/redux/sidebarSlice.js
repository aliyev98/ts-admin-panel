import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarSelection: "products"
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebarSelection: (state, action) => {
            state.sidebarSelection = action.payload
        }
    },
})

export const { setSidebarSelection } = sidebarSlice.actions;
export default sidebarSlice.reducer;