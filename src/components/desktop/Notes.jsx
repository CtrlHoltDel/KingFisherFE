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
            {!!notes.length && notes.map(({ note, id }) => {
              return <div className="notes__body__list__content__item" key={id}>{note}</div>;
            })}
          </div>
        </div>
        <div className="notes__body__list tendencies-list">
          <div className="notes__body__list__header" style={styleConfig.headerStyle}>Tendencies</div>
          <div className="notes__body__list__content">
            {!tendencies.length && <p className="notes__body__list__content__item">No Tendencies</p>}
            {!!tendencies.length && tendencies.map(({ note, id }) => {
              return <div className="notes__body__list__content__item" key={id}>{note}</div>;
            })}
          </div>
        </div>
      </div>
      <AddNote player={player} addNoteToPlayer={addNoteToPlayer} style={styleConfig.buttonStyle}/>
    </div>
  );
};

export default Notes;