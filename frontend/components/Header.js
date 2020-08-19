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

import { APP_NAME } from "../config";
import { signout } from "../actions/auth";

import { isAuth } from "../actions/setAuthToken";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        color="blue"
        light
        expand="md"
        className="p-3 mb-2 bg-success text-white"
      >
        <Link href="/">
          <a className="text-danger font-weight-bold  h5">{APP_NAME}</a>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <>
                <NavItem className="ml-5 text-danger font-weight-bold  h5">
                  <Link href="/authSignup">
                    <a className="text-danger font-weight-bold  h5">Register</a>
                  </Link>
                </NavItem>
                <NavItem className="ml-5 text-danger font-weight-bold  h5">
                  <Link href="/authSignin">
                    <a className="text-danger font-weight-bold  h5">Login</a>
                  </Link>
                </NavItem>
              </>
            )}
            {/* {console.log(isAuth())} */}
            {isAuth() && isAuth().role !== 1 && (
              <NavItem className="ml-5 text-danger font-weight-bold  h5">
                <Link href="/user">
                  <a className="text-danger font-weight-bold  h5">{`${
                    isAuth().name
                  }'s Dashboard`}</a>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <>
                <NavItem className="ml-5 text-danger font-weight-bold  h5">
                  <Link href="/admin">
                    <a className="text-danger font-weight-bold  h5">
                      {`${isAuth().name}'s Dashboard`}
                    </a>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuth() && (
              <NavItem className="ml-5 text-danger font-weight-bold  h5">
                <a
                  className="text-danger font-weight-bold  h5"
                  onClick={() => signout(() => Router.replace("/authSignin"))}
                >
                  SignOut
                </a>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
