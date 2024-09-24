import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"; // Import Link for navigation
import "../Styles/navbar.css";

const Navbar = (props) => {
    const [nav, setNav] = useState(["World", "Politics", "Business", "Technology", "Sports",
        "Entertainment", "Health", "Science", "Opinion"])
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function parseLst() {
        let nvl = props.nav
        if(nvl === "") {
            setNav(["World", "Politics", "Business", "Technology", "Sports",
        "Entertainment", "Health", "Science", "Opinion"])
        } else {
            console.log(nvl)
            let val = nvl.split("%2C")
            let nvs = []
            // eslint-disable-next-line array-callback-return
            val.map((ind, nvd) => {
                nvs[ind] = nvd
                val.remove(nvd)
            })
            nvs.concat(val)
            setNav(nvs)
        }
    }

    useEffect(() => {
        parseLst()
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header bg-[#0000001a] backdrop-blur-[4px] border-b-1">
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
                <ul className="menu-list ">
                    {nav.map((item) => (
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
