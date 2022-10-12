import React from "react";
import SearchResults from "../components/SearchResults";
import usePlayers from "../hooks/usePlayers";
import "../style/mobile/mobile.css";

import { AiOutlineHistory } from 'react-icons/ai'
import CurrentPlayer from "../components/CurrentPlayer";

const Players = ({ user, config }) => {

  const { players, searchVisible, loading, search, exactMatch, selectedPlayer, loadingCurrentlySelected,  selectPlayer, handleSearch, cancelSearch } = usePlayers(user)

  return (
    <div className="players">
      <div className="players__content">
        <CurrentPlayer loading={loadingCurrentlySelected} selectedPlayer={selectedPlayer} config={config}/>
        {searchVisible && (
          <div className="search-results-background" onClick={cancelSearch}>
            <SearchResults players={players} loading={loading} exactMatch={exactMatch} currentSearch={search} selectPlayer={selectPlayer} config={config}/>
          </div>
        )}
      </div>
      <div className="players__input-container">
        <div className="controls">
          <input placeholder="Search" value={search} onChange={handleSearch} />
          <button>
            <AiOutlineHistory />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Players;
