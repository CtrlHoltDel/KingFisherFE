import React from "react";
import useTables from "../../hooks/useTables";
import Table from "./Table";

import { TbBrandAirtable } from "react-icons/tb";
import tableIcon from '../../assets/table-icon.svg'

const Tables = ({ user }) => {
  const { tables, addTable, closeTable } = useTables();

  return (
    <div className="tables">
      {tables.map((table) => (
        <Table key={table.id} table={table} closeTable={closeTable} user={user}/>
      ))}
      <button className="tables__add-table" onClick={addTable}>
        <img src={tableIcon} alt="new table icon"/>
        <p>Add Table</p>
      </button>
    </div>
  );
};

export default Tables;
