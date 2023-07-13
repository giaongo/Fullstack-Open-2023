const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {...initialState, good: initialState.good + 1}
    case 'OK':
      return {...initialState, ok: initialState.ok + 1}
    case 'BAD':
      return {...initialState, bad: initialState}
    case 'ZERO':
      return state
    case 'DO_NOTHING':
      return state
    default: return state
  }
  
}

export default counterReducer
