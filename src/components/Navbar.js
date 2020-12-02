import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container">
            <Link to="/" className ="navbar-brand">Cras eget hendrerit magna</Link>
            <div className="collapse navbar-collapse justify-content-end" id ="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link> </li> 
                    <li className="nav-item">
                    <Link to="/cart" className="nav-link">Cart</Link> </li> 
                </ul> 
            </div> 
        </div> 
    </nav>
    )
}

export default Navbar