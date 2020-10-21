import { combineReducers } from 'redux'

import userReducer from './ducks/user'
import categoryReducer from './ducks/category'
import transactionReducer from './ducks/transaction'

const reducers = combineReducers({
  userReducer,
  categoryReducer,
  transactionReducer
})

export default reducers