const nedb = require("nedb");
const productDB = new nedb({filename: 'products.db', autoload: true});

exports.getFullList = async function() {
    return new Promise ((resolve, reject) => {
        productDB.find({}, function (err, docs) {
            if(err) reject(err);

            if(docs) resolve({status: true, products: docs});
        })
    }).catch(console.error())
}

exports.getSingleProduct = async function(id) {
    return new Promise ((resolve, reject) => {
        productDB.find({productId: id}, function (err, doc) {
            if(err) reject(err);

            if(doc) resolve({status: true, product: doc});
        })
    }).catch(console.error())
}