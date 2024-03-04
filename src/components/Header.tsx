import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderLinks from "./HeaderLinks";
import UserDropdown from "./UserDropdown";
import useAuth from "@/hooks/useAuth";

const headerLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Todo List",
    path: "/todo-list",
  },
  {
    title: "Weather",
    path: "/weather",
  },
];

const Header = () => {
  const { user } = useAuth();

  const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false);
  return (
    <header className="sticky flex justify-center px-8 shadow-3">
      <nav className="flex w-full max-w-screen-2xl items-center justify-between py-4">
        <div>
          <Link to="/" className="text-lg font-bold">
            Waizly Test
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <HeaderLinks headerLinks={headerLinks} />
          <div
            onClick={() => setIsOpenDropdownUser(!isOpenDropdownUser)}
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black font-semibold text-white shadow-3"
          >
            <span>
              {user?.name &&
                user.name
                  .replace(/\b(\w)\w*\s*/g, (_: string, firstChar: string) =>
                    firstChar.toUpperCase(),
                  )
                  .slice(0, 2)}
            </span>
            <UserDropdown isOpen={isOpenDropdownUser} />
          </div>
        </div>
        <ul className="block sm:hidden">
          <Link
            to="/"
            className="router-link-active router-link-exact-active link"
            aria-current="page"
          >
            Home
          </Link>
          <Link to="/blogs" className="link">
            Blogs
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
