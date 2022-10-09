import React from "react";
import loadingIcon from "../assets/images/loading.svg";

const CurrentPlayer = ({ player, loading }) => {

  if (loading)
    return (
      <div className="loading-player">
        <img src={loadingIcon}></img>
        <p>Loading Player..</p>
      </div>
    );

  return <div>CurrentPlayer</div>;
};

export default CurrentPlayer;
