const STORAGE = {
  setPreferences: (key, value) => {
    localStorage.setItem(key, value)
  },
  getPreferences: key => {
    return localStorage.getItem(key)
  },
  removePreferences: key => {
    localStorage.removeItem(key)
  },
}

export default STORAGE
