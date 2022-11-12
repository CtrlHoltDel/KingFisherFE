import React from "react";
import useSearchPlayers from "../../hooks/useSearchPlayers";
import TypeIcon from "./TypeIcon";

const SearchModal = ({
  closeSearch,
  user,
  addPlayer,
  seat,
  currentlySelectedGroup,
}) => {
  const { players, loadingPlayers, hasExactMatch, playerSearch, updateSearch } =
    useSearchPlayers(user, currentlySelectedGroup);

  return (
    <div className="search-modal-container__modal">
      <div className="search-modal-container__modal__results">
        {loadingPlayers && playerSearch ? (
          <div className="search-modal-container__modal__results__loading">Loading..</div>
        ) : (
          <>
            {players &&
              players.map((player) => {
                return (
                  <div
                    key={player.id}
                    className="search-modal-container__modal__results__result"
                    onClick={() => {
                      addPlayer(player, seat.seatNumber);
                      closeSearch();
                    }}
                  >
                    <div className="search-modal-container__modal__results__result__name">
                      {player.name}
                    </div>
                    <div className="search-modal-container__modal__results__result__type">
                      <TypeIcon type={player.type}/>
                    </div>
                  </div>
                );
              })}
            {!hasExactMatch && playerSearch && (
              <div
                className="search-modal-container__modal__results__result"
                onClick={() => console.log("clicked")}
              >
                <p className="search-modal-container__modal__results__result__add-player">Add {playerSearch}</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="search-modal-container__modal__controls">
        <div className="search-modal-container__modal__controls__input">
          <input
            value={playerSearch}
            autoFocus
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search.."
          />
          {/* <button disabled={loadingPlayers || !playerSearch} onClick={closeSearch}>{!playerSearch ? 'Search' : hasExactMatch ? 'Choose' : 'Add'}</button> */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
