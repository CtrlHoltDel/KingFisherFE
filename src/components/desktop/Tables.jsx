import React from "react";
import useTables from "../../hooks/useTables";
import Table from "./Table";

import tableIcon from '../../assets/table-icon.svg'

const Tables = ({ user, currentlySelectedGroup, handleClickPlayer }) => {
  const { tables, addTable, closeTable, addPlayerToTablesWithPlayers, removePlayerFromTablesWithPlayers } = useTables(currentlySelectedGroup);

  if(!currentlySelectedGroup) return <div>No Group Selected</div>

  return (
    <div className="tables">
      {tables.map((table) => (
        <Table key={table.id} table={table} closeTable={closeTable} user={user} currentlySelectedGroup={currentlySelectedGroup} handleClickPlayer={handleClickPlayer} addPlayerToTablesWithPlayers={addPlayerToTablesWithPlayers} removePlayerFromTablesWithPlayers={removePlayerFromTablesWithPlayers}/>
      ))}
      <button className="tables__add-table" onClick={addTable}>
        <img src={tableIcon} alt="new table icon"/>
        <p>Add Table</p>
      </button>
    </div>
  );
};

export default Tables;
