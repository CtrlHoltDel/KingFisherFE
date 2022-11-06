import React from "react";
import { useState } from "react";

import { TiCancel } from "react-icons/ti";
import SearchModal from "../common/SearchModal";

const SEARCH_MODAL_CLASS = 'search-modal-container'

const Seat = ({ seat, user, addPlayer, removePlayer }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSearch = () => setSearchOpen(false)

  return (
    <div className="seat">
      {searchOpen && (
        <div className={SEARCH_MODAL_CLASS} onClick={(e) => { 
            if(e.target.classList.contains(SEARCH_MODAL_CLASS)) closeSearch()
        }}>
            <SearchModal closeSearch={closeSearch} user={user} addPlayer={addPlayer} seat={seat}/>
        </div>
      )}
      {seat.id ? (
        <div className="seat__seated-player">
          <p>{seat.name}</p>
          <button onClick={() => removePlayer(seat.seatNumber)}>
            <TiCancel />
          </button>poker svg
        </div>
      ) : (
        <button className="seat__empty-seat" onClick={() => setSearchOpen(true)}>
          Empty Seat - Search Player
        </button>
      )}
    </div>
  );
};

export default Seat;
