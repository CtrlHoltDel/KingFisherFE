import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GiCirclingFish } from "react-icons/gi";
import { HiOutlineCollection } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useEffect } from "react";

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => setCurrentPage(window.location.pathname.split('/')[2])
  , []);

  const handleClick = (e) => {
    setCurrentPage(e.target.closest(".link-ref").classList[1])
  };

  return (
    <nav className="touch-container__nav" onClick={handleClick}>
      <Link to="/m/players" className="remove-underline">
        <button
          className="link-ref players"
          style={{
            color: currentPage === 'players' ? 'white' : '#a0a0a0',
          }}
        >
          <GiCirclingFish />
          <p>players</p>
        </button>
      </Link>
      <Link to="/m/groups" className="remove-underline">
        <button
          className="link-ref groups"
          style={{
            color: currentPage === 'groups' ? 'white' : '#a0a0a0',
          }}
        >
          <HiOutlineCollection />
          <p>groups</p>
        </button>
      </Link>
      <Link to="/m/account" className="remove-underline">
        <button
          className="link-ref account"
          style={{
            color: currentPage === 'account' ? 'white' : '#a0a0a0',
          }}
        >
          <RiAccountPinCircleLine />
          <p>account</p>
        </button>
      </Link>
    </nav>
  );
};

export default Navigation;
