import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen";
import OverviewScreen from "./screens/OverviewScreen";
import FeaturesVideoScreen from "./screens/FeaturesVideoScreen";
import AboutMeScreen from "./screens/AboutMeScreen";
import DevelopmentProcessScreen from "./screens/DevelopmentProcessScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />   

            <Route path="/cart/" element={<CartScreen />} >
              <Route path=":id" element={<CartScreen />} />
            </Route>
            
            <Route path="/overview" element={<OverviewScreen />} />  
            <Route path="/features-video" element={<FeaturesVideoScreen />} />  
            <Route path="/aboutme" element={<AboutMeScreen />} />  
            <Route path="/development-process" element={<DevelopmentProcessScreen />} />  

		        <Route path="/admincp/userlist" element={<UserListScreen />} />
		        <Route path="/admincp/user/:id/edit" element={<UserEditScreen />} />
            
		        <Route path="/admincp/productlist" element={<ProductListScreen />} />
            <Route path="/admincp/product/:id/edit" element={<ProductEditScreen />} />
            
		        <Route path="/admincp/orderlist" element={<OrderListScreen />} />

            <Route path="*" element={
                <div style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </div>} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
