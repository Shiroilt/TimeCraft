import React, { useState, useEffect, useContext } from "react";
import apiInstance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import CartID from "../plugin/CardID";
import Swal from "sweetalert2";
import { CartContext } from "../plugin/Context";
import "./Products.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cartCount, setCartCount] = useContext(CartContext);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    apiInstance.get("/products").then((response) => {
      setProducts(response.data);
      setIsLoadingProducts(false);
    });
  }, []);

  useEffect(() => {
    apiInstance.get("/category").then((response) => {
      setCategories(response.data);
      setIsLoadingCategories(false);
    });
  }, []);

  const handleColorButtonClick = (event, product_id, color_name) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [product_id]: color_name,
    }));
  };

  const handleSizeButtonClick = (event, product_id, size_name) => {
    setSelectedSizes((prevSelectedSize) => ({
      ...prevSelectedSize,
      [product_id]: size_name,
    }));
  };

  const handleQuantityChange = (event, product_id) => {
    const newQuantity = event.target.value;
    setSelectedQuantity((prevSelectedQuantity) => ({
      ...prevSelectedQuantity,
      [product_id]: newQuantity,
    }));
  };

  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  const cart_id = CartID();
  const navigate = useNavigate();

  const handleAddToCart = async (product_id, price, shipping_amount) => {
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("shipping_amount", shipping_amount);
    formData.append("price", price);
    formData.append("user_id", userData?.user_id);
    formData.append("country", currentAddress.country);
    formData.append("cart_id", cart_id);
    formData.append("qty", selectedQuantity[product_id] || 1);
    formData.append("size", selectedSizes[product_id] || "No Size");
    formData.append("color", selectedColors[product_id] || "No Color");

    const response = await apiInstance.post(`cart-view/`, formData);

    const url = userData
      ? `/cart-list/${cart_id}/${userData?.user_id}`
      : `/cart-list/${cart_id}`;
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length);
    });

    Toast.fire({
      icon: "success",
      title: response.data.message,
    });
  };

  const addToWishlist = async (productId, userId) => {
    try {
      if (!userId) {
        Toast.fire({
          icon: "info",
          title: "You need to login first",
        });
        return;
      } else {
        const formdata = new FormData();
        formdata.append("product_id", productId);
        formdata.append("user_id", userId);
        const response = await apiInstance.post(
          `customer/wishlist/${userId}/`,
          formdata
        );
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterCategory = (category) => {
    navigate(`/search?query=${category}`);
  };

  return (
    <>
      <div className="tc-page">
        <main>
          {/* ── Section Heading — Editorial style ── */}
          <div className="tc-container">
            <div className="tc-section-header">
              <p className="tc-eyebrow">Curated Selection</p>
              <h2>Exceptional Pieces</h2>
              <div className="tc-divider" />
            </div>

            {/* ── Product Grid ── */}
            {isLoadingProducts ? (
              <p className="tc-loading">
                Loading Products&nbsp;
                <i className="fas fa-spinner fa-spin" />
              </p>
            ) : (
              <div className="tc-grid">
                {products?.map((p, idx) => (
                  <div
                    key={p.id}
                    className="tc-card"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {/* Badge */}
                    {p.featured && (
                      <span className="tc-badge tc-badge--best">Certified Pre-Owned</span>
                    )}
                    {p.new_arrival && (
                      <span className="tc-badge tc-badge--new">New Arrival</span>
                    )}

                    {/* Image */}
                    <div className="tc-card__img-wrap">
                      <Link to={`/detail/${p.slug}`}>
                        <img src={p.image} alt={p.title} />
                      </Link>

                      {/* Wishlist overlay */}
                      <button
                        className="tc-card__wish"
                        onClick={() => addToWishlist(p.id, userData?.user_id)}
                        title="Add to wishlist"
                      >
                        <i className="fas fa-heart" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="tc-card__body">
                      <p className="tc-card__series">{p.category?.title}</p>

                      <Link to={`/detail/${p.slug}`} className="tc-card__title-link">
                        <h3 className="tc-card__title">{p.title}</h3>
                      </Link>

                      {/* Stars */}
                      <div className="tc-card__stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i
                            key={s}
                            className={`fas fa-star${s <= Math.round(p.rating || 4) ? "" : "-half-alt"}`}
                          />
                        ))}
                        <span>({p.rating || "4.5"}/5)</span>
                      </div>

                      {/* Price row */}
                      <div className="tc-card__price-row">
                        <span className="tc-card__price">₹{p.price}</span>
                        {p.old_price && (
                          <span className="tc-card__old-price">₹{p.old_price}</span>
                        )}
                        {p.size?.length > 0 && (
                          <span className="tc-card__meta">
                            {p.size[0]?.name} · {p.category?.title}
                          </span>
                        )}
                      </div>

                      {/* Variation dropdown + cart */}
                      <div className="tc-card__actions">
                        <div className="btn-group tc-variation-group">
                          <button
                            className="tc-btn tc-btn--variation dropdown-toggle"
                            type="button"
                            id={`dropdown-${p.id}`}
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="false"
                            aria-expanded="false"
                          >
                            <i className="fas fa-sliders-h" style={{ fontSize: '10px' }} />
                            &nbsp;Select Options
                          </button>
                          <ul
                            className="dropdown-menu tc-dropdown"
                            aria-labelledby={`dropdown-${p.id}`}
                          >
                            <div className="d-flex flex-column">
                              <li className="p-1">
                                <b className="tc-var-label">Quantity:</b>
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                <li>
                                  <input
                                    className="form-control tc-qty-input"
                                    type="number"
                                    min="1"
                                    value={selectedQuantity[p.id] || 1}
                                    onChange={(e) => handleQuantityChange(e, p.id)}
                                  />
                                </li>
                              </div>
                            </div>

                            {p.size?.length > 0 && (
                              <div className="d-flex flex-column mt-2">
                                <li className="p-1">
                                  <b className="tc-var-label">Size:</b>
                                  <span className="tc-var-selected">
                                    {selectedSizes[p.id] || "No Size"}
                                  </span>
                                </li>
                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                  {p.size?.map((size) => (
                                    <li key={size.name}>
                                      <button
                                        onClick={(e) =>
                                          handleSizeButtonClick(e, p.id, size.name)
                                        }
                                        className="tc-size-btn"
                                      >
                                        {size.name}
                                      </button>
                                    </li>
                                  ))}
                                </div>
                              </div>
                            )}

                            {p.color?.length > 0 && (
                              <div className="mt-3">
                                <li className="p-1">
                                  <b className="tc-var-label">Color:</b>
                                  <span className="tc-var-selected">
                                    {selectedColors[p.id] || "No Color"}
                                  </span>
                                </li>
                                <ul className="list-unstyled d-flex flex-wrap">
                                  {p.color?.map((color) => (
                                    <li key={color.name} className="p-1">
                                      <button
                                        className="tc-color-btn"
                                        style={{ backgroundColor: color.color_code }}
                                        onClick={(e) =>
                                          handleColorButtonClick(e, p.id, color.name)
                                        }
                                        title={color.name}
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="d-flex mt-3 p-1 gap-2">
                              <button
                                type="button"
                                className="tc-btn tc-btn--cart"
                                onClick={() =>
                                  handleAddToCart(p.id, p.price, p.shipping_amount)
                                }
                              >
                                <i className="fas fa-shopping-bag" /> Add to Cart
                              </button>
                              <button
                                type="button"
                                className="tc-btn tc-btn--wish-sm"
                                onClick={() => addToWishlist(p.id, userData?.user_id)}
                              >
                                <i className="fas fa-heart" />
                              </button>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Product;