import React from "react";
import { Link } from "react-router-dom";
import usePlayers from "../../hooks/usePlayers";
import PlayersListView from "../common/PlayersListView";

import { RiChatHistoryLine } from 'react-icons/ri'

const Players = ({ currentlySelectedGroup, user }) => {
  const { players, loadingPlayers, handleSearch, handleAddPlayer } = usePlayers(user, currentlySelectedGroup)

  return (
    <div className="players">
      <div className="players__body">
        {players && (
          <div className="touch-modal-container">
            <PlayersListView list={players} loading={loadingPlayers} />
          </div>
        )}
      </div>
      <div className="players__footer">
        <input placeholder="search" onChange={(e) => handleSearch(e.target.value)} />
        <button>
          <RiChatHistoryLine />
        </button>
      </div>
    </div>
  );
};

export default Players;
