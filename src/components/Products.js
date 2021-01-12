import React from "react"
import { Link } from "react-router-dom"

const Products = ({ products, localCart, setLocalCart }) => {

    const addProductToCart = async function (addProductId, addProductAmount, addProductPrice, addProductName, addProductImage) {
        const productAdd = {
            productId: addProductId,
            productName: addProductName,
            productAmount: addProductAmount,
            productPrice: addProductPrice,
            productImage: addProductImage
        }
        
        const localUpdate = [...localCart];

        if (localCart.map(product => product.productId).includes(productAdd.productId)) {
            const index = localCart.findIndex(item => item.productId === productAdd.productId);
            localUpdate[index].productAmount = localCart[index].productAmount + 1;    
        } else {
            localUpdate.push(productAdd);
        }

        setLocalCart(localUpdate);
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
                        { products.map((product) => { 
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
                                            <div>
                                                <button onClick={() => addProductToCart(product.productId, 1, product.productPrice, product.productName, product.productImage)} 
                                                    className="btn btn-md btn-info">
                                                        Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Products;