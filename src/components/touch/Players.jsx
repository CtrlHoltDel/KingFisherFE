import React, { useState } from "react";
import usePlayers from "../../hooks/usePlayers";
import PlayersListView from "../common/PlayersListView";

import { RiChatHistoryLine } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

import { APIGetNotes } from "../../api/actions";
import PlayerInfo from "./PlayerInfo";
import AddNote from "./AddNote";

const MODAL_CONTAINER_CLASS = "touch-modal-container";

const Players = ({
  currentlySelectedGroup,
  user,
  selectedPlayer,
  selectPlayer,
}) => {
  const [search, setSearch] = useState("");
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const {
    players,
    loadingPlayers,
    handleSearch,
    hasExactMatch,
    handleAddPlayer,
  } = usePlayers(user, currentlySelectedGroup);

  if (!currentlySelectedGroup) return <div>No Group Selected</div>;

  const updateSearch = (e) => {
    handleSearch(e.target.value);
    setSearch(e.target.value);
  };

  const handleClickPlayer = async (value) => {
    setLoadingPlayer(true);
    const { success, error } = await APIGetNotes(user.token, value.id);

    if (error) {
      console.log("handle error");
      return;
    }

    selectPlayer({ ...success, ...formatNotes(success.notes) });
    setLoadingPlayer(false);
    handleSearch("");
    setSearch("");
  };

  const formatNotes = (allNotes) => {
    const noteTypes = { notes: [], tendencies: [] };

    allNotes.forEach((note) => {
      if (note.type === "note") noteTypes.notes.push(note);
      if (note.type === "tendency") noteTypes.tendencies.push(note);
    });

    return noteTypes;
  };

  const handleClickModalBackground = (e) => {
    if (e.target.classList.contains(MODAL_CONTAINER_CLASS)) {
      setSearch("");
      handleSearch("");
    }
  };

  const handleAddNote = () => setAddingNote((curr) => !curr);

  return (
    <div className="players">
      <div className="players__body">
        <PlayerInfo
          player={selectedPlayer}
          loading={loadingPlayer}
          currentlySelectedGroup={currentlySelectedGroup}
        />
        {players && (
          <div
            className={MODAL_CONTAINER_CLASS}
            onClick={handleClickModalBackground}
          >
            <PlayersListView
              list={players}
              loading={loadingPlayers}
              exactMatch={hasExactMatch}
              search={search}
              handleClickPlayer={handleClickPlayer}
            />
          </div>
        )}
        {addingNote && (
          <div
            className={MODAL_CONTAINER_CLASS}
            onClick={handleClickModalBackground}
          >
            <AddNote />
          </div>
        )}
      </div>
      <div className="players__footer">
        <input placeholder="search" value={search} onChange={updateSearch} />
        <button className="standard-button">
          <RiChatHistoryLine />
        </button>
        <button onClick={handleAddNote} disabled={!selectedPlayer}>
          {addingNote ? <div className="standard-button-cancel"><ImCancelCircle /></div> : <div className="standard-button"><MdOutlineAddCircle /></div>}
        </button>
      </div>
    </div>
  );
};

export default Players;

/*

[
    {
        "note": "note-contents 1",
        "created_time": "2022-01-18T10:35:15.903Z",
        "created_by": "ctrlholtdel",
        "type": "note"
    },
    {
        "note": "note-contents 2",
        "created_time": "2022-01-18T10:35:15.903Z",
        "created_by": "testuser2",
        "type": "note"
    },
    {
        "note": "note-contents 3",
        "created_time": "2022-01-18T10:35:15.903Z",
        "created_by": "ctrlholtdel",
        "type": "note"
    },
    {
        "note": "tendency-contents 2",
        "created_time": "2022-01-18T10:35:15.903Z",
        "created_by": "ctrlholtdel",
        "type": "tendency"
    }
]

*/
