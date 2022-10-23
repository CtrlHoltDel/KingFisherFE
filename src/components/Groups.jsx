import React, { useState } from 'react'
import { APIGetList } from '../api/actions'

const Groups = ({ token, selectGroup }) => {

    const [groups, setGroups] = useState([])

    const loadGroups = async () => {
        const response = await APIGetList("/groups", token)
        console.log(response.groups)
        setGroups(response.groups)
    }

    const handleSelectGroup = (id, name) => selectGroup({ id, name });

    return (
        <div>
            <button onClick={loadGroups}>Load Groups</button>
            {groups.map(group => <p key={group.id} onClick={() => { handleSelectGroup(group.id, group.name)}}>{group.name}</p>)}
        </div>
    )
}

export default Groups