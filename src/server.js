const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static('../build'))

const products = [
    {
        productId: '001',
        productName: 'Vitae Volutpat',
        productDescription: 'Donec faucibus ullamcorper iaculis',
        productPrice: 195,
        productImage: 'public/productimg/test.png',
        detailedDescription: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
                            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo`
    }, 
    {
        productId: '002',
        productName: 'Habitasse Platea Dictumst',
        productDescription: 'Mollis augue nisl quis',
        productPrice: 255,
        productImage: 'public/productimg/test.png',
        detailedDescription: `Sed convallis mi diam, non tempus neque consequat eget.
                            Cras vel quam vel erat euismod pulvinar. Maecenas non luctus dolor. 
                            Ut pulvinar quis metus ac dapibus. Vestibulum ut augue risus.`
    },
    {
        productId: '003',
        productName: 'Aliquam eros',
        productDescription: 'Aliquam dictum et purus',
        productPrice: 60,
        productImage: 'public/productimg/test.png',
        detailedDescription: `Ut efficitur, lacus sed rutrum porta, ante orci ornare erat, 
                            ac vehicula orci enim a sapien. Cras quis semper lectus. Phasellus ut ligula nisi. 
                            Quisque vitae molestie mauris, sit amet interdum lectus.`
    },
    {
        productId: '004',
        productName: 'Morbi eu erat',
        productDescription: 'Pellentesque non felis',
        productPrice: 60,
        productImage: 'public/productimg/test.png',
        detailedDescription: `Sed posuere diam sed tincidunt vestibulum. 
                            Nam suscipit leo justo, ut malesuada erat blandit vel. Aliquam ac felis nulla.
                            Sed faucibus gravida purus, sed vestibulum odio congue id. Mauris sit amet lorem porttitor, 
                            porttitor nisl ac, cursus est. Quisque in dictum tortor.`
    },
    {
        productId: '005',
        productName: 'Vestibulum ultrices',
        productDescription: 'Sed commodo libero sed',
        productPrice: 23,
        productImage: 'public/productimg/test.png',
        detailedDescription: `Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut 
                            et voluptates repudiandae sint et molestiae non recusandae.
                            Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur 
                            aut perferendis doloribus asperiores repellat`
    }
];

let cart = [];

// display app
app.get('/', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// returns full list of products
app.get('/api/product', (req, res) => {
    res.json(products);
});

// gets a single product
app.get('/api/product/:id', (request, response) => {
    const id = request.params.id
    const product = products.find(product => product.productId === id)
    response.json(product)
  })
  
// gets the cart
app.get('/api/cart', (req, res) => {
    res.json(cart);
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

// checks to see if chart should be set to empty
// else finds index of item to remove and splices it out
app.delete('/api/cart', (req, res) => {
    const instructions = req.body;
    
    if (instructions.emptyCart) {
        cart = [];
    } else {
        const index = cart.findIndex(item => item.productId === instructions.productId);
        cart.splice(index, 1);
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