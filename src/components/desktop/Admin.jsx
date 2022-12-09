import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  APIGetBackup,
  APIGetGroupsAdmin,
  APIGetHistory,
  APIGetHistoryBackup,
  APIGetUsersAdmin,
} from "../../api/actions";
import { UserContext } from "../../context/UserContext";
import { fileDownload } from "../../utils/downloadFile";
import { GrAdd, GrDocumentUpdate } from "react-icons/gr";
import { IoMdCreate } from "react-icons/io";
import { BiBook, BiUserCircle } from "react-icons/bi";
import { dateFormat } from "../../utils/dataFormat";

const BUTTON_TYPES = ["all", "note", "auth", "group", "player"];
const TABS = ["history", "groups", "users"];

const Admin = () => {
  const { user } = useContext(UserContext);

  const [currentTab, setCurrentTab] = useState("history");

  const [history, setHistory] = useState([]);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const [query, setQuery] = useState("");

  const handleClickDownloadBackup = async () => {
    const data = await APIGetBackup(user.token);
    fileDownload(data);
  };

  const downloadAllHistory = async () => {
    const { data } = await APIGetHistoryBackup(user.token);
    fileDownload(data.history);
  };

  useEffect(() => {
    const getHistory = async () => {
      const { data, error } = await APIGetHistory(user.token, query);

      if (error) {
        console.warn(error);
        return;
      }

      setHistory(data.history);
    };

    const getGroups = async () => {
      const { data, error } = await APIGetGroupsAdmin(user.token);

      if (error) {
        console.warn(error);
        return;
      }

      setGroups(data.groups);
    };

    const getUsers = async () => {
      const { data, error } = await APIGetUsersAdmin(user.token);

      if (error) {
        console.warn(error);
        return;
      }

      console.log(data);
      setUsers(data.users);
    };

    getUsers();
    getHistory();
    getGroups();
  }, [user.token, query]);

  const iconForAction = (action) => {
    if (action === "update") return <GrDocumentUpdate />;
    if (action === "create") return <IoMdCreate />;
    if (action === "archive") return <BiBook />;
    if (action === "add") return <GrAdd />;
  };

  return (
    <div className="admin">
      <div className="admin__controls">
        <div className="admin__controls__tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setCurrentTab(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="admin__controls__downloads">
          <button onClick={handleClickDownloadBackup}>Download Backup</button>
          <button onClick={downloadAllHistory}>Download all history</button>
        </div>
      </div>
      {currentTab === "history" && (
        <>
          <div className="admin__query-controls">
            {BUTTON_TYPES.map((label) => (
              <button
                key={label}
                onClick={() => setQuery(label === "all" ? "" : label)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="admin__history">
            {history.map((history, index) => {
              return (
                <div className="admin__history__row" key={index}>
                  <div className="admin__history__row__reference">
                    <div className="admin__history__row__reference__username">
                      <p>{history.username}</p>
                    </div>
                    <div className="admin__history__row__reference__type">
                      <p>{history.type}</p>
                    </div>
                    <div className="admin__history__row__reference__date">
                      <p>{dateFormat(history.time_stamp)}</p>
                    </div>
                    <div className="admin__history__row__reference__action">
                      <p>{history.action}</p>
                      {iconForAction(history.action)}
                    </div>
                  </div>
                  <div className="admin__history__row__body">
                    {history.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {currentTab === "groups" && (
        <div className="admin__groups">
          {groups.map((group) => (
            <div key={group.id} className="admin__groups__card">
              <div>
                <p>{group.name}</p>
                <p className="detail">
                  created by {group.created_by} {dateFormat(group.created_time)}
                </p>
              </div>
              <div className="admin__groups__card__user-count">
                <p>{group.user_count}</p>
                <BiUserCircle />
              </div>
            </div>
          ))}
        </div>
      )}
      {currentTab === "users" && (
        <div className="admin__users">
          {users.map((user) => (
            <div className="admin__users__card" key={user.username}>
              <div>
                <p>{user.username}</p>
                <p className="admin__users__card__detail">
                  {dateFormat(user.created_time)}
                </p>
              </div>
              <div className="admin__users__card__info">
                <p>Added Players: <span>{user.added_player_count}</span></p>
                <p>Added Notes: <span>{user.added_notes_count}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
