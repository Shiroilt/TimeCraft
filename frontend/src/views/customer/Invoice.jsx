import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import generateInvoicePdf from '../../utils/generateInvoicePdf';

function Invoice() {
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const userData = UserData();
    const param = useParams();
    const invoiceRef = useRef();

    useEffect(() => {
        apiInstance.get(`customer/order/${userData?.user_id}/${param.order_oid}`)
            .then((res) => {
                setOrder(res.data);
                setOrderItems(res.data.orderitem);
            });
    }, [param]);

    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    return (
        <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Poppins', sans-serif" }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div 
                    ref={invoiceRef} 
                    className="card shadow-lg border-0 rounded-4" 
                    style={{ backgroundColor: '#ffffff', color: '#333', padding: '40px 50px', position: 'relative', overflow: 'hidden' }}
                >
                    {/* Decorative Header Blob */}
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'linear-gradient(135deg, #FF9A9E, #FECFEF)', borderRadius: '50%', opacity: '0.4', zIndex: '0' }}></div>
                    
                    <div style={{ position: 'relative', zIndex: '1' }}>
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mb-4">
                            <div className="d-flex align-items-center">
                                <img src="/logo.png" alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #eee' }} />
                                <div className="ms-3">
                                    <h2 className="mb-0 fw-bold" style={{ color: '#2b2bd1', letterSpacing: '1px' }}>TIMECRAFT</h2>
                                    <small className="text-muted">Premium Watch Customization</small>
                                </div>
                            </div>
                            <div className="text-end text-muted" style={{ fontSize: '14px' }}>
                                <p className="mb-1"><i className="fas fa-envelope text-primary me-2"></i> timecraft@example.com</p>
                                <p className="mb-1"><i className="fas fa-phone text-primary me-2"></i> +1 (800) 123-4567</p>
                                <p className="mb-0"><i className="fas fa-map-marker-alt text-primary me-2"></i> 123 Luxury Ave, NY</p>
                            </div>
                        </div>

                        {/* Order & Customer Info */}
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <span className="badge bg-primary px-3 py-2 text-uppercase mb-3" style={{ fontSize: '12px', letterSpacing: '1px' }}>Billed To</span>
                                <h5 className="fw-bold mb-1">{order.full_name || 'Customer'}</h5>
                                <p className="text-muted mb-1"><i className="fas fa-envelope me-1"></i> {order.email}</p>
                                <p className="text-muted mb-1"><i className="fas fa-phone me-1"></i> {order.mobile}</p>
                            </div>
                            <div className="col-md-6 text-end">
                                <span className="badge bg-dark px-3 py-2 text-uppercase mb-3" style={{ fontSize: '12px', letterSpacing: '1px' }}>Invoice Details</span>
                                <h5 className="fw-bold mb-1" style={{ color: '#333' }}>Order #{order.oid}</h5>
                                <p className="text-muted mb-1">Status: <span className="fw-bold text-success">{order.payment_status?.toUpperCase() || "PAID"}</span></p>
                                <p className="text-muted mb-0">Platform: <span className="fw-bold">TimeCraft Store</span></p>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="table-responsive mb-5 rounded-3 border" style={{ overflow: 'hidden' }}>
                            <table className="table table-hover mb-0">
                                <thead style={{ backgroundColor: '#f4f6f9', color: '#555' }}>
                                    <tr>
                                        <th className="py-3 px-4 border-0">Product Details</th>
                                        <th className="py-3 px-4 border-0 text-center">Unit Price</th>
                                        <th className="py-3 px-4 border-0 text-center">Qty</th>
                                        <th className="py-3 px-4 border-0 text-center">Discount</th>
                                        <th className="py-3 px-4 border-0 text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((o, index) => (
                                        <tr key={index} style={{ verticalAlign: 'middle' }}>
                                            <td className="py-3 px-4 border-light border-bottom">
                                                <div className="fw-bold text-dark">{o.product?.title || 'Unknown Product'}</div>
                                            </td>
                                            <td className="py-3 px-4 border-light border-bottom text-center text-muted">₹{o.price}</td>
                                            <td className="py-3 px-4 border-light border-bottom text-center fw-semibold">{o.qty}</td>
                                            <td className="py-3 px-4 border-light border-bottom text-center text-danger">-₹{o.saved}</td>
                                            <td className="py-3 px-4 border-light border-bottom text-end fw-bold">₹{o.sub_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total Summary */}
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="p-3 bg-light rounded-3 text-muted w-100" style={{ fontSize: '13px' }}>
                                    <h6 className="fw-bold text-dark"><i className="fas fa-info-circle me-1"></i> Note:</h6>
                                    This is a system generated invoice. For any queries regarding this order, please contact our support team.
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card border-0 bg-light p-4 rounded-3 shadow-sm">
                                    <h5 className="fw-bold border-bottom pb-2 mb-3 text-dark">Summary</h5>
                                    <div className="d-flex justify-content-between mb-2 text-muted">
                                        <span>Sub Total</span>
                                        <span>₹{order.sub_total}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 text-muted">
                                        <span>Shipping</span>
                                        <span>₹{order.shipping_amount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 text-muted">
                                        <span>Tax</span>
                                        <span>₹{order.tax_fee}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 text-muted">
                                        <span>Service Fee</span>
                                        <span>₹{order.service_fee}</span>
                                    </div>
                                    <div className="d-flex justify-content-between bg-primary text-white p-3 rounded mt-2 px-3 align-items-center">
                                        <span className="fw-bold text-uppercase" style={{ fontSize: '14px', letterSpacing: '1px' }}>Amount Paid</span>
                                        <span className="fw-bold fs-4">₹{order.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-5 pt-4 border-top">
                            <p className="text-muted fst-italic mb-0" style={{ fontSize: '15px' }}>Thank you for choosing TimeCraft!</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4 pb-5">
                    <button 
                        className="btn btn-light px-5 py-3 shadow-sm rounded-pill fw-bold text-primary border-0" 
                        onClick={() => generateInvoicePdf(order, orderItems)}
                        style={{ fontSize: '16px', letterSpacing: '1px', transition: 'all 0.3s' }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)' }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)' }}
                    >
                        <i className="fas fa-file-pdf me-2"></i> DOWNLOAD PDF
                    </button>
                    <button 
                        className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold border-1 ms-3" 
                        onClick={handlePrint}
                        style={{ transition: 'all 0.3s' }}
                    >
                        <i className="fas fa-print me-2"></i> Print
                    </button>
                    <button 
                        className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold border-1 ms-3" 
                        onClick={() => window.history.back()}
                    >
                        <i className="fas fa-arrow-left me-2"></i> Back
                    </button>
                </div>
            </div>
            
            {/* Print CSS hiding outer layout but keeping inside card intact */}
            <style>
                {`
                @media print {
                    body {
                        visibility: hidden;
                        background-color: white !important;
                    }
                    .container {
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .card {
                        box-shadow: none !important;
                        border: none !important;
                    }
                    .btn, .bg-primary {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
                `}
            </style>
        </div>
    );
}

export default Invoice;
