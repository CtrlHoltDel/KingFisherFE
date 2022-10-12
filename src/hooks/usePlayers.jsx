import  { useState } from 'react'
import { DAC } from '../api/DataAccess';

const usePlayers = (user) => {
    const [players, setPlayers] = useState([]);

    // Search
    const [searchVisible, setSearchVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [exactMatch, setExactMatch] = useState([])

    // Recent
    const [recentSearches, setRecentSearches] = useState([])

    // Currently Selected
    const [loadingCurrentlySelected, setLoadingCurrentlySelected] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState(null)

  
    const handleSearch = async (e) => {
      setSearch(e.target.value);
      if (!e.target.value) {
        setSearchVisible(false);
        setPlayers(null);
        return;
      }
  
      setLoading(true);
      setSearchVisible(true);
      const { count, exactMatch, players } = await DAC.getPlayers(user.token, e.target.value);
      console.log(count)
      setExactMatch(exactMatch)
      setLoading(false);
      setPlayers(!players.length ? null : players.reverse());
    };

    const closeSearch = () => {
      setPlayers(null);
      setSearchVisible(false);
      setSearch("")
    }
  
    const cancelSearch = (e) => { if(e.target.classList.contains('search-results-background')) closeSearch() };

    const updateRecentSearches = () => {

    }

    const selectPlayer = async (player) => {

      // add to recently selected
      setRecentSearches(curr => [...curr, player])

      closeSearch()
      setLoadingCurrentlySelected(true)
      const response = await DAC.getPlayer(user.token, player.player_name)
      setSelectedPlayer(response)
      setLoadingCurrentlySelected(false)
    }

    return { players, searchVisible, loading, search, exactMatch, recentSearches, selectedPlayer, loadingCurrentlySelected, selectPlayer, handleSearch, cancelSearch, updateRecentSearches }

}

export default usePlayers