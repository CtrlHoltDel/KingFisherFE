import React from "react";
import { Link } from "react-router-dom";

import { GiCirclingFish } from "react-icons/gi";
import { HiOutlineCollection } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";

const Navigation = () => {
  return (
    <nav className="touch-container__nav">
      <Link to="/m/players" className="remove-underline">
        <button>
          <GiCirclingFish />
          <p>players</p>
        </button>
      </Link>
      <Link to="/m/groups" className="remove-underline">
        <button>
          <HiOutlineCollection />
          <p>groups</p>
        </button>
      </Link>
      <Link to="/m/account" className="remove-underline">
        <button>
          <RiAccountPinCircleLine />
          <p>account</p>
        </button>
      </Link>
    </nav>
  );
};

export default Navigation;
