import { Link } from "react-router-dom";
import "./Navbar.css"; // 👈 we’ll add styles here

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">🐾 PetCare</Link>
      </div>

      <nav className="navbar__links">
        {/* <Link to="/">Dashboard</Link> */}
        <Link to="/About">About</Link>
        {/* <Link to="/adoption">Adoption</Link> */}
        <Link to="/features">Features</Link>
        <Link to="/services">Services</Link>
        {/* <Link to="/community">Community</Link> */}
        <Link to="/admin/Login">Admin</Link>
      </nav>

      <div className="navbar__auth">
        <Link to="/Login" className="btn">Login</Link>
        <Link to="/Signup" className="btn btn--primary">Signup</Link>
      </div>
    </header>
  );
}

export default Navbar;
