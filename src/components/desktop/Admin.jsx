import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { APIGetBackup, APIGetHistory } from "../../api/actions";
import { UserContext } from "../../context/UserContext";
import { fileDownload } from "../../utils/downloadFile";

const Admin = () => {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);

  const handleClickDownloadBackup = async () => {
    const data = await APIGetBackup(user.token);
    fileDownload(data);
  };

  useEffect(() => {
    const getHistory = async () => {
        const { data, error } = await APIGetHistory(user.token)

        if(error){
            console.warn(error);
            return
        }
        
        setHistory(data.history)
    }

    getHistory()
  }, [user.token]);

  return (
    <div>
      <button onClick={handleClickDownloadBackup}>Download Backup</button>
      {history.map(history => {
        return <div>{history.detail}</div>
      })}
    </div>
  );
};

export default Admin;
