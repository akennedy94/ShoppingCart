import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutSummary from "./subtotalComponents/CheckoutSummary";
import Wishlist from "./Wishlist";
import "./css/cart.css";
import { toastAdd, toastClear, toastRemove } from "./helperFunctions/toasts";
import Context from "../Context";
import { addProductToWishlist } from "./helperFunctions/adders";

const Cart = () => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const context = useContext(Context);
  const [localCart, setLocalCart, wishlist, setWishlist] = [
    context.localCart,
    context.setLocalCart,
    context.wishlist,
    context.setWishlist,
  ];

  const getQuantity = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const quantity = localCart
      .map((product) => product.productAmount)
      .reduce(reducer, 0);

    setItemQuantity(quantity);
  };

  const clearCart = () => {
    const emptyCart = [];

    setLocalCart(emptyCart);
    toastClear("Cart cleared!");
  };

  const handleAdd = (product) => {
    setWishlist(addProductToWishlist(product, wishlist));
  };

  useEffect(() => {
    getQuantity();
  }, [localCart]);

  return (
    <main>
      <section>
        <div className="banner-innerpage">
          <div className="container">
            <div className="row mt-3 justify-content-center">
              <div className="col-md-6 align-self-center text-center">
                <h1 className="title">Vivamus ullamcorper lectus</h1>
                <h5 className="subtitle op-8">Suspendisse viverra mi nec</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-8">
              <div className="row shop-listing">
                <div className="cart">
                  <div className="cartHeader">
                    <h3>Shopping Cart</h3>
                  </div>
                  <div className="productColumn">
                    {localCart.length === 0 ? (
                      <div className="emptyDisplay">
                        <h4>Your cart is empty!</h4>
                      </div>
                    ) : (
                      <ProductCol handleAdd={handleAdd} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-1">
              <div className="subtotal">
                <CheckoutSummary
                  localCart={localCart}
                  itemQuantity={itemQuantity}
                />
                <button className="btn btn-danger mt-2" onClick={clearCart}>
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Wishlist />
      </section>
    </main>
  );
};

const ProductCol = ({ handleAdd }) => {
  const context = useContext(Context);
  const [localCart, setLocalCart] = [context.localCart, context.setLocalCart];

  const increaseItemQuantity = (id) => {
    const index = localCart.findIndex((item) => item.productId === id);
    const updateLocal = [...localCart];

    updateLocal[index].productAmount = localCart[index].productAmount + 1;
    setLocalCart(updateLocal);
  };

  const decreaseItemQuantity = (id) => {
    const index = localCart.findIndex((item) => item.productId === id);
    const updateLocal = [...localCart];

    if (localCart[index].productAmount - 1 > 0) {
      updateLocal[index].productAmount = localCart[index].productAmount - 1;
      setLocalCart(updateLocal);
    }
  };

  const removeItemFromCart = (id, save) => {
    const index = localCart.findIndex((item) => item.productId === id);
    const updateLocal = [...localCart];

    updateLocal.splice(index, 1);
    setLocalCart(updateLocal);

    if (save) {
      toastAdd("Item moved to wishlist!");
    } else {
      toastRemove("Item removed!");
    }
  };

  const saveForLater = (product) => {
    removeItemFromCart(product.productId, true);
    handleAdd(product);
  };

  return localCart.map((product) => (
    <div className="productDisplay">
      <div className="product-display-container">
        <img
          className="responsive-cart-image"
          src={`../${product.productImage}`}
          alt="pic of product"
        />
        <div className="button-container">
          <button
            onClick={() => decreaseItemQuantity(product.productId)}
            className="btn btn-primary"
          >
            -
          </button>
          <div className="quantity-align">{product.productAmount}</div>
          <button
            onClick={() => increaseItemQuantity(product.productId)}
            className="btn btn-primary"
          >
            +
          </button>
        </div>
      </div>
      <div className="productInfo">
        <div className="productNameDisplay">
          <Link
            to={`ProductPage/${product.productId}`}
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            {product.productName}
          </Link>
          <div className="priceDisplay">
            <h5 className="font-medium m-b-30">${product.productPrice}</h5>
          </div>
        </div>
        <div className="controls">
          <div className="align-responsive">
            <button
              onClick={() => removeItemFromCart(product.productId, false)}
              className="btn btn-danger btn-responsive"
            >
              Remove
            </button>
          </div>
          <div className="align-responsive">
            <button
              onClick={() => saveForLater(product)}
              className="btn btn-info ml-2 btn-responsive"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Cart;
