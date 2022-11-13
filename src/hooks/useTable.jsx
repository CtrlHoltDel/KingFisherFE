import { useState } from "react";
import { useEffect } from "react";
import { LS } from "../utils/LocalStorage";

const EMPTY_SEAT = {
  name: null,
  id: null,
  type: null,
};

export const SEATED_PLAYERS_PREFIX = "SEATED_PLAYERS";

const generateSeats = () => {
  const playersPlaceholder = [];
  for (let i = 1; i <= 9; i++) {
    playersPlaceholder.push({ ...EMPTY_SEAT, seatNumber: i });
  }
  return playersPlaceholder;
};

const useTable = (handleClickPlayer, tableId, selectedPlayer) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const seatedPlayers = LS.getSeatedPlayers(tableId);
    setSeats(seatedPlayers || generateSeats());
  }, [tableId]);

  useEffect(() => {
      setSeats((seats) => seats.map((seat) => seat?.id === selectedPlayer?.player.id ? { ...seat, type: selectedPlayer.player.type } : seat));
  }, [selectedPlayer?.player.type, selectedPlayer?.player.id]);

  const seatPlayer = (selectedPlayer, seatNumber) => {
    console.log(selectedPlayer, seatNumber)
    setSeats((seats) => {
      const updatedSeats = seats.map((seat) =>
        seat.seatNumber === seatNumber
          ? { ...selectedPlayer, seatNumber }
          : seat
      );
      LS.updateSeatedPlayers(tableId, updatedSeats);
      return updatedSeats;
    });
    
    handleClickPlayer(selectedPlayer);
  };

  const unseatPlayer = (seatNumber) => {
    setSeats((seats) => {
      const updatedSeats = seats.map((seat) =>
        seat.seatNumber === seatNumber
          ? { ...EMPTY_SEAT, seatNumber: seat.seatNumber }
          : seat
      );
      LS.updateSeatedPlayers(tableId, updatedSeats);
      return updatedSeats;
    });
  };

  return { seats, seatPlayer, unseatPlayer };
};

export default useTable;
