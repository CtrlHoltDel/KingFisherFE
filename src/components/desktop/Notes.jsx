import React from "react";
import { useState } from "react";
import { APIDeleteNote } from "../../api/actions";
import { dateFormat } from "../../utils/dataFormat";
import LoadingIcon from "../common/LoadingIcon";
import AddNote from "./AddNote";

import NotesHeader from "./NotesHeader";

const Notes = ({
  selectedPlayer,
  addNoteToPlayer,
  updateType,
  removeNoteFromPlayer,
  user
}) => {
  const [deletingNote, setDeletingNote] = useState(false)
  const { player, notes, tendencies, styleConfig } = selectedPlayer;

  const handleDeleteNote = async (noteId) => {
    setDeletingNote(true)
    removeNoteFromPlayer(noteId)
    const { error } = await APIDeleteNote(user.token, noteId)

    if(error) console.log({ error }, "Handle Error Here");

    setDeletingNote(false)
    
  };

  return (
    <div className="notes">
      {deletingNote && <LoadingIcon />}
      <NotesHeader
        player={player}
        updateType={updateType}
        style={styleConfig.headerStyle}
      />
      <div className="notes__body">
        <NotesList style={styleConfig.headerStyle} handleDeleteNote={handleDeleteNote} list={notes} listName="notes" />
        <NotesList style={styleConfig.headerStyle} handleDeleteNote={handleDeleteNote} list={tendencies} listName="tendencies"/>
      </div>
      <AddNote
        player={player}
        addNoteToPlayer={addNoteToPlayer}
        style={styleConfig.buttonStyle}
      />
    </div>
  );
};

export default Notes;

const NotesList = ({ style, handleDeleteNote, list, listName }) => {
  return (
    <div className={`notes__body__list ${listName}-list`}>
      <div
        className="notes__body__list__header"
        style={style}
      >
        {listName}
      </div>
      <div className="notes__body__list__content">
        {!list.length && (
          <p className="notes__body__list__content__item">No {listName}</p>
        )}
        {!!list.length &&
          list.map(({ note, id, created_by, created_time }) => {
            return (
              <div className="notes__body__list__content__item" key={id}>
                <p className="notes__body__list__content__item__content">
                  {note}
                </p>
                <div className="notes__body__list__content__item__info">
                  {`${
                    created_by === "ctrlholtdel" ? "unknown" : created_by
                  } - ${dateFormat(created_time)}`}
                  <p
                    className="notes__body__list__content__item__info__delete"
                    onClick={() => handleDeleteNote(id)}
                  >
                    delete
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
