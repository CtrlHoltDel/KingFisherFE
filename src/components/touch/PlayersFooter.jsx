import React from "react";

import { RiChatHistoryLine } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const PlayersFooter = ({
  updateSearch,
  openNoteModal,
  noteModalOpen,
  playerSearch,
  selectedPlayer
}) => {

  if (noteModalOpen) return;
  
  const buttonRender = () => {
    if (playerSearch) return <></>;

    return (
      <>
        <button className="standard-button">
          <RiChatHistoryLine />
        </button>
        <button
          disabled={!selectedPlayer}
          className="standard-button"
          onClick={openNoteModal}
        >
          <MdOutlineAddCircle />
        </button>
      </>
    );
  };

  return (
    <div className="players__footer">
      {!noteModalOpen && (
        <>
          <input
            value={playerSearch}
            onChange={(e) => updateSearch(e.target.value)}
          />
          {playerSearch && (
            <div
              className="standard-button-cancel"
              onClick={() => updateSearch("")}
            >
              <ImCancelCircle />
            </div>
          )}
        </>
      )}
      {buttonRender()}
    </div>
  );
};

export default PlayersFooter;
