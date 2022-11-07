import { useState, useEffect } from 'react'

const useTables = (currentlySelectedGroup) => {
    const [tables, setTables] = useState([])

    useEffect(() => {
        // TODO: If tables are stored under this group. Reload them
        setTables([])
    }, [currentlySelectedGroup])
    

    const addTable = () => {
        const newTable = { id: Math.random() }

        setTables(tables => [ ...tables, newTable])
    }

    const closeTable = (tableId) => {
        setTables(tables => tables.filter(({ id }) => id !== tableId))
    }


    return { tables, addTable, closeTable }
}

export default useTables