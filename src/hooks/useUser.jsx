import { useEffect, useState } from "react";
import { LS } from "../utils/LocalStorage";

const useUser = () => {
  const [user, setUser] = useState();
  const [currentlySelectedGroup, setCurrentlySelectedGroup] = useState(null);

  // User
  useEffect(() => {
    setUser(LS.getUser() || null)
    setCurrentlySelectedGroup(LS.getSelectedGroup() || null)
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
  };

  return {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
  };
};

export default useUser;
