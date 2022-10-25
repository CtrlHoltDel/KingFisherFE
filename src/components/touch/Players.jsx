import React from "react";
import { Link } from "react-router-dom";

const Players = ({ currentlySelectedGroup }) => {
  return (
    <div>
      <p>{currentlySelectedGroup ? currentlySelectedGroup.name : "No Group Selected"}</p>
      <Link to="/m/groups">Swap Here.</Link>
    </div>
  );
};

export default Players;
