import { useEffect } from 'react'
import { useState } from 'react'

import { APIAddGroup, APIAddUserToGroup, APIGetGroups } from "../api/actions";

const useGroups = (user, currentlySelectedGroup) => {

    const [groups, setGroups] = useState([])
    
    const [loading, setLoading] = useState(false)
    const [addGroupLoading, setAddGroupLoading] = useState(false)
    const [addUserLoading, setAddUserLoading] = useState(false)

    const [error, setError] = useState("")

    useEffect(() => {
        const loadGroups = async () => {
            setLoading(true);
            const { success, error } = await APIGetGroups(user.token);
      
            if(error){
              //handle error
              console.log(error);
            }
      
            setGroups(success.data.groups);
            setLoading(false);
        }

        loadGroups()
    }, [user.token])

    const addUserToGroup = async (userAddedToGroup) => {
        setAddUserLoading(true);

        const { success, error } = await APIAddUserToGroup(
            user.token,
            currentlySelectedGroup.id,
            userAddedToGroup
        );

        console.log(success, error);

        if(error){
            console.log(error)
        }

        setAddUserLoading(false);
    }

    const createGroup = async (groupName) => {
        setAddGroupLoading(true)
        const { success, error } = await APIAddGroup(user.token, groupName);
        
        if(error){
            setError(error.message);
        } else {
            setGroups(groups => ([...groups, { ...success.addedGroup, validated: true }]))
        }
        
        
        setAddGroupLoading(false)
    }

    return { groups, loading, addUserLoading, addUserToGroup, createGroup, error, addGroupLoading }

}

export default useGroups