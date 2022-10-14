const USER = 'kingfisher-user'
const RECENT_SEARCHES = 'kingfisher-recent-searches'

const setUser = (user) => localStorage.setItem(USER, JSON.stringify(user))

const getUser = () => JSON.parse(localStorage.getItem(USER))

const setRecentSearches = (recentSearches) => localStorage.setItem(RECENT_SEARCHES, JSON.stringify(recentSearches))

const getRecentSearches = () => JSON.parse(localStorage.getItem(RECENT_SEARCHES))

const getConfig = () => {}

export const LS = { setUser, getUser, getConfig, setRecentSearches, getRecentSearches }