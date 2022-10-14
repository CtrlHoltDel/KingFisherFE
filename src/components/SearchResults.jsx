import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { GiSpermWhale, GiMatchHead } from 'react-icons/gi'
import { FaFish } from 'react-icons/fa'

const SearchResults = ({ players, loading, exactMatch, currentSearch, config, selectPlayer, recentSearch }) => {
    const generateIconType = (type) => {
        if(type === 'whale')return <div className="search-icon" style={{ "color": config.types.whale }}><GiSpermWhale /></div>
        if(type === 'fish') return <div className="search-icon" style={{ "color": config.types.fish }}><FaFish /></div>
        if(type === 'reg') return <div className="search-icon" style={{ "color": config.types.reg }}><GiSpermWhale /></div>
    }

  return (
    <div className="search-results-container">
      {loading ? (
        <div className="search-loading">loading</div>
      ) : players ? (
        <div>
          {players.map((player) => {
            return (
              <div className="search-result" key={player.player_name} onClick={() => { selectPlayer(player, recentSearch) }}>
                <p className="search-result__name">{player.player_name}</p>
                <div className="search-result__icons">
                {generateIconType(player.type)}
                </div>
              </div>
            );
          })}
          {exactMatch && (
            <div className="search-result exact" onClick={() => { selectPlayer(exactMatch, recentSearch) }}>
              <p className="search-result__name">{exactMatch.player_name}</p>
              <div className="search-result__icons">
                <div className="exact-match search-icon">
                    <GiMatchHead />
                </div>
                {generateIconType(exactMatch.type)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {(!exactMatch && !recentSearch) && (
        <button className="add-player-button">
          <IoMdAddCircle />
          <p>Add {currentSearch}</p>
        </button>
      )}
    </div>
  );
};

export default SearchResults;
