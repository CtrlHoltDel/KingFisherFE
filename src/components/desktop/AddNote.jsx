import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NOTE_TYPE, TENDENCY_TYPE } from "../../utils/constants";
import { setButtonStyle } from "../../utils/typeStyle";

const AddNote = ({ player, addNoteToPlayer }) => {
  const [noteType, setNoteType] = useState(NOTE_TYPE);
  const [noteInput, setNoteInput] = useState("")

  const handleChangeType = (selectedType) => setNoteType(selectedType) 

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    addNoteToPlayer(noteType, noteInput, player.id)
    setNoteInput("")
  }

  const { config } = useContext(UserContext);

  const buttonStyle = setButtonStyle(player.type, config)

  return (
    <div className="notes__add-note">
        <div className="notes__add-note__type-toggle">
            <button style={{ ...buttonStyle, opacity: noteType === NOTE_TYPE ? '100%' : '60%'}} onClick={() => handleChangeType(NOTE_TYPE)}>NOTE</button>
            <button style={{ ...buttonStyle, opacity: noteType === TENDENCY_TYPE ? '100%' : '60%'}} onClick={() => handleChangeType(TENDENCY_TYPE)}>TENDENCY</button>
        </div>
      <form onSubmit={handleFormSubmit}>
          <input onChange={(e) => setNoteInput(e.target.value)} value={noteInput}/>
          <button className="notes__add-note__add-button" style={buttonStyle} disabled={!noteInput}>Add {noteType} for {player.name}</button>
      </form>
    </div>
  );
};

export default AddNote;
