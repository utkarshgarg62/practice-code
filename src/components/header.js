import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header>
      <a href="/">Logo</a>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/bookslist">Books</NavLink>
          </li>
          <li>
            <a href="https://utkarshhgarg.netlify.app/">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
