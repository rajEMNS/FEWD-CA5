import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <>
      <div id='navbar' className='navbar-fixed'>
        <div className='navbar-logo'>
          <Link to='/'>
            <img src="https://kalvium.community/images/sidebar-3d-logo.svg" alt="" />
          </Link>
        </div>
        <div className='navbar-links'>
          <NavLink to="/registration" activeclassname='active-link'>
            REGISTER
          </NavLink>
        </div>
      </div>
    </>
  );
}