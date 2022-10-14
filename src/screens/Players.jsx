import React, { useState } from "react";
import SearchResults from "../components/SearchResults";
import usePlayers from "../hooks/usePlayers";
import "../style/mobile/mobile.css";

import { AiOutlineHistory } from "react-icons/ai";
import CurrentPlayer from "../components/CurrentPlayer";
import MobileNoteModal from "../components/MobileNoteModal";

const Players = ({ user, config }) => {

  const [recentSearchesOpen, setRecentSearchesOpen] = useState(false)
  
  const {
    players,
    searchVisible,
    loading,
    search,
    exactMatch,
    selectedPlayer,
    loadingCurrentlySelected,
    notes,
    tendencies,
    recentSearches,
    selectPlayer,
    handleSearch,
    cancelSearch,
    addNewNote,
    updateNote
  } = usePlayers(user, setRecentSearchesOpen);

  const [mobileNoteModalOpen, setMobileNoteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const selectRecord = (record) => {
    setSelectedRecord(record);
    setMobileNoteModalOpen(true);
  };

  const toggleAddingRecord = () => setMobileNoteModalOpen((curr) => !curr);
  const closeAddRecordModal = (e) => {
    if (e.target.classList.contains("mobile-modal")) {
      setMobileNoteModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const loadRecentSearches = () => setRecentSearchesOpen(true)
  const closeRecentSearches = (e) => { 
    if(e.target.classList.contains("mobile-modal")) setRecentSearchesOpen(false)
  }

  return (
    <div className="players">
      <div className="players__content">
        <CurrentPlayer
          loading={loadingCurrentlySelected}
          selectedPlayer={selectedPlayer}
          config={config}
          toggleAddingRecord={toggleAddingRecord}
          selectRecord={selectRecord}
          notes={notes}
          tendencies={tendencies}
        />
        {/* Search Modal */}
        {searchVisible && (
          <div className="mobile-modal" onClick={cancelSearch}>
            <SearchResults
              players={players}
              loading={loading}
              exactMatch={exactMatch}
              currentSearch={search}
              selectPlayer={selectPlayer}
              config={config}
            />
          </div>
        )}
        {recentSearchesOpen && (
          <div className="mobile-modal" onClick={closeRecentSearches}>
            <SearchResults
              players={recentSearches}
              selectPlayer={selectPlayer}
              config={config}
              recentSearch={true}
            />
          </div>
        )}
        {/* Adding Record Modal */}
        {mobileNoteModalOpen && (
          <div className="mobile-modal" onClick={closeAddRecordModal}>
            <MobileNoteModal
              selectedRecord={selectedRecord}
              toggleAddingRecord={toggleAddingRecord}
              addNewNote={addNewNote}
              updateNote={updateNote}
            />
          </div>
        )}
      </div>
      <div className="players__input-container">
        <div className="controls">
          <input placeholder="Search" value={search} onChange={handleSearch} />
          <button style={{ opacity: !recentSearches.length ? "40%" : "100%" }}>
            <AiOutlineHistory onClick={loadRecentSearches}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Players;
