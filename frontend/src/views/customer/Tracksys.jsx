import React, { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import "./tracksys.css";
import { FaCheckCircle, FaEdit, FaPrint, FaShippingFast } from 'react-icons/fa'; // Icons for steps

const TrackSys = () => {
  const { user_id, order_oid } = useParams(); // Get order details from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiInstance.get(`customer/order/${user_id}/${order_oid}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user_id, order_oid]);

  const getStatusSteps = (status, type) => {
    const steps = {
      payment: ["pending", "processing", "paid", "cancelled"],
      product: ["approved", "modify", "printing", "out_of_delivery"], // Excluded "disapproved"
      order: ["Pending", "Fulfilled", "Cancelled"],
    };

    return steps[type];
  };

  const getActiveStepIndex = (status, type) => {
    const steps = getStatusSteps(status, type);
    return steps.indexOf(status);
  };

  if (loading) return <div className="text-center mt-5"><p>Loading order details...</p></div>;
  if (!order) return <div className="text-center mt-5"><p>Order not found</p></div>;

  return (
    <div className="tracking-page">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-primary">Order Progress</h2>

        {/* Order Summary */}
        <div className="card shadow-lg mb-5">
          <div className="card-body">
            <h3 className="card-title fw-bold text-primary">Order Details</h3>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Order ID:</strong> {order.oid}</p>
                <p><strong>Total Amount:</strong> ₹{order.total}</p>
                <p><strong>Buyer:</strong> {order.full_name} ({order.email})</p>
              </div>
              <div className="col-md-6">
                <p><strong>Shipping Address:</strong> {order.address}, {order.city}, {order.state}, {order.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Status */}
        <div className="card shadow-lg mb-5">
          <div className="card-body">
            <h5 className="card-title fw-bold text-primary">Product Status</h5>
            <div className="steps">
              {getStatusSteps(order.product_status, "product").map((step, index) => (
                <div key={index} className={`step ${index <= getActiveStepIndex(order.product_status, "product") ? 'active' : ''}`}>
                  <div className="step-icon">
                    {step === "approved" && <FaCheckCircle />}
                    {step === "modify" && <FaEdit />}
                    {step === "printing" && <FaPrint />}
                    {step === "out_of_delivery" && <FaShippingFast />}
                  </div>
                  <div className="step-label">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackSys;