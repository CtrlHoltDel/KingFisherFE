import React from "react";
import usePlayers from "../../hooks/usePlayers";

const SearchModal = ({ closeSearch, user, addPlayer, seat, currentlySelectedGroup }) => {
  const {
    players,
    loadingPlayers,
    hasExactMatch,
    playerSearch,
    updateSearch,
    handleAddPlayer
  } = usePlayers(user, currentlySelectedGroup);

  const handleClickAddPlayer = async (seatNumber) => {
    const { addedPlayer } = await handleAddPlayer(true)
    console.log(addedPlayer, "<<")

    addPlayer({ 

    })
    

  }

  /*

  {
      "id": "401931cd-5868-48b7-a6e6-c22a57e3c157",
      "name": "amma dhinema bathayo",
      "type": "fish",
      "created_time": "2022-01-18T10:35:15.903Z",
      "created_by": "ctrlholtdel",
      "note_group_id": "c1e094e3-090b-4c82-95c7-aa51ee663505"
  }

  */

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
            {!hasExactMatch && playerSearch && <p onClick={() => handleClickAddPlayer(seat.seatNumber)}>Add {playerSearch}</p>}
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
