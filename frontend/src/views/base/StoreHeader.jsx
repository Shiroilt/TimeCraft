// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/auth";
// import apiInstance from "../../utils/axios";
// import UserData from "../plugin/UserData";
// import { CartContext } from "../plugin/Context";

// function StoreHeader() {
//   const [isLoggedIn, user] = useAuthStore((state) => [
//     state.isLoggedIn,
//     state.user,
//   ]);

//   const cartCount = useContext(CartContext);
//   const [profile, setProfile] = useState({});

//   const userData = UserData();

//   const [updateTrigger, setUpdateTrigger] = useState(false);

//   useEffect(() => {
//     if (userData?.user_id) {
//       apiInstance.get(`user/profile/${userData.user_id}/`).then((res) => {
//         setProfile(res.data);
//         setUpdateTrigger((prev) => !prev); // This forces a re-render
//       });
//     }
//   }, [userData?.user_id]);

//   const [search, setSearch] = useState("");

//   const texts = [
//     "Search for a Product",
//     "Search for a Category",
//     "Search for a Description",
//   ];
//   const [placeholder, setPlaceholder] = useState("");
//   const [textIndex, setTextIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [showCursor, setShowCursor] = useState(true);

//   // Script for typing effect
//   useEffect(() => {
//     let typeInterval;
//     let completeTimeout;

//     if (charIndex < texts[textIndex].length) {
//       typeInterval = setTimeout(() => {
//         setPlaceholder((prev) => prev + texts[textIndex][charIndex]);
//         setCharIndex((prev) => prev + 1);
//       }, 150);
//     } else {
//       completeTimeout = setTimeout(() => {
//         setShowCursor(false);
//         setTimeout(() => {
//           setShowCursor(true);
//           setPlaceholder("");
//           setTextIndex((prev) => (prev + 1) % texts.length);
//           setCharIndex(0);
//         }, 500);
//       }, 2000);
//     }

//     return () => {
//       clearTimeout(typeInterval);
//       clearTimeout(completeTimeout);
//     };
//   }, [charIndex, textIndex]);

//   const navigate = useNavigate();

//   // Helper functions for search
//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     navigate(`/search?query=${search}`);
//   };

//   return (
//     <div>
//       <nav
//         className="navbar navbar-expand-lg"
//         style={{ backgroundColor: "#smokeWhite", color: "#333333" }}
//       >
//         <div className="container">
//           <Link
//             className="navbar-brand"
//             to="/"
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "32px",
//               fontWeight: "500",
//               color: "#333333",
//             }}
//           >
//             <h3>Invitar</h3>
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             {/* Search Bar */}
//             <div className="d-flex px-lg-4 w-80">
//               <form
//                 className="d-flex w-100"
//                 style={{
//                   height: 39,
//                   width:20,
//                   backgroundColor: "#white",
//                   color: "#333333",
//                   transition: "background-color 0.3s, color 0.3s",
//                   borderRadius: "10px",
//                 }}
//                 onSubmit={handleSearchSubmit}
//               >
//                 <input
//                   onChange={handleSearchChange}
//                   name="search"
//                   className="form-control me-2"
//                   type="text"
//                   placeholder={`${placeholder}${showCursor ? "_" : ""}`}
//                   aria-label="Search"
//                   style={{ backgroundColor: "#F5F5F5", color: "#333333" }}
//                 />
//                 <button className="btn btn-light me-2" type="submit">
//                   <i className="fas fa-search"></i>
//                 </button>
//               </form>
//             </div>
//             {/* Right-aligned buttons (Login, Register, Cart) */}
//             <div className="ms-auto d-flex align-items-center">
//               {isLoggedIn() ? (
//                 <div className="dropdown text-end mx-2">
//                   <a
//                     href="#"
//                     className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{ backgroundColor: "#ffffff", color: "#333333" }}
//                   >
//                     <img
//                       src={profile.image}
//                       alt="profilePic"
//                       width="60"
//                       height="60"
//                       className="rounded-circle"
//                     />
//                   </a>
//                   <ul className="dropdown-menu text-small">
//                     <li>
//                       <Link
//                         to={"/customer/account/"}
//                         className="dropdown-item"
//                         style={{ color: "#333333" }}
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to={`/customer/orders/`}
//                         style={{ color: "#333333" }}
//                       >
//                         Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to={`/customer/wishlist/`}
//                         style={{ color: "#333333" }}
//                       >
//                         Wishlist
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to={`/customer/notifications/`}
//                         style={{ color: "#333333" }}
//                       >
//                         Notifications
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to={`/customer/settings/`}
//                         style={{ color: "#333333" }}
//                       >
//                         Settings
//                       </Link>
//                     </li>
//                     <li>
//                       <hr className="dropdown-divider" />
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/logout"
//                         style={{
//                           backgroundColor: "#white",
//                           color: "#333333",
//                           transition: "background-color 0.3s, color 0.3s",
//                           borderRadius: "10px",
//                           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid #ddd",
//                           overflow: "hidden",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.target.style.backgroundColor = "#2C2C2C";
//                           e.target.style.color = "#FFFFFF";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.backgroundColor = "#FFFFFF";
//                           e.target.style.color = "#333333";
//                         }}
//                       >
//                         Log out
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     className="btn btn-outline-dark me-2"
//                     to="/login"
//                     style={{
//                       backgroundColor: "#white",
//                       color: "#333333",
//                       transition: "background-color 0.3s, color 0.3s",
//                       borderRadius: "10px",
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid #ddd",
//                       overflow: "hidden",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = "#2C2C2C";
//                       e.target.style.color = "#FFFFFF";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = "#FFFFFF";
//                       e.target.style.color = "#333333";
//                     }}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     className="btn btn-outline-dark me-2"
//                     to="/register"
//                     style={{
//                       backgroundColor: "#white",
//                       color: "#333333",
//                       transition: "background-color 0.3s, color 0.3s",
//                       borderRadius: "10px",
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid #ddd",
//                       overflow: "hidden",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = "#2C2C2C";
//                       e.target.style.color = "#FFFFFF";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = "#FFFFFF";
//                       e.target.style.color = "#333333";
//                     }}
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             <div class="d-flex justify-content-between align-items-center">
//             {/* Vendor Dropdown (if applicable) */}
//             {profile?.role === "vendor" ? (
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     id="navbarDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       backgroundColor: "#white",
//                       color: "#333333",
//                       transition: "background-color 0.3s, color 0.3s",
//                       borderRadius: "10px",
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid #ddd",
//                       overflow: "hidden",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = "#2C2C2C";
//                       e.target.style.color = "#FFFFFF";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = "#FFFFFF";
//                       e.target.style.color = "#333333";
//                     }}
//                   >
//                     Vendor
//                   </a>

//                   <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/dashboard/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-user"></i> Dashboard
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/products/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="bi bi-grid-fill"></i> Products
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/add-product/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-plus-circle"></i> Add Products
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/orders/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-shopping-cart"></i> Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/earning/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-dollar-sign"></i> Earning
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/reviews/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-star"></i> Reviews
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/coupon/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-tag"></i> Coupon
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/notifications/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-bell fa-shake"></i> Notifications
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to="/vendor/settings/"
//                         style={{ color: "#333333" }}
//                       >
//                         {" "}
//                         <i className="fas fa-gear fa-spin"></i> Settings
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>
//             ) : null}
//             </div>
           
//               {/* Cart Button */}
//               {profile?.role !== "vendor" && (
//                 <div className="mx-2">
//                   <Link
//                     className="btn btn-outline-success"
//                     to="/cart/"
//                     style={{
//                       backgroundColor: "#white",
//                       color: "#333333",
//                       transition: "background-color 0.3s, color 0.3s",
//                       borderRadius: "10px",
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid #ddd",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <i className="fas fa-shopping-cart"></i>{" "}
//                     <span id="cart-total-items">{cartCount}</span>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default StoreHeader;

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import { CartContext } from "../plugin/Context";
import "./StoreHeader.css";

function StoreHeader() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const cartCount = useContext(CartContext);
  const [profile, setProfile] = useState({});
  const userData = UserData();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    if (userData?.user_id) {
      apiInstance.get(`user/profile/${userData.user_id}/`).then((res) => {
        setProfile(res.data);
        setUpdateTrigger((prev) => !prev);
      });
    }
  }, [userData?.user_id]);

  const [search, setSearch] = useState("");

  const texts = [
    "Search heritage pieces...",
    "Search for a Category",
    "Search for a Description",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let typeInterval;
    let completeTimeout;

    if (charIndex < texts[textIndex].length) {
      typeInterval = setTimeout(() => {
        setPlaceholder((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 150);
    } else {
      completeTimeout = setTimeout(() => {
        setShowCursor(false);
        setTimeout(() => {
          setShowCursor(true);
          setPlaceholder("");
          setTextIndex((prev) => (prev + 1) % texts.length);
          setCharIndex(0);
        }, 500);
      }, 2000);
    }

    return () => {
      clearTimeout(typeInterval);
      clearTimeout(completeTimeout);
    };
  }, [charIndex, textIndex]);

  const navigate = useNavigate();

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${search}`);
  };

  return (
    <header className="tc-header">
      <nav className="tc-nav">
        <div className="tc-nav__inner">

          {/* ── Logo ── */}
          <Link className="tc-logo" to="/">
            <span className="tc-logo__icon">◎</span>
            <span className="tc-logo__text">TIMECRAFT</span>
          </Link>

          {/* ── Nav Links (center) ── */}
          <div className="tc-nav__links">
            <Link to="/" className="tc-nav__link tc-nav__link--active">Shop</Link>
            <Link to="/collections" className="tc-nav__link">Collections</Link>
            <Link to="/our-story" className="tc-nav__link">Our Story</Link>
          </div>

          {/* ── Search ── */}
          <form className="tc-search" onSubmit={handleSearchSubmit}>
            <i className="fas fa-search tc-search__icon" />
            <input
              onChange={handleSearchChange}
              name="search"
              className="tc-search__input"
              type="text"
              placeholder={`${placeholder}${showCursor ? "_" : ""}`}
              aria-label="Search"
            />
          </form>

          {/* ── Right Actions ── */}
          <div className="tc-nav__actions">

            {/* Cart — hidden for vendors */}
            {profile?.role !== "vendor" && (
              <Link className="tc-icon-btn" to="/cart/" title="Cart">
                <i className="fas fa-shopping-bag" />
                {cartCount > 0 && (
                  <span className="tc-cart-badge">{cartCount}</span>
                )}
              </Link>
            )}

            {/* Vendor Dropdown */}
            {profile?.role === "vendor" && (
              <div className="dropdown">
                <button
                  className="tc-icon-btn dropdown-toggle tc-vendor-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-store" />
                  <span>Vendor</span>
                </button>
                <ul className="dropdown-menu tc-dropdown">
                  <li><Link className="tc-dropdown__item" to="/vendor/dashboard/"><i className="fas fa-user" /> Dashboard</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/products/"><i className="bi bi-grid-fill" /> Products</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/add-product/"><i className="fas fa-plus-circle" /> Add Products</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/orders/"><i className="fas fa-shopping-cart" /> Orders</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/earning/"><i className="fas fa-dollar-sign" /> Earning</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/reviews/"><i className="fas fa-star" /> Reviews</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/coupon/"><i className="fas fa-tag" /> Coupon</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/notifications/"><i className="fas fa-bell" /> Notifications</Link></li>
                  <li><Link className="tc-dropdown__item" to="/vendor/settings/"><i className="fas fa-gear" /> Settings</Link></li>
                </ul>
              </div>
            )}

            {/* Auth */}
            {isLoggedIn() ? (
              <div className="dropdown">
                <button
                  className="tc-avatar-btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="tc-avatar"
                  />
                </button>
                <ul className="dropdown-menu tc-dropdown dropdown-menu-end">
                  <li><Link className="tc-dropdown__item" to="/customer/account/"><i className="fas fa-user" /> Profile</Link></li>
                  <li><Link className="tc-dropdown__item" to="/customer/orders/"><i className="fas fa-box" /> Orders</Link></li>
                  <li><Link className="tc-dropdown__item" to="/customer/wishlist/"><i className="fas fa-heart" /> Wishlist</Link></li>
                  <li><Link className="tc-dropdown__item" to="/customer/notifications/"><i className="fas fa-bell" /> Notifications</Link></li>
                  <li><Link className="tc-dropdown__item" to="/customer/settings/"><i className="fas fa-gear" /> Settings</Link></li>
                  <li><hr className="tc-dropdown__divider" /></li>
                  <li><Link className="tc-dropdown__item tc-dropdown__item--danger" to="/logout"><i className="fas fa-sign-out-alt" /> Log out</Link></li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="tc-btn-ghost" to="/login">Login</Link>
                <Link className="tc-btn-gold" to="/register">Register</Link>
              </>
            )}
          </div>

          {/* ── Mobile toggler ── */}
          <button
            className="tc-toggler navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#tcNavCollapse"
            aria-controls="tcNavCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* ── Mobile Collapse ── */}
        <div className="collapse tc-mobile-menu" id="tcNavCollapse">
          <Link to="/" className="tc-mobile-link">Shop</Link>
          <Link to="/collections" className="tc-mobile-link">Collections</Link>
          <Link to="/our-story" className="tc-mobile-link">Our Story</Link>
          <form className="tc-search tc-search--mobile" onSubmit={handleSearchSubmit}>
            <i className="fas fa-search tc-search__icon" />
            <input
              onChange={handleSearchChange}
              name="search"
              className="tc-search__input"
              type="text"
              placeholder="Search heritage pieces..."
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    </header>
  );
}

export default StoreHeader;