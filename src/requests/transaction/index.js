import api from '../../config/api'

import { getToken } from '../../helpers/sessionStorage'

const getTransactions = async ({}) => {
  const token = getToken()

  return api.get('/transactions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getUserTransactions = async ({}) => {
  const token = getToken()

  return api.get('/me/transactions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const createTransaction = async ({ 
  name,
  transaction_category_id, 
  amount
}) => {
  const token = getToken()

  return api.post('/transactions', {
    name,
    transaction_category_id, 
    amount
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const editTransaction = async ({ 
  id,
  name,
  transaction_category_id, 
  amount
}) => {
  const token = getToken()
  
  return api.put(`/transactions/${id}`, {
    name,
    transaction_category_id, 
    amount
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteTransaction = async ({ 
  id,
}) => {
  const token = getToken()
  
  return api.delete(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
  getUserTransactions
}