import React from "react";
import { useContext } from "react";
import { APIGetBackup } from "../../api/actions";
import { UserContext } from "../../context/UserContext";
import { fileDownload } from "../../utils/downloadFile";

const Admin = () => {


    const { user } = useContext(UserContext)

    const handleClickDownloadBackup = async () => {
        const data = await APIGetBackup(user.token)
        fileDownload(data)
    }

  return (
    <div>
      <button onClick={handleClickDownloadBackup}>Download Backup</button>
    </div>
  );
};

export default Admin;
