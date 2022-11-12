import React from "react";
import { useState } from "react";
import { NOTE_TYPE, TENDENCY_TYPE } from "../../utils/constants";

const AddNote = ({ player, addNoteToPlayer }) => {
  const [noteType, setNoteType] = useState(NOTE_TYPE);
  const [noteInput, setNoteInput] = useState("")

  const handleChangeType = (selectedType) => setNoteType(selectedType) 

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    addNoteToPlayer(noteType, noteInput, player.id)
    setNoteInput("")
  }

  return (
    <div className="notes__add-note">
        <div className="notes__add-note__type-toggle">
            <button className={noteType === NOTE_TYPE ? 'selected' : ""} onClick={() => handleChangeType(NOTE_TYPE)}>NOTE</button>
            <button className={noteType === TENDENCY_TYPE ? 'selected' : ""} onClick={() => handleChangeType(TENDENCY_TYPE)}>TENDENCY</button>
        </div>
      <form onSubmit={handleFormSubmit}>
          <input onChange={(e) => setNoteInput(e.target.value)}/>
          <button className="notes__add-note__add-button" disabled={!noteInput}>Add {noteType} for {player.name}</button>
      </form>
    </div>
  );
};

export default AddNote;
