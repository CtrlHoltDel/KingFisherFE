import React from "react";
import useTable from "../../hooks/useTable";
import Seat from "./Seat";

const Table = ({ table, closeTable, user, currentlySelectedGroup, selectPlayer }) => {

  const { seats, addPlayer, removePlayer } = useTable(selectPlayer, table.id)

  return (
    <div className="table">
      <div className="table__header">
        <p>Table - {table.id}</p>
        <button onClick={() => closeTable(table.id)}>x</button>
      </div>
      <div className="table__seat-container">
        {seats.map(seat => <Seat key={seat.seatNumber} seat={seat} addPlayer={addPlayer} user={user} removePlayer={removePlayer} currentlySelectedGroup={currentlySelectedGroup} selectPlayer={selectPlayer} />)}
      </div>
    </div>
  );
};

export default Table;
