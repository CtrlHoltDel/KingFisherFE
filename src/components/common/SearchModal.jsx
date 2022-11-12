import React from "react";
import useSearchPlayers from "../../hooks/useSearchPlayers";

const SearchModal = ({ closeSearch, user, addPlayer, seat, currentlySelectedGroup }) => {
  const {
    players,
    loadingPlayers,
    hasExactMatch,
    playerSearch,
    updateSearch,
  } = useSearchPlayers(user, currentlySelectedGroup);

  return (
    <div className="search-modal-container__modal">
      <div className="search-modal-container__modal__results">
        {(loadingPlayers && playerSearch) ? (
          <div>Loading</div>
        ) : (
          <>
            {players &&
              players.map((player) => {
                return (
                  <div
                    key={player.id}
                    className="search-modal-container__modal__results__result"
                    onClick={() => {
                      console.log(player, seat.seatNumber)
                        addPlayer(player, seat.seatNumber)
                        closeSearch()
                    }}
                  >
                    <p className="search-modal-container__modal__results__result__name">
                      {player.name}
                    </p>
                    <p className="search-modal-container__modal__results__result__type">
                      {player.type}
                    </p>
                  </div>
                );
              })}
            {!hasExactMatch && playerSearch && <p onClick={() => console.log("clicked")}>Add {playerSearch}</p>}
          </>
        )}
      </div>
      <div className="search-modal-container__modal__controls">
        <input
          value={playerSearch}
          autoFocus
          onChange={(e) => updateSearch(e.target.value)}
        />
        <button onClick={closeSearch}>Close</button>
      </div>
    </div>
  );
};

export default SearchModal;
