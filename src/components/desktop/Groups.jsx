import React from "react";
import useGroups from "../../hooks/useGroups";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import LoadingIcon from "../common/LoadingIcon";
import GroupItem from "../common/GroupItem";

const Groups = () => {
  const { user, selectGroup, currentlySelectedGroup } = useContext(UserContext);

  const {
    groups,
    loadingGroups,
    createGroup,
    groupError,
    addGroupLoading,
    newGroupInput,
    newGroupDisabled,
    updateGroupInput,
    addUserToGroup,
    addUserLoading
  } = useGroups(user, currentlySelectedGroup);

  if (loadingGroups) return <LoadingIcon />;

  return (
    <div className="groups">
      <div className="groups__list">
        {groups &&
          groups.map((group) => <GroupItem addUserLoading={addUserLoading} addUserToGroup={addUserToGroup} user={user} group={group} key={group.id} selectGroup={selectGroup}/>)}
      </div>
      <div className="groups__new-group-container">
        <p className="groups__new-group-container__error">{groupError}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createGroup();
          }}
        >
          <input
            value={newGroupInput}
            type="text"
            disabled={loadingGroups || addGroupLoading}
            onChange={updateGroupInput}
          />
          <button
            disabled={loadingGroups || addGroupLoading || newGroupDisabled}
          >
            Create New Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default Groups;