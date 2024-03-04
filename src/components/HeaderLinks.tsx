import { Link } from "react-router-dom";

type HeaderLink = {
  title: string;
  path: string;
};

interface HeaderLinksProps {
  headerLinks: HeaderLink[];
}

function HeaderLinks({ headerLinks }: HeaderLinksProps) {
  return (
    <ul className="flex gap-4 text-sm">
      {headerLinks.map((headerLink, index) => (
        <li key={index}>
          <Link
            to={headerLink.path}
            className="router-link-active router-link-exact-active link transition-color px-1.5 py-2 duration-300 hover:text-teal-400"
            aria-current="page"
          >
            {headerLink.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default HeaderLinks;
