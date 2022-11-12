import { useEffect, useState } from "react";
import { DEFAULT_CONFIG } from "../utils/constants";
import { LS } from "../utils/LocalStorage";

const useUser = () => {
  const [user, setUser] = useState();
  const [currentlySelectedGroup, setCurrentlySelectedGroup] = useState(null);
  const [config, setConfig] = useState()

  // User
  useEffect(() => {
    setUser(LS.getUser() || null)
    setCurrentlySelectedGroup(LS.getSelectedGroup() || null)
    setConfig(DEFAULT_CONFIG)
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    LS.storeUser(user)
  };

  const logoutUser = () => {
    setUser(null);
    setCurrentlySelectedGroup(null);
    LS.logout()
  };

  const selectGroup = (group) => {
    LS.setSelectedGroup(group)
    setCurrentlySelectedGroup(group);
    setConfig(config => config)
  };

  return {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
    config
  };
};

export default useUser;
