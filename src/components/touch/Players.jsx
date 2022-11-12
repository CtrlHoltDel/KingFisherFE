import React, { useState } from "react";
import useSearchPlayers from "../../hooks/useSearchPlayers";
import PlayersListView from "../common/PlayersListView";

import PlayerInfo from "./PlayerInfo";
import AddNote from "./AddNote";
import PlayersFooter from "./PlayersFooter";
import usePlayer from "../../hooks/usePlayer";

const MODAL_CONTAINER_CLASS = "touch-modal-container";

const Players = ({
  currentlySelectedGroup,
  user,
  hideNavBar,
}) => {
  const { selectedPlayer, loadingPlayer, selectPlayer, addNoteToPlayer, updateType, loadingUpdatingPlayer } = usePlayer(user, currentlySelectedGroup)
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
  } = useSearchPlayers(user, currentlySelectedGroup, selectPlayer);


  const handleAddNote = (note, type) => {
    addNoteToPlayer(type, note, selectedPlayer.player.id)
    closeNoteModal()
  }

  if (!currentlySelectedGroup) return <div className="no-group-selected"><p>No Group Selected</p></div>;

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
              selectPlayer={selectPlayer}
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
