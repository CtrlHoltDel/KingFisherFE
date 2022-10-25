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
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return { error: error.message }
        handleUncaughtError(error);
    }
}

export const APIHandleRegister = async (username, password) => {
    try {
        await api.post('/auth/register', { username, password })
    } catch (error) {
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return { error: error.message }
        handleUncaughtError(error)
    }

}

export const APIGetList = async (endpoint, token) => {
    try {
        const { data } = await api.get(endpoint, { headers: { authorization: `Bearer ${token}` } })
        return data.data
    } catch (error) {
        if(error.code === BAD_REQUEST) return { error: error.response.data.message }
        if(error.code === ERR_NETWORK) return { error: error.message }
        handleUncaughtError(error);
    }
}

export const APIAddUserToGroup = async (token, groupId, username) => {
    console.log(token, groupId, username)
    try {
        const { data } = await api.post(
            `/groups/handle-request/${groupId}`,
            { params: { username }, body: { action: "Add" } },
            { headers: { authorization: `Bearer ${token}` } }
          );
        console.log(data)
    } catch (error) {
        console.warn(error, "<<")
    }
}

const handleUncaughtError = (err) => console.warn(`Uncaught Error`, err)