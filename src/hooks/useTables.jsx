import { useState, useEffect } from 'react'
import { LS } from '../utils/LocalStorage'

export const LS_TABLE_STORAGE = 'Kingfisher_Table_Storage'

const useTables = (currentlySelectedGroup) => {
    const [tables, setTables] = useState([])

    useEffect(() => {
        if(!currentlySelectedGroup) return
        setTables(LS.getTables(currentlySelectedGroup.id) || [])
    }, [currentlySelectedGroup])
    

    const addTable = () => {
        const newTable = { id: Math.random(), groupId: currentlySelectedGroup.id }        
        setTables(tables => {
            const updatedTables = [ ...tables, newTable];
            LS.updateTables(updatedTables, currentlySelectedGroup.id)
            return updatedTables
        })
    }

    const closeTable = (tableId) => {
        setTables(tables => tables.filter(({ id }) => id !== tableId))
        LS.removeTable(tableId, currentlySelectedGroup.id)
    }

    return { tables, addTable, closeTable }
}

export default useTables