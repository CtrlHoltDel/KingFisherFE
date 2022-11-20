import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import { PLAYER_SEARCH_TYPE } from "../../utils/constants";
import TypeIcon from "./TypeIcon";

import loadingIcon from "../../assets/loading-white.svg";

const SearchModal = ({
  user,
  seat,
  currentlySelectedGroup,
  handleAddNewPlayer,
  loadingAddingNewPlayer,
  handleSeatPlayer,
}) => {
  const {
    searchInput,
    updateSearch: updateSearchTest,
    searchResults,
    searchLoading,
  } = useSearch(user.token, PLAYER_SEARCH_TYPE, currentlySelectedGroup.id);

  const [players, setPlayers] = useState([]);
  const [exactMatch, setExactMatch] = useState(null);

  useEffect(() => {
    if (!searchResults.players) return;

    setExactMatch(
      searchResults.players.length ? searchResults.players[0].exactMatch : false
    );
    setPlayers(searchResults.players.reverse());
  }, [searchResults.players]);

  useEffect(() => {
    if (!searchInput) setPlayers([]);
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (exactMatch)
      return handleSeatPlayer(
        players.find((player) => player.exactMatch),
        seat.seatNumber
      );
    handleAddNewPlayer(searchInput, seat.seatNumber);
  };

  return (
    <div className="search-modal-container__modal">
      <div className="search-modal-container__modal__results">
        {players && !loadingAddingNewPlayer && (
          <>
            {players.map((player) => {
              return (
                <div
                  key={player.id}
                  className="search-modal-container__modal__results__result"
                  onClick={() => {
                    handleSeatPlayer(player, seat.seatNumber);
                  }}
                >
                  <div className="search-modal-container__modal__results__result__name">
                    {player.name}
                  </div>
                  <div className="search-modal-container__modal__results__result__type">
                    <TypeIcon type={player.type} />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="search-modal-container__modal__controls">
        <form
          className="search-modal-container__modal__controls__input"
          onSubmit={handleSubmit}
        >
          <input
            value={searchInput}
            autoFocus
            onChange={updateSearchTest}
            placeholder={`Search.....${currentlySelectedGroup.name} group`}
          />
          <button
            disabled={searchLoading || !searchInput || loadingAddingNewPlayer}
          >
            {!searchInput && !searchLoading && !loadingAddingNewPlayer ? (
              <p>Search</p>
            ) : (searchLoading || loadingAddingNewPlayer) ? (
              <img src={loadingIcon} alt="loading"></img>
            ) : exactMatch ? (
              <p>Seat</p>
            ) : (
              <p>Add</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
