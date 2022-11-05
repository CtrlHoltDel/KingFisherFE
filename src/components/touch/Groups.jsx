import React from "react";
import { useState } from "react";
import useGroups from "../../hooks/useGroups";
import GroupCard from "./GroupCard";

const Groups = ({ user, selectGroup, currentlySelectedGroup }) => {
  const { groups, loading, addUserLoading, addUserToGroup, createGroup } =
    useGroups(user, currentlySelectedGroup);
  const [addedGroupValue, setAddedGroupValue] = useState("");
  const [newGroupModal, setNewGroupModal] = useState(false);

  const openNewGroupModal = () => setNewGroupModal(true);
  const closeNewGroupModal = () => setNewGroupModal(false);

  if (loading) return <p>Loading</p>;

  return (
    <div className="groups">
      <div className="groups__list">
        {!!groups ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              currentlySelectedGroup={currentlySelectedGroup}
              selectGroup={selectGroup}
            />
          ))
        ) : (
          <p>No Groups</p>
        )}
      </div>
      {!newGroupModal && (
        <div className="groups__controls">
          <button onClick={openNewGroupModal}>Create New Group</button>
        </div>
      )}
      {newGroupModal && (
        <div className="groups__new-group-modal">
          <input placeholder="Group Name.." />
          <div className="groups__new-group-modal__controls">
            <button className="groups__new-group-modal__controls__cancel" onClick={closeNewGroupModal}>cancel</button>
            <button className="groups__new-group-modal__controls__create">create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
