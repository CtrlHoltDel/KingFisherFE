import React, { useState } from "react";
import { useEffect } from "react";
import Admin from "./components/desktop/Admin";
import Groups from "./components/desktop/Groups";
import Navigation from "./components/desktop/Navigation";
import Settings from "./components/desktop/Settings";
import Tables from "./components/desktop/Tables";

import "./style/desktop.css";

const Desktop = ({ currentlySelectedGroup }) => {
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [adminMenu, SetAdminMenu] = useState(false);

  const toggleAdminMenu = () => {
    setSettingsMenuOpen(false)
    setGroupsMenuOpen(false)
    SetAdminMenu((curr) => !curr)
  };

  const toggleGroupsMenu = () => {
    setSettingsMenuOpen(false);
    SetAdminMenu(false)
    setGroupsMenuOpen((curr) => !curr);
  };
  const toggleSettingsMenu = () => {
    setGroupsMenuOpen(false);
    SetAdminMenu(false)
    setSettingsMenuOpen((curr) => !curr);
  };

  useEffect(() => {
    if (!currentlySelectedGroup) setGroupsMenuOpen(true);
  }, [currentlySelectedGroup]);

  return (
    <div className="desktop">
      <Navigation
        toggleGroupsMenu={toggleGroupsMenu}
        toggleSettingsMenu={toggleSettingsMenu}
        toggleAdminMenu={toggleAdminMenu}
      />
      {groupsMenuOpen && <Groups toggleGroupsMenu={toggleGroupsMenu} />}
      {settingsMenuOpen && <Settings />}
      {adminMenu && <Admin />}
      <Tables />
    </div>
  );
};

export default Desktop;
