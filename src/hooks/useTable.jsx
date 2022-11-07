import React, { useState } from 'react'
import { useEffect } from 'react'

const EMPTY_SEAT = {
    name: null,
    id: null,
    type: null
}

const useTable = (handleClickPlayer) => {
    const [seats, setSeats] = useState([])

    useEffect(() => {
        const playersPlaceholder = []

        for (let i = 1; i < 9; i++) {
            playersPlaceholder.push({ ...EMPTY_SEAT, seatNumber: i })
        }

        setSeats(playersPlaceholder)
    }, [])

    const addPlayer = (selectedPlayer, seatNumber) => {
        setSeats(seats => seats.map(seat => seat.seatNumber === seatNumber ? { ...selectedPlayer, seatNumber: seat.seatNumber } : seat))
        handleClickPlayer(selectedPlayer)
    }

    const removePlayer = (seatNumber) => {
        
        setSeats(seats => seats.map(seat => seat.seatNumber === seatNumber ? { ...EMPTY_SEAT, seatNumber: seat.seatNumber } : seat))

    }

    return { seats, addPlayer, removePlayer }
}

export default useTable