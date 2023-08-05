import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "showNoti":
            return {
                message: action.payload, 
                isVisible: true
            }
        case "hideNoti":
            return {
                message: "", 
                isVisible: false
            }
    }
}

// the purpose is to create a global state for the application
const NotiContext = createContext()
export const NotiContextProvider = (props) => {
    const [notiState, notiDispatch] = useReducer(notificationReducer, {message:"", isVisible: false})
    return (
        <NotiContext.Provider value={[notiState, notiDispatch]}>
            {props.children}
        </NotiContext.Provider>
    )
}

// display and hide notification after 5s
export const displayNotification = (notiDispatch, message) => {
    notiDispatch({type:"showNoti", payload: message})
    setTimeout(() => notiDispatch({type: "hideNoti"}),5000)
}
export default NotiContext
