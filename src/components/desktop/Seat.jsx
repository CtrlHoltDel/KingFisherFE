import React from "react";
import { useContext } from "react";
import { useState } from "react";

import { UserContext } from "../../context/UserContext"

import { MdOutlineRemoveCircle } from "react-icons/md";
import { setSeatStyle } from "../../utils/typeStyle";
import SearchModal from "../common/SearchModal";
import { APIAddPlayer } from "../../api/actions";

const SEARCH_MODAL_CLASS = 'search-modal-container'

const Seat = ({ seat, user, seatPlayer, unseatPlayer, currentlySelectedGroup, selectPlayer, addNewPlayer, loadingAddingNewPlayer }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const { config } = useContext(UserContext)

  const closeSearch = () => setSearchOpen(false)

  const handleAddNewPlayer = async (newPlayerName, seat) => {
    const { error, success } = await addNewPlayer(newPlayerName, seat)
    if(error){
      console.log({ error }, "Handle This Error");
    } else {
      seatPlayer({ ...success.addedPlayer, note_group_id: currentlySelectedGroup.id, type: null }, seat.seatNumber)
    }
    setSearchOpen(false)
  }

  const handleSeatPlayer = (player, seatNumber) => {
    seatPlayer(player, seatNumber);
    closeSearch();
  }

  return (
    <div className="seat">
      {searchOpen && (
        <div className={SEARCH_MODAL_CLASS} onClick={(e) => { 
            if(e.target.classList.contains(SEARCH_MODAL_CLASS)) closeSearch()
        }}>
            <SearchModal closeSearch={closeSearch} user={user} seatPlayer={seatPlayer} seat={seat} currentlySelectedGroup={currentlySelectedGroup} handleAddNewPlayer={handleAddNewPlayer} loadingAddingNewPlayer={loadingAddingNewPlayer} handleSeatPlayer={handleSeatPlayer}/>
        </div>
      )}
      {seat.id ? (
        <div className="seat__seated-player" style={setSeatStyle(seat.type, config)}>
          <p onClick={() => selectPlayer(seat)}>{seat.name}</p>
          <button onClick={() => unseatPlayer(seat.seatNumber)}>
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
