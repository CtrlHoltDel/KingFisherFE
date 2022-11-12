import React, { useState } from "react";
import Groups from "./components/desktop/Groups";
import Navigation from "./components/desktop/Navigation";
import Settings from "./components/desktop/Settings";
import Tables from "./components/desktop/Tables";

import "./style/desktop.css";

const Desktop = () => {
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const toggleGroupsMenu = () => {
    setSettingsMenuOpen(false)
    setGroupsMenuOpen((curr) => !curr)
  };
  const toggleSettingsMenu = () => {
    setGroupsMenuOpen(false)
    setSettingsMenuOpen((curr) => !curr)
  };


  return (
    <div className="desktop">
      <Navigation
        toggleGroupsMenu={toggleGroupsMenu}
        toggleSettingsMenu={toggleSettingsMenu}
      />
      {groupsMenuOpen && (
        <Groups />
      )}
      {settingsMenuOpen && (
        <Settings />
      )}
      <Tables />
    </div>
  );
};

export default Desktop;
