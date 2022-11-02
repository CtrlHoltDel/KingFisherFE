import React from "react";

const PlayerInfo = ({ player, loading, currentlySelectedGroup }) => {

  const handleClick = (e) => {
    console.log("object");
    console.log(e.detail)

  }

  if (loading) {
    return <div>Loading..</div>;
  }

  if (!player) {
    return <div>No Player Selected</div>;
  }

  return (
    <div className="player-info">
      <div className="player-info__header"><p>{currentlySelectedGroup.name} {'>'} {player.player.name}</p><p>{player.player.type}</p></div>
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
