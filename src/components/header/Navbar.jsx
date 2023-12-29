import { Link } from "react-router-dom";

const Navbar = ({ toggle, setToggle }) => {
  return (
    <nav style={{ right: toggle && "0" }} className="navbar">
      <div className="navbar-close-icon">
        <i onClick={() => setToggle(false)} className="bi bi-x-lg"></i>
      </div>
      <ul className="navbar-links">

        <Link to="/" onClick={() => setToggle(false)} className="navbar-link">
          Home Page 
        </Link>

        <Link to="/products" onClick={() => setToggle(false)} className="navbar-link">
        Men Fashion
        </Link>

        <Link to="/products/:id" onClick={() => setToggle(false)} className="navbar-link">
        Women Fashion
        </Link>

        <Link to="/cart" onClick={() => setToggle(false)} className="navbar-link">
        Girls Fashion
        </Link>

        <Link to="/special-offers/:id" onClick={() => setToggle(false)} className="navbar-link">
        Boys
        </Link>

      </ul>
    </nav>
  );
};

export default Navbar;
