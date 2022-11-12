import React from "react";
import useTables from "../../hooks/useTables";
import Table from "./Table";

import tableIcon from "../../assets/table-icon.svg";
import Notes from "./Notes";
import usePlayer from "../../hooks/usePlayer";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Tables = () => {
  const { user, currentlySelectedGroup } = useContext(UserContext)

  const { tables, addTable, closeTable } = useTables(currentlySelectedGroup);
  const { selectedPlayer, loadingPlayer, selectPlayer, addNoteToPlayer } = usePlayer(user, currentlySelectedGroup)

  if (!currentlySelectedGroup) return <div>No Group Selected</div>;

  return (
    <div className="tables-container">
      <div className="tables">
        {tables.map((table) => (
          <Table
            key={table.id}
            table={table}
            closeTable={closeTable}
            user={user}
            currentlySelectedGroup={currentlySelectedGroup}
            selectPlayer={selectPlayer}
          />
        ))}
        <button className="tables__add-table" onClick={addTable}>
          <img src={tableIcon} alt="new table icon" />
          <p>Add Table</p>
        </button>
      </div>
      {selectedPlayer && (
        <Notes
          selectedPlayer={selectedPlayer}
          addNoteToPlayer={addNoteToPlayer}
          loadingPlayer={loadingPlayer}
        />
      )}
    </div>
  );
};

export default Tables;
