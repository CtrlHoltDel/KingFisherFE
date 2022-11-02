import React, { useState } from 'react'

const NOTE_TYPE = 'note'
const TENDENCY_TYPE = 'tendency'
const STYLE_NOT_SELECTED = 'not-selected'


const AddNote = () => {
    const [noteType, setNoteType] = useState(NOTE_TYPE)
    const [noteInput, setNoteInput] = useState('')
    const setType = type => setNoteType(type)


    const handleUpdateCurrentNote = (e) => setNoteInput(e.target.value)

  return (
    <div className='add-note-modal'>
        <textarea resiz value={noteInput} onChange={handleUpdateCurrentNote}></textarea>
        <div className='add-note-modal__buttons'>
            <button className={noteType === NOTE_TYPE ? '' : STYLE_NOT_SELECTED} onClick={() => setType(NOTE_TYPE)}>NOTE</button>
            <button className={noteType === TENDENCY_TYPE ? '' : STYLE_NOT_SELECTED} onClick={() => setType(TENDENCY_TYPE)}>TENDENCY</button>
        </div>
    </div>
  )
}

export default AddNote