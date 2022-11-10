import React from "react";
import { useState } from "react";
import useGroups from "../../hooks/useGroups";

import loadingIcon from '../../assets/loading.svg'

const Groups = ({ selectGroup, currentlySelectedGroup, user }) => {
  const {
    groups,
    loading,
    addUserLoading,
    addUserToGroup,
    createGroup,
    error,
    addGroupLoading
  } = useGroups(user, currentlySelectedGroup);

  const [newGroupInput, setNewGroupInput] = useState("")
  const [newGroupDisabled, setNewGroupDisabled] = useState(true)

  const handleSubmitNewGroup = (e) => {
    e.preventDefault()
    createGroup(newGroupInput)
    setNewGroupInput("")
    setNewGroupDisabled(true)
  }

  const handleSelectGroup = (group) => {
    selectGroup(group)
  }

  return (
    <div className="groups">
      {loading ? (
        <img className="groups__loading-icon" src={loadingIcon} alt="loading-icon"/>
      ) : (
        <><div className="groups__list">
          {groups &&
            groups.map((group) => {
              return <div className={`groups__list__item ${(currentlySelectedGroup && currentlySelectedGroup.id === group.id) ? 'selected-group' : ''}`} key={group.id} onClick={() => handleSelectGroup(group)}><p>{group.name}</p></div>;
            })}
        </div>
        <div className="groups__new-group-container">
          <p className="groups__new-group-container__error">{error}</p>
          <form onSubmit={handleSubmitNewGroup}>
            <input value={newGroupInput} type="text" disabled={loading || addGroupLoading} onChange={(e) => {
              setNewGroupInput(e.target.value)
              setNewGroupDisabled(e.target.value.length < 3)
            }}/>
            <button disabled={loading || addGroupLoading || newGroupDisabled}>Create New Group</button>
          </form>
        </div></>
      )}
    </div>
  );
};

export default Groups;
