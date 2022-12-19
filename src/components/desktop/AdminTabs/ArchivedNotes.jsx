import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { APIGetArchivedNotes } from "../../../api/actions";
import { dateFormat } from "../../../utils/dataFormat";

const ArchivedNotes = ({ token }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const { error, success } = await APIGetArchivedNotes(token);
      if (error) return console.log(error);

      setArchivedNotes(success.data.notes);
    };

    fetchArchivedNotes();
  }, [token]);
  return (
    <div className="admin__archived">
      {archivedNotes.map((note, index) => (
        <div key={index} className="admin__archived__card">
          <p>{note.note}</p>
          <p className="admin__archived__card__detail">Created by {note.created_by} {dateFormat(note.created_time)} - archived by {note.archived_by} {dateFormat(note.archive_date)}</p>
        </div>
      ))}
    </div>
  );
};

export default ArchivedNotes;