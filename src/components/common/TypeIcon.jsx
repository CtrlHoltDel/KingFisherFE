import React from "react";

import { GiSpermWhale, GiThreeFriends } from 'react-icons/gi'
import { FaCrown, FaFish } from 'react-icons/fa'
import { AiOutlineBug } from "react-icons/ai";
import { SiKnown } from 'react-icons/si'

const TypeIcon = ({ type }) => {
  if (!type) return <div></div>;

  const matchType = () => {
    if (type.toLowerCase() === "whale") {
      return <GiSpermWhale />;
    }

    if(type.toLowerCase() === "fish"){
        return <FaFish />
    }

    if(type.toLowerCase() === 'nit'){
        return <AiOutlineBug />
    }

    if(type.toLowerCase() === 'known'){
        return <SiKnown />
    }

    if(type.toLowerCase() === 'reg'){
        return <FaCrown />
    }

    if(type.toLowerCase() === 'friend'){
      return <GiThreeFriends />
    }

    return type
  };

  return <div className="type-icon">{matchType()}</div>;
};

export default TypeIcon;
