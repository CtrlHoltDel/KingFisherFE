import React, { useEffect, useState } from "react";
import { APIAddUserToGroup, APIGetList } from "../../api/actions";
import GroupCard from "./GroupCard";

const Groups = ({ user, selectGroup, currentlySelectedGroup }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addedUser, setAddedUser] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      const response = await APIGetList("/groups", user.token);
      setGroups(response.groups);
      setLoading(false);
    };
    loadGroups();
  }, [user.token]);

  if (loading) return <p>Loading</p>;

  const addUserToGroup = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    await APIAddUserToGroup(user.token, currentlySelectedGroup.id, addedUser);
    setAddUserLoading(false);
    setAddedUser("");
  };

  return (
    <div class="groups">
      <div className="groups__list">
        {!!groups.length ? (
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
                onChange={(e) => setAddedUser(e.target.value)}
              />
              <button>Add User</button>
            </form>
          </div>
        )}
    </div>
  );
};

export default Groups;
