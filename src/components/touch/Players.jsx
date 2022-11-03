import React, { useState } from "react";
import usePlayers from "../../hooks/usePlayers";
import PlayersListView from "../common/PlayersListView";

import { APIGetNotes } from "../../api/actions";
import PlayerInfo from "./PlayerInfo";
import AddNote from "./AddNote";
import PlayersFooter from "./PlayersFooter";
import { formatNotes } from "../../utils/dataFormat";

const MODAL_CONTAINER_CLASS = "touch-modal-container";

const Players = ({
  currentlySelectedGroup,
  user,
  selectedPlayer,
  selectPlayer,
  hideNavBar,
  addNoteToPlayer,
  updateType
}) => {
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const openNoteModal = () => {
    setNoteModalOpen(true)
    hideNavBar(true)
  };
  const closeNoteModal = () => {
    setNoteModalOpen(false)
    hideNavBar(false)
  };

  const {
    players,
    loadingPlayers,
    hasExactMatch,
    handleAddPlayer,
    playerSearch,
    updateSearch
  } = usePlayers(user, currentlySelectedGroup, selectPlayer);

  if (!currentlySelectedGroup) return <div>No Group Selected</div>;

  const handleClickPlayer = async (value) => {
    setLoadingPlayer(true);
    const { success, error } = await APIGetNotes(user.token, value.id);

    if (error) {
      console.log("handle error");
      return;
    }

    selectPlayer({ ...success, ...formatNotes(success.notes) });
    updateSearch("")
    setLoadingPlayer(false);
  };

  const handleAddNote = (note, type) => {
    addNoteToPlayer(type, note, selectedPlayer.player.id)
    closeNoteModal()
  }

  return (
    <div className="players">
      <div className="players__body">
        <PlayerInfo
          player={selectedPlayer}
          loading={loadingPlayer}
          currentlySelectedGroup={currentlySelectedGroup}
          updateType={updateType}
        />
        {players && (
          <div className={MODAL_CONTAINER_CLASS}>
            <PlayersListView
              list={players}
              loading={loadingPlayers}
              exactMatch={hasExactMatch}
              search={playerSearch}
              handleClickPlayer={handleClickPlayer}
              handleAddPlayer={handleAddPlayer}
            />
          </div>
        )}
        {noteModalOpen && (
          <div className={MODAL_CONTAINER_CLASS}>
            <AddNote closeNoteModal={closeNoteModal} handleAddNote={handleAddNote}/>
          </div>
        )}
      </div>
      <PlayersFooter
        updateSearch={updateSearch}
        openNoteModal={openNoteModal}
        closeNoteModal={closeNoteModal}
        noteModalOpen={noteModalOpen}
        playerSearch={playerSearch}
        selectedPlayer={selectedPlayer}
      />
    </div>
  );
};

export default Players;
