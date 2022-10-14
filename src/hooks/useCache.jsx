import { useEffect, useState } from "react";
import { DAC } from "../api/DataAccess";
import { LS } from "../localStorage/local-storage";

const useCache = (user) => {
  // Currently Selected
  const [loadingCurrentlySelected, setLoadingCurrentlySelected] =
    useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [notes, setNotes] = useState([]);
  const [tendencies, setTendencies] = useState([]);

  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const lsRecentSearches = LS.getRecentSearches();
    if(lsRecentSearches) setRecentSearches(lsRecentSearches)
  }, []);

  const updateSelectedPlayer = async (player) => {
    setLoadingCurrentlySelected(true);
    const response = await DAC.getPlayer(user.token, player.player_name);

    setSelectedPlayer(response.player);
    setRecentSearches((curr) => {
      if (
        curr.some(
          (player) => player.player_name === response.player.player_name
        )
      ) {
        const updatedRecentSearches = [
          ...curr.filter(
            (playerFilter) =>
              playerFilter.player_name !== response.player.player_name
          ),
          response.player,
        ];
        LS.setRecentSearches(updatedRecentSearches);
        return updatedRecentSearches;
      }

      const updatedRecentSearches = [...curr, response.player];

      LS.setRecentSearches(updatedRecentSearches)
      return updatedRecentSearches;
    });

    setNotes(response.notes);
    setTendencies(response.tendencies);

    setLoadingCurrentlySelected(false);
  };

  const updateNotes = (type, note) => {};

  return {
    loadingCurrentlySelected,
    selectedPlayer,
    notes,
    tendencies,
    recentSearches,
    updateSelectedPlayer,
    updateNotes,
  };
};

export default useCache;
