import React from 'react';
import { Link } from 'react-router-dom';
import "./nav.css";

const Nav = () => {
    return (
        <div className="nav-container"> 
            <ul>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/books" className="nav-link">Book-details</Link></li>
                <li><Link to="/create" className="nav-link">Create</Link></li>
            </ul>
        </div>
    );
};

export default Nav;