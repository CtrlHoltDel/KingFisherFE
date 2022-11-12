import React from "react";
import AddNote from "./AddNote";

import NotesHeader from "./NotesHeader";

const Notes = ({ selectedPlayer, addNoteToPlayer, updateType }) => {
  const { player, notes, tendencies, styleConfig } = selectedPlayer;
  return (
    <div className="notes">
      <NotesHeader player={player} updateType={updateType} style={styleConfig.headerStyle}/>
      <div className="notes__body">
        <div className="notes__body__list notes-list">
          <div className="notes__body__list__header" style={styleConfig.headerStyle}>Notes</div>
          <div className="notes__body__list__content">
            {!notes.length && <p className="notes__body__list__content__item">No Notes</p>}
            {notes.map(({ note }) => {
              return <div className="notes__body__list__content__item">{note}</div>;
            })}
          </div>
        </div>
        <div className="notes__body__list tendencies-list">
          <div className="notes__body__list__header" style={styleConfig.headerStyle}>Tendencies</div>
          <div className="notes__body__list__content">
            {!tendencies.length && <p className="notes__body__list__content__item">No Tendencies</p>}
            {tendencies.map(({ note }) => {
              return <div className="notes__body__list__content__item">{note}</div>;
            })}
          </div>
        </div>
      </div>
      <AddNote player={player} addNoteToPlayer={addNoteToPlayer} style={styleConfig.buttonStyle}/>
    </div>
  );
};

export default Notes;

/*

{
    "notes": [
        {
            "note": "45bb hjvbut limp calls 5x 10jo 4910hhx check raise huge gets in",
            "created_time": "2022-01-18T10:35:15.903Z",
            "created_by": "ctrlholtdel",
            "type": "note"
        },
        {
            "note": "hjvbb limp folds vs jam playing 15bb",
            "created_time": "2022-02-08T18:31:05.145Z",
            "created_by": "ctrlholtdel",
            "type": "note"
        },
        {
            "note": "15bb epvep+mp limp calls 5.5x with J9o",
            "created_time": "2022-02-08T18:41:00.231Z",
            "created_by": "ctrlholtdel",
            "type": "note"
        },
        {
            "note": "covhj 27bb kk vs a 7x iso flats pre- 3 way wgen chek to jams 20bb into 23 bb on 942r",
            "created_time": "2022-02-09T16:51:52.559Z",
            "created_by": "ctrlholtdel",
            "type": "note"
        }
    ],
    "player": {
        "id": "401931cd-5868-48b7-a6e6-c22a57e3c157",
        "name": "amma dhinema bathayo",
        "type": "fish",
        "created_time": "2022-01-18T10:35:15.903Z",
        "created_by": "ctrlholtdel",
        "note_group_id": "c1e094e3-090b-4c82-95c7-aa51ee663505"
    },
    "tendencies": []
}

*/
