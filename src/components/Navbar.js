import React from "react";
import { Link } from "react-router-dom";
import NavTotal from "./subtotalComponents/NavTotal";
import './css/navbar.css';

const Navbar = ({ localCart }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container" id ="navbarNav">
                <div className="navbar-collapse">
                    <Link to="/" className ="navbar-brand">Cras eget hendrerit </Link>
                </div>
                <div className="navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home</Link> 
                        </li> 
                        <li className="nav-item active ">
                            <Link to="/cart" className="nav-link nav-align">Cart
                                <i className="fas fa-shopping-cart pl-2"/>
                                <NavTotal localCart={localCart} />
                            </Link> 
                        </li> 
                    </ul> 
                </div> 
            </div> 
        </nav>
    )
}
export default Navbar;