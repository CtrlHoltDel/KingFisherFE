import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { APIGetBackup, APIGetHistory, APIGetHistoryBackup } from "../../api/actions";
import { UserContext } from "../../context/UserContext";
import { fileDownload } from "../../utils/downloadFile";
import { GrAdd, GrDocumentUpdate } from "react-icons/gr";
import { IoMdCreate } from "react-icons/io";
import { BiBook } from "react-icons/bi";
import { dateFormat } from "../../utils/dataFormat";

const Admin = () => {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);

  const handleClickDownloadBackup = async () => {
    const data = await APIGetBackup(user.token);
    fileDownload(data);
  };

  const downloadAllHistory = async () => {
    const { data } = await APIGetHistoryBackup(user.token);
    fileDownload(data.history)
  };

  useEffect(() => {
    const getHistory = async () => {
      const { data, error } = await APIGetHistory(user.token);

      if (error) {
        console.warn(error);
        return;
      }

      setHistory(data.history);
    };

    getHistory();
  }, [user.token]);

  const iconForAction = (action) => {
    if (action === "update") return <GrDocumentUpdate />;
    if (action === "create") return <IoMdCreate />;
    if (action === "archive") return <BiBook />;
    if (action === 'add') return <GrAdd />
  };

  return (
    <div className="admin">
      <div className="admin__controls">
        <button onClick={handleClickDownloadBackup}>Download Backup</button>
        <button onClick={downloadAllHistory}>Download all history</button>
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
    </div>
  );
};

export default Admin;
