import React, {useState, useEffect} from "react";

const Subtotal = ({cart}) => {
    const [subtotal, setSubtotal] = useState(0);

    const getSubtotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceMap = cart.map(product =>  product.productPrice * product.productAmount);
        setSubtotal(priceMap.reduce(reducer, 0));
    }

    useEffect(() => {
        getSubtotal();
    }, [cart]);

    return (
        <td>Subtotal: ${subtotal}</td>
    )
}

export default Subtotal;