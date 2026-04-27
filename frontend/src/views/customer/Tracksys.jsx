import React, { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaEdit, FaPrint, FaShippingFast, FaArrowLeft, FaBoxOpen } from 'react-icons/fa';

const TrackSys = () => {
  const { user_id, order_oid } = useParams();
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

  const getStatusSteps = (type) => {
    return {
      product: [
        { key: "approved", label: "Approved", icon: <FaCheckCircle /> },
        { key: "modify", label: "Processing", icon: <FaEdit /> },
        { key: "printing", label: "Manufacturing", icon: <FaPrint /> },
        { key: "out_of_delivery", label: "In Transit", icon: <FaShippingFast /> }
      ]
    }[type];
  };

  const getActiveStepIndex = (status, type) => {
    const stepsKeys = getStatusSteps(type).map(s => s.key);
    const index = stepsKeys.indexOf(status);
    return index !== -1 ? index : 0;
  };

  if (loading) return (
      <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3 fw-medium">Loading tracking details...</p>
      </div>
  );

  if (!order) return (
      <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
          <FaBoxOpen className="text-muted opacity-25" size={64} />
          <h4 className="fw-bold mt-4">Order Not Found</h4>
          <Link to="/customer/orders/" className="btn btn-primary rounded-pill mt-3 px-4">Back to Orders</Link>
      </div>
  );

  const productSteps = getStatusSteps("product");
  const activeStep = getActiveStepIndex(order.product_status, "product");
  const progressWidth = `${(activeStep / (productSteps.length - 1)) * 100}%`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', fontFamily: "'Poppins', sans-serif" }} className="py-5">
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: '#2b2bd1' }}>
                  <FaShippingFast className="me-2 mb-1" /> Track Delivery
              </h2>
              <p className="text-muted mb-0">Live delivery status for Order <span className="text-dark fw-bold">#{order.oid}</span></p>
            </div>
            
            <Link to="/customer/orders/" className="btn btn-light shadow-sm rounded-pill px-4 fw-medium border text-dark">
                <FaArrowLeft className="me-2" /> Back
            </Link>
        </div>

        {/* Tracker Block */}
        <div className="card border-0 shadow-sm rounded-4 mb-5" style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
            <div className="card-header bg-white border-0 pt-4 px-5">
                <h5 className="fw-bold d-flex align-items-center" style={{ color: '#333' }}>
                    <FaCheckCircle className="text-success me-2" /> Order Progress
                </h5>
            </div>
            
            <div className="card-body px-5 py-5">
                <div className="position-relative d-flex justify-content-between align-items-center w-100" style={{ zIndex: 1 }}>
                    {/* Connecting Line */}
                    <div className="position-absolute top-50 start-0 w-100" style={{ height: '4px', backgroundColor: '#e9ecef', transform: 'translateY(-50%)', zIndex: -1 }}></div>
                    <div className="position-absolute top-50 start-0 bg-primary" style={{ height: '4px', width: progressWidth, transform: 'translateY(-50%)', zIndex: -1, transition: 'width 0.5s ease-in-out' }}></div>

                    {productSteps.map((step, index) => (
                        <div key={index} className="text-center position-relative tracking-node" style={{ flex: 1, cursor: 'default' }}>
                            <div 
                                className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm"
                                style={{ 
                                    width: '45px', 
                                    height: '45px', 
                                    backgroundColor: index <= activeStep ? '#2b2bd1' : '#ffffff',
                                    color: index <= activeStep ? '#ffffff' : '#adb5bd',
                                    border: index <= activeStep ? 'none' : '3px solid #e9ecef',
                                    fontSize: '18px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {step.icon}
                            </div>
                            <h6 
                                className={"mt-3 mb-0 fw-bold " + (index <= activeStep ? 'text-primary' : 'text-muted')}
                                style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}
                            >
                                {step.label}
                            </h6>
                            {index === activeStep && (
                                <span className="badge bg-success rounded-pill mt-2" style={{ fontSize: '10px' }}>Current</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Info Blocks */}
        <div className="row g-4 mb-4">
            <div className="col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100 bg-white p-4">
                    <h6 className="fw-bold text-muted text-uppercase mb-4" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                        Delivery Details
                    </h6>
                    <div className="d-flex align-items-start mb-3">
                        <div className="bg-light rounded-circle d-flex justify-content-center align-items-center text-primary me-3" style={{ minWidth: '40px', height: '40px' }}>
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div>
                            <p className="fw-bold mb-1 text-dark">Shipping Address</p>
                            <p className="text-muted mb-0 lh-sm" style={{ fontSize: '14px' }}>
                                {order.address}<br />
                                {order.city}, {order.state} {order.country}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-start">
                        <div className="bg-light rounded-circle d-flex justify-content-center align-items-center text-primary me-3" style={{ minWidth: '40px', height: '40px' }}>
                            <i className="fas fa-user"></i>
                        </div>
                        <div>
                            <p className="fw-bold mb-1 text-dark">Recipient Info</p>
                            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>{order.full_name} <br/> {order.mobile}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100 bg-dark text-white p-4" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'linear-gradient(135deg, #4facfe, #00f2fe)', borderRadius: '50%', opacity: '0.2' }}></div>
                    
                    <h6 className="fw-bold text-info text-uppercase mb-4 position-relative" style={{ fontSize: '12px', letterSpacing: '1px', zIndex: 1 }}>
                        Order Summary
                    </h6>
                    <div className="mb-3 position-relative" style={{ zIndex: 1 }}>
                        <p className="mb-1 text-light opacity-75" style={{ fontSize: '13px' }}>Order Amount</p>
                        <h3 className="fw-bold mb-0">₹{order.total}</h3>
                    </div>
                    <div className="d-flex justify-content-between position-relative" style={{ zIndex: 1 }}>
                        <div>
                            <p className="mb-1 text-light opacity-75" style={{ fontSize: '13px' }}>Payment</p>
                            <span className={"badge rounded-pill " + (order.payment_status?.toLowerCase() === 'paid' ? 'bg-success' : 'bg-warning text-dark')}>
                                {order.payment_status?.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="mb-1 text-light opacity-75" style={{ fontSize: '13px' }}>Order ID</p>
                            <span className="badge bg-light text-dark rounded-pill">#{order.oid}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>

      <style>
          {`
             .tracking-node {
                 transition: transform 0.2s ease;
             }
             .tracking-node:hover {
                 transform: translateY(-3px);
             }
          `}
      </style>
    </div>
  );
};

export default TrackSys;