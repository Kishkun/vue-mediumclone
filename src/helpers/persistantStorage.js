export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log('Error getting key from localStorage', error)
    return null
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log('Error saving data from localStorage', error)
  }
}

export const removeItem = key => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log('Error removing key from localStorage', error)
  }
}
