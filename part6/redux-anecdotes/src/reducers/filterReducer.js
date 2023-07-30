import { createSlice } from "@reduxjs/toolkit"
const initialState = 'ALL'

/*This function returns an object containing the reducer and the action creators defined by the reducers parameter */
const filterSlide = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})


export const {filterChange} = filterSlide.actions
export default filterSlide.reducer
