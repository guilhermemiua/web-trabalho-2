import api from '../../config/api'

import { getToken } from '../../helpers/sessionStorage'

const getUserCategories = async ({}) => {
  const token = getToken()

  return api.get('/users/transaction-categories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const createCategory = async ({ 
  name
}) => {
  const token = getToken()

  return api.post('/transaction-categories', {
    name
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const editCategory = async ({ 
  id,
  name
}) => {
  const token = getToken()
  
  return api.put(`/transaction-categories/${id}`, {
    name
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteCategory = async ({ 
  id,
}) => {
  const token = getToken()
  
  return api.delete(`/transaction-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  getUserCategories,
  createCategory,
  editCategory,
  deleteCategory
}