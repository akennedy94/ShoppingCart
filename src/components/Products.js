import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([]);

    async function getProduct() {
        const product = await axios
            .get('http://localhost:3001/api/product')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.log(error));
    }

    async function addProductToCart(addProductId, addProductAmount, addProductPrice, addProductName) {
        const response = await axios
            .post('http://localhost:3001/api/cart', {
                productId: addProductId,
                productName: addProductName,
                productAmount: addProductAmount,
                productPrice: addProductPrice,
            })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <main>
            <section>
                <div className="banner-innerpage">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h1 className='title'>A listing of all of the products!</h1>
                                <h6 classname='subtitle op-8'>Catchy reassurance of qualitity!</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-lg-9'>
                            <div className='row shop-listing'>
                                { products.map((product, i) => { 
                                    return (
                                        <div className='col-lg-4'>
                                            <div className='card shop hover-border-0'>
                                                <img src={'http://localhost:3001/' + product.productImage} alt='wrapkit' className='img-fluid' />
                                                <div className='card-img-overlay align-items-center'>
                                                    <button onClick={() => addProductToCart(product.productId, 1, product.productPrice, product.productName)} className='btn btn-md btn-info'>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='card border-0'>
                                                <h5>{product.productName}</h5>
                                                <h6 classname='subtitle'>{product.productDescription}</h6>
                                                <h5 className='font-medium m-b-30'>${product.productPrice}</h5>
                                            </div>
                                        </div>
                                    )})}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Products;