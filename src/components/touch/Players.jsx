import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIAddPlayer, APIGetList } from "../../api/actions";
import ListView from "../common/ListView";

const Players = ({ currentlySelectedGroup, user }) => {
  const [players, setPlayers] = useState(null);
  const [addingPlayer, setAddingPlayer] = useState("");

  const handleSearch = async (e) => {
    if (!e.target.value) return setPlayers(null);

    const { success, error } = await APIGetList(
      `players/${currentlySelectedGroup.id}?search=${e.target.value}`,
      user.token
    );

    console.log(success.data.players);
    setPlayers(success.data.players);
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    const { success, error } = await APIAddPlayer(
      user.token,
      addingPlayer,
      currentlySelectedGroup.id
    );

    if (success) console.log(success, "<< Success!");
    if (error) console.log(error, "<< Error");
  };

  return (
    <div className="players">
      <div className="players__header">
        <p>
          {currentlySelectedGroup
            ? currentlySelectedGroup.name
            : "No Group Selected"}
        </p>
        <Link to="/m/groups">Swap Here.</Link>
      </div>
      <div className="players__body">
        {players && (
          <div className="touch-modal-container">
            <ListView list={players} type="players" />
          </div>
        )}
      </div>
      <div className="players__footer">
        <input placeholder="search" onChange={handleSearch} />
      </div>
    </div>
  );
};

export default Players;
