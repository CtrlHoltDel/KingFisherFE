import  { useState } from 'react'
import { DAC } from '../api/DataAccess';

const useSearch = (user, clearSearch) => {
    const [playersSearchResults, setPlayersSearchResults] = useState([]);
    const [playerSearchLoading, setPlayerSearchLoading] = useState(false);
    const [currentSearchText, setCurrentSearchText] = useState("");
    const [exactMatch, setExactMatch] = useState([])

    const updateCurrentSearchText = async (e) => {
        setCurrentSearchText(e.target.value)
        if(!e.target.value) return setPlayersSearchResults([])        
        setPlayerSearchLoading(true);
                
        const { exactMatch, players } = await DAC.getPlayers(user.token, e.target.value);

        setExactMatch(exactMatch)
        setPlayersSearchResults(players.reverse())
        setPlayerSearchLoading(false)
    }
    
    const clearSearches = () => {
        setCurrentSearchText("")
        setPlayersSearchResults([])
        setPlayerSearchLoading(false)
    }
    
    return { currentSearchText, playersSearchResults, playerSearchLoading, exactMatch, updateCurrentSearchText, clearSearches }

}

export default useSearch

    // // Currently Selected
    // const [loadingCurrentlySelected, setLoadingCurrentlySelected] = useState(false)

  
    // const handleSearch = async (e) => {
    //   setSearch(e.target.value);
    //   if (!e.target.value) {
    //     setPlayers(null);
    //     return;
    //   }
  
    //   setLoading(true);
    //   const { exactMatch, players } = await DAC.getPlayers(user.token, e.target.value);
    //   setExactMatch(exactMatch)
    //   setLoading(false);
    //   setPlayers(!players.length ? null : players.reverse());
    // };

    // const closeSearch = () => {
    //   setPlayers(null);
    //   setSearch("")
    // }
  
    // const cancelSearch = (e) => { if(e.target.classList.contains('mobile-modal')) closeSearch() };

    // const selectPlayer = async (player, recentSearch) => {
    //   closeSearch()
    //   setLoadingCurrentlySelected(true)
    //   const response = await DAC.getPlayer(user.token, player.player_name)
    //   updateSelectedPlayer(response)
    //   setNotes(response.notes)
    //   setTendencies(response.tendencies)
    //   setLoadingCurrentlySelected(false)
    // }

    // const addNewNote = async (type, body) => {
    //   if(type === "Note"){
    //     setNotes(curr => ([...curr, { n_created_by: user.username, note: body, note_id: Math.random() }]))
    //   }
    //   if(type === "Tendency"){
    //     setTendencies(curr => ([...curr, { t_created_by: user.username, tendency: body, tendency_id: Math.random()}]))
    //   }
    // }

    // const updateNote = async (type, body, id) => {
    //   if(type === "Note"){
    //     setNotes(curr => curr.map(note => note.note_id === id ? { ...note, note: body } : note))
    //   }

    //   if(type === "Tendency"){
    //     setTendencies(curr => curr.map(tendency => tendency.tendency_id === id ? { ...tendency, tendency: body } : tendency))
    //   }
    // }

    // return { players, searchVisible, loading, search, exactMatch, recentSearches, selectedPlayer, loadingCurrentlySelected, notes, tendencies, selectPlayer, handleSearch, cancelSearch, addNewNote, updateNote }