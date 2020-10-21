const types = {
  GET_CATEGORIES: 'categories/GET_CATEGORIES'
}

const initalState = {
  categories: []
}

export default function userReducer(state = initalState, action = {}) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      }

    default: return state;
  }
}

function getCategoriesAction({ categories }) {
  return { 
    type: types.GET_CATEGORIES, 
    payload: {
      categories
    }
  };
}

export {
  getCategoriesAction
}
