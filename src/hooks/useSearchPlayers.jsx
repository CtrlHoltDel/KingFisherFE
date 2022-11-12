import { useState } from "react";
import { APIGetPlayers } from "../api/actions";

const useSearchPlayers = (user, currentlySelectedGroup) => {
  const [players, setPlayers] = useState(null);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [hasExactMatch, setHasExactMatch] = useState(null);

  const [noResults, setNoResults] = useState(false);
  const [playerSearch, setPlayerSearch] = useState("");

  const handleSearch = async (search) => {
    if (!search) {
      setNoResults(null);
      setPlayers(null);
      return;
    }

    if (noResults) {
      if (search.startsWith(noResults)) {
        return;
      } else {
        setNoResults(null);
      }
    }

    setLoadingPlayers(true);
    const { success, error } = await APIGetPlayers(
      user.token,
      currentlySelectedGroup.id,
      search
    );

    if (error) return console.log("handle error", error);

    const { players } = success.data;

    if (!players.length) setNoResults(search);

    setHasExactMatch(players.length ? players[0].exactMatch : false);
    setPlayers(players.reverse());

    setLoadingPlayers(false);
  };

  const updateSearch = (value) => {
    setPlayerSearch(value);
    handleSearch(value);
  };

  return {
    players,
    loadingPlayers,
    hasExactMatch,
    playerSearch,
    updateSearch,
  };
};

export default useSearchPlayers;
