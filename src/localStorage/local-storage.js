const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const LS = { setUser }