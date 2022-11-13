import React, { useState } from "react";
import { NOTE_TYPE, TENDENCY_TYPE } from "../../utils/constants";

const STYLE_NOT_SELECTED = "not-selected";

const AddNote = ({ closeNoteModal, handleAddNote }) => {
  const [noteType, setNoteType] = useState(NOTE_TYPE);
  const [noteInput, setNoteInput] = useState("");
  const setType = (type) => setNoteType(type);

  const handleUpdateCurrentNote = (e) => setNoteInput(e.target.value);

  const handleClickAddNote = () => {
    handleAddNote(noteInput, noteType)
  }

  return (
    <div className="add-note-modal">
      <div className="add-note-modal__body">
        <textarea
          value={noteInput}
          onChange={handleUpdateCurrentNote}
        ></textarea>
        <div className="add-note-modal__body__buttons">
          <button
            className={noteType === NOTE_TYPE ? "" : STYLE_NOT_SELECTED}
            onClick={() => setType(NOTE_TYPE)}
          >
            NOTE
          </button>
          <button
            className={noteType === TENDENCY_TYPE ? "" : STYLE_NOT_SELECTED}
            onClick={() => setType(TENDENCY_TYPE)}
          >
            TENDENCY
          </button>
        </div>
      </div>
      <div className="add-note-modal__controls">
        <button onClick={closeNoteModal}>
          <p>CANCEL</p>
        </button>
        <button disabled={!noteInput} onClick={handleClickAddNote}>
          <p>ADD {noteType.toUpperCase()}</p>
        </button>
      </div>
    </div>
  );
};

export default AddNote;
