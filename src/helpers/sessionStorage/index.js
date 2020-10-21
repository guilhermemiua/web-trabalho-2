const getToken = () => {
  return sessionStorage.getItem("expenses@access_token")
}

const setTokenToSessionStorage = (token) => {
  sessionStorage.setItem("expenses@access_token", token)
}

const removeTokenFromSessionStorage = () => {
  sessionStorage.removeItem("expenses@access_token")
}

const getUser = () => {
  return sessionStorage.getItem("expenses@user")
}

const setUserToSessionStorage = (user) => {
  sessionStorage.setItem("expenses@user", JSON.stringify(user))
}

const removeUserFromSessionStorage = () => {
  sessionStorage.removeItem("expenses@user")
}

export { 
  setTokenToSessionStorage, 
  removeTokenFromSessionStorage, 
  getToken,
  getUser,
  setUserToSessionStorage,
  removeUserFromSessionStorage
}