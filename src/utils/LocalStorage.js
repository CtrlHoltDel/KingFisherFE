const TABLE_STORAGE_PREFIX = 'Kingfisher_Table_Storage'
const SEATED_PLAYERS_PREFIX = 'SEATED_PLAYERS'
const USER = 'KF-U'
const LOGOUT_REF = 'LOGOUT_REF_KF'

// TABLES
const updateTables = (updatedTables, groupId) => {
    const lsKey = `${TABLE_STORAGE_PREFIX}-${groupId}`
    localStorage.setItem(lsKey, JSON.stringify(updatedTables))
    updateLogoutRef(lsKey)
}

const removeTable = (tableId, groupId) => {
    const allTables = localStorage.getItem(`${TABLE_STORAGE_PREFIX}-${groupId}`)
    const parsedAllTables = JSON.parse(allTables)
    localStorage.setItem(`${TABLE_STORAGE_PREFIX}-${groupId}`, JSON.stringify(parsedAllTables.filter(table => table.id !== tableId)))
}

const getTables = (groupId) => {
    const storedTables = localStorage.getItem(`${TABLE_STORAGE_PREFIX}-${groupId}`)
    if(!storedTables) return

    const parsedTables = JSON.parse(storedTables)
    return parsedTables.filter(table => table.groupId === groupId)
}

// SEATS
const getSeatedPlayers = (tableId) => {
    const retreivedPlayers = localStorage.getItem(`${SEATED_PLAYERS_PREFIX}-${tableId}`)
    return !retreivedPlayers ? null : JSON.parse(retreivedPlayers)
}

const updateSeatedPlayers = (tableId, updatedSeats) => {
    const lsKey = `${SEATED_PLAYERS_PREFIX}-${tableId}`
    updateLogoutRef(lsKey)
    localStorage.setItem(lsKey, JSON.stringify(updatedSeats))
}

// User

const storeUser = (user) => localStorage.setItem(USER, JSON.stringify(user))

const getUser = () => JSON.parse(localStorage.getItem(USER))

const logout = () => {
    const logoutRef = localStorage.getItem(LOGOUT_REF)
    JSON.parse(logoutRef).forEach(ref => {
        localStorage.removeItem(ref)
    })
}

const updateLogoutRef = (newRef) => {
    const logoutRef = localStorage.getItem(LOGOUT_REF)
    const logoutRefParsed = JSON.parse(logoutRef) || []
    localStorage.setItem(LOGOUT_REF, JSON.stringify([...logoutRefParsed, newRef]))
}

export const LS = { updateTables, removeTable, getTables, getSeatedPlayers, updateSeatedPlayers, logout, storeUser, getUser }