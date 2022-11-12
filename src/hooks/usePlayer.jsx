import React from 'react'
import { useState } from 'react'

const usePlayer = () => {
    const [currentlySelectedPlayer, setCurrentlySelecterPlayer] = useState(null)

    const selectPlayer = (selectedPlayer) => setCurrentlySelecterPlayer(selectedPlayer);

    return { currentlySelectedPlayer, selectPlayer }

}

export default usePlayer