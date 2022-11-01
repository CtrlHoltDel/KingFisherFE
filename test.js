const notes = [
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
]

const formatNotes = (allNotes) => {
    const noteTypes = { notes: [], tendencies: [] }

    allNotes.forEach(note => {
        if(note.type === 'note') noteTypes.notes.push(note)
        if(note.type === 'tendency') noteTypes.tendencies.push(note)
    })

    return noteTypes
}

formatNotes(notes)