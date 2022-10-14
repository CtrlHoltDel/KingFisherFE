import React, { useEffect, useRef } from "react";
import { IoMdAddCircle } from "react-icons/io";
import '../style/searchResults/search-results.css'
import { generateIconType } from "../utils/utils";
import { GiMatchHead } from 'react-icons/gi'
import loadingIcon from '../assets/images/loading.svg'

const SearchResults = ({ searchResults, loading, exactMatch, currentSearch, config, handleClickSearchResult, recentSearch }) => {
    const scrollHelperRef = useRef(null)

    useEffect(() => {
      scrollHelperRef.current?.scrollIntoView({behaviour: 'smooth'})
    }, [])

    
  return (
    <div className="search-results-container">
      {loading ? (
        <div className="search-loading"><img src={loadingIcon} alt="loading-icon" /></div>
      ) : searchResults ? (
        <div>
          {searchResults.map((player) => {
            return (
              <div className="search-result" key={player.player_name} onClick={() => { handleClickSearchResult(player) }}>
                <p className="search-result__name">{player.player_name}</p>
                <div className="search-result__icons">
                {generateIconType(config, player.type)}
                </div>
              </div>
            );
          })}
          {exactMatch && (
            <div className="search-result exact" onClick={() => { handleClickSearchResult(exactMatch) }}>
              <p className="search-result__name">{exactMatch.player_name}</p>
              <div className="search-result__icons">
                <div className="exact-match search-icon">
                    <GiMatchHead />
                </div>
                {generateIconType(config, exactMatch.type)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {(!exactMatch && !recentSearch && !loading) && (
        <button className="add-player-button">
          <IoMdAddCircle />
          <p>Add {currentSearch}</p>
        </button>
      )}
      <div ref={scrollHelperRef}></div>
    </div>
  );
};

export default SearchResults;
