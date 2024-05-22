import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import './utils.css';
import { NAVBAR_LEFT } from './navbar-left-data';

type masterLayoutProps = {
  children: React.ReactNode; // 👈️ define children prop
};

export const MasterLayout = (props: masterLayoutProps) => {
  /**
   * show/hide navbarLeft
   */
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const [navbarLefts, setNavbarLefts] = useState(NAVBAR_LEFT);

  const navigate = useNavigate();

  //set fullHeight
  const fullHeight = () => {
    const jsFullheight = document.getElementsByClassName('js-fullheight');
    for (let i = 0; i < jsFullheight.length; i++) {
      const e = jsFullheight[i];
      if (e instanceof HTMLElement) {
        e.style.height = window.innerHeight + 'px';
      }
    }
    window.addEventListener(
      'resize',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (event) {
        const jsFullheight = document.getElementsByClassName('js-fullheight');
        for (let i = 0; i < jsFullheight.length; i++) {
          const e = jsFullheight[i];
          if (e instanceof HTMLElement) {
            e.style.height = window.innerHeight + 'px';
          }
        }
      },
      true,
    );
  };

  fullHeight();

  const showDropDownLeft = (event: React.MouseEvent, id: number) => {
    const navbarLeftTemp = [...navbarLefts];
    if (navbarLeftTemp[id].link === '') {
      event.preventDefault();
    }

    for (let i = 0; i < navbarLeftTemp.length; i++) {
      navbarLeftTemp[i].active = false;
      // apply for drop down
      if (navbarLeftTemp[i].children?.length > 0) {
        if (i === id) {
          navbarLeftTemp[i].open = !navbarLeftTemp[i].open;
        } else {
          navbarLeftTemp[i].open = false;
        }
        navbarLeftTemp[i].ulClass = 'collapse list-unstyled';
        navbarLeftTemp[i].linkClass = 'dropdown-toggle collapsed';
      }
    }
    navbarLeftTemp[id].active = true;
    navbarLeftTemp[id].linkClass = navbarLeftTemp[id].open
      ? 'dropdown-toggle'
      : 'dropdown-toggle collapsed';
    navbarLeftTemp[id].ulClass = navbarLeftTemp[id].open
      ? 'collapse list-unstyled show'
      : 'collapse list-unstyled';
    setNavbarLefts(navbarLeftTemp);
  };

  const addLinkActiveChildDropDownLeft = (
    id: number,
    childId: number,
    childLink: string,
  ) => {
    const navbarLeftTemp = [...navbarLefts];
    const el = navbarLeftTemp[id];

    for (let i = 0; i < el.children.length; i++) {
      el.children[i].active = false;
    }
    el.children[childId].active = true;
    setNavbarLefts(navbarLeftTemp);
    return navigate(childLink);
  };

  const toggleLeftMenu = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
          <div className="p-4 pt-5">
            <Link to={''}>
              <input
                type="image"
                src={require('resources/img/_layout/logo.jpg')}
                className="img logo rounded-circle"
                alt="description image"
              />
            </Link>
            <ul className="list-unstyled components mb-5 mt-5">
              {navbarLefts.map((navbar, key) => (
                <li key={key} className={navbar.active ? 'active' : ''}>
                  {navbar.children?.length > 0 ? (
                    <Fragment>
                      <Link
                        to={navbar.link}
                        className={navbar.linkClass}
                        data-toggle="collapse"
                        aria-expanded="false"
                        onClick={(e) => showDropDownLeft(e, navbar.id)}
                      >
                        {navbar.text}
                      </Link>
                      <ul className={navbar.ulClass}>
                        {navbar.children.map((child, keyChild) => (
                          <li
                            key={keyChild}
                            className={child.active ? 'active' : ''}
                          >
                            <Link
                              to={child.link}
                              onClick={() =>
                                addLinkActiveChildDropDownLeft(
                                  navbar.id,
                                  child.id,
                                  child.link,
                                )
                              }
                            >
                              {child.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Fragment>
                  ) : (
                    <Link
                      to={navbar.link}
                      onClick={(e) => showDropDownLeft(e, navbar.id)}
                    >
                      {navbar.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* <!-- Page Content  --> */}
        <div id="content" className="pt-4 pb-4 ps-1 pe-1 p-md-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid" style={{ minWidth: '7rem' }}>
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-yellow"
                onClick={toggleLeftMenu}
              >
                <i className="fa fa-bars"></i>
                <span className="sr-only">Toggle Menu</span>
              </button>
              <button
                className="btn btn-dark d-inline-block d-lg-none ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars"></i>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link to={'/'} className="nav-link">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container-fluid">{props.children}</div>
        </div>
      </div>
    </>
  );
};
