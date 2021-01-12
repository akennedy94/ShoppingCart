import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";
import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  const [products, setProducts] = useState([]);
  const [localCart, setLocalCart] = useState([]);

  async function getProduct() {
    const product = await axios
        .get("/api/product")
        .then(response => {
          console.log(response)
            setProducts(response.data);
        })
        .catch(error => console.log(error));
      };

  useEffect(() => {
      getProduct();
  }, []);

  return (
    <main className="App bg-light">
      <Router>
          <Navbar localCart={localCart}/>
          <Switch>
            <Route exact path="/" component={() => <Products products={products} localCart={localCart} setLocalCart={setLocalCart} />}/>
            <Route exact path="/Cart" component={() => <Cart localCart={localCart} setLocalCart={setLocalCart} />}/>
            <Route exact path="/ProductPage/:productId" component={(match) => <ProductPage localCart={localCart} setLocalCart={setLocalCart} match={match}/>}/>
          </Switch>
      </Router> 
    </main>
  );
}

export default App;
