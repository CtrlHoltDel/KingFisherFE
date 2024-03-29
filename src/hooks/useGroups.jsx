import { useEffect } from "react";
import { useState } from "react";

import { APIAddGroup, APIAddUserToGroup, APIGetGroups } from "../api/actions";

const useGroups = (user) => {
  const [groups, setGroups] = useState([]);

  const [loadingGroups, setLoading] = useState(true);
  const [addGroupLoading, setAddGroupLoading] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);

  const [newGroupInput, setNewGroupInput] = useState("");
  const [newGroupDisabled, setNewGroupDisabled] = useState(true);

  const [groupError, setGroupError] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      const { success, error } = await APIGetGroups(user.token);

      if (error) {
        console.log(error);
        setGroups([]);
      } else {
        setGroups(success.data.groups);
      }

      setLoading(false);
    };

    loadGroups();
  }, [user.token]);

  const createGroup = async () => {
    setAddGroupLoading(true);
    setNewGroupInput("");
    setNewGroupDisabled(true);
    
    const { success, error } = await APIAddGroup(user.token, newGroupInput);
    
    if (error) {
      setGroupError(error.message);
    } else {
      setGroups((groups) => [
        ...groups,
        { ...success.addedGroup, validated: true, admin: true, users: [{ username: user.username, admin: true, validated: true, blocked: false, note_group: success.addedGroup.id }] },
      ]);
    }

    setAddGroupLoading(false);
  };

  const addUserToGroup = async (userAddedToGroup, groupId) => {
    setAddUserLoading(true);

    const { success, error } = await APIAddUserToGroup(
      user.token,
      groupId,
      userAddedToGroup
    );

    if (error) {
      console.warn(error);
      return { message: error.message === 'Database Error' ? 'User doesn\'t exist' : error.message }
    }

    setGroups(groups => {
      return groups.map(group => {
        if(group.id !== groupId) return group

        const updatedUser = { admin: false, blocked: false, note_group: groupId, username: userAddedToGroup, validated: true }

        const updatedUsers = [...group.users, updatedUser]

        return { ...group, users: updatedUsers }
      })
    })
    
    setAddUserLoading(false);
    return { message: success.message }
  };

  const updateGroupInput = (e) => {
    setNewGroupInput(e.target.value);
    setNewGroupDisabled(e.target.value.length < 4);
  };

  return {
    groups,
    loadingGroups,
    addUserLoading,
    addUserToGroup,
    createGroup,
    groupError,
    addGroupLoading,
    newGroupInput,
    newGroupDisabled,
    updateGroupInput,
  };
};

export default useGroups;