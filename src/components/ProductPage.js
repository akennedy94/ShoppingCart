import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./css/productPage.css"
import { toastAdd, toastUpdate } from './utilityFunctions/toasts'
import Context from '../Context';

const ProductPage = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const context = useContext(Context);
    const [localCart, setLocalCart, wishlist, setWishlist] = [context.localCart, context.setLocalCart, context.wishlist, context.setWishlist];
    const endPoint = match.match.params.productId;

    useEffect(() => { 
        const product = axios
            .get(`/api/product/${endPoint}`)
            .then(response => {
                setProduct(response.data[0]);
            }).catch(error => console.log(error));
    }, [endPoint]);

    const addProductToCart = (addProduct) => {
        if (localCart.map(product => product.productId).includes(addProduct.productId)) {
            const index = localCart.findIndex(item => item.productId === addProduct.productId);
            const updateLocal = [...localCart];

            updateLocal[index].productAmount = localCart[index].productAmount + quantity;
            setLocalCart(updateLocal);
            toastUpdate("Cart updated!");
        } else {
            addProduct.productAmount = quantity;
            const updateLocal = [...localCart];

            updateLocal.push(addProduct);

            setLocalCart(updateLocal);
            toastAdd("Added to cart!");
        }
    }

    const addProductToWishlist = (product) => {
        const wishlistUpdate = [...wishlist];
        
        if (wishlist.map(product => product.productId).includes(product.productId)) {
            toastAdd("Added to wishlist!");
        } else {
            product.productAmount = 1;
            wishlistUpdate.push(product);
            toastAdd("Added to wishlist!");
        }
        
        setWishlist(wishlistUpdate);
    }

    const increaseItemQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseItemQuantity = () => {
        if (quantity - 1 === 0) return;
        setQuantity(quantity - 1);
    }

    const handleClick = (product) => {
        addProductToCart(product);
    }

    return (
        <main>
            <section>
                <div className="container-fluid">
                    <div className="d-flex flex-row justify-content-center" style={{paddingTop:"125px", paddingRight:"250px"}} >
                        <div>
                            <img src={`../${product.productImage}`} alt="pic of product"
                                width="400" height="400"></img> 
                        </div>
                        <div className="d-flex flex-column flex-wrap" style={{width:"400px", paddingLeft: "30px"}}>
                            <h2>{product.productName}</h2>
                            <h4>${product.productPrice}</h4>
                            <h3>{product.productDescription}</h3>
                            <p>{product.detailedDescription}</p>
                            <div className="flex-row justify-content-center">
                                <button onClick={decreaseItemQuantity}
                                    className="btn btn-primary btn-sm">
                                    -
                                </button>
                                {quantity}
                                <button onClick={increaseItemQuantity}
                                    className="btn btn-primary btn-sm">
                                    +
                                </button>
                                <button onClick={(e) => { 
                                        e.preventDefault();
                                        handleClick(product);}} 
                                        className="btn btn-primary ml-3">
                                    Add to cart
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    addProductToWishlist(product);}}
                                    className="btn btn-info btn-md ml-3">
                                    Add to wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProductPage;