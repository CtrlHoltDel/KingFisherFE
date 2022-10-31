import { useState } from "react"
import { APIGetPlayers } from "../api/actions";

const usePlayers = (user, currentlySelectedGroup) => {

    const [players, setPlayers] = useState(null)
    const [loadingPlayers, setLoadingPlayers] = useState(true)
    const [hasExactMatch, setHasExactMatch] = useState(false)

    const [noResults, setNoResults] = useState(false)

    const handleSearch = async (search) => {
        if(!search) return setPlayers(null)

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

    const handleAddPlayer = (e) => {
        e.preventDefault()
    }

    return { players, loadingPlayers, hasExactMatch, handleSearch, handleAddPlayer }
    
}

export default usePlayers