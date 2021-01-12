import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Subtotal from "./subtotalComponents/Subtotal";
import "./css/cart.css"
const Cart = ({ localCart, setLocalCart }) => {

  const increaseItemQuantity = (id) => {     
    const updateProduct = {
      productId: id,
      quantityToChange: 1
    }

    const index = localCart.findIndex(item => item.productId === updateProduct.productId);
    const updateLocal = [...localCart];

    updateLocal[index].productAmount = localCart[index].productAmount + updateProduct.quantityToChange;
    setLocalCart(updateLocal);
  }

  const decreaseItemQuantity = (id) => {      
    const updateProduct = {
      productId: id,
      increase: false,
      quantityToChange: 1
    }

    const index = localCart.findIndex(item => item.productId === id);
    const updateLocal = [...localCart];

    if (localCart[index].productAmount - 1 > 0) {
      updateLocal[index].productAmount = localCart[index].productAmount - updateProduct.quantityToChange;
      setLocalCart(updateLocal);
    }
  }

  const clearCart = () => {
    const emptyCart = [];
    setLocalCart(emptyCart);
  }


  const removeItemFromCart = (id) => {
    const index = localCart.findIndex(item => item.productId === id);
    const updateLocal = [...localCart];
    updateLocal.splice(index, 1);
    setLocalCart(updateLocal);
  }

  useEffect(() => {console.log(localCart)}, [localCart]);

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
                    {localCart.map(product => (
                      <div className="productDisplay">
                        <div className="productImgDisplay">
                          <img src={`../${product.productImage}`} alt="pic of product"
                          width="200" height="200"></img> 
                        </div>
                        <div className="productInfo">
                          <div className="productNameDisplay">
                            <Link to={`ProductPage/${product.productId}`}
                                  style={{
                                      color:"black",
                                      fontWeight:"bold"
                                  }}>{product.productName}</Link>
                            <div className="priceDisplay">
                              <h5 className="font-medium m-b-30">${product.productPrice}</h5>
                            </div>
                          </div>
                          <div className="controls">
                            <div className="buttonContainer">
                              <button onClick={() => decreaseItemQuantity(product.productId)}
                                className="btn btn-primary btn-sm">-</button>
                              {product.productAmount}
                              <button onClick={() => increaseItemQuantity(product.productId)}
                                className="btn btn-primary btn-sm">+</button>
                            </div>
                            <div>
                              <button onClick={() => removeItemFromCart(product.productId)}
                              className="btn btn-danger">Remove from cart?</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-1">
                <div className="subtotal">
                      <Subtotal localCart={localCart}/>
                      <button className="btn btn-info mt-2" >
                        Save Cart
                      </button>
                      <button className="btn btn-danger mt-2" onClick={() => clearCart()}>
                        Empty Cart
                      </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Cart;