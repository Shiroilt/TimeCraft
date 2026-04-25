import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ScrollToTop from "./layout/ScrollToTop";

import Login from './views/auth/Login'; // Import the 'Login' component.
import Register from './views/auth/Register'; // Import the 'Register' component.
import Logout from './views/auth/Logout'; // Import the 'Logout' component.
import ForgotPassword from './views/auth/ForgotPassword'; // Import the 'ForgotPassword' component.
import CreatePassword from './views/auth/CreatePassword';
import StoreHeader from "./views/base/StoreHeader";
import StoreFooter from "./views/base/StoreFooter";
import AboutUs from "./views/base/AboutUs"; {/* chnage by y */ }
import ContactUs from "./views/base/ContactUs"; {/* chnage by y */ }
import FAQ from "./views/base/FAQ"; {/* chnage by y */ }
import TermsCondition from "./views/base/TermsCondition"; {/* chnage by y */ }
import Products from "./views/store/Products";
import Categories from "./views/store/Categories"; {/* chnage by y */ }
import ProductDetail from "./views/store/ProductDetail";
import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";
import PaymentSuccess from "./views/store/PaymentSuccess";
import AdvertisementPopup from './views/store/AdvertisementPopup';
import { CartContext } from './views/plugin/Context';
import CartID from './views/plugin/CardID';
import UserData from './views/plugin/UserData';
import apiInstance from './utils/axios';
import Search from './views/store/Search';
import Account from './views/customer/Account';
import PrivateRoute from './layout/PrivateRoute';
import MainWrapper from './layout/MainWrapper';
import Orders from './views/customer/Orders';
import OrderDetail from './views/customer/OrderDetail';
import Wishlist from './views/customer/Wishlist';
import CustomerNotification from './views/customer/CustomerNotification';
import CustomerSettings from './views/customer/Settings';
import Invoice from './views/customer/Invoice';
import Dashboard from './views/vendor/Dashboard';
import Product from './views/vendor/Product';
import VendorOrders from './views/vendor/Orders';
import VendorOrderDetail from './views/vendor/OrderDetail';
import Earning from './views/vendor/Earning';
import Reviews from './views/vendor/Reviews';
import ReviewDetail from './views/vendor/ReviewDetail';
import Coupon from './views/vendor/Coupon';
import EditCoupon from './views/vendor/EditCoupon';
import Notification from './views/vendor/Notification';
import VendorSettings from './views/vendor/VendorSettings';
import Shop from './views/vendor/Shop';
import AddProduct from './views/vendor/AddProduct';
import UpdateProduct from './views/vendor/UpdateProduct';
import Chatbot from './views/base/chatbot';
import TrackSys from './views/customer/Tracksys';
import Subscription from './views/store/Subscription';
function App() {
  const [count, setCount] = useState(0)
  const [cartCount, setCartCount] = useState()

  const cart_id = CartID()
  const userData = UserData()

  useEffect(() => {
    const url = userData ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
    })
  }, [])


  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <BrowserRouter>
        <ScrollToTop />
        <StoreHeader />
        <MainWrapper>
          {/* Advertisement Popup */}
          <AdvertisementPopup />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-new-password" element={<CreatePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />


            {/* STORE COMPONENTS */}
            <Route path='/' element={<Products />} />
            <Route path='/detail/:slug/' element={<ProductDetail />} />
            <Route path='/cart/' element={<Cart />} />
            <Route path='/checkout/:order_oid/' element={<Checkout />} />
            <Route path='/payment-success/:order_oid/' element={<PaymentSuccess />} />
            <Route path="/search" element={<Search />} />
            {/* chnage by y */}
            <Route path="/" element={<Categories />} />
            <Route path="/products" element={<Products />} /> {/* Product Page Route */}

            {/* Customer Routs */}
            <Route path="/customer/account/" element={<PrivateRoute><Account /></PrivateRoute>} />
            <Route path="/customer/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/customer/orders/:order_oid/" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
            <Route path="/customer/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
            <Route path="/customer/notifications/" element={<PrivateRoute><CustomerNotification /></PrivateRoute>} />
            <Route path="/customer/settings/" element={<PrivateRoute><CustomerSettings /></PrivateRoute>} />
            <Route path="/customer/invoice/:order_oid/" element={<PrivateRoute><Invoice /></PrivateRoute>} />
            <Route path="/tracksys/:user_id/:order_oid" element={<TrackSys />} />
            <Route path="/subscription" element={<Subscription />} />
            {/* Vendor Routs */}
            <Route path="/vendor/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/vendor/products/" element={<PrivateRoute><Product /></PrivateRoute>} />
            <Route path="/vendor/orders/" element={<PrivateRoute><VendorOrders /></PrivateRoute>} />
            <Route path="/vendor/orders/:order_oid/" element={<PrivateRoute><VendorOrderDetail /></PrivateRoute>} />
            <Route path="/vendor/earning/" element={<PrivateRoute><Earning /></PrivateRoute>} />
            <Route path="/vendor/reviews/" element={<PrivateRoute><Reviews /></PrivateRoute>} />
            <Route path="/vendor/reviews/:review_id/" element={<PrivateRoute><ReviewDetail /></PrivateRoute>} />
            <Route path="/vendor/coupon/" element={<PrivateRoute><Coupon /></PrivateRoute>} />
            <Route path="/vendor/coupon/:coupon_id/" element={<PrivateRoute><EditCoupon /></PrivateRoute>} />
            <Route path="/vendor/notifications/" element={<PrivateRoute><Notification /></PrivateRoute>} />
            <Route path="/vendor/settings/" element={<PrivateRoute><VendorSettings /></PrivateRoute>} />
            <Route path="/vendor/:slug/" element={<PrivateRoute><Shop /></PrivateRoute>} />
            <Route path="/vendor/add-product/" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
            <Route path="/vendor/product/update/:pid/" element={<PrivateRoute><UpdateProduct /></PrivateRoute>} />


            {/* footer -> support links*/}
            <Route path='/views/base/AboutUs' element={<AboutUs />} />
            <Route path='/views/base/ContactUs' element={<ContactUs />} />
            <Route path='/views/base/FAQ' element={<FAQ />} />
            <Route path='/views/base/TermsCondition' element={<TermsCondition />} />

            {/*Add this route inside <Routes> */}
            <Route path="/password-change" element={<CreatePassword />} />

            {/* Chatbot Route
        <Route path="/chatbot" element={<Chatbot />} /> */}

          </Routes>
        </MainWrapper>
        <Chatbot />
        <StoreFooter />
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App