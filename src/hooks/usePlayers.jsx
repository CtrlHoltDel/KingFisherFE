import  { useState } from 'react'
import { DAC } from '../api/DataAccess';

const usePlayers = (user, setRecentSearchesOpen) => {
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
    const [notes, setNotes] = useState([])
    const [tendencies, setTendencies] = useState([])

  
    const handleSearch = async (e) => {
      setSearch(e.target.value);
      if (!e.target.value) {
        setSearchVisible(false);
        setPlayers(null);
        return;
      }
  
      setLoading(true);
      setSearchVisible(true);
      const { exactMatch, players } = await DAC.getPlayers(user.token, e.target.value);
      setExactMatch(exactMatch)
      setLoading(false);
      setPlayers(!players.length ? null : players.reverse());
    };

    const closeSearch = () => {
      setPlayers(null);
      setSearchVisible(false);
      setSearch("")
    }
  
    const cancelSearch = (e) => { if(e.target.classList.contains('mobile-modal')) closeSearch() };

    const selectPlayer = async (player, recentSearch) => {
      if(!recentSearch) setRecentSearches(curr => {
       if(curr.some(ply => ply.player_name === player.player_name)) return
       return [...curr, player]
      })
      setRecentSearchesOpen(false)

      closeSearch()
      setLoadingCurrentlySelected(true)
      const response = await DAC.getPlayer(user.token, player.player_name)
      setSelectedPlayer(response)
      setNotes(response.notes)
      setTendencies(response.tendencies)
      setLoadingCurrentlySelected(false)
    }

    const addNewNote = async (type, body) => {
      if(type === "Note"){
        setNotes(curr => ([...curr, { n_created_by: user.username, note: body, note_id: Math.random() }]))
      }
      if(type === "Tendency"){
        setTendencies(curr => ([...curr, { t_created_by: user.username, tendency: body, tendency_id: Math.random()}]))
      }
    }

    const updateNote = async (type, body, id) => {
      if(type === "Note"){
        setNotes(curr => curr.map(note => note.note_id === id ? { ...note, note: body } : note))
      }

      if(type === "Tendency"){
        setTendencies(curr => curr.map(tendency => tendency.tendency_id === id ? { ...tendency, tendency: body } : tendency))
      }
    }

    return { players, searchVisible, loading, search, exactMatch, recentSearches, selectedPlayer, loadingCurrentlySelected, notes, tendencies, selectPlayer, handleSearch, cancelSearch, addNewNote, updateNote }

}

export default usePlayers