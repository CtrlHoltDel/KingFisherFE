const TABLE_STORAGE_PREFIX = 'TABLES_LIST_KF'
const SEATED_PLAYERS_PREFIX = 'SEATED_PLAYERS_KF'
const USER = 'USER_KF'
const LOGOUT_REF = 'LOGOUT_REF_KF'
const GROUP_REF = 'SELECT_GROUP_KF'
const MENU_STATES_REF = 'MENU_STATES'

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

// GROUP
const setSelectedGroup = (selectedGroup) => localStorage.setItem(GROUP_REF, JSON.stringify(selectedGroup))

const getSelectedGroup = () => JSON.parse(localStorage.getItem(GROUP_REF))

// USER
const storeUser = (user) => localStorage.setItem(USER, JSON.stringify(user))

const getUser = () => JSON.parse(localStorage.getItem(USER))

const logout = () => {
    const logoutRef = localStorage.getItem(LOGOUT_REF)
    JSON.parse(logoutRef).forEach(ref => {
        localStorage.removeItem(ref)
    })
    localStorage.removeItem(USER)
    localStorage.removeItem(GROUP_REF)
}

const updateLogoutRef = (newRef) => {
    const logoutRef = localStorage.getItem(LOGOUT_REF)
    const logoutRefParsed = JSON.parse(logoutRef) || []
    localStorage.setItem(LOGOUT_REF, JSON.stringify([...logoutRefParsed, newRef]))
}

export const LS = { updateTables, removeTable, getTables, getSeatedPlayers, updateSeatedPlayers, logout, storeUser, getUser, setSelectedGroup, getSelectedGroup }