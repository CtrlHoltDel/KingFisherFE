import React from 'react'

const ListView = ({ list, type }) => {

  const generateListItem = (item) => {
    if(type === 'players'){
      console.log(list);
      return <div className="list-item">
        <p>{item.name}</p>
        <p>{item.type || "no type"}</p>
      </div>
    }
  }

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
        {list.map(item => generateListItem(item))}
    </div>
  )
}

export default ListView