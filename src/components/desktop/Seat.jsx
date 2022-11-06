import React, { useState } from "react";

import { TiCancel } from 'react-icons/ti'

const EMPTY_SEAT =  {
    playerName: null,
    playerId: null,
}

const Seat = ({ seatNumber, player, openAddingPlayer, removePlayer }) => {
  const [seatedPlayer, setSeatedPlayer] = useState(player || EMPTY_SEAT);

  return (
    <div className="seat">
      {seatedPlayer.playerId ? (
        <div className="seat__seated-player">
            <p>{seatedPlayer.playerName}</p>
            <button><TiCancel/></button>
        </div>
      ) : (
        <button onClick={() => {
            openAddingPlayer(seatNumber)}}>Empty Seat - Search Player</button>
      )}
    </div>
  );
};

export default Seat;
