import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";
import React, { useState, useEffect } from "react";
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from './Context';

toast.configure();

// set sessionStorage && localStorage to empty array if dosn't exist
// MUST do this to prevent attempted mapping of undefined
if (window.sessionStorage.getItem('cart') === null) {
  window.sessionStorage.setItem('cart', JSON.stringify([]));
}

if (window.localStorage.getItem('wishlist') === null) {
  window.localStorage.setItem('wishlist', JSON.stringify([]));
}

const sessionCart = window.sessionStorage.getItem('cart');
const localWishlist = window.localStorage.getItem('wishlist');

function App() {
  const [products, setProducts] = useState([]);
  // init cart state from sessionStorage
  const [localCart, setLocalCart] = useState(JSON.parse(sessionCart));
  // init wishlist state from localStorage
  const [wishlist, setWishlist] = useState(JSON.parse(localWishlist));

  async function getProduct() {
    const product = await axios
        .get("/api/product")
        .then(response => {setProducts(response.data)})
        .catch(error => console.log(error));
  };

  // load product list
  useEffect(() => { getProduct() }, []);

  // store cart in sessionStorage to preserve on window refresh
  useEffect(() => {
    window.sessionStorage.setItem('cart', JSON.stringify(localCart));
  }, [localCart]);

  // save wishlist to localStorage
  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <main className="App bg-light">
      <Router>
          <Navbar localCart={localCart} />
          <ContextProvider value={{localCart, setLocalCart, wishlist, setWishlist}}>
            <Switch>
              <Route exact path="/" component={() => <Products products={products} />}/>
              <Route exact path="/Cart" component={() => <Cart />}/>
              <Route exact path="/ProductPage/:productId" component={(match) => <ProductPage match={match} />}/>
            </Switch>
          </ContextProvider>
      </Router> 
    </main>
  );
}

export default App;
