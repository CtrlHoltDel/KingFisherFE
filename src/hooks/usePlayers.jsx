import { useState } from "react"
import { APIAddPlayer, APIGetPlayers } from "../api/actions";

const usePlayers = (user, currentlySelectedGroup, selectPlayer) => {

    const [players, setPlayers] = useState(null)
    const [loadingPlayers, setLoadingPlayers] = useState(true)
    const [loadingAddPlayer, setLoadingAddPlayer] = useState(false)


    const [hasExactMatch, setHasExactMatch] = useState(null)

    const [noResults, setNoResults] = useState(false)
    const [playerSearch, setPlayerSearch] = useState("")

    const handleSearch = async (search) => {
        if(!search){
            setNoResults(null)
            setPlayers(null)
            return
        } 

        if(noResults) {
            if(search.startsWith(noResults)) {
                return
            } else {
                setNoResults(null)
            }
        }

        setLoadingPlayers(true);
        const { success, error } = await APIGetPlayers(user.token, currentlySelectedGroup.id, search);

        if(error) return console.log("handle error", error);

        const { players } = success.data

        if(!players.length) setNoResults(search) 

        setHasExactMatch(players.length ? players[0].exactMatch : false)
        setPlayers(players.reverse());
        
        setLoadingPlayers(false);
    } 

    const handleAddPlayer = async () => {
        setLoadingAddPlayer(true)
        const { error, success } = await APIAddPlayer(user.token, playerSearch, currentlySelectedGroup.id)

        if(error){
            console.log(error);
        } else {
            selectPlayer({ player: { ...success.addedPlayer, note_group_id: currentlySelectedGroup.id }, notes: [], tendencies: [] })
            setPlayerSearch('')
            setPlayers(null)
        }

        setLoadingAddPlayer(false)
    }

    const updateSearch = (value) => {
        setPlayerSearch(value)
        handleSearch(value)
    }

    return { players, loadingPlayers, hasExactMatch, handleSearch, handleAddPlayer, playerSearch, updateSearch, loadingAddPlayer }
    
}

export default usePlayers