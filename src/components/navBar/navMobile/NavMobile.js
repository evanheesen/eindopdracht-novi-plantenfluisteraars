import React, {useRef, useState} from 'react';
import menu from '../../../assets/hamburger-menu.png';
import 'NavMobile.css';
import {Link} from "react-router-dom";

// function NavMobile(props) {
    const DropdownMenu = () => {
        const dropdownRef = useRef(null);
        const [isActive, setIsActive] = useState(false);
        const onClick = () => setIsActive(!isActive);

    return (
        <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
                <img src={menu} alt="menu"/>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li><Link to="/concept">Concept</Link></li>
                    <li><Link to="/prijzen">Prijzen</Link></li>
                    <li><Link to="/over-ons">Over ons</Link></li>
                    <li><Link to="/aanvragen">Aanvragen</Link></li>
                </ul>
            </nav>

        </div>
    );
}

export default NavMobile;