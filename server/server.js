const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const database = require('./serverDatabase.js');

app.use(cors())
    .use(express.json())
    .use('/', express.static(path.join(__dirname, '../build')));

// returns full list of products
app.get("/api/product", async (req, res) => {
    const getProducts = await database.getFullList();
    if(getProducts.status) {
        res.json(getProducts.products).status(200);
    } else {
        res.status(404);
    }
});

// gets a single product
app.get("/api/product/:id", async (req, res) => {
    const id = req.params.id;
    const getSingleProduct = await database.getSingleProduct(id);
    if(getSingleProduct.status) {
        res.json(getSingleProduct.product).status(200);
    } else {
        res.status(404);
    }
})
  
// catch all 
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
  
app.listen(PORT, () => {
    console.log((path.join(__dirname, '../build')))
    console.log(`Server running on ${PORT}`);
});