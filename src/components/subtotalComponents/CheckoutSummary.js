import React, { useState, useEffect } from "react";

const CheckoutSummary = ({ localCart, itemQuantity }) => {
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    
    const getSubtotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const price = localCart.map(product =>  product.productPrice * product.productAmount).reduce(reducer, 0);
        setSubtotal(price);
    }

    useEffect(() => {getSubtotal()}, [localCart]);

    useEffect(() => {
        if (itemQuantity < 10 && itemQuantity >= 1) {
            setShipping(5);
        } else if (itemQuantity >= 10 && itemQuantity < 30) {
            setShipping(15);
        } else if (itemQuantity >= 30) {
            setShipping(25);
        }
    }, [itemQuantity])

    return (
        <div className="container">
            <div className="row">
                <div className="col-9 d-flex justify-content-start align-items-center">
                    <h4>Subtotal {itemQuantity === 1 ? `(${itemQuantity} item)` : `(${itemQuantity} items)`}:</h4>
                </div>
                <div className="col-3 d-flex justify-content-end align-items-center">
                    <div>
                        <strong>${subtotal}</strong> 
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 d-flex justify-content-start align-items-center">
                    <h6>Shipping and handling:</h6>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <div>
                        <strong>${shipping}</strong>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 d-flex justify-content-start align-items-center">
                    <h6>Total before tax:</h6>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <div>
                        <strong>${subtotal}</strong>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 d-flex justify-content-start align-items-center">
                    <h6>Estimated tax:</h6>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <div>
                        <strong>${(subtotal * .1).toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 d-flex justify-content-start align-items-center">
                    <h4>Total:</h4>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <div>
                        <h5><strong>${(subtotal + (subtotal * .1) + shipping).toFixed(2)}</strong></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSummary;