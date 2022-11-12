import { useEffect } from "react";
import { useState } from "react";

import { APIAddGroup, APIAddUserToGroup, APIGetGroups } from "../api/actions";

const useGroups = (user, currentlySelectedGroup) => {
  const [groups, setGroups] = useState([]);

  const [loadingGroups, setLoading] = useState(false);
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
        //handle error
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
        { ...success.addedGroup, validated: true },
      ]);
    }

    setAddGroupLoading(false);
  };

  const addUserToGroup = async (userAddedToGroup) => {
    setAddUserLoading(true);

    const { error } = await APIAddUserToGroup(
      user.token,
      currentlySelectedGroup.id,
      userAddedToGroup
    );

    if (error) {
      console.log(error);
    }

    setAddUserLoading(false);
  };

  const updateGroupInput = (e) => {
    setNewGroupInput(e.target.value);
    setNewGroupDisabled(e.target.value.length < 3);
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
