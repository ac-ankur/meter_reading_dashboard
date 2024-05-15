
import React, { useState, useEffect } from "react";
// import logo from '../assets/images/logo.png'
import '../assets/css/navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBarLogin() {
    const [clicked, setClicked] = useState(false);
    const [hideMenu, setHideMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Assuming mobile screen width is less than or equal to 768px

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleHideMenu = () => {
        setHideMenu(!hideMenu);
    };
    const handleLogout=()=>{
        localStorage.removeItem('token')
    }
    return (
        <nav>
           <a href="#" style={{ fontSize: '30px', fontFamily: 'Arial', fontWeight: 'bold', textDecoration: 'none', color: 'white' }}>BPCL</a>

            <div>
                <ul id="navbar" className={clicked ? "active" : ""}>
                    {/* <li><a href="#" className="active">home</a></li> */}
                    {/* <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li> */}
                    {/* <li><Link to="/login" onClick={handleLogout}>Logout</Link></li> */}

                    {/* <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); setHideMenu(!hideMenu); }}>
                            Our Policies
                            <FontAwesomeIcon icon={hideMenu ? faAngleDown : faAngleUp} style={{ marginLeft: '5px' }} />
                        </a>
                        {hideMenu && (
                            <ul className="submenu">
                                <li><a href="#">User Agreement</a></li>
                                <li><a href="#">Privacy Policies</a></li>
                             
                            </ul>
                        )}
                    </li> */}
                </ul>
            </div>
            {isMobile && (
                <div id="mobile">
                    <FontAwesomeIcon id="bar" icon={clicked ? faClose : faBars} onClick={handleClick} style={{ cursor: 'pointer' }} />
                </div>
            )}
        </nav>
    )
}

export default NavBarLogin;
