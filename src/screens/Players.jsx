import React, { useState } from "react";
import SearchResults from "../components/SearchResults";
import "../style/mobile/mobile.css";

import { AiOutlineHistory } from "react-icons/ai";
import CurrentPlayer from "../components/CurrentPlayer";
import useSearch from "../hooks/useSearch";

const Players = ({
  user,
  config,
  loadingCurrentlySelected,
  selectedPlayer,
  notes,
  tendencies,
  updateSelectedPlayer,
  recentSearches,
}) => {
  const [recentSearchesOpen, setRecentSearchesOpen] = useState(false);
  const closeRecentSearches = () => setRecentSearchesOpen(false);

  const {
    currentSearchText,
    playersSearchResults,
    playerSearchLoading,
    exactMatch,
    updateCurrentSearchText,
    clearSearches,
  } = useSearch(user);

  return (
    <div className="players">
      <div className="players__content">
        <CurrentPlayer
          loading={loadingCurrentlySelected}
          selectedPlayer={selectedPlayer}
          config={config}
          notes={notes}
          tendencies={tendencies}
        />
        {(!!playersSearchResults.length || !!currentSearchText)&& (
          <div className="mobile-modal" onClick={clearSearches}>
            <SearchResults
              searchResults={playersSearchResults}
              loading={playerSearchLoading}
              exactMatch={exactMatch}
              currentSearch={currentSearchText}
              config={config}
              handleClickSearchResult={updateSelectedPlayer}
            />
          </div>
        )}
        {recentSearchesOpen && (
          <div className="mobile-modal" onClick={closeRecentSearches}>
            <SearchResults
              searchResults={recentSearches}
              config={config}
              recentSearch={true}
              handleClickSearchResult={updateSelectedPlayer}
            />
          </div>
        )}
        {/* Adding Record Modal */}
        {/* {mobileNoteModalOpen && (
          <div className="mobile-modal" onClick={closeAddRecordModal}>
            <UpdateNoteModal
              selectedRecord={selectedRecord}
              toggleAddingRecord={toggleAddingRecord}
              addNewNote={addNewNote}
              updateNote={updateNote}
            />
          </div>
        )} */}
      </div>
      <div className="players__input-container">
        <div className="controls">
          <input
            placeholder="Search"
            value={currentSearchText}
            onChange={updateCurrentSearchText}
            onFocus={() => setRecentSearchesOpen(false)}
          />
          <button
            disabled={!recentSearches.length}
            onClick={() => {
              clearSearches();
              setRecentSearchesOpen((curr) => !curr);
            }}
          >
            <AiOutlineHistory />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Players;
