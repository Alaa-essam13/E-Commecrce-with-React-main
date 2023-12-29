import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Reset from "./components/reset";
import Nav from "./components/nav";
import CheckoutForm from "./components/check-out";
import Home from "./pages/home/Home";
import Cart from "./components/cart/Cart";
import SingleProduct from "./pages/single-product/SingleProduct";
import Products from "./pages/products/Products";
import AboutPage from "./components/about";
import ContactUsForm from "./components/contact-us";
import ProductsList from "./components/_home2/ProductsList";
import ProductDetails from "./components/_home2/ProductDetails";
import OrderHistory from "./components/order-history";
import UserProfile from "./components/user-profile";


function App() {
  return (
    <div className="app">
      <Nav />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/checkout" element={<CheckoutForm />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home2" element={<ProductsList />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactUsForm />} />
          <Route exact path="/cart" element={< Cart/>} />
          <Route exact path="products/:id" element={<SingleProduct/>} />
          <Route exact path="products" element={<Products/>} />
          <Route exact path="special-offers/:id" element={<SingleProduct/>} />
          <Route path='product/:productId' element={<ProductDetails/>} />
          <Route path='order-history' element={<OrderHistory/>} />
          <Route path='user-profile' element={<UserProfile/>} />
        </Routes>
    </div>
  );
}

export default App;