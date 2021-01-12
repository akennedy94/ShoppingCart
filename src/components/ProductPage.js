import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/productPage.css"
const ProductPage = ({ localCart, setLocalCart, match }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});

    const addProductToCart = async function (addProductId, addProductAmount, addProductPrice, addProductName, addProductImage) {
        if (localCart.map(product => product.productId).includes(addProductId)) {
            const updateProduct = {
                productId: addProductId,
                quantityToChange: addProductAmount
            }
      
            const index = localCart.findIndex(item => item.productId === updateProduct.productId);
            const updateLocal = [...localCart];
      
            updateLocal[index].productAmount = localCart[index].productAmount + updateProduct.quantityToChange;
            setLocalCart(updateLocal);
        } else {
            const productAdd = {
                productId: addProductId,
                productName: addProductName,
                productAmount: addProductAmount,
                productPrice: addProductPrice,
                productImage: addProductImage,
            }

            const updateLocal = [...localCart];
            updateLocal.push(productAdd);
            setLocalCart(updateLocal);
        }
    }

    const increaseItemQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseItemQuantity = () => {
        if (quantity - 1 === 0) return;
        setQuantity(quantity - 1);
    }

    const getProduct = async function () {
        const endPoint = match.match.params.productId;
        const response = await axios
            .get(`/api/product/${endPoint}`)
            .then(response => {
                setProduct(response.data[0]);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getProduct();
    }, []);

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
                                className="btn btn-primary btn-sm">-</button>
                                {quantity}
                                <button onClick={increaseItemQuantity}
                                className="btn btn-primary btn-sm">+</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    addProductToCart(product.productId, quantity, product.productPrice, product.productName, product.productImage)
                                }}
                                className="btn btn-primary ml-3">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProductPage;