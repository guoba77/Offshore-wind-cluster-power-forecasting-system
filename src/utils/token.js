export function setToken(name, token) {
  return localStorage.setItem(name, token)
}

export function getToken(token) {
  return localStorage.getItem(token)
}

export function removeToken(token) {
  return localStorage.removeItem(token)
}

export function clearAll(token) {
  return localStorage.clear()
}

