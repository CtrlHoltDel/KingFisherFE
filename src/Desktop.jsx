import React, { useState } from "react";
import Groups from "./components/desktop/Groups";
import Navigation from "./components/desktop/Navigation";
import Tables from "./components/desktop/Tables";

import "./style/desktop.css";

const Desktop = ({
  user,
  logoutUser,
  currentlySelectedGroup,
  selectGroup,
}) => {
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const toggleGroupsMenu = () => setGroupsMenuOpen((curr) => !curr);

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
      />
    </div>
  );
};

export default Desktop;
