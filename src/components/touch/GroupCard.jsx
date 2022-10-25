import React, { useState } from "react";

const GroupCard = ({ group, currentlySelectedGroup, selectGroup }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore((curr) => !curr);


  return (
    <div className="groups__list__group-card">
      <div className="groups__list__group-card__main">
        <p>{group.name}</p>
        {group.validated ? (
          currentlySelectedGroup?.id === group.id ? (
            <p className="pill positive">selected</p>
          ) : (
            <button onClick={() => selectGroup(group)}>Select Group</button>
          )
        ) : (
          <p className="pill negative">Pending</p>
        )}
        <button onClick={toggleShowMore}>{showMore ? "Hide" : "Show"}</button>
      </div>
      {showMore && (
        <div className="groups__list__group-card__show-more">
          <p>Created By {group.created_by}</p>
          <p>Created At {group.created_time}</p>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
