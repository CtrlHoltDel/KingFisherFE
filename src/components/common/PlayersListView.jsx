import React from "react";
import { useEffect } from "react";

const PlayersListView = ({ list, type }) => {

  
  useEffect(() => {
    console.log(list)
  },[])

  /*
  [
    {
        "id": "cfd5724d-ea27-4f36-8c94-f9a0af67f6bd",
        "name": "anotehr play",
        "type": null,
        "created_time": "2022-10-30T05:50:48.422Z",
        "created_by": "ctrlholtdel",
        "note_group_id": "3"
    },
  ]
  */

  return (
    <div>
      {list.map((item) => (
        <div className="list-item">
          <p>{item.name}</p>
          <p>{item.type || "no type"}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayersListView;
