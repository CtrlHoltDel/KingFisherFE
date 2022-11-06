import React from "react";
import { useState } from "react";
import useTable from "../../hooks/useTable";
import Seat from "./Seat";

const Table = ({ table, closeTable }) => {

  return (
    <div className="table">
      <div className="table__header">
        <p>Table - {table.id}</p>
        <button onClick={() => closeTable(table.id)}>x</button>
      </div>
      <div className="table__seat-container">
      </div>
    </div>
  );
};

export default Table;
