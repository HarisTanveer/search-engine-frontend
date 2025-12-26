import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Obvio</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/config">Config</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
