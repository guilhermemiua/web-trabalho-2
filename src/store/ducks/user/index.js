const types = {
  SET_USER: 'user/SET_USER'
}

const initalState = {
  user: {}
}

export default function userReducer(state = initalState, action = {}) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload.user
      }

    default: return state;
  }
}

function setUser({ user }) {
  return { 
    type: types.SET_USER, 
    payload: {
      user
    }
  };
}

export {
  setUser
}
