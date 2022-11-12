import React from "react";
import useTables from "../../hooks/useTables";
import Table from "./Table";

import tableIcon from '../../assets/table-icon.svg'
import { useState } from "react";
import { APIGetNotes } from "../../api/actions";
import { formatNotes } from "../../utils/dataFormat";
import Notes from "./Notes";

const Tables = ({ user, currentlySelectedGroup, selectPlayer, selectedPlayer, addNoteToPlayer }) => {
  const { tables, addTable, closeTable } = useTables(currentlySelectedGroup);

  const [loadingPlayer, setLoadingPlayer] = useState(false);

  const handleClickPlayer = async (value) => {
    setLoadingPlayer(true);
    const { success, error } = await APIGetNotes(user.token, value.id);

    if (error) {
      console.log("handle error");
      return;
    }

    selectPlayer({ ...success, ...formatNotes(success.notes) });
    setLoadingPlayer(false);
  };


  if(!currentlySelectedGroup) return <div>No Group Selected</div>

  return (
    <div>

    <div className="tables">
      {tables.map((table) => (
        <Table key={table.id} table={table} closeTable={closeTable} user={user} currentlySelectedGroup={currentlySelectedGroup} handleClickPlayer={handleClickPlayer}/>
        ))}
      <button className="tables__add-table" onClick={addTable}>
        <img src={tableIcon} alt="new table icon"/>
        <p>Add Table</p>
      </button>
    </div>
        {selectedPlayer && (
          <Notes selectedPlayer={selectedPlayer} loadingPlayer={loadingPlayer} addNoteToPlayer={addNoteToPlayer}/>
          )}
          </div>
  );
};

export default Tables;
