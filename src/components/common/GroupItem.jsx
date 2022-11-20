import React, { useState } from "react";
import { AiFillCrown } from "react-icons/ai";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { MdAdminPanelSettings, MdStars } from "react-icons/md";
import { dateFormat } from "../../utils/dataFormat";

const GroupItem = ({ group, selectGroup, addUserToGroup, currentlySelectedGroup }) => {
  const [adminMenu, setAdminMenu] = useState(false);
  const toggleAdminMenu = () => setAdminMenu((curr) => !curr);

  const handleSelectGroup = (e) => {
    selectGroup(group)
  };

  const [addingUserInput, setAddingUserInput] = useState("");
  useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [userAddMessage, setUserAddMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    setAddUserLoading(true);
    const { message } = await addUserToGroup(addingUserInput, group.id);
    setUserAddMessage(message)
    setAddUserLoading(false);
  };

  const groupIsSelected = group?.id === currentlySelectedGroup?.id

  return (
    <div className="groups__list__item">
      <div className="groups__list__item__general" onClick={handleSelectGroup} style={groupIsSelected ? { background: 'rgb(58 58 58)', color: "white" } : {}}>
        <div
          className="groups__list__item__general__name"
        >
          <p title={group.name}>
            {group.name.length > 20
              ? `${group.name.slice(0, 20)}...`
              : group.name}
          </p>
        </div>
        <div
          className="groups__list__item__general__expand"
          onClick={toggleAdminMenu}
        >
          <button>
            {group.admin && <MdAdminPanelSettings style={{ color: groupIsSelected ? '#eeeeff' : "blue" }} />}
            {adminMenu ? <FaChevronCircleUp style={groupIsSelected && { color: 'white' } } /> : <FaChevronCircleDown style={groupIsSelected && { color: 'white' } } />}
          </button>
        </div>
      </div>
      {adminMenu && (
        <>
          <div className="group-line-break"></div>
          {group.admin ? (
            <div className="groups__list__item__general__admin">
              <div className="groups__list__item__general__admin__header">
                Users
              </div>
              <div className="groups__list__item__general__admin__players">
                {group.users.length === 1 ? <div style={{ textAlign: "center" }}>Just You!</div> : 
                group.users.map((user) => {
                  return (
                    <div key={user.username}className="groups__list__item__general__admin__players__player">
                      <p className="groups__list__item__general__admin__players__player__username">
                        {user.username}
                      </p>
                      <div className="groups__list__item__general__admin__players__player__admin-menu">
                        {group.created_by === user.username && (
                          <AiFillCrown style={{ color: "gold" }} />
                        )}
                        <MdAdminPanelSettings
                          style={{ color: user.admin ? "blue" : "gray" }}
                        />
                        <MdStars
                          style={{ color: user.validated ? "green" : "gray" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  value={addingUserInput}
                  type="text"
                  onChange={(e) => {
                    setUserAddMessage("")
                    setAddingUserInput(e.target.value);
                  }}
                />
                <button disabled={!addingUserInput || addUserLoading}>
                  {addUserLoading
                    ? `Adding ${addingUserInput}`
                    : `add user to ${group.name}`}
                </button>
                {userAddMessage && <p>{userAddMessage}</p>}
              </form>
              <p className="groups__list__item__general__admin__details">
                Group created {dateFormat(group.created_time)} by
                {group.created_by}
              </p>
            </div>
          ) : (
            <div className="groups__list__item__general__non-admin">
              <p>
                Group created {dateFormat(group.created_time)} by
                {group.created_by}
              </p>
            </div>
          )}
        </>
      )}
      <div className="group-line-break"></div>
    </div>
  );
};

export default GroupItem;

/*

    return (
      <div
        className={`groups__list__item ${
          currentlySelectedGroup &&
          currentlySelectedGroup.id === group.id
            ? "selected-group"
            : ""
        }`}
        key={group.id}
        onClick={() => selectGroup(group)}
      >
        <p>{group.name}</p>
        {group.admin && <MdAdminPanelSettings />}
      </div>
    );

*/
