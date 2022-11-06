import React from "react";
import useTables from "../../hooks/useTables";
import Table from "./Table";

import { TbBrandAirtable } from "react-icons/tb";

const Tables = () => {
  const { tables, addTable, closeTable } = useTables();

  return (
    <div className="tables">
      {tables.map((table) => (
        <Table key={table.id} table={table} closeTable={closeTable} />
      ))}
      <button className="tables__add-table" onClick={addTable}>
        <TbBrandAirtable />
        <p>Add Table</p>
      </button>
    </div>
  );
};

export default Tables;
