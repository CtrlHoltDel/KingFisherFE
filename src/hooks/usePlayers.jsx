import { useState } from "react"
import { APIGetList } from "../api/actions";

const usePlayers = (user) => {

    const [players, setPlayers] = useState([])


    const selectPlayers = async (group) => {
        const { id: groupId } = group;

        console.log(groupId)
        const { players } = await APIGetList(`/players/${groupId}`, user.token) 
        console.log(players)
        setPlayers(players)
    }

    return { players, selectPlayers }

}

export default usePlayers