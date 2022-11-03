export const formatNotes = (allNotes) => {
  const noteTypes = { notes: [], tendencies: [] };

  allNotes.forEach((note) => {
    if (note.type === "note") noteTypes.notes.push(note);
    if (note.type === "tendency") noteTypes.tendencies.push(note);
  });

  return noteTypes;
};
