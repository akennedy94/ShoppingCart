import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavTotal from "./totalComponents/NavTotal";

const Navbar = () => {
    const [cart, setCart] = useState([]);

    async function getCart() {
        const response = await axios
          .get("/api/cart")
          .then(response => {
            setCart(response.data);
          })
          .catch(error => console.log(error));
      }

    useEffect(() => {
        getCart();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container">
                <Link to="/" className ="navbar-brand">Cras eget hendrerit magna</Link>
                <div className="collapse navbar-collapse justify-content-end" id ="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home</Link> 
                        </li> 
                        <li className="nav-item active">
                            <Link to="/cart" className="nav-link">Cart
                                <i class="fas fa-shopping-cart pl-2"/>
                                <NavTotal cart={cart} />
                            </Link> 
                        </li> 
                    </ul> 
                </div> 
            </div> 
        </nav>
    )
}
export default Navbar;