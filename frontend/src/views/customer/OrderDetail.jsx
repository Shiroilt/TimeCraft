import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

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
  }, [param.order_oid]);

  return (
    <main className="mt-5" style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9 col-md-12 mt-1">
            <div className="container px-4">
              
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                  <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#2b2bd1' }}>
                        <i className="fas fa-receipt me-2" /> Order Details
                    </h2>
                    <p className="text-muted mb-0">Order <span className="fw-bold text-dark">#{order.oid}</span> • Placed {moment(order.date).format("MMM Do, YYYY")}</p>
                  </div>
                  <div className="text-end">
                      <span className={`badge px-3 py-2 rounded-pill shadow-sm ${order.order_status === "Fulfilled" ? "bg-success" : order.order_status === "Pending" ? "bg-warning text-dark" : "bg-danger"}`} style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                          <i className="fas fa-box me-2"></i>{order?.order_status?.toUpperCase()}
                      </span>
                  </div>
              </div>

              {/* Summary Cards */}
              <div className="row g-4 mb-5">
                <div className="col-md-7">
                    <div className="card border-0 shadow-sm rounded-4 h-100" style={{ background: 'linear-gradient(145deg, #ffffff, #f8f9fa)' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold border-bottom pb-2 mb-4 d-flex justify-content-between align-items-center">
                                <span>Financial Summary</span>
                                <span className={`badge ${order.payment_status?.toLowerCase() === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                    {order.payment_status?.toUpperCase()}
                                </span>
                            </h5>
                            
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-semibold">₹{order.sub_total}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Shipping <i className="fas fa-truck ms-1" style={{ fontSize: '10px' }}></i></span>
                                <span className="fw-semibold">₹{order.shipping_amount}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Tax</span>
                                <span className="fw-semibold">₹{order.tax_fee}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Service Fee</span>
                                <span className="fw-semibold">₹{order.service_fee}</span>
                            </div>
                            {parseFloat(order.saved) > 0 && (
                                <div className="d-flex justify-content-between mb-3 text-danger">
                                    <span>Discount Applied</span>
                                    <span className="fw-bold">-₹{order.saved}</span>
                                </div>
                            )}
                            
                            <hr className="my-3 border-light" />
                            
                            <div className="d-flex justify-content-between align-items-center mt-2 p-3 rounded-3" style={{ backgroundColor: '#f0f4f8' }}>
                                <span className="fw-bold text-uppercase" style={{ color: '#2b2bd1', letterSpacing: '1px' }}>Total Amount</span>
                                <span className="fw-bold fs-4 text-dark">₹{order.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-dark text-white" style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Blob Background */}
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'linear-gradient(135deg, #4facfe, #00f2fe)', borderRadius: '50%', opacity: '0.2', zIndex: '0' }}></div>
                        
                        <div className="card-body p-4" style={{ position: 'relative', zIndex: '1' }}>
                            <h5 className="fw-bold border-bottom border-secondary pb-2 mb-4 d-flex align-items-center">
                                <i className="fas fa-address-card me-2 text-info"></i> Customer Details
                            </h5>
                            <div className="mb-4">
                                <p className="mb-1 text-info" style={{ fontSize: '12px', letterSpacing: '1px' }}>FULL NAME</p>
                                <p className="mb-0 fw-semibold fs-5">{order.full_name}</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 text-info" style={{ fontSize: '12px', letterSpacing: '1px' }}>CONTACT INFO</p>
                                <p className="mb-1"><i className="fas fa-envelope me-2 opacity-75"></i>{order.email}</p>
                                <p className="mb-0"><i className="fas fa-phone me-2 opacity-75"></i>{order.mobile}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-info" style={{ fontSize: '12px', letterSpacing: '1px' }}>SHIPPING ADDRESS</p>
                                <p className="mb-0 opacity-75 lh-sm">
                                    {order.address}<br />
                                    {order.city}, {order.state}<br />
                                    {order.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

              {/* Order Items Table */}
              <section>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                    <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
                        <h5 className="fw-bold text-dark d-flex align-items-center">
                            <i className="fas fa-shopping-bag me-2" style={{ color: '#2b2bd1' }}></i> Purchased Items
                        </h5>
                    </div>
                    <div className="card-body p-0 mt-3">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead style={{ backgroundColor: '#f8f9fa' }}>
                                    <tr>
                                        <th className="py-3 px-4 border-0 text-muted fw-semibold" style={{ fontSize: '13px', letterSpacing: '1px' }}>PRODUCT</th>
                                        <th className="py-3 px-4 border-0 text-muted fw-semibold text-center" style={{ fontSize: '13px', letterSpacing: '1px' }}>PRICE</th>
                                        <th className="py-3 px-4 border-0 text-muted fw-semibold text-center" style={{ fontSize: '13px', letterSpacing: '1px' }}>QTY</th>
                                        <th className="py-3 px-4 border-0 text-muted fw-semibold text-end" style={{ fontSize: '13px', letterSpacing: '1px' }}>TOTAL</th>
                                        <th className="py-3 px-4 border-0 text-muted fw-semibold text-center" style={{ fontSize: '13px', letterSpacing: '1px' }}>TRACKING</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-4 border-light">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={item?.product?.image}
                                                        alt={item?.product?.title}
                                                        className="rounded-3 shadow-sm border"
                                                        style={{ width: '64px', height: '64px', objectFit: "cover" }}
                                                    />
                                                    <div className="ms-3">
                                                        <Link to={`/detail/${item.product.slug}`} className="text-dark text-decoration-none fw-bold d-block mb-1 hover-primary" style={{ transition: 'color 0.2s' }}>
                                                            {item?.product?.title}
                                                        </Link>
                                                        <small className="text-muted d-block">SKU: {item?.product?.sku || 'N/A'}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 border-light text-center text-muted fw-medium">₹{item.product.price}</td>
                                            <td className="p-4 border-light text-center">
                                                <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">{item.qty}</span>
                                            </td>
                                            <td className="p-4 border-light text-end fw-bold text-dark">₹{item.sub_total}</td>
                                            <td className="p-4 border-light text-center">
                                                {item.tracking_id == null || item.tracking_id === 'undefined' ? (
                                                    <span className="badge bg-secondary px-3 py-2 rounded-pill fw-medium" style={{ opacity: 0.7 }}>
                                                        <i className="fas fa-hourglass-half me-1"></i> Processing
                                                    </span>
                                                ) : (
                                                    <a
                                                        className="btn btn-sm btn-primary rounded-pill px-3 shadow-sm"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={`${item.delivery_couriers?.tracking_website}?${item.delivery_couriers?.url_parameter}=${item.tracking_id}`}
                                                    >
                                                        <i className="fas fa-location-arrow me-1"></i> Track
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
              </section>

              {/* Navigation Back */}
              <div className="mt-2 mb-5">
                  <Link to="/customer/orders/" className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold">
                      <i className="fas fa-arrow-left me-2"></i> Back to Orders
                  </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Scope CSS */}
      <style>
          {`
            .hover-primary:hover {
                color: #2b2bd1 !important;
            }
          `}
      </style>
    </main>
  );
}

export default OrderDetail;