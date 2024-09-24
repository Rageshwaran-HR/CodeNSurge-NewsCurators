import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Styles/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <img
        src="./Untitled.png"
        className="header-logo"
        alt="News Logo"
      />
      <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className={`menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="menu-list">
          {[
            "World",
            "Politics",
            "Business",
            "Technology",
            "Sports",
            "Entertainment",
            "Health",
            "Science",
            "Opinion"
          ].map((item) => (
            <li className="menu-list-item" key={item}>
                <Link className="menu-link" to={`/${item}`}>
                {item}
                </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
