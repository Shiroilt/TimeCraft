import React, { useEffect, useState } from 'react'
import apiInstance from '../../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Checkout() {
    const [order, setOrder] = useState([])
    const [couponCode, setCouponCode] = useState("")
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [vendorPhone, setVendorPhone] = useState("");  // ✅ Now vendorPhone is defined

    const param = useParams()
    
    const fetchOrderData = () => {
        apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
            setOrder(res.data);
            setVendorPhone(res.data.vendor_phone); // Assuming vendor_phone is part of the response
        });
    };

    useEffect(() => {
        fetchOrderData()
    }, [])

    console.log(couponCode)

    const applyCoupon = async () => {
        console.log(couponCode);
        console.log(order.oid);

    const formdata = new FormData()
    formdata.append("order_oid", order.oid)
    formdata.append("coupon_code", couponCode)

    try {
        const response = await apiInstance.post("coupon/", formdata)
        fetchOrderData()
        Swal.fire({
            icon: response.data.icon,
            title: response.data.message,
          })
    } catch (error) {
        console.log(error)
    }
    }

    const redirectToWhatsApp = () => {
        if (vendorPhone && vendorPhone.trim() !== "") {
            const whatsappUrl = `https://wa.me/${vendorPhone}?text=Hello, I am interested in placing an order with you. Order ID: ${order.oid}`;
            window.location.href = whatsappUrl;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Vendor contact not available',
                text: 'Cannot redirect to WhatsApp without a vendor phone number.',
            });
        }
    };
   
    

  return (
<main>
    <main className="mb-4 mt-4">
        <div className="container">
            <section className="">
                <div className="row gx-lg-5">
                    <div className="col-lg-8 mb-4 mb-md-0">
                        <section className="">
                            <div className="alert alert-warning">
                                <strong>Review Your Shipping &amp; Order Details </strong>
                            </div>
                            <form>
                                <h5 className="mb-4 mt-4">Shipping address</h5>
                                <div className="row mb-4">

                                    <div className="col-lg-12">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Full Name</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.full_name}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mt-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Email</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mt-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Mobile</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.mobile}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Address</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.address}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">City</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.city}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">State</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.state}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Country</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={order.country}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <h5 className="mb-4 mt-4">Billing address</h5>
                                <div className="form-check mb-2">
                                    <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form6Example8" defaultChecked="" />
                                    <label className="form-check-label" htmlFor="form6Example8">
                                        Same as shipping address
                                    </label>
                                </div>
                            </form>
                        </section>
                        {/* Section: Biling details */}
                    </div>
                    <div className="col-lg-4 mb-4 mb-md-0">
                        {/* Section: Summary */}
                        <section className="shadow-4 p-4 rounded-5 mb-4">
                            <h5 className="mb-3">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal </span>
                                <span>₹{order.sub_total}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Shipping </span>
                                <span>₹{order.shipping_amount}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Tax </span>
                                <span>₹{order.tax_fee}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Servive Fee </span>
                                <span>₹{order.service_fee}</span>
                            </div>
                            {order.saved !== "0.00" &&
                            <div className="d-flex text-danger fw-bold justify-content-between">
                                <span>Discount </span>
                                <span>-₹{order.saved}</span>
                            </div>
                            }
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between fw-bold mb-5">
                                <span>Total </span>
                                <span>₹{order.total}</span>
                            </div>

                            <div className="shadow p-3 d-flex mt-4 mb-4">
                                <input 
                                 
                                name="couponCode" 
                                type="text" 
                                className='form-control' 
                                style={{ border: "dashed 1px gray" }} 
                                placeholder='Enter Dicount Coupon Here' 
                                id=""
                                onChange={(e) => setCouponCode(e.target.value)}
                                 />
                                <button onClick={applyCoupon} className='btn btn-success ms-1'>Apply</button>
                            </div>
                            <div>
                                <button onClick={redirectToWhatsApp} type="button" className="btn btn-success btn-rounded w-100 mt-2">
                                        Further process <i className='fab fa-whatsapp'></i>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    </main>
</main>
  )
}

export default Checkout