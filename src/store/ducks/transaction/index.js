const types = {
  GET_USER_TRANSACTIONS: 'transactions/GET_USER_TRANSACTIONS'
}

const initalState = {
  userTransactions: []
}

export default function userReducer(state = initalState, action = {}) {
  switch (action.type) {
    case types.GET_USER_TRANSACTIONS:
      return {
        ...state,
        userTransactions: action.payload.userTransactions
      }

    default: return state;
  }
}

function getUserTransactionsAction({ userTransactions }) {
  return { 
    type: types.GET_USER_TRANSACTIONS, 
    payload: {
      userTransactions
    }
  };
}

export {
  getUserTransactionsAction
}
