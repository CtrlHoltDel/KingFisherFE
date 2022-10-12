import { useEffect, useState } from "react";
import { LS } from "../localStorage/local-storage";

const useUser = () => {

    const [user, setUser] = useState()
    const [config, setConfig] = useState({
      types: {
        fish: { color: "green" },
        whale: { color: "purple" },
        reg: { color: "red"},
        nit: { color: "" },
        known: { color: "" }
      }
    })

    useEffect(() => {
      const LSuser = LS.getUser()
      const LSconfig = LS.getConfig()

      if(LSuser) setUser(LSuser)
      if(LSconfig) setConfig(LSconfig)

    }, [])

    const login = (user) => setUser(user)
    const logout = () => setUser(null)

    return { user, logout, login, config }

}

export default useUser