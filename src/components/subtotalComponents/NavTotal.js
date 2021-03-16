import React, { useState, useEffect } from "react";

const NavTotal = ({ localCart }) => {
  const [cartTotal, setCartTotal] = useState(0);

  const getCartTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const priceMap = localCart.map((product) => product.productAmount);
    setCartTotal(priceMap.reduce(reducer, 0));
  };

  useEffect(() => {
    getCartTotal();
  }, [localCart]);

  if (cartTotal >= 1) {
    return <span className="badge badge-primary ml-2">{cartTotal}</span>;
  } else {
    return <span className="badge badge-secondary ml-2">{cartTotal}</span>;
  }
};
export default NavTotal;
