import { useState } from "react"

// custom hook for specific value field of the form
export const useField = (type) => {
    const [value, setValue] = useState("")
    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue("")
    }
    return {
        type, 
        value, 
        onChange, 
        reset
    }
}

