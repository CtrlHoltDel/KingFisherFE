import React from "react";
import { useState } from "react";
import useGroups from "../../hooks/useGroups";

import loadingIcon from '../../assets/loading.svg'

const Groups = ({ selectGroup, currentlySelectedGroup, user }) => {
  const {
    groups,
    loadingGroups,
    addUserLoading,
    addUserToGroup,
    createGroup,
    groupError,
    addGroupLoading,
    newGroupInput,
    newGroupDisabled,
    updateGroupInput
  } = useGroups(user, currentlySelectedGroup);

  return (
    <div className="groups">
      {loadingGroups ? (
        <img className="groups__loading-icon" src={loadingIcon} alt="loading-icon"/>
      ) : (
        <><div className="groups__list">
          {groups &&
            groups.map((group) => {
              return <div className={`groups__list__item ${(currentlySelectedGroup && currentlySelectedGroup.id === group.id) ? 'selected-group' : ''}`} key={group.id} onClick={() => selectGroup(group)}><p>{group.name}</p></div>;
            })}
        </div>
        <div className="groups__new-group-container">
          <p className="groups__new-group-container__error">{groupError}</p>
          <form onSubmit={(e) => {
            e.preventDefault()
            createGroup()
          }}>
            <input value={newGroupInput} type="text" disabled={loadingGroups || addGroupLoading} onChange={updateGroupInput}/>
            <button disabled={loadingGroups || addGroupLoading || newGroupDisabled}>Create New Group</button>
          </form>
        </div></>
      )}
    </div>
  );
};

export default Groups;
