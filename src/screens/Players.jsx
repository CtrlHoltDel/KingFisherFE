import React, { useEffect, useState } from "react";
import { DAC } from "../api/DataAccess";
import { IoMdAddCircle } from 'react-icons/io'
import "../style/mobile/mobile.css";

const Players = ({ user }) => {
  const [players, setPlayers] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [exactMatch, setExactMatch] = useState(null)

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setSearchVisible(false);
      setPlayers(null);
      return;
    }

    setLoading(true);
    setSearchVisible(true);
    const { count, exactMatch, players } = await DAC.getPlayers(user.token, e.target.value);
    console.log(count)
    setExactMatch(exactMatch)
    setLoading(false);
    setPlayers(!players.length ? null : players);
  };

  const cancelSearch = (e) => {
    if(e.target.classList.contains('search-results-background')){
        setPlayers(null);
        setSearchVisible(false);
        setSearch("")
    }
  };

  return (
    <div className="body-container players">
      <div className="content">
        {searchVisible && (
          <div className="search-results-background" onClick={cancelSearch}>
            <div className="search-results-container">
              {loading ? (
                <div className="search-loading">loading</div>
              ) : players ? (
                <div>
                    {exactMatch && 
                        <div className="search-result">
                            <p className="search-result__name">
                                {exactMatch.player_name}
                            </p>
                        <div className="search-result__type">{exactMatch.type}</div>
                      </div>
                    }
                  {players.map((player) => {
                    return (
                      <div className="search-result">
                        <p className="search-result__name">
                          {player.player_name}
                        </p>
                        <div className="search-result__type">{player.type}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
              {!exactMatch && 
                  <button class="add-player-button"><IoMdAddCircle /><p>Add {search}</p></button>
              }
            </div>
          </div>
        )}
      </div>
      <div class="input-container">
        <input placeholder="Search" value={search} onChange={handleSearch} />
      </div>
    </div>
  );
};

export default Players;
