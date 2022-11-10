import { useState, useEffect } from 'react'

const LS_TABLE_PREFIX = 'Kingfisher_Table_Storage'

const useTables = (currentlySelectedGroup) => {
    const [tables, setTables] = useState([])
    const [tablesWithPlayers, setTablesWithPlayers] = useState([])
    const [tablesOnLoad, setTablesOnLoad] = useState([])

    useEffect(() => {
        if(!currentlySelectedGroup) return

        const storedTables = localStorage.getItem(LS_TABLE_PREFIX)
        if(storedTables){
            const parsedTables = JSON.parse(localStorage.getItem(`${LS_TABLE_PREFIX}`))
            console.log(parsedTables)
            const filteredTables = parsedTables.filter(table => table.groupId === currentlySelectedGroup.id)
            setTables(filteredTables.map(table => ({ id: table.id })))
        } else {
            setTables([])
        }

    }, [currentlySelectedGroup])
    

    const addTable = () => {
        const newTable = { id: Math.random() }
        setTablesWithPlayers(tables => {
            const updatedTables = [ ...tables, { ...newTable , players: [], groupId: currentlySelectedGroup.id }];
            updateLSTable(updatedTables)
            return updatedTables
        })
        
        setTables(tables => {
            const updatedTables = [ ...tables, newTable];
            console.log(updatedTables)
            return updatedTables
        })
    }

    const closeTable = (tableId) => {
        setTables(tables => tables.filter(({ id }) => id !== tableId))
    }

    const addPlayerToTablesWithPlayers = (player, seatNumber, tableId) => {
        setTablesWithPlayers(tables => {
            const updatedTables = tables.map(table => {
                return table.id === tableId ? { ...table, players: [ ...table.players, { player, seatNumber } ]} : table 
            })
            updateLSTable(updatedTables)

            return updatedTables
        })
    }

    const removePlayerFromTablesWithPlayers = (playerId, tableId) => {
        console.log({ playerId, tableId })
    }

    const updateLSTable = (updatedTables) => {
        localStorage.setItem(LS_TABLE_PREFIX, JSON.stringify(updatedTables))
    }

    return { tables, addTable, closeTable, tablesWithPlayers, addPlayerToTablesWithPlayers, removePlayerFromTablesWithPlayers, tablesOnLoad }
}

export default useTables