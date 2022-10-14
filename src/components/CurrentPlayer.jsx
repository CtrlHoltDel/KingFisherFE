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
        <p>Loading selectedPlayer..</p>
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

  return (
    <div className="player-info">
      <div className="player-info__header">
        <p className="player-info__header__name">{selectedPlayer.player_name}</p>
        <p className="player-info__header__info">{selectedPlayer.p_created_by}</p>
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
