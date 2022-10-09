const USER = 'kingfisher-user'
// const RECENT_SEARCHES = 'kingfisher-recent-searches'

const setUser = (user) => localStorage.setItem(USER, JSON.stringify(user))

const getUser = () => {
    return JSON.parse(localStorage.getItem(USER))
}

const getConfig = () => {}


export const LS = { setUser, getUser, getConfig }