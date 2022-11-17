import React from "react";
import useGroups from "../../hooks/useGroups";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import GroupItem from "../common/GroupItem";
import { FaChevronCircleLeft } from "react-icons/fa";
import { BsFillArrowDownSquareFill } from 'react-icons/bs'

import loadingSVG from "../../assets/primary-loading.svg";
import { GiSadCrab } from "react-icons/gi";

const Groups = ({ toggleGroupsMenu }) => {
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
    addUserLoading,
  } = useGroups(user, currentlySelectedGroup);

  return (
    <div className="groups">
      <div className="groups__header">
        <p>Groups</p>
        <button onClick={toggleGroupsMenu}>
          <FaChevronCircleLeft />
          <p>Collapse Menu</p>
        </button>
      </div>
      {loadingGroups ? (
        <div className="groups__loading">
          <div className="groups__loading__container">
            <img src={loadingSVG} alt="groups-loading" />
            <p>Getting Groups..</p>
          </div>
        </div>
      ) : !groups.length ? (
        <div className="groups__no-group">
          <div className="groups__no-group__body">
            <GiSadCrab />
            <p>No Groups</p>
          </div>

          <div className="groups__no-group__cta">
            <p>Add a Group</p>
            <BsFillArrowDownSquareFill />
          </div>
        </div>
      ) : (
        <div className="groups__list">
          {groups &&
            groups.map((group) => (
              <GroupItem
                addUserLoading={addUserLoading}
                addUserToGroup={addUserToGroup}
                user={user}
                group={group}
                key={group.id}
                selectGroup={selectGroup}
                currentlySelectedGroup={currentlySelectedGroup}
              />
            ))}
        </div>
      )}
      <div className="groups__new-group-container">
        <p className="groups__new-group-container__error"><p>{groupError}</p></p>
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
