import React, {useState, useEffect} from "react";

const NavTotal = ({ localCart }) => {
    const [cartTotal, setCartTotal] = useState(0);

    const getCartTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceMap = localCart.map(product =>  product.productAmount);
        setCartTotal(priceMap.reduce(reducer, 0));
      }

    useEffect(() => {
        getCartTotal();
    }, [localCart])

    return (
        <span className="badge badge-secondary ml-1">{cartTotal}</span>
    )   
}

export default NavTotal;