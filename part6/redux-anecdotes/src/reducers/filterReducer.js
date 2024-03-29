import { createSlice } from "@reduxjs/toolkit"
const initialState = 'ALL'

/*This function returns an object containing the reducer and the action creators defined by the reducers parameter */
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            console.log("Action ", action);
            return action.payload
        }
    }
})


export const {filterChange} = filterSlice.actions
export default filterSlice.reducer
