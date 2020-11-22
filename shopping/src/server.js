const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/public', express.static('../public'));

const products = [
    {
        productId: '001',
        productName: 'This could be',
        productDescription: 'A concise',
        productPrice: 195,
        productImage: 'public/productimg/test.png'
    }, 
    {
        productId: '002',
        productName: 'the title',
        productDescription: 'eye catching',
        productPrice: 255,
        productImage: 'public/productimg/test.png'
    },
    {
        productId: '003',
        productName: 'of your product!',
        productDescription: 'description!',
        productPrice: 60,
        productImage: 'public/productimg/test.png'
    },
    {
        productId: '004',
        productName: 'Last item!',
        productDescription: 'It\'s working!',
        productPrice: 60,
        productImage: 'public/productimg/test.png'
    }
];

let cart = [];

// returns list of products
app.get('/api/product', (req, res) => {
    res.json(products);
});

// if the item already exists in the cart, update the quantity
// else add new item to cart
app.post('/api/cart', (req, res) => {
    const sentProduct = req.body;
    
    if (cart.map(product => product.productId).includes(sentProduct.productId)) {
        const index = cart.findIndex(item => item.productId === sentProduct.productId);
        cart[index].productAmount = cart[index].productAmount + 1;    
    } else {
        cart.push(sentProduct);
    }
    
    res.json(cart);
});

// gets the cart
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// checks to see if chart should be set to empty
// else finds index of item to remove and splices it out
app.delete('/api/cart', (req, res) => {
    const instructions = req.body;
    
    if (instructions.emptyCart) {
        cart = [];
    } else {
        const index = cart.findIndex(item => item.productId === instructions.productId);
        cart.splice(index, index + 1);
    }
    
    res.json(cart);
});

// increases the productAmount by plus or minus 1
app.patch('/api/cart', (req, res) => {
    const sentProduct = req.body;
    const index = cart.findIndex(item => item.productId === sentProduct.productId);
    
    if (sentProduct.increase) {
        cart[index].productAmount = cart[index].productAmount + 1;
    } else if (cart[index].productAmount - 1 > 0) {
        cart[index].productAmount = cart[index].productAmount - 1;
    } 
    
    res.json(cart);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});