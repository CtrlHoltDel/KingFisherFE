import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePlayers from "../../hooks/usePlayers";
import PlayersListView from "../common/PlayersListView";

import { RiChatHistoryLine } from 'react-icons/ri'

const Players = ({ currentlySelectedGroup, user }) => {
  const [search, setSearch] = useState('')
  
  const { players, loadingPlayers, handleSearch, hasExactMatch, handleAddPlayer } = usePlayers(user, currentlySelectedGroup)

  const updateSearch = (e) => {
    handleSearch(e.target.value)
    setSearch(e.target.value)
  } 

  return (
    <div className="players">
      <div className="players__body">
        {players && (
          <div className="touch-modal-container">
            <PlayersListView list={players} loading={loadingPlayers} exactMatch={hasExactMatch} search={search}/>
          </div>
        )}
      </div>
      <div className="players__footer">
        <input placeholder="search" value={search} onChange={updateSearch} />
        <button>
          <RiChatHistoryLine />
        </button>
      </div>
    </div>
  );
};

export default Players;
