import React from "react";
import Sidebar from "./Sidebar";
import apiInstance from "../../utils/axios";
import { useState, useEffect } from "react";
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
      console.log(res.data);
      setIsLoading(false);
    });
  }, []);

  const statusCounts = orders.reduce((counts, order) => {
    const status = order.order_status;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  return (
    <main className="mt-5">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9 col-md-12 mt-1">
            <div className="container px-4">
              {/* Section: Order Stats */}
              <section className="mb-5">
                <h3 className="mb-4 fw-bold text-primary">
                  <i className="fas fa-shopping-cart me-2" /> Orders
                </h3>
                <div className="row g-4">
                  {/* Total Orders Card */}
                  <div className="col-md-4">
                    <div className="card bg-primary text-white shadow-lg h-100">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                          <h5 className="card-title">Total Orders</h5>
                          <h2 className="card-text">{orders.length || 0}</h2>
                        </div>
                        <i className="fas fa-shopping-cart fa-3x"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Orders List as Boxes */}
              <section>
                <h5 className="card-title mb-4 fw-bold text-primary">
                  <i className="fas fa-list me-2" /> Order List
                </h5>
                {isLoading ? (
                  <div className="text-center py-4">
                    <h5 className="text-info">
                      Loading Orders... <i className="fas fa-spinner fa-spin"></i>
                    </h5>
                  </div>
                ) : (
                  <div className="row g-4">
                    {orders.map((o) => (
                      <div key={o.oid} className="col-md-6 col-lg-4">
                        <div className="card shadow-lg h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="card-title fw-bold">Order #{o.oid}</h5>
                              <span
                                className={`badge ${
                                  o.order_status === "Fulfilled"
                                    ? "bg-success"
                                    : o.order_status === "Pending"
                                    ? "bg-warning"
                                    : "bg-danger"
                                }`}
                              >
                                {o.order_status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-muted mb-2">
                              <i className="fas fa-calendar me-2"></i>
                              {moment(o.date).format("MMM Do YYYY")}
                            </p>
                            <p className="mb-2">
                              <i className="fas fa-wallet me-2"></i>
                              <strong>Payment:</strong>{" "}
                              <span
                                className={`badge ${
                                  o.payment_status === "paid"
                                    ? "bg-success"
                                    : "bg-warning"
                                }`}
                              >
                                {o.payment_status.toUpperCase()}
                              </span>
                            </p>
                            <p className="mb-2">
                              <i className="fas fa-box me-2"></i>
                              <strong>Product:</strong>{" "}
                              <span
                                className={`badge ${
                                  o.product_status === "approved"
                                    ? "bg-success"
                                    : o.product_status === "printing"
                                    ? "bg-info"
                                    : "bg-secondary"
                                }`}
                              >
                                {o.product_status.toUpperCase()}
                              </span>
                            </p>
                            <p className="mb-3">
                              <i className="fas fa-rupee-sign me-2"></i> {/* Updated icon for Indian Rupee */}
                              <strong>Total:</strong> ₹{o.total} {/* Updated symbol to ₹ */}
                            </p>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/customer/orders/${o.oid}/`}
                                className="btn btn-sm btn-outline-primary flex-grow-1"
                              >
                                <i className="fas fa-eye me-1"></i> View
                              </Link>
                              <Link
                                to={`/customer/invoice/${o.oid}/`}
                                className="btn btn-sm btn-outline-success flex-grow-1"
                              >
                                <i className="fas fa-file-invoice me-1"></i> Invoice
                              </Link>
                              <Link
                                to={`/tracksys/${userData?.user_id}/${o.oid}/`}
                                className="btn btn-sm btn-outline-info flex-grow-1"
                              >
                                <i className="fas fa-edit me-1"></i> Track
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
    </main>
  );
}

export default Orders;