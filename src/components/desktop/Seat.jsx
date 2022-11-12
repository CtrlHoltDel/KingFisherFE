import React from "react";
import { useState } from "react";

import { MdOutlineRemoveCircle } from "react-icons/md";
import { setSeatStyle } from "../../utils/typeStyle";
import SearchModal from "../common/SearchModal";

const SEARCH_MODAL_CLASS = 'search-modal-container'

const Seat = ({ seat, user, addPlayer, removePlayer, currentlySelectedGroup, selectPlayer }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSearch = () => setSearchOpen(false)

  const addNewPlayer = (newPlayerName) => {
    console.log(newPlayerName)
  }

  return (
    <div className="seat">
      {searchOpen && (
        <div className={SEARCH_MODAL_CLASS} onClick={(e) => { 
            if(e.target.classList.contains(SEARCH_MODAL_CLASS)) closeSearch()
        }}>
            <SearchModal closeSearch={closeSearch} user={user} addPlayer={addPlayer} seat={seat} currentlySelectedGroup={currentlySelectedGroup} addNewPlayer={addNewPlayer}/>
        </div>
      )}
      {seat.id ? (
        <div className="seat__seated-player" style={setSeatStyle(seat.type)}>
          <p onClick={() => selectPlayer(seat)}>{seat.name}</p>
          <button onClick={() => removePlayer(seat.seatNumber)}>
            <MdOutlineRemoveCircle />
          </button>
        </div>
      ) : (
        <button className="seat__empty-seat" onClick={() => setSearchOpen(true)}>
          {searchOpen ? "Seating Player.." : "Empty - add or search"}
        </button>
      )}
    </div>
  );
};

export default Seat;
