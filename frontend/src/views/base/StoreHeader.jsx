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

//   // useEffect(() => {
//   //   apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
//   //     setProfile(res.data);
//   //   });
//   // }, []);
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
//       {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
//       <nav
//       className="navbar navbar-expand-lg"
//       style={{ backgroundColor: "#smokeWhite", color: "#333333" }}>
//         <div className="container">
//           <Link className="navbar-brand" to="/" 
//   style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: "500", color: "#333333" }}>
//   <h3>Invitar</h3>
// </Link>
          
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
//             {profile?.role === "vendor" ? (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item dropdown">
//                 <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     id="navbarDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       backgroundColor: "#white", // Soft pastel peach background
//                       color: "#333333",
//                       transition: "background-color 0.3s, color 0.3s",
//                       borderRadius: "10px", // Rounded corners
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//                       border: "1px solid #ddd", // Light border for definition
//                       overflow: "hidden", // Ensures content stays within rounded edges
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = "#2C2C2C"; // Dark hover color
//                       e.target.style.color = "#FFFFFF"; // White text
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = "#FFFFFF"; // Revert to original color
//                       e.target.style.color = "#333333";
//                     }}
//                   >
//                     Vendor
//                 </a>

//                 <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/dashboard/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-user"></i> Dashboard
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/products/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="bi bi-grid-fill"></i> Products
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/add-product/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-plus-circle"></i> Add Products
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/orders/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-shopping-cart"></i> Orders
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/earning/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-dollar-sign"></i> Earning
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/reviews/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-star"></i> Reviews
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/coupon/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-tag"></i> Coupon
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/notifications/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-bell fa-shake"></i> Notifications
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/vendor/settings/"style={{ color: "#333333" }}>
//                       {" "}
//                       <i className="fas fa-gear fa-spin"></i> Settings
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>):null}
//             <div className="">
//               <form
//                 className="d-flex px-lg-4 w-100"
//                 // style={{ height: 39 }}
//                 style={{
//                   height: 39,
//                   backgroundColor: "#white", // Soft pastel peach background
//                   color: "#333333",
//                   transition: "background-color 0.3s, color 0.3s",
//                   borderRadius: "10px", // Rounded corners
//                   //boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//                   //border: "1px solid #ddd", // Light border for definition
//                   //overflow: "hidden", // Ensures content stays within rounded edges
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

//             {isLoggedIn() ? (
//               <div className="dropdown text-end mx-2">
//                 <a
//                   href="#"
//                   className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{ backgroundColor: "#F5F5F5", color: "#333333" }}
//                 >
//                   <img
//                     src={profile.image}
//                     alt="mdo"
//                     width="32"
//                     height="32"
//                     className="rounded-circle"
//                   />
//                 </a>
//                 <ul className="dropdown-menu text-small">
//                   <li>
//                     <Link to={"/customer/account/"} className="dropdown-item"style={{ color: "#333333" }}>
//                       Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to={`/customer/orders/`}style={{ color: "#333333" }}>
//                       Orders
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to={`/customer/wishlist/`}style={{ color: "#333333" }}>
//                       Wishlist
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to={`/customer/notifications/`}style={{ color: "#333333" }}
//                     >
//                       Notifications
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to={`/customer/settings/`}style={{ color: "#333333" }}>
//                       Settings
//                     </Link>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>
//                   <li>
//                     {/* changes by shashwat for user data remove in cart
//                         before change code is :- */}
                       
//                           <Link className="dropdown-item" to="/logout"
//                           style={{
//                             backgroundColor: "#white", // Soft pastel peach background
//                             color: "#333333",
//                             transition: "background-color 0.3s, color 0.3s",
//                             borderRadius: "10px", // Rounded corners
//                             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//                             border: "1px solid #ddd", // Light border for definition
//                             overflow: "hidden", // Ensures content stays within rounded edges
//                           }}
//                           onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = "#2C2C2C"; // Dark hover color
//                             e.target.style.color = "#FFFFFF"; // White text
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = "#FFFFFF"; // Revert to original color
//                             e.target.style.color = "#333333";
//                           }}
//                           >
//                             Log out
//                           </Link>
                        
                    
//                     {/* after change */}
//                   {/* <button className="dropdown-item" onClick={handleLogout}>
//                     Log out
//                   </button> */}
//                   {/* ============================================ */}
//                   </li>
//                 </ul>
//               </div>
              
//             ) : (
//               <>
//                 <Link className="btn btn-outline-dark me-2" to="/login"
//                 style={{
//                   backgroundColor: "#white", // Soft pastel peach background
//                   color: "#333333",
//                   transition: "background-color 0.3s, color 0.3s",
//                   borderRadius: "10px", // Rounded corners
//                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//                   border: "1px solid #ddd", // Light border for definition
//                   overflow: "hidden", // Ensures content stays within rounded edges
//                 }}
//                  onMouseEnter={(e) => {
//     e.target.style.backgroundColor = "#2C2C2C"; // Dark hover color
//     e.target.style.color = "#FFFFFF"; // White text
//   }}
//   onMouseLeave={(e) => {
//     e.target.style.backgroundColor = "#FFFFFF"; // Revert to original color
//     e.target.style.color = "#333333";
//   }}
//                 >
//                   Login
//                 </Link>
//                 <Link className="btn btn-outline-dark me-2" to="/register"
//                 style={{
//                   backgroundColor: "#white", // Soft pastel peach background
//                   color: "#333333",
//                   transition: "background-color 0.3s, color 0.3s",
//                   borderRadius: "10px", // Rounded corners
//                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//                   border: "1px solid #ddd", // Light border for definition
//                   overflow: "hidden", // Ensures content stays within rounded edges
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#2C2C2C"; // Dark hover color
//                   e.target.style.color = "#FFFFFF"; // White text
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#FFFFFF"; // Revert to original color
//                   e.target.style.color = "#333333";
//                 }}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//             {profile?.role === "vendor" ? (null):<div className="mx-2">
//                <Link className="btn btn-outline-success" to="/cart/"
//                style={{
//                 backgroundColor: "#white", // Soft pastel peach background
//                 color: "#333333",
//                 transition: "background-color 0.3s, color 0.3s",
//                 borderRadius: "10px", // Rounded corners
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//                 border: "1px solid #ddd", // Light border for definition
//                 overflow: "hidden", // Ensures content stays within rounded edges
//               }}
//                >
//                   <i className="fas fa-shopping-cart"></i>{" "}
//                   <span id="cart-total-items">{cartCount}</span>
//                 </Link>
//                 {/* adding a fauser fro profile  */}
//             </div>}
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
        setUpdateTrigger((prev) => !prev); // This forces a re-render
      });
    }
  }, [userData?.user_id]);

  const [search, setSearch] = useState("");

  const texts = [
    "Search for a Product",
    "Search for a Category",
    "Search for a Description",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Script for typing effect
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

  // Helper functions for search
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${search}`);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#smokeWhite", color: "#333333" }}
      >
        <div className="container">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px",
              fontWeight: "500",
              color: "#333333",
            }}
          >
            <h3>Invitar</h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Search Bar */}
            <div className="d-flex px-lg-4 w-80">
              <form
                className="d-flex w-100"
                style={{
                  height: 39,
                  width:20,
                  backgroundColor: "#white",
                  color: "#333333",
                  transition: "background-color 0.3s, color 0.3s",
                  borderRadius: "10px",
                }}
                onSubmit={handleSearchSubmit}
              >
                <input
                  onChange={handleSearchChange}
                  name="search"
                  className="form-control me-2"
                  type="text"
                  placeholder={`${placeholder}${showCursor ? "_" : ""}`}
                  aria-label="Search"
                  style={{ backgroundColor: "#F5F5F5", color: "#333333" }}
                />
                <button className="btn btn-light me-2" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            {/* Right-aligned buttons (Login, Register, Cart) */}
            <div className="ms-auto d-flex align-items-center">
              {isLoggedIn() ? (
                <div className="dropdown text-end mx-2">
                  <a
                    href="#"
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#ffffff", color: "#333333" }}
                  >
                    <img
                      src={profile.image}
                      alt="profilePic"
                      width="60"
                      height="60"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li>
                      <Link
                        to={"/customer/account/"}
                        className="dropdown-item"
                        style={{ color: "#333333" }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/customer/orders/`}
                        style={{ color: "#333333" }}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/customer/wishlist/`}
                        style={{ color: "#333333" }}
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/customer/notifications/`}
                        style={{ color: "#333333" }}
                      >
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/customer/settings/`}
                        style={{ color: "#333333" }}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/logout"
                        style={{
                          backgroundColor: "#white",
                          color: "#333333",
                          transition: "background-color 0.3s, color 0.3s",
                          borderRadius: "10px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #ddd",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#2C2C2C";
                          e.target.style.color = "#FFFFFF";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#FFFFFF";
                          e.target.style.color = "#333333";
                        }}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-dark me-2"
                    to="/login"
                    style={{
                      backgroundColor: "#white",
                      color: "#333333",
                      transition: "background-color 0.3s, color 0.3s",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #ddd",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2C2C2C";
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.color = "#333333";
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-dark me-2"
                    to="/register"
                    style={{
                      backgroundColor: "#white",
                      color: "#333333",
                      transition: "background-color 0.3s, color 0.3s",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #ddd",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2C2C2C";
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.color = "#333333";
                    }}
                  >
                    Register
                  </Link>
                </>
              )}
            <div class="d-flex justify-content-between align-items-center">
            {/* Vendor Dropdown (if applicable) */}
            {profile?.role === "vendor" ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "#white",
                      color: "#333333",
                      transition: "background-color 0.3s, color 0.3s",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #ddd",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2C2C2C";
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.color = "#333333";
                    }}
                  >
                    Vendor
                  </a>

                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/dashboard/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-user"></i> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/products/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="bi bi-grid-fill"></i> Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/add-product/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-plus-circle"></i> Add Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/orders/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-shopping-cart"></i> Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/earning/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-dollar-sign"></i> Earning
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/reviews/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-star"></i> Reviews
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/coupon/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-tag"></i> Coupon
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/notifications/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-bell fa-shake"></i> Notifications
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/vendor/settings/"
                        style={{ color: "#333333" }}
                      >
                        {" "}
                        <i className="fas fa-gear fa-spin"></i> Settings
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : null}
            </div>
           
              {/* Cart Button */}
              {profile?.role !== "vendor" && (
                <div className="mx-2">
                  <Link
                    className="btn btn-outline-success"
                    to="/cart/"
                    style={{
                      backgroundColor: "#white",
                      color: "#333333",
                      transition: "background-color 0.3s, color 0.3s",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #ddd",
                      overflow: "hidden",
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i>{" "}
                    <span id="cart-total-items">{cartCount}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default StoreHeader;