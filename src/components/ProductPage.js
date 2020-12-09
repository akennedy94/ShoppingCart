import React, { useState, useEffect } from "react"
import axios from "axios"

const ProductPage = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState({});

    async function addProductToCart(addProductId, addProductAmount, addProductPrice, addProductName) {
        if (cart.map(product => product.productId).includes(addProductId)) {
            const response = await axios
                .patch("/api/cart", {
                productId: addProductId,
                increase: true,
                quantityToChange: quantity
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        } else {
            const response = await axios
                .post("/api/cart", {
                    productId: addProductId,
                    productName: addProductName,
                    productAmount: addProductAmount,
                    productPrice: addProductPrice,
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }
    }

    async function getProduct() {
        const endPoint = props.match.params.productId;
        const response = await axios
            .get(`/api/product/${endPoint}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => console.log(error));
    }

    async function getCart() {
        const response = await axios
          .get("/api/cart")
          .then(response => {
            setCart(response.data);
          })
          .catch(error => console.log(error));
    }

    const increaseItemQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseItemQuantity = () => {
        if (quantity - 1 === 0) return;
        setQuantity(quantity - 1);
    }

    useEffect(() => {
        getCart();
        getProduct();
    }, [cart]);

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
                                <button onClick={() => addProductToCart(product.productId, quantity, 
                                product.productPrice, product.productName)}
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