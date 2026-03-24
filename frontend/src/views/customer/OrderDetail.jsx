import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import './orderdetail.css';
function OrderDetail() {
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  const userData = UserData();
  const param = useParams();

  useEffect(() => {
    apiInstance.get(`customer/order/${userData?.user_id}/${param.order_oid}`).then((res) => {
      setOrder(res.data);
      setOrderItems(res.data.orderitem);
    });
  }, []);

  return (
    <main className="mt-5">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9 col-md-12 mt-1">
            <div className="container px-4">
              {/* Order Summary Section */}
              <section className="mb-5">
                <h3 className="mb-4 fw-bold text-primary">
                  <i className="fas fa-shopping-cart me-2" /> Order #{order.oid}
                </h3>
                <div className="row g-4">
                  {/* Total Amount Card */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card bg-primary text-white shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title">Total Amount</h5>
                        <h2 className="card-text">₹{order.total}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status Card */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card bg-warning text-white shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title">Payment Status</h5>
                        <h2 className="card-text">{order?.payment_status?.toUpperCase()}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Order Status Card */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card bg-success text-white shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title">Order Status</h5>
                        <h2 className="card-text">{order?.order_status?.toUpperCase()}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Amount Card */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card bg-info text-white shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title">Shipping Amount</h5>
                        <h2 className="card-text">₹{order.shipping_amount}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Tax Fee Card */}
                  <div className="col-md-6 col-lg-3 mt-4">
                    <div className="card bg-secondary text-white shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title">Tax Fee</h5>
                        <h2 className="card-text">₹{order.tax_fee}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Service Fee Card */}
                  <div className="col-md-6 col-lg-3 mt-4">
                    <div className="card bg-danger text-white shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title">Service Fee</h5>
                        <h2 className="card-text">₹{order.service_fee}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Discount Fee Card */}
                  <div className="col-md-6 col-lg-3 mt-4">
                    <div className="card bg-light shadow-lg h-100">
                      <div className="card-body">
                        <h5 className="card-title text-danger">Discount Fee</h5>
                        <h2 className="card-text text-danger">-₹{order.saved}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order Items Section */}
              <section>
                <h5 className="card-title mb-4 fw-bold text-primary">
                  <i className="fas fa-boxes me-2" /> Order Items
                </h5>
                <div className="row g-4">
                  {orderItems?.map((order, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card shadow-lg h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={order?.product?.image}
                              alt={order?.product?.title}
                              className="rounded me-3"
                              style={{ width: 80, height: 80, objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="fw-bold mb-1">
                                <Link to={`/detail/${order.product.slug}`} className="text-dark">
                                  {order?.product?.title}
                                </Link>
                              </h6>
                              <p className="text-muted mb-0">Qty: {order.qty}</p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0">
                              <i className="fas fa-rupee-sign me-2"></i>
                              <strong>Price:</strong> ₹{order.product.price}
                            </p>
                            <p className="mb-0">
                              <strong>Total:</strong> ₹{order.sub_total}
                            </p>
                          </div>
                          <div className="mt-3">
                            {order.tracking_id == null || order.tracking_id == 'undefined' ? (
                              <button className="btn btn-secondary btn-sm w-100" disabled>
                                <i className="fas fa-plus me-2"></i> No Tracking Yet
                              </button>
                            ) : (
                              <a
                                className="btn btn-success btn-sm w-100"
                                target="_blank"
                                href={`${order.delivery_couriers?.tracking_website}?${order.delivery_couriers?.url_parameter}=${order.tracking_id}`}
                              >
                                <i className="fas fa-location-arrow me-2"></i> Track Item
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderDetail;