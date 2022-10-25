import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIGetList } from "../../api/actions";

const Players = ({ currentlySelectedGroup, user }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { success, error } = await APIGetList(
        `/players/${currentlySelectedGroup.id}`,
        user.token
      );

      // TODO: Error handling here
      console.log(success);
      setPlayers(success.data.players)
    };

    fetchPlayers();
  }, [user.token, currentlySelectedGroup.id]);

  return (
    <div>
      <p>
        {currentlySelectedGroup
          ? currentlySelectedGroup.name
          : "No Group Selected"}
      </p>
      <Link to="/m/groups">Swap Here.</Link>
      {players.length ? players.map((player) => {

        return <div>{player.name}</div>

      }) : "No Players In Group"}
    </div>
  );
};

export default Players;
