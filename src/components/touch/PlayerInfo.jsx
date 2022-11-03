import React, { useEffect, useState } from "react";

import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
//TODO: move player edits to a new component 

const PlayerInfo = ({
  player,
  loading,
  currentlySelectedGroup,
  updateType,
}) => {
  const [playerEditMenuOpen, setPlayerEditMenuOpen] = useState(false);

  const handleOpenEditMenu = () => setPlayerEditMenuOpen(true);
  const handleCloseEditMenu = () => setPlayerEditMenuOpen(false);

  const [playerType, setPlayerType] = useState('')

  useEffect(() => {
    if(player) setPlayerType(player.player.type || '')
  }, [player])

  if (loading) {
    return <div>Loading..</div>;
  }

  if (!player) {
    return (
      <div className="no-player-selected">
        <p>Find or Add a player in {currentlySelectedGroup.name}</p>
        <BsFillArrowDownCircleFill />
      </div>
    );
  }

  const handleClick = (e) => {
    console.log("object");
    console.log(e.detail);
  };

  const handleTypeInputOnChange = (e) => setPlayerType(e.target.value)
  const handleSubmitUpdateType = () => updateType(playerType)

  return (
    <div className="player-info">
      <div className="player-info__header">
        <div>
          <p className="player-info__header__group-name">
            {currentlySelectedGroup.name}
          </p>
          <p className="player-info__header__player-name">
            {player.player.name}
          </p>
        </div>
        <div className="player-info__header__options">
          <p className="player-info__header__options__type">
            {player.player.type}
          </p>
          {playerEditMenuOpen ? (
            <FaChevronCircleUp onClick={handleCloseEditMenu} />
          ) : (
            <FaChevronCircleDown onClick={handleOpenEditMenu} />
          )}
        </div>
      </div>
      {playerEditMenuOpen && (
        <div className="player-info__header__edit">
          <p className="player-info__header__edit__label">type</p>
          <div className="player-info__header__edit__input-container">
            <input type="text" value={playerType} onChange={handleTypeInputOnChange}/>
            <button onClick={handleSubmitUpdateType}>Update</button>
          </div>
        </div>
      )}
      <div className="player-info__content">
        <div className="player-info__content__list notes">
          <p className="player-info__content__list__header">Notes</p>
          <div className="player-info__content__list__item-container">
            {player.notes.map((note, i) => (
              <div key={`note-${i}`}>
                <p onClick={handleClick}>{note.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="player-info__content__list tendency">
          <p className="player-info__content__list__header">Tendencies</p>
          <div className="player-info__content__list__item-container">
            {player.tendencies.map((tendency, i) => (
              <div key={`tendency-${i}`}>
                <p onClick={handleClick}>{tendency.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;

/*

{
    "notes": [
        {
            "note": "note-contents 1",
            "created_time": "2022-01-18T10:35:15.903Z",
            "created_by": "ctrlholtdel",
            "type": "note"
        },
        {
            "note": "note-contents 2",
            "created_time": "2022-01-18T10:35:15.903Z",
            "created_by": "testuser2",
            "type": "note"
        },
        {
            "note": "note-contents 3",
            "created_time": "2022-01-18T10:35:15.903Z",
            "created_by": "ctrlholtdel",
            "type": "note"
        },
        {
            "note": "tendency-contents 2",
            "created_time": "2022-01-18T10:35:15.903Z",
            "created_by": "ctrlholtdel",
            "type": "tendency"
        }
    ],
    "player": {
        "id": "1",
        "name": "player 1",
        "type": null,
        "created_time": "2022-01-18T10:35:15.903Z",
        "created_by": "ctrlholtdel",
        "note_group_id": "1"
    }
}

*/
