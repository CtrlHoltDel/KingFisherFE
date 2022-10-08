import { useEffect, useState } from "react";
import { LS } from "../localStorage/local-storage";

const useUser = () => {

    const [user, setUser] = useState()

    useEffect(() => {
      const user = LS.getUser()
      // TODO: Check if user is still validated when logging in. Currently will be kicked out if query is made.
      if(user) setUser(user)
    }, [])

    const login = (user) => setUser(user)
    const logout = () => setUser(null)

    return { user, logout, login }

}

export default useUser