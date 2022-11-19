import axios from "axios"

const api = axios.create({
    baseURL: process.env.REACT_APP_TLD,
});

const BAD_REQUEST = 'ERR_BAD_REQUEST';
const ERR_NETWORK = 'ERR_NETWORK'

export const APIping = async () => {
    try {
        const { data: { data } } = await api.get(`/ping`)
        return { success: data.message }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export const APIHandleLogin = async (username, password) => {
    try {
        const { data: { data } } = await api.post('/auth/login', {username, password})
        return { user: data }
    } catch (error) {
        logErrors(error);
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return handleNetworkError({ error: error.message })
    }
}

export const APIHandleRegister = async (username, password) => {
    try {
        await api.post('/auth/register', { username, password })
        return { success: "Registered" }
    } catch (error) {
        logErrors(error)
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return handleNetworkError({ error: error.message })
    }

}

export const APIGetPlayers = async (token, groupId, search) => {
    try {
        const { data } = await api.get(`players/${groupId}?search=${encodeURIComponent(search)}`, setAuthHeader(token))
        return { success: data }
    } catch (error) {
        logErrors(error);
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return handleNetworkError({ error: error.message })
    }
}

export const APIGetGroups = async (token) => {

    try {
        const { data } = await api.get(`/groups`, setAuthHeader(token))
        return { success: data }
    } catch (error) {
        logErrors(error);
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return handleNetworkError({ error: error.message })
    }
}

export const APIAddUserToGroup = async (token, groupId, username) => {
    try {
        const { data: { data } } = await api.post(
            `/groups/handle-request/${groupId}?username=${username}`,
            { action: "Add" },
            setAuthHeader(token)
          );
        return { success: data }
    } catch (error) {
        return { error: error.response.data }
    }
}

export const APIAddGroup = async (token, groupName) => {
    try {
        const { data: { data } } = await api.post(
            `/groups`,
            { name: groupName },
            setAuthHeader(token)
          );
        return { success: data }
    } catch (error) {
        return { error: error.response.data }        
    }
}

export const APIAddPlayer = async (token, playerName, groupId) => {
    try {
        const { data: { data } } = await api.post(`/players/${groupId}`, { playerName }, setAuthHeader(token))
        return { success: data }
    } catch (error) {
        logErrors(error)
        return { error: error.response.data }
    }
}

export const APIGetNotes = async (token, playerId) => {
    try {
        const { data: { data }} = await api.get(`/notes/${playerId}`, setAuthHeader(token))
        return { success: data }
    } catch (error) {
        logErrors(error)
        return { error: error.response.data }
    }
}

export const APIAddNote = async (token, playerId, noteBody) => {
    try {
        const { data: { data } } = await api.post(`/notes/${playerId}`, noteBody, setAuthHeader(token))
        return { success: data }
    } catch (error) {
        logErrors(error)
        return { error: error.response.data}
    }
}

export const APIDeleteNote = async (token, noteId) => {

    try {
        const { data: { data } } = await api.delete(`/notes/${noteId}`, setAuthHeader(token))
        return { success: data }
    } catch (error) {
        logErrors(error)
        return { error: error.response.data}
    }
}

export const APIUpdateType = async (token, groupId, playerId, type) => {
    try {
        await api.put(`/players/${groupId}/${playerId}`, { type }, setAuthHeader(token))
    } catch (error) {
        logErrors(error)
        return { error: error.response.data}
    }
}

export const APIGetBackup = async (token) => {
    try {
        const { data } = await api.get('/admin/backup', setAuthHeader(token))
        return data
    } catch (error) {
        logErrors(error)
        return { error: error.response.data }
    }
}

export const APIGetHistory = async (token) => {
    try {
        const { data } = await api.get('/admin/history', setAuthHeader(token))
        return data
    } catch (error) {
        return { error: error.response.data }
    }
}

const handleNetworkError = (error) => {
    return error
}

const logErrors = (err) => console.warn(`Uncaught Error`, err)
const setAuthHeader = (token) => ({ headers: { authorization: `Bearer ${token}` }} )