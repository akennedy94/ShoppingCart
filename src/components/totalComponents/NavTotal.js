import React, {useState, useEffect} from "react";

const NavTotal = ({cart}) => {
    const [cartTotal, setCartTotal] = useState(0);

    const getCartTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceMap = cart.map(product =>  product.productAmount);
        setCartTotal(priceMap.reduce(reducer, 0));
      }

    useEffect(() => {
        getCartTotal();
    }, [cart])

    return (
        <span class="badge badge-secondary ml-1">{cartTotal}</span>
    )   
}

export default NavTotal;