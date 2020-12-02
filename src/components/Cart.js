import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Cart = (props) => {
    const [cart, setCart] = useState([]);
    const [priceSubtotal, setPriceSubtotal] = useState(0);

    async function getCart() {
      const response = await axios
        .get('/api/cart')
        .then(response => {
          setCart(response.data);
        })
        .catch(error => console.log(error));
    }

    async function increaseItemQuantity(id) {
      const response = await axios
        .patch('/api/cart', {
          productId: id,
          increase: true
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        getCart();
    }

    async function decreaseItemQuantity(id) {
      const response = await axios
        .patch('/api/cart', {
          productId: id,
          increase: false
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        getCart();
    }

    async function clearCart() {
      const response = await axios
        .delete('/api/cart', { 
          data: {
          emptyCart: true
        }})
        .then(response => console.log(response))
        .catch(error => console.log(error));
        getCart();
    }

    async function removeItemFromCart(id) {
      const response = await axios
        .delete('/api/cart', { 
          data: {
          emptyCart: false,
          productId: id
        }})
        .then(response => console.log(response))
        .catch(error => console.log(error));
        getCart();
    }
  
    const getSubtotal = () => {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const priceMap = cart.map(product =>  product.productPrice * product.productAmount);
      return priceMap.reduce(reducer, 0)
    }

    useEffect(() => {
      getCart();
      setPriceSubtotal(getSubtotal());
    }, [cart]);

    return (
        <main>
          <section>
            <div className="banner-innerpage">
              <div className="container">
                <div className="row mt-3 justify-content-center">
                  <div className="col-md-6 align-self-center text-center">
                    <h1 className="title">Cart Listing</h1>
                    <h6 className="subtitle op-8">Ready to checkout?</h6>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row mt-5">
                <div className="col-lg-10">
                  <div className="row shop-listing">
                    <table className="table shop-table">
                      <tr>
                        <th className="b-0">Name</th>
                        <th className="b-0">Price</th>
                        <th className="b-0">Quantity</th>
                        <th className='spacer'></th>
                        <th className="b-0 text-right">Total Price</th>
                      </tr>
                      { cart.map(product => (
                        <tr>
                          <td>{product.productName}</td>
                          <td>${product.productPrice}</td>
                          <td>
                          <button onClick={() => decreaseItemQuantity(product.productId)}
                              className="btn btn-primary btn-sm">-</button>
                            {product.productAmount}
                            <button onClick={() => increaseItemQuantity(product.productId)}
                              className="btn btn-primary btn-sm">+</button>
                          </td>
                          <td>
                            <button onClick={() => removeItemFromCart(product.productId)}
                            className="btn btn-danger">Remove from cart?</button>
                          </td>
                          <td className="text-right">
                            <h5 className="font-medium m-b-30">${product.productPrice * product.productAmount}</h5>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colspan="3" align="right">
                          Subtotal: ${priceSubtotal}
                        </td>
                        <td colspan="4" align="right">
                          <button className="btn btn-danger" onClick={() => clearCart()}>
                            Empty cart
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      );
}

export default Cart;