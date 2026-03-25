import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    
        const [email, setEmail] = useState("");
        const navigate = useNavigate();
         const axios = apiInstance;
        // const otp = searchParams.get('otp');
        // const uuid = searchParams.get('uuid');
        const handleEmailChange = (event) => {
            setEmail(event.target.value);
            console.log(event.target.value);
        };
    
        const handleEmailSubmit = () => {
            if (!email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter an email address!',
                });return;}
                axios.get(`user/password-reset/${encodeURIComponent(email)}/`).then((res) => {
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Email Sent!',
                }).then(() => {
                    navigate('/CreatePassword'); // Fix: Remove ".jsx" from route
                });
            }).catch((error) => {
                console.error('Error:', error.response || error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to send reset email. Try again!',
                });
            });
        };
        
        
    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <div>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            onChange={handleEmailChange}
                                                        />
                                                    </div>

                                                    <div className="text-center">
                                                        <button onClick={handleEmailSubmit} className='btn btn-primary w-100'>Reset Password</button>
                                                    </div>

                                                    <div className="text-center">
                                                        <p className="mt-4">
                                                            Want to sign in?{" "}
                                                            <Link to="/login">
                                                                Login
                                                            </Link>
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    )
}

export default ForgotPassword