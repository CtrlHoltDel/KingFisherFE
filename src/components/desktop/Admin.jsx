import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  APIGetBackup,
  APIGetGroupsAdmin,
  APIGetHistoryBackup,
  APIGetUsersAdmin,
} from "../../api/actions";
import { UserContext } from "../../context/UserContext";
import { fileDownload } from "../../utils/downloadFile";
import { BiUserCircle } from "react-icons/bi";
import { dateFormat } from "../../utils/dataFormat";
import ArchivedNotes from "./AdminTabs/ArchivedNotes";
import History from "./AdminTabs/History";

const TABS = ["history", "groups", "users", "archived"];

const Admin = () => {
  const { user } = useContext(UserContext);

  const [currentTab, setCurrentTab] = useState("history");

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const handleClickDownloadBackup = async () => {
    const data = await APIGetBackup(user.token);
    fileDownload(data);
  };

  const downloadAllHistory = async () => {
    const { data } = await APIGetHistoryBackup(user.token);
    fileDownload(data.history);
  };

  useEffect(() => {
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
      setUsers(data.users);
    };

    getUsers();
    getGroups();
  }, [user.token]);

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
      {currentTab === "history" && <History token={user.token}/>}
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
      {currentTab === "archived" && <ArchivedNotes token={user.token}/>}
    </div>
  );
};

export default Admin;
