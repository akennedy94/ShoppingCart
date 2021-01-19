import React, { useContext } from "react";
import { toastRemove, toastAdd } from './utilityFunctions/toasts'; 
import { Link } from "react-router-dom";
import Context from '../Context';

const Wishlist = () => {
    const context = useContext(Context);
    const [localCart, setLocalCart, wishlist, setWishlist] = [context.localCart, context.setLocalCart, context.wishlist, context.setWishlist];

    const transferItem = (transferProduct) => {
      if (localCart.map(product => product.productId).includes(transferProduct.productId)) {
        const index = localCart.findIndex(item => item.productId === transferProduct.productId);
        const updateLocal = [...localCart];
  
        updateLocal[index].productAmount = localCart[index].productAmount + 1;
        
        setLocalCart(updateLocal);
        removeItemFromWishlist(transferProduct.productId, true);
      } else {
        const updateLocal = [...localCart];

        updateLocal.push(transferProduct);

        setLocalCart(updateLocal);
        removeItemFromWishlist(transferProduct.productId, true);
      }
    }
  
    const removeItemFromWishlist = (id, transfer) => {
      const index = wishlist.findIndex(item => item.productId === id);
      const updateLocal = [...wishlist];

      updateLocal.splice(index, 1);
      setWishlist(updateLocal);

      if (transfer) {
        toastAdd("Item added to cart!");
      } else {
        toastRemove("Item removed!");
      }
    }
  
    return (
      <section>
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-8">
                <div className="row shop-listing">
                  <div className="cart">
                    <div className="cartHeader">
                      <h3>Wishlist</h3>
                    </div>
                    <div className="productColumn">
                      <WishlistCol removeItemFromWishlist={removeItemFromWishlist} transferItem={transferItem}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
  }
  
  const WishlistCol = ({ removeItemFromWishlist, transferItem }) => {
    const context = useContext(Context);
    const [wishlist] = [context.wishlist];

    return (
        wishlist.map(product => (
        <div className="productDisplay">
          <div className="productImgDisplay">
            <img src={`../${product.productImage}`} alt="pic of product"
            width="150" height="150"></img> 
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
              <button className="btn btn-info" 
              onClick={() => {transferItem(product)}}>
                  Add to Cart</button>
              <button className="btn btn-danger ml-4" 
              onClick={() => {removeItemFromWishlist(product.productId, false)}}>
                  Remove from Wishlist</button>
            </div>
          </div>
        </div>
        )
      )
    )
  }

  export default Wishlist;