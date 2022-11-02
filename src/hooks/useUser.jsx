import { useEffect, useState } from "react";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const KINGFISHER_USER_COOKIE = "Kingfisher_User_Cookie";
// const KINGFISHER_GROUP_COOKIE = "Kingfisher_Group_Cookie";
// const KINGFISHER_PLAYER_COOKIE = "Kingfisher_Player_Cookie";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [currentlySelectedGroup, setCurrentlySelectedGroup] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // User
  useEffect(() => {

  }, []);

  const handleLogin = (user) => {

    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
    setCurrentlySelectedGroup(null);
    setSelectedPlayer(null);
  };

  // Current Group
  const selectGroup = (group) => {
    resetPlayerState();
    setCurrentlySelectedGroup(group);
  };

  // Current Player
  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const resetPlayerState = () => {
    setSelectedPlayer(null);
  };

  return {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
    selectedPlayer,
    selectPlayer,
  };
};

export default useUser;
