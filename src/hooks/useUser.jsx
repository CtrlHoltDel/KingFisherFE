import { useEffect, useState } from "react";
import { APIAddNote, APIUpdateType } from "../api/actions";
import { NOTE_TYPE } from "../utils/constants";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const KINGFISHER_USER_COOKIE = "Kingfisher_User_Cookie";
// const KINGFISHER_GROUP_COOKIE = "Kingfisher_Group_Cookie";
// const KINGFISHER_PLAYER_COOKIE = "Kingfisher_Player_Cookie";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [currentlySelectedGroup, setCurrentlySelectedGroup] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [generalLoading, setGeneralLoading] = useState(false)

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

  const addNoteToPlayer = async (type, note, playerId) => {
    setSelectedPlayer(curr => {
      curr[type === NOTE_TYPE ? 'notes' : 'tendencies'].push({ note, created_time: new Date().toISOString().slice(0, 19).replace('T', ' '), created_by: user.username, type })
      return curr;
    })

    setGeneralLoading(true)
    await APIAddNote(user.token, playerId, { note, type })
    setGeneralLoading(false)
  }

  const updateType = async (newType) => {
    let playerId;
    setSelectedPlayer(curr => {
      playerId = curr.player.id
      return { ...curr, player: { ...curr.player, type: newType }}
    })

    setGeneralLoading(true)
    await APIUpdateType(user.token, currentlySelectedGroup.id, playerId ,newType)
    setGeneralLoading(false)

  }

  return {
    user,
    handleLogin,
    logoutUser,
    selectGroup,
    currentlySelectedGroup,
    selectedPlayer,
    selectPlayer,
    addNoteToPlayer,
    generalLoading,
    updateType
  };
};

export default useUser;
