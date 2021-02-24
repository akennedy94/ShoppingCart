import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { toastAdd } from "./helperFunctions/toasts"
import Context from '../Context';
import { addProductToWishlist, addProductToCart } from './helperFunctions/adders';

const Products = ({ products }) => {
    const context = useContext(Context);
    const [localCart, setLocalCart, wishlist, setWishlist] = [context.localCart, context.setLocalCart, context.wishlist, context.setWishlist];

    const handleAddClick = (product) => {
        setLocalCart(addProductToCart(product, localCart));
        toastAdd("Added to cart!");
    }

    const handleWishlist = (product) => {
        setWishlist(addProductToWishlist(product, wishlist));
        toastAdd("Added to wishlist!");
    }

    return (
        <main>
            <section>
                <div className="banner-innerpage">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-3 align-self-center text-center">
                                <h1 className="title">Etiam hendrerit tristique</h1>
                                <h5 className="subtitle op-8">Donec nec lobortis purus</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <Product products={products} handleClick={handleAddClick} handleWishlist={handleWishlist}/>
                    </div>
                </div>
            </section>
        </main>
    )
}

const Product = ({ products, handleClick, handleWishlist }) => {

    return (
        products.map((product) => { 
            return (
                <div key={product.productId} className="col-3" id="productDisplay">
                    <div className="card border-light text-center">
                        <div className="bg-light">
                            <img src={product.productImage} alt="wrapkit" className="card-img-top" />
                        </div>
                        <div className="card-body bg-light">
                            <Link to={`ProductPage/${product.productId}`} 
                                style={{
                                    color:"black",
                                    fontWeight:"bold"
                                }}
                                >{product.productName}
                            </Link>
                            <h5 className="font-medium b-30">${product.productPrice}</h5>
                            <div className="row d-flex justify-content-center">
                                <button onClick={() => handleWishlist(product)} 
                                    className="btn btn-md btn-info">
                                        Add to Wishlist
                                </button>
                            </div>

                            <div className="row d-flex justify-content-center mt-2">
                                <button onClick={() => handleClick(product)} 
                                    className="btn btn-md btn-primary mb-3">
                                        Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        )
    )
}

export default Products;