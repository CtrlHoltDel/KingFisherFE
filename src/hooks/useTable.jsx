import React, { useState } from 'react'
import { useEffect } from 'react'

const useTable = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const playersPlaceholder = []

        for (let i = 1; i < 9; i++) {
            playersPlaceholder.push([{ seatNumber: i }])
        }

        setPlayers(playersPlaceholder)
    }, [])

    const addPlayer = () => {

    }

    const removePlayer = () => {

    }

    return { players, addPlayer, removePlayer }
}

export default useTable