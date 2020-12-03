import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"  
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([]);

    async function getProduct() {
        const product = await axios
            .get('/api/product')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.log(error));
    };

    async function addProductToCart(addProductId, addProductAmount, addProductPrice, addProductName) {
        const response = await axios
            .post('/api/cart', {
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
                            <div className="col-md-8 mt-3 align-self-center text-center">
                                <h1 className='title'>Etiam hendrerit tristique</h1>
                                <h5 classname='subtitle op-8'>Donec nec lobortis purus</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <div className='row mt-3'>
                        <div className='col-lg-12'>
                            <div className='row'>
                                { products.map((product) => { 
                                    return (
                                        <div className='col-lg-3'>
                                            <div className='card hover-border-0'>
                                                <img src={product.productImage} alt='wrapkit' className='img-fluid' />
                                            </div>
                                            <div className='card border-0'>
                                                <NavLink 
                                                    to={{
                                                        pathname:'/ProductPage',
                                                        singleProduct: {
                                                            productId: product.productId,
                                                            productImage: product.productImage,
                                                            productPrice: product.productPrice,
                                                            productName: product.productName,
                                                            productDescription: product.productDescription,
                                                            detailedDescription: product.detailedDescription
                                                        }
                                                    }}
                                                    style={{
                                                        color:'black',
                                                        fontWeight:'bold'
                                                    }}
                                                    >{product.productName}</NavLink>
                                                <h6 classname='subtitle'>{product.productDescription}</h6>
                                                <h5 className='font-medium b-30'>${product.productPrice}</h5>
                                                <div>
                                                    <button onClick={() => addProductToCart(product.productId, 1, product.productPrice, product.productName)} 
                                                        className='btn btn-md btn-info ml-1 mb-3'>
                                                            Add to Cart
                                                    </button>
                                                </div>
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