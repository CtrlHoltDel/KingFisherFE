import React, { useState } from "react";
import { APIGetNotes } from "./api/actions";
import Groups from "./components/desktop/Groups";
import Navigation from "./components/desktop/Navigation";
import Notes from "./components/desktop/Notes";
import Tables from "./components/desktop/Tables";

import "./style/desktop.css";
import { formatNotes } from "./utils/dataFormat";

const Desktop = ({
  user,
  logoutUser,
  currentlySelectedGroup,
  selectGroup,
  selectedPlayer,
  selectPlayer,
  addNoteToPlayer
}) => {
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(false);

  const toggleGroupsMenu = () => setGroupsMenuOpen((curr) => !curr);

  const handleClickPlayer = async (value) => {
    setLoadingPlayer(true);
    const { success, error } = await APIGetNotes(user.token, value.id);

    if (error) {
      console.log("handle error");
      return;
    }

    selectPlayer({ ...success, ...formatNotes(success.notes) });
    setLoadingPlayer(false);
  };

  return (
    <div className="desktop">
      <Navigation
        user={user}
        logoutUser={logoutUser}
        toggleGroupsMenu={toggleGroupsMenu}
      />
      {groupsMenuOpen && (
        <Groups
          selectGroup={selectGroup}
          currentlySelectedGroup={currentlySelectedGroup}
          user={user}
        />
      )}
      <Tables
        user={user}
        currentlySelectedGroup={currentlySelectedGroup}
        handleClickPlayer={handleClickPlayer}
      />
      {selectedPlayer && (
        <Notes selectedPlayer={selectedPlayer} loadingPlayer={loadingPlayer} addNoteToPlayer={addNoteToPlayer}/>
      )}
    </div>
  );
};

export default Desktop;
