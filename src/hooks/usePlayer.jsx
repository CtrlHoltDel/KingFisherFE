import { useState } from "react";
import { APIAddNote, APIAddPlayer, APIGetNotes, APIUpdateType } from "../api/actions";
import { NOTE_TYPE } from "../utils/constants";
import { formatNotes } from "../utils/dataFormat";
import {
  setButtonStyle,
  setHeaderStyle,
  setSeatStyle,
} from "../utils/typeStyle";

const usePlayer = (user, currentlySelectedGroup, config) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [loadingUpdatingPlayer, setLoadingUpdatingPlayer] = useState(false);
  const [loadingAddingNewPlayer, setLoadingAddingNewPlayer] = useState(false)

  const selectPlayer = async (value) => {
    setLoadingPlayer(true);
    const { success, error } = await APIGetNotes(user.token, value.id);

    if (error) {
      console.log("handle error");
      return;
    }

    setSelectedPlayer({
      ...success,
      ...formatNotes(success.notes),
      styleConfig: setStyles(success.player.type, config),
    });
    
    setLoadingPlayer(false);
  };

  const addNoteToPlayer = async (type, note, playerId) => {
    setLoadingUpdatingPlayer(true);
    setSelectedPlayer((curr) => {
      curr[type === NOTE_TYPE ? "notes" : "tendencies"].push({
        note,
        created_time: new Date().toISOString().slice(0, 19).replace("T", " "),
        created_by: user.username,
        type,
      });
      return curr;
    });

    await APIAddNote(user.token, playerId, { note, type });
    setLoadingUpdatingPlayer(false);
  };

  const updateType = async (newType) => {
    setLoadingUpdatingPlayer(true);
    setSelectedPlayer((player) => ({
      ...player,
      player: { ...player.player, type: newType },
      styleConfig: setStyles(newType, config),
    }));

    await APIUpdateType(
      user.token,
      currentlySelectedGroup.id,
      selectedPlayer.player.id,
      newType
    );
    setLoadingUpdatingPlayer(false);
  };

  const addNewPlayer = async (newPlayerName) => {
    setLoadingAddingNewPlayer(true)
    const APIResponse = await APIAddPlayer(user.token, newPlayerName, currentlySelectedGroup.id)
    setLoadingAddingNewPlayer(false)
    return APIResponse
  }

  const setStyles = (type, config) => {
    return {
      headerStyle: setHeaderStyle(type, config),
      buttonStyle: setButtonStyle(type, config),
      seatStyle: setSeatStyle(type, config),
    };
  }

  return {
    selectedPlayer,
    loadingPlayer,
    selectPlayer,
    addNoteToPlayer,
    updateType,
    addNewPlayer,
    loadingUpdatingPlayer,
    loadingAddingNewPlayer
  };
};

export default usePlayer;
