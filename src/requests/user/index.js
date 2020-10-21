import api from '../../config/api'

import { getToken } from '../../helpers/sessionStorage'

const login = async ({ email, password }) => {
  return api.post('/users/authenticate', {
    email,
    password
  })
}

const findUserById = async ({ id }) => {
  const token = getToken()

  return api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const createUser = async ({ 
  password,
  email,
}) => {
  return api.post('/users', {
    password,
    email,
  })
}

export {
  login,
  findUserById,
  createUser
}