import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

import { useSelector } from "react-redux";
const Sidebar = () => {

  const [state, setState] = useState({})
  const [name, setName] = useState('')
  const location = useLocation()
  const userDetail = useSelector((state) => state.home.userDetail);

  //  useEffect(()=>{
  //   // var name = userDetail?.name
  //   // const first = name.split(' ')[0]
  //   // setName(first)


  //  })

  useEffect(() => {
    if (location !== location) {
      onRouteChanged();
    }
  }, [location])

  useEffect(() => {
    onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }, [])

  function onRouteChanged() {
    // document.querySelector('#sidebar').classList.remove('active');
    Object.keys(state).forEach(i => {
      setState({ [i]: false });
    });

    const dropdownPaths = [

      { path: '/manag ement', state: 'generalPagesMenuOpen' },
      { path: '/projectlist,state :"projectlistMenuOpen' }

    ];

    dropdownPaths.forEach((obj => {
      if (isPathActive(obj.path)) {
        setState({ [obj.state]: true })
      }
    }));

  }


  function isPathActive(path) {
    return location.pathname.startsWith(path);
  }





  function toggleMenuState(menuState) {
    if (state[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(state).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(state).forEach(i => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  }
  let formate = userDetail?.designation
  formate?.split(' ')
  


  return (<div>
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link" onClick={evt => evt.preventDefault()}>
            <div className="nav-profile-image">
              {/* <img src={ require("../../assets/images/faces-clipart/pic-1.png") } alt="profile" /> */}
              <span className="login-status online"></span> {/* change to offline or busy as needed */}
            </div>
            <div className="nav-profile-text">
              <span className="font-weight-bold mb-2">{userDetail?.role} </span>
              {/* <span className="text-secondary text-small">{userDetail?.designation}</span> */}
            </div>
            {/* <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i> */}
          </a>
        </li>
        <li className={isPathActive('/') ? 'nav-item ' : 'nav-item'}>
          <Link className="nav-link" to="/">
            <i className="mdi mdi-home menu-icon"></i>
            <span className="menu-title">Dashboard</span>

          </Link>
        </li>



        <li className={isPathActive('/projectlist') ? 'nav-item active' : 'nav-item'}>
          <div className={state.projectlistMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('projectlistMenuOpen')} data-toggle="collapse">
            <i className="mdi mdi-menu menu-icon"></i>
            <span className="menu-title">Project List</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={state.projectlistMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={isPathActive('///projectlist/allproject') ? 'nav-link active' : 'nav-link'} to="/projectlist/allproject">All</Link></li>
              {/* <li className="nav-item"> <Link className={ isPathActive('///projectlist/ontrack') ? 'nav-link active' : 'nav-link' } to="/projectlist/ontrack">On Track</Link></li>
                <li className="nav-item"> <Link className={ isPathActive('///projectlist/introuble') ? 'nav-link active' : 'nav-link' } to="/projectlist/InTrouble"> InTrouble</Link></li>
                <li className="nav-item"> <Link className={ isPathActive('///projectlist/behindschedule') ? 'nav-link active' : 'nav-link' } to="/projectlist/behindschedule">Behind Schedule  </Link></li>
                <li className="nav-item"> <Link className={ isPathActive('///projectlist/onhold') ? 'nav-link active' : 'nav-link' } to="/projectlist/onhold">On Hold   </Link></li>
                <li className="nav-item"> <Link className={ isPathActive('///projectlist/completed') ? 'nav-link active' : 'nav-link' } to="/projectlist/completed">Completed   </Link></li> */}

            </ul>
          </Collapse>

        </li>




        <li className={isPathActive('/management') ? 'nav-item active' : 'nav-item'}>
          <div className={state.generalPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('generalPagesMenuOpen')} data-toggle="collapse">
            <i className="mdi mdi-medical-bag menu-icon"></i>
            <span className="menu-title">Management</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={state.generalPagesMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={isPathActive('///management/usermanagement') ? 'nav-link active' : 'nav-link'} to="/management/usermanagement">User Management</Link></li>
            </ul>
          </Collapse>

        </li>

      </ul>
    </nav></div>
  );




}

export default Sidebar;

