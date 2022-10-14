import React, { useState } from "react";

const MobileNoteModal = ({ selectedRecord, toggleAddingRecord, addNewNote, updateNote }) => {
  const [noteTendencyToggle, setNoteTendencyToggle] = useState(
    selectedRecord ? (selectedRecord.note_id ? "Note" : "Tendency") : "Note"
  );

  const [noteBody, setNoteBody] = useState(
    selectedRecord
      ? selectedRecord.note
        ? selectedRecord.note
        : selectedRecord.tendency
      : ""
  );

  const handleNoteChange = (e) => {
    setNoteBody(e.target.value);
  };

  const handleUpdateAdd = (e) => {

    if(selectedRecord){
      console.log(`Update the current note with ${noteBody}`);
      console.log(selectedRecord)
      if(selectedRecord.note && selectedRecord.note === noteBody) return
      if(selectedRecord.tendency && selectedRecord.tendency === noteBody) return

      updateNote(noteTendencyToggle, noteBody, selectedRecord.note_id || selectedRecord.tendency_id)
    } else {
      addNewNote(noteTendencyToggle, noteBody);
    }


    toggleAddingRecord();
  }

  return (
    <div className="add-note-container">
      <div className="add-note-container__note-tendency-toggle">
        <button
          className={`${noteTendencyToggle === "Note" && "selected"} first-button`}
          onClick={() => setNoteTendencyToggle("Note")}
          disabled={selectedRecord}
        >
          Note
        </button>
        <button
          className={`${
            noteTendencyToggle === "Tendency" && "selected"
          } last-button`}
          onClick={() => setNoteTendencyToggle("Tendency")}
          disabled={selectedRecord}
        >
          Tendency
        </button>
      </div>
      <textarea
        onChange={handleNoteChange}
        placeholder={`Add a ${noteTendencyToggle}`}
        value={noteBody}
      />
      <div className="add-note-container__buttons">
        {selectedRecord ? (
          <button className="add-note-container__buttons__delete">
            Delete {noteTendencyToggle}
          </button>
        ) : (
          <div></div>
        )}
        <button onClick={handleUpdateAdd} className="add-note-container__buttons__add-update">
          {selectedRecord ? "Update" : "Add"} {noteTendencyToggle}
        </button>
      </div>
    </div>
  );
};

export default MobileNoteModal;
