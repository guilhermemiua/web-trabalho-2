const getToken = () => {
  return sessionStorage.getItem("expenses@access_token")
}

const setTokenToSessionStorage = (token) => {
  sessionStorage.setItem("expenses@access_token", token)
}

const removeTokenFromSessionStorage = () => {
  sessionStorage.removeItem("expenses@access_token")
}

export { 
  setTokenToSessionStorage, 
  removeTokenFromSessionStorage, 
  getToken 
}