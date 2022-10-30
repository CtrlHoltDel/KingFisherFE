import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000",
});

const BAD_REQUEST = 'ERR_BAD_REQUEST';
const ERR_NETWORK = 'ERR_NETWORK'

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
    } catch (error) {
        logErrors(error)
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return handleNetworkError({ error: error.message })
    }

}

export const APIGetList = async (endpoint, token) => {
    try {
        const { data } = await api.get(endpoint, { headers: { authorization: `Bearer ${token}` } })
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
            { headers: { authorization: `Bearer ${token}` } }
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
            { headers: { authorization: `Bearer ${token}` } }
          );
        return { success: data }
    } catch (error) {
        return { error: error.response.data }        
    }
}

export const APIAddPlayer = async (token, playerName, groupId) => {

    try {
        const { data: { data } } = await api.post(`/players/${groupId}`, { playerName }, { headers: { authorization: `Bearer ${token}` } })
        return { success: data }
    } catch (error) {
        logErrors(error)
        return { error: error.response.data }
    }
}

const handleNetworkError = (error) => {
    return error
}

const logErrors = (err) => console.warn(`Uncaught Error`, err)