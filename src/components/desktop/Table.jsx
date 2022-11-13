import React from "react";
import useTable from "../../hooks/useTable";
import Seat from "./Seat";

import { VscChromeClose } from 'react-icons/vsc'

const Table = ({ table, closeTable, user, currentlySelectedGroup, selectPlayer, selectedPlayer, addNewPlayer, loadingAddingNewPlayer }) => {

  const { seats, seatPlayer, unseatPlayer } = useTable(selectPlayer, table.id, selectedPlayer)

  return (
    <div className="table">
      <div className="table__header">
        <p></p>
        <button onClick={() => closeTable(table.id)}><VscChromeClose /></button>
      </div>
      <div className="table__seat-container">
        {seats.map(seat => <Seat key={seat.seatNumber} seat={seat} seatPlayer={seatPlayer} user={user} unseatPlayer={unseatPlayer} currentlySelectedGroup={currentlySelectedGroup} selectPlayer={selectPlayer} addNewPlayer={addNewPlayer} loadingAddingNewPlayer={loadingAddingNewPlayer}/>)}
      </div>
    </div>
  );
};

export default Table;
