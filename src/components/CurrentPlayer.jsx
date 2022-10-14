import React from "react";
import loadingIcon from "../assets/images/loading.svg";
import { BiMessageSquareAdd } from "react-icons/bi";
import { BsFillArrowDownSquareFill } from "react-icons/bs";

const CurrentPlayer = ({
  selectedPlayer,
  loading,
  config,
  toggleAddingRecord,
  selectRecord, 
  notes,
  tendencies
}) => {
  if (loading)
    return (
      <div className="loading-player">
        <img src={loadingIcon} alt="Loading players icon"></img>
        <p>Loading Player..</p>
      </div>
    );

  if (!selectedPlayer)
    return (
      <div className="no-player-container">
        <div>No Player Selected</div>
        <div className="search-here">
          <p>Search here</p>
          <BsFillArrowDownSquareFill />
        </div>
      </div>
    );

  const { player } = selectedPlayer;

  return (
    <div className="player-info">
      <div className="player-info__header">
        <p className="player-info__header__name">{player.player_name}</p>
        <p className="player-info__header__info">{player.p_created_by}</p>
      </div>
      <div className="player-info__records">
        <div className="player-info__records__list-view">
          <p className="list-header">Notes</p>
          {notes.length ? (
            notes.map((note) => (
              <div className="player-info__list-view__item" key={note.note_id} onClick={() => selectRecord(note)}>
                {note.note}
              </div>
            ))
          ) : (
            <div>No Notes!</div>
          )}
        </div>
        <div className="player-info__records__list-view">
          <p className="list-header">Tendencies</p>
          {tendencies.length ? (
            tendencies.map((tendency) => (
              <div
                className="player-info__list-view__item"
                key={tendency.tendency_id} onClick={() => selectRecord(tendency)}
              >
                {tendency.tendency}
              </div>
            ))
          ) : (
            <div>No Tendencies</div>
          )}
        </div>
      </div>
      <div className="player-info__add">
        <button onClick={toggleAddingRecord}>
          <BiMessageSquareAdd />
        </button>
      </div>
    </div>
  );
};

export default CurrentPlayer;

/*

{
    "player": {
        "player_name": "daddydoody 5o FT",
        "type": "fish",
        "p_created_at": "2022-10-06T02:53:08.054Z",
        "p_created_by": "eardleym",
        "aliases": null
    },
    "notes": [
        {
            "note_id": 3161,
            "player_name": "daddydoody 5o FT",
            "n_created_at": "2022-10-06T21:34:03.425Z",
            "note": "3 way hj vbut+bb has checkpot ranges at 100bb on T83hhx",
            "n_created_by": "eardleym"
        },
        {
            "note_id": 3154,
            "player_name": "daddydoody 5o FT",
            "n_created_at": "2022-10-06T03:08:59.373Z",
            "note": "hj 30bb opens calls 3b J9864 nut nut",
            "n_created_by": "eardleym"
        }
    ],
    "tendencies": [
        {
            "tendency_id": 1497,
            "player_name": "daddydoody 5o FT",
            "tendency": "maybe not fish keep eye on",
            "t_created_at": "2022-10-06T21:41:09.006Z",
            "t_created_by": "eardleym"
        },
        {
            "tendency_id": 1489,
            "player_name": "daddydoody 5o FT",
            "tendency": "fri high",
            "t_created_at": "2022-10-06T03:08:09.889Z",
            "t_created_by": "eardleym"
        }
    ]
}

*/
