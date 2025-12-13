import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { FaUserCircle } from "react-icons/fa";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Component() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  return (
    <Navbar fluid rounded className="shadow-sm py-3">
      {/* Brand */}
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-bold text-gray-900">
          Note App
        </span>
      </NavbarBrand>

      {/* Right-side */}
      <div className="flex md:order-2 items-center gap-3">
        {/* Only show user dropdown if logged in */}
        {isLoggedIn && (
          <Dropdown
            inline
            arrowIcon={false}
            label={
              // <Avatar
              //   rounded
              //   alt="User avatar"
              //   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              // />
              <FaUserCircle className="w-8 h-8 text-gray-300" />
            }
          >
            <DropdownHeader>
              <span className="block text-sm font-semibold">
                {user?.name || "User"}
              </span>
              <span className="block truncate text-sm text-gray-600">
                {user?.email}
              </span>
            </DropdownHeader>

            {/* <DropdownItem href="/dashboard">Dashboard</DropdownItem> */}
            <DropdownItem href="/profile">Profile</DropdownItem>
            {/* <DropdownItem href="/settings">Settings</DropdownItem> */}

            <DropdownDivider />

            <DropdownItem onClick={() => logout()} href="/">
              Logout
            </DropdownItem>
          </Dropdown>
        )}

        {/* If NOT logged in → show buttons */}
        {!isLoggedIn && (
          <>
            <Button color="light" href="/login">
              Login
            </Button>
            <Button color="dark" href="/signup">
              Signup
            </Button>
          </>
        )}

        <NavbarToggle />
      </div>

      {/* Navigation links */}
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/services">Services</NavbarLink>
        <NavbarLink href="/pricing">Pricing</NavbarLink>
        <NavbarLink href="/contact">Contact</NavbarLink>

        {/* If logged in → show Note page */}
        {isLoggedIn && <NavbarLink href="/note">My Notes</NavbarLink>}
      </NavbarCollapse>
    </Navbar>
  );
}
