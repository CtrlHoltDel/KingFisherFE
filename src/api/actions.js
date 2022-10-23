import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000",
});

export const APIhandleLogin = async (username, password) => {

    try {
        const { data } = await api.post('/auth/login', {username, password})
        return { user: data.data }

    } catch ({ response }) {
        const { data } = response
        return { error: data.message }
    }

}

export const APIGetList = async (endpoint, token) => {
    try {
        const { data } = await api.get(endpoint, { headers: { authorization: `Bearer ${token}` }, })
        return data.data
    } catch (error) {
        console.log(error);
    }
}