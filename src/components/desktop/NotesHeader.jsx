import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import TypeIcon from "../common/TypeIcon";

const QUICK_MENU_TYPES = ["fish", "whale", "nit", "reg", "known", "friend"]

const QuickButton = ({type, player, updateType}) => {
  return (
    <button
      className={player?.type?.toLowerCase() === type ? "selected" : ''}
      onClick={() => {
        updateType(type);
      }}
    >
      <TypeIcon type={type} />
      <p>{type}</p>
    </button>
  );
}

const NotesHeader = ({ player, updateType, style }) => {
  const [userEditMenuOpen, setUserEditMenuOpen] = useState(false);
  const toggleUserEditMenu = () => setUserEditMenuOpen((curr) => !curr);

  const [typeInput, setTypeInput] = useState("");

  useEffect(() => {
    setTypeInput(player.type || "");
  }, [player.type]);


  return (
    <div>
      <div className="notes__header" style={style}>
        <div className="notes__header__content">
          <p className="notes__header__content__name">{player.name}</p>
          <div
            className="notes__header__content__type"
            onClick={toggleUserEditMenu}
          >
            <TypeIcon type={player.type} />
            <div
              className="notes__header__content__type__edit"
              style={{ color: style?.color || "black" }}
            >
              {userEditMenuOpen ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
            </div>
          </div>
        </div>
        {userEditMenuOpen && (
          <div className="notes__header__player-edit-menu">
            <div className="notes__header__break-line"></div>
            <div className="notes__header__player-edit-menu__quick-buttons">
              {QUICK_MENU_TYPES.map(type => <QuickButton type={type} player={player} updateType={updateType}/>)}
            </div>
            <div className="notes__header__break-line"></div>
            <div className="notes__header__player-edit-menu__custom-type-input">
              <input
                value={typeInput}
                style={{
                  border: !style?.background
                    ? `solid gray 1px`
                    : `solid ${style.background} 1px`,
                }}
                onChange={(e) => {
                  setTypeInput(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateType(typeInput);
                }}
              >
                Add Custom Type
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHeader;
