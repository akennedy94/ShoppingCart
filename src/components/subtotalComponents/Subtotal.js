import React, {useState, useEffect} from "react";

const Subtotal = ({ localCart }) => {
    const [subtotal, setSubtotal] = useState(0);

    const getSubtotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceMap = localCart.map(product =>  product.productPrice * product.productAmount);
        setSubtotal(priceMap.reduce(reducer, 0));
    }

    useEffect(() => {
        getSubtotal();
    }, [localCart]);

    if (localCart.length === 1){
        return (
            <div>
                <h4>Subtotal ({localCart.length} item): <strong>${subtotal}</strong></h4>
            </div>
        )
    } else {
        return (
            <div>
                <h4>Subtotal ({localCart.length} items): <strong>${subtotal}</strong></h4>
            </div>
        )
    }

}

export default Subtotal;