import { useState } from 'react'

const useTables = () => {
    const [tables, setTables] = useState([])

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