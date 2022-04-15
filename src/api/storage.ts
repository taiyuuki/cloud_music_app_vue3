export const getLS = (key: string): any => {
  if (localStorage[key]) {
    return JSON.parse(<string>localStorage.getItem(key))
  } else {
    return null
  }
}
export const setLS = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const removeLS = (key: string): void => {
  localStorage.removeItem(key)
}

