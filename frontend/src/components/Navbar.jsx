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
import { useState } from "react";

import { Home } from "../pages/Home.jsx";
import { LogoutButton } from "./LogOutButton.jsx";

export function Component() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   setIsLoggedIn(false);
  // }
  // console.log(isLoggedIn);

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Note App
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem></DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>

      <Button color="dark" href="/signup" outline>
        Signup
      </Button>
      {/* {isLoggedIn == true ? ( */}
      <Button color="light" href="/login">
        Login
      </Button>
      {/* ) : ( */}
      <LogoutButton color="light" href="/">
        Log out
      </LogoutButton>
      {/* )} */}
    </Navbar>
  );
}
export default Component;
