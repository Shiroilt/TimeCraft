import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import { Link } from "react-router-dom";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userData = UserData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiInstance.get(`customer/orders/${userData?.user_id}/`).then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, [userData?.user_id]);

  return (
    <main className="mt-5" style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', fontFamily: "'Poppins', sans-serif" }}>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9 col-md-12 mt-1">
            <div className="container px-4">
              
              {/* Header section with Stats */}
              <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
                  <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#2b2bd1' }}>
                        <i className="fas fa-shopping-bag me-2" /> My Orders
                    </h2>
                    <p className="text-muted mb-0">Track, manage, and view your purchases.</p>
                  </div>
                  
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ minWidth: '180px', background: 'linear-gradient(135deg, #2b2bd1, #5f5ff5)' }}>
                      <div className="card-body p-3 text-white text-center d-flex align-items-center justify-content-center">
                          <i className="fas fa-layer-group fa-2x opacity-50 me-3"></i>
                          <div className="text-start">
                              <h6 className="mb-0 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px', opacity: 0.8 }}>Total Orders</h6>
                              <h3 className="mb-0 fw-bold">{orders.length || 0}</h3>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Orders List Section */}
              <section>
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center flex-column py-5 mt-5">
                      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                          <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-muted mt-3 fw-medium">Fetching your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-5 mt-5">
                      <i className="fas fa-box-open fa-4x text-muted mb-3 opacity-25"></i>
                      <h4 className="fw-bold text-dark">No orders found</h4>
                      <p className="text-muted">You haven't placed any orders yet.</p>
                      <Link to="/" className="btn btn-primary rounded-pill px-4 mt-2">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="row g-4 mb-5">
                    {orders.map((o) => (
                      <div key={o.oid} className="col-md-6 col-lg-6 col-xl-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100 order-card-hover" style={{ transition: 'all 0.3s ease', backgroundColor: '#ffffff' }}>
                          
                          {/* Card Header (Order ID & Status) */}
                          <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
                              <div>
                                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Order ID</small>
                                  <h6 className="fw-bold mb-0 text-dark">#{o.oid}</h6>
                              </div>
                              <span className={`badge px-3 py-2 rounded-pill shadow-sm ${o.order_status === "Fulfilled" ? "bg-success" : o.order_status === "Pending" ? "bg-warning text-dark" : "bg-danger"}`} style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                                  {o.order_status.toUpperCase()}
                              </span>
                          </div>

                          <div className="card-body px-4 py-3">
                              <p className="text-muted mb-4 pb-3 border-bottom" style={{ fontSize: '13px' }}>
                                  <i className="fas fa-calendar-alt me-2 text-primary opacity-75"></i>
                                  {moment(o.date).format("MMMM Do YYYY")}
                              </p>
                              
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div className="d-flex align-items-center">
                                      <div className="icon-circle bg-light rounded-circle d-flex justify-content-center align-items-center text-primary me-3" style={{ width: '35px', height: '35px' }}>
                                          <i className="fas fa-wallet" style={{ fontSize: '14px' }}></i>
                                      </div>
                                      <div>
                                          <p className="mb-0 text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment</p>
                                          <p className={`mb-0 fw-bold ${o.payment_status?.toLowerCase() === 'paid' ? 'text-success' : 'text-warning'}`} style={{ fontSize: '13px' }}>
                                              {o.payment_status.toUpperCase()}
                                          </p>
                                      </div>
                                  </div>
                                  
                                  <div className="text-end">
                                      <p className="mb-0 text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Amount</p>
                                      <p className="mb-0 fw-bold text-dark fs-5">₹{o.total}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="card-footer bg-light border-0 pt-3 pb-3 px-3 rounded-bottom-4">
                              <div className="d-flex gap-2">
                                <Link
                                  to={`/customer/orders/${o.oid}/`}
                                  className="btn btn-sm btn-white border flex-grow-1 shadow-sm rounded-pill hover-blue text-dark fw-medium"
                                  style={{ transition: 'all 0.2s', fontSize: '13px' }}
                                >
                                  <i className="fas fa-eye me-1 text-primary"></i> View
                                </Link>
                                <Link
                                  to={`/customer/invoice/${o.oid}/`}
                                  className="btn btn-sm btn-white border flex-grow-1 shadow-sm rounded-pill hover-blue text-dark fw-medium"
                                  style={{ transition: 'all 0.2s', fontSize: '13px' }}
                                >
                                  <i className="fas fa-file-invoice me-1 text-success"></i> Invoice
                                </Link>
                                <Link
                                  to={`/tracksys/${userData?.user_id}/${o.oid}/`}
                                  className="btn btn-sm btn-white border flex-grow-1 shadow-sm rounded-pill hover-blue text-dark fw-medium"
                                  style={{ transition: 'all 0.2s', fontSize: '13px' }}
                                >
                                  <i className="fas fa-truck-fast me-1 text-info"></i> Track
                                </Link>
                              </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <style>
          {`
             .order-card-hover:hover {
                 transform: translateY(-5px);
                 box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
             }
             .hover-blue:hover {
                 background-color: #2b2bd1;
                 color: white !important;
                 border-color: #2b2bd1 !important;
             }
             .hover-blue:hover i {
                 color: white !important;
             }
          `}
      </style>
    </main>
  );
}

export default Orders;