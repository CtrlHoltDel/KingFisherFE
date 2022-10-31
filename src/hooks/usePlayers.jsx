import { useState } from "react"
import { APIGetPlayers } from "../api/actions";

const usePlayers = (user, currentlySelectedGroup) => {

    const [players, setPlayers] = useState(null)
    const [loadingPlayers, setLoadingPlayers] = useState(false)

    const handleSearch = async (search) => {

        console.log(search);

        if(!search) return setPlayers(null)

        setLoadingPlayers(true);
        const { success, error } = await APIGetPlayers(user.token, currentlySelectedGroup.id, search);

        if(error){
            console.log("handle error", error);
            return
        }

        console.log(success);

        setPlayers(success.data.players);
        setLoadingPlayers(false);
    } 

    const handleAddPlayer = (e) => {
        e.preventDefault()


    }

    return { players, loadingPlayers, handleSearch, handleAddPlayer }
    
}

export default usePlayers