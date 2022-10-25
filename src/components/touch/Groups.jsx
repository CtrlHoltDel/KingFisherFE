import React, { useEffect, useState } from "react";
import { APIAddGroup, APIAddUserToGroup, APIGetList } from "../../api/actions";
import GroupCard from "./GroupCard";

const Groups = ({ user, selectGroup, currentlySelectedGroup }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addedUser, setAddedUser] = useState("");

  const [addedGroup, setAddedGroup] = useState("")

  const [groupError, setGroupError] = useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      const { success, error } = await APIGetList("/groups", user.token);

      if(error){
        //handle error
        console.log(error);
      }

      setGroups(success.data.groups);
      setLoading(false);
    };
    loadGroups();
  }, [user.token]);

  if (loading) return <p>Loading</p>;

  const addUserToGroup = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    const { success, error } = await APIAddUserToGroup(
      user.token,
      currentlySelectedGroup.id,
      addedUser
    );
    if (error) {
      setError(JSON.stringify(error));
      return;
    }
    console.log(success);
    setError(success.message)

    setAddUserLoading(false);
  };

  const createGroup = async (e) => {
    e.preventDefault()
    const { success, error } = await APIAddGroup(user.token, addedGroup);
    if(error) return setGroupError(JSON.stringify(error))
    
    setGroupError(JSON.stringify(success))
  }

  return (
    <div className="groups">
      <div className="groups__list">
        {!!groups ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              currentlySelectedGroup={currentlySelectedGroup}
              selectGroup={selectGroup}
            />
          ))
        ) : (
          <p>No Groups</p>
        )}
      </div>
      {currentlySelectedGroup &&
        currentlySelectedGroup.created_by === user.username && (
          <div>
            <form disabled={addUserLoading} onSubmit={addUserToGroup}>
              <input
                placeholder="Add User"
                onChange={(e) => {
                  setAddedUser(e.target.value);
                  if (error) {
                    setError("");
                  }
                }}
              />
              <button>Add User</button>
              {error}
            </form>
          </div>
        )}
        <div>
          <form action="" onSubmit={createGroup}>
            <input type="text" placeholder="Create Group" value={addedGroup} onChange={(e) => setAddedGroup(e.target.value)}/>
            <button>Add Group</button>
            {groupError}
          </form>
        </div>
    </div>
  );
};

export default Groups;
