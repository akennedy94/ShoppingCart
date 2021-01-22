export const addProductToWishlist = (product, wishlist) => {
    const wishlistUpdate = [...wishlist];
    console.log("add remove: ", product, wishlist)
    if (wishlist.map(product => product.productId).includes(product.productId)) {
        return wishlistUpdate;
    } else {
      wishlistUpdate.push(product);
    }
    return wishlistUpdate;
}

export const addProductToCart = (product, localCart, quantity) => {
    const localUpdate = [...localCart];
    
    // defaults quantity to 1 if not specified
    if(!quantity) {
        quantity = 1;
    }

    if (localCart.map(product => product.productId).includes(product.productId)) {
        const index = localCart.findIndex(item => item.productId === product.productId);

        localUpdate[index].productAmount = localCart[index].productAmount + quantity;    
    } else {
        product.productAmount = 1;
        localUpdate.push(product);
    }
    return localUpdate;
}
