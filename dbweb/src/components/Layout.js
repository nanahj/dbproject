import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <nav>
          <div className="nav-circle-container">
            <Link to="/User" className="nav-circle">User</Link>
          </div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>

                <Link to="/" className="nav-link">Main</Link>
                <div className="divider"></div>
                <Link to="/Month" className="nav-link">월별 지출 내역</Link>
                <div className="divider"></div>
                <Link to="/Category" className="nav-link">분류별 지출 내역</Link>
                <div className="divider"></div>
                <Link to="/Score" className="nav-link">금융 습관 점수</Link>
        </nav>
      </aside>
      <div className="main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
