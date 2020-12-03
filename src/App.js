import "./App.css"
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Products from "./components/Products"
import Cart from "./components/Cart"
import ProductPage from "./components/ProductPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/Cart" component={Cart} />
          <Route exact path="/ProductPage" component={ProductPage} />
        </Switch>
      </div>
    </Router> 
  );
}

export default App;
