import { useState } from "react"

const useUser = () => {
    const [user, setUser] = useState(null)

    const handleLogin = async (user) => setUser(user);

    const logoutUser = () => setUser(null)

    return { user, handleLogin, logoutUser }

}

export default useUser