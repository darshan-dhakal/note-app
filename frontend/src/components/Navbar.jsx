import { useContext, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiBars3, HiMoon, HiSun, HiXMark } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import { DarkModeContext } from "../context/DarkModeContext.jsx";

export default function Navbar() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/services", label: "Services" },
      { to: "/contact", label: "Contact" },
      ...(isLoggedIn ? [{ to: "/note", label: "My Notes" }] : []),
    ],
    [isLoggedIn]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="section-shell flex h-16 items-center justify-between gap-3">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Notify
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDarkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>

          {isLoggedIn ? (
            <Dropdown
              className="border border-slate-200 bg-white text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              inline
              arrowIcon={false}
              label={
                user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User avatar" className="h-9 w-9 rounded-full border border-slate-200 object-cover dark:border-slate-700" />
                ) : (
                  <FaUserCircle className="h-9 w-9 text-slate-500 dark:text-slate-300" />
                )
              }
            >
              <DropdownHeader>
                <span className="block text-sm font-semibold">{user?.name || "User"}</span>
                <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</span>
              </DropdownHeader>
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                as={Link}
                to="/"
              >
                Logout
              </DropdownItem>
            </Dropdown>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button as={Link} to="/login" color="light" pill>
                Login
              </Button>
              <Button as={Link} to="/signup" color="blue" pill>
                Sign up
              </Button>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isMenuOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="section-shell border-t border-slate-200 py-3 md:hidden dark:border-slate-800">
          <nav className="flex flex-col gap-2">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {!isLoggedIn && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button as={Link} to="/login" color="light" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Button>
                <Button as={Link} to="/signup" color="blue" onClick={() => setIsMenuOpen(false)}>
                  Sign up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
