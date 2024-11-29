// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none' }}>
          <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/User" style={{ color: '#fff', textDecoration: 'none' }}>User</Link></li>
          <li><Link to="/Month" style={{ color: '#fff', textDecoration: 'none' }}>Month</Link></li>
          <li><Link to="/Category" style={{ color: '#fff', textDecoration: 'none' }}>Category</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
