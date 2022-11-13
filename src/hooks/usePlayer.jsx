import { useState } from "react";
import { APIAddNote, APIAddPlayer, APIGetNotes, APIUpdateType } from "../api/actions";
import { NOTE_TYPE } from "../utils/constants";
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
      styleConfig: setStyles(success.player.type, config),
    });
    
    setLoadingPlayer(false);
  };

  const addNoteToPlayer = async (type, note, playerId) => {
    setLoadingUpdatingPlayer(true);
    const { success, error } = await APIAddNote(user.token, playerId, { note, type });

    if(error){
      console.log(error)
    } else {
      setSelectedPlayer((curr) => {
        curr[type === NOTE_TYPE ? "notes" : "tendencies"].push({
          created_time: new Date().toISOString().slice(0, 19).replace("T", " "),
          ...success.addedNote
        });
        return curr;
      });

    }


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

  const removeNoteFromPlayer = (noteId) => {
    setSelectedPlayer(player => ({ ...player, notes: player.notes.filter(note => note.id !== noteId), tendencies: player.tendencies.filter(tendency => tendency.id !== noteId)}))
  }

  return {
    selectedPlayer,
    loadingPlayer,
    selectPlayer,
    addNoteToPlayer,
    updateType,
    addNewPlayer,
    loadingUpdatingPlayer,
    loadingAddingNewPlayer,
    removeNoteFromPlayer
  };
};

export default usePlayer;
