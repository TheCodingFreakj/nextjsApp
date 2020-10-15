import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import Link from "next/link";
import Router from "next/router";

import NProgress from "nprogress";

import { APP_NAME } from "../config";
import { signout } from "../actions/auth";

import { isAuth, userRole } from "../actions/setAuthToken";

import "../node_modules/nprogress/nprogress.css";
import Search from "../components/blogs/search";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const renderHeader = (userRole) => {
    switch (userRole) {
      case "consumer":
        return (
          <>
            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <a
                className="text-light font-weight-bold  h5"
                onClick={() => signout(() => Router.replace("/customerSignin"))}
              >
                SignOut
              </a>
            </NavItem>

            <NavItem className="ml-5 text-light  font-weight-bold  h5">
              <Link href="/cart">
                <a className="text-light  font-weight-bold  h5">
                  View Your Cart
                </a>
              </Link>
            </NavItem>

            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <Link href="/customer">
                <a className="text-light font-weight-bold  h5">
                  {`${isAuth().name}'s Dashboard`}
                </a>
              </Link>
            </NavItem>
          </>
        );
        break;
      case 0:
        return (
          <>
            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <Link href="/user">
                <a className="text-light font-weight-bold  h5">{`${
                  isAuth().name
                }'s Dashboard`}</a>
              </Link>
            </NavItem>

            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <a
                className="text-light font-weight-bold  h5"
                onClick={() => signout(() => Router.replace("/authSignin"))}
              >
                StaffSignOut
              </a>
            </NavItem>
          </>
        );
        break;

      case 1:
        return (
          <>
            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <Link href="/authSignup">
                <a className="text-light font-weight-bold  h5">Signup</a>
              </Link>
            </NavItem>
            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <Link href="/admin">
                <a className="text-light font-weight-bold  h5">
                  {`${isAuth().name}'s Dashboard`}
                </a>
              </Link>
            </NavItem>

            <NavItem className="ml-5 text-light font-weight-bold  h5">
              <a
                className="text-light font-weight-bold  h5"
                onClick={() => signout(() => Router.replace("/authSignin"))}
              >
                StaffSignOut
              </a>
            </NavItem>
          </>
        );
        break;
      default:
        return null;
    }
  };
  return (
    <React.Fragment>
      <Navbar
        color="blue"
        light
        expand="md"
        className="p-3 mb-2 bg-success text-white"
      >
        <Link href="/">
          <a className="text-light font-weight-bold  h5">{APP_NAME}</a>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem className="ml-5 text-light font-weight-bold  h5">
                <Link href="/blogs">
                  <a className="text-light font-weight-bold  h5">Blogs</a>
                </Link>
              </NavItem>

              <NavItem className="ml-5 text-light  font-weight-bold  h5">
                <Link href="/contact">
                  <a className="text-light  font-weight-bold  h5">Contact</a>
                </Link>
              </NavItem>

              <NavItem className="ml-5 text-light  font-weight-bold  h5">
                <Link href="/services">
                  <a className="text-light  font-weight-bold  h5">Services</a>
                </Link>
              </NavItem>
              <NavItem className="ml-5 text-light  font-weight-bold  h5">
                <Link href="/authSignin">
                  <a className="text-light  font-weight-bold  h5">Login</a>
                </Link>
              </NavItem>

              <NavItem className="ml-5 text-light  font-weight-bold  h5">
                <Link href="/customerSignup">
                  <a className="text-light  font-weight-bold  h5">
                    Create Account
                  </a>
                </Link>
              </NavItem>
            </React.Fragment>

            {renderHeader(userRole())}
            {/* {console.log(userRole())}
            {console.log(isAuth())} */}

            {/* <NavItem className="ml-5 text-light font-weight-bold  h5">
              <Link href="/user/blogs">
                <a className="text-light font-weight-bold  h5">Write a Blog</a>
              </Link>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>

      <Search />
    </React.Fragment>
  );
};

export default Header;
