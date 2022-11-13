import React from "react";
import useSearchPlayers from "../../hooks/useSearchPlayers";
import TypeIcon from "./TypeIcon";

const SearchModal = ({
  user,
  seatPlayer,
  seat,
  currentlySelectedGroup,
  handleAddNewPlayer,
  loadingAddingNewPlayer,
  handleSeatPlayer,
}) => {
  const { players, loadingPlayers, hasExactMatch, playerSearch, updateSearch } =
    useSearchPlayers(user, currentlySelectedGroup);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasExactMatch) 
      return handleSeatPlayer(
        players.find((player) => player.exactMatch),
        seat.seatNumber
      );
    handleAddNewPlayer(playerSearch, seat.seatNumber);
  };

  return (
    <div className="search-modal-container__modal">
      <div className="search-modal-container__modal__results">
        {loadingAddingNewPlayer ? (
          <div className="search-modal-container__modal__results__adding-player">
            Adding {playerSearch}
          </div>
        ) : loadingPlayers && playerSearch ? (
          <div className="search-modal-container__modal__results__loading">
            Loading..
          </div>
        ) : (
          <>
            {players &&
              players.map((player) => {
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
            {!hasExactMatch && playerSearch && (
              <div
                className="search-modal-container__modal__results__result"
                onClick={() => handleAddNewPlayer(playerSearch, seat)}
              >
                <p className="search-modal-container__modal__results__result__add-player">
                  Add {playerSearch}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="search-modal-container__modal__controls">
        <form
          className="search-modal-container__modal__controls__input"
          onSubmit={handleSubmit}
        >
          <input
            value={playerSearch}
            autoFocus
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search.."
            disabled={loadingAddingNewPlayer}
          />
          <button disabled={loadingPlayers || !playerSearch}>
            {!playerSearch ? "Search" : hasExactMatch ? "Choose" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
