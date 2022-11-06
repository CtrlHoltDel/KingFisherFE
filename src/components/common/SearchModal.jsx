import React from "react";
import usePlayers from "../../hooks/usePlayers";

const SearchModal = ({ closeSearch, user, addPlayer, seat }) => {
  const {
    players,
    loadingPlayers,
    hasExactMatch,
    playerSearch,
    updateSearch,
  } = usePlayers(user, { id: "c1e094e3-090b-4c82-95c7-aa51ee663505" });


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
            {!hasExactMatch && playerSearch && <p>Add {playerSearch}</p>}
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
