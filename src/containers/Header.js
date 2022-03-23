import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <div className="nav-name">
        <Link to={`/`}>
          <h2>FakeShop</h2>
        </Link>
        <Link to={`/admin`}>
          <h2>Admin</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
