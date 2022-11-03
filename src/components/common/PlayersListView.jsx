import React from "react";
import { MdPersonAddAlt } from "react-icons/md";
import { ImSearch } from "react-icons/im";

const PlayersListView = ({
  list,
  exactMatch,
  search,
  loading,
  handleClickPlayer,
  handleAddPlayer,
}) => {
  return (
    <div className="players-list">
      {loading ? (
        <div className="players-list__item players-list__loading">
          <ImSearch />
        </div>
      ) : (
        <>
          {list.map((item) => (
            <div
              className="players-list__player players-list__item"
              key={item.id}
              onClick={() => handleClickPlayer(item)}
            >
              <p>{item.name}</p>
              <p>{item.type || "no type"}</p>
            </div>
          ))}
          {!exactMatch && (
            <div className="players-list__add players-list__item" onClick={handleAddPlayer}>
              <MdPersonAddAlt /> <p>Add {search}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlayersListView;

/*
  [
    {
        "id": "cfd5724d-ea27-4f36-8c94-f9a0af67f6bd",
        "name": "a",
        "type": null,
        "created_time": "2022-10-30T05:50:48.422Z",
        "created_by": "ctrlholtdel",
        "note_group_id": "3"
    },
  ]
*/
