import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message:"", 
    isVisible:false
}

/*This function returns an object containing the reducer and the action creators defined by the reducers parameter */
const notificationSlice = createSlice({
    name: 'notification', 
    initialState, 
    reducers: {
        showNoti(state, action) {
            console.log("Action ", action);
            return {
                message:action.payload, 
                isVisible: true
            }
        }, 
        hideNoti(state, action) {
            return initialState
        }
    }
})

export const {showNoti, hideNoti} = notificationSlice.actions
export default  notificationSlice.reducer