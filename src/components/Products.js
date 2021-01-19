import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { toastAdd } from "./utilityFunctions/toasts"
import Context from '../Context';

const Products = ({ products }) => {
    const context = useContext(Context);
    const [localCart, setLocalCart, wishlist, setWishlist] = [context.localCart, context.setLocalCart, context.wishlist, context.setWishlist];
  
     const addProductToCart = (addProduct) => {
        const localUpdate = [...localCart];

        if (localCart.map(product => product.productId).includes(addProduct.productId)) {
            const index = localCart.findIndex(item => item.productId === addProduct.productId);

            localUpdate[index].productAmount = localCart[index].productAmount + 1;    
        } else {
            addProduct.productAmount = 1;
            localUpdate.push(addProduct);
        }

        setLocalCart(localUpdate);
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

    const handleAddClick = (product) => {
        addProductToCart(product);
        toastAdd("Added to cart!");
    }

    const handleWishlist = (product) => {
        addProductToWishlist(product);
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
                                <button onClick={() => handleClick(product)} 
                                    className="btn btn-md btn-primary">
                                        Add to Cart
                                </button>
                            </div>
                            <div className="row d-flex justify-content-center mt-2">
                                <button onClick={() => handleWishlist(product)} 
                                    className="btn btn-md btn-info">
                                        Add to Wishlist
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