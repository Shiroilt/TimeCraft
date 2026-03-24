import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiInstance from '../../utils/axios';
import Swal from 'sweetalert2';

function CreatePassword() {
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    
    // Add OTP state
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(true);
            return;
        }

        setError(false);

        // Ensure OTP is included in the request
        const formData = { uidb64: uid, otp, password };

        apiInstance.post(`user/password-change/`, formData)
            .then(() => {
                Swal.fire({ icon: 'success', title: 'Password Changed Successfully' });
                navigate("/login");
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'An Error Occurred. Try Again' });
            });
    };

    return (
        <section>
            <main className="container" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-md-8">
                        <div className="card rounded-5">
                            <div className="card-body p-4">
                                <h3 className="text-center">Create New Password</h3>
                                <br />
                                <form onSubmit={handlePasswordSubmit}>
                                    {/* OTP Input Field */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label">Enter OTP</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label">Enter New Password</label>
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        {error !== null && (
                                            <p className={error ? "text-danger fw-bold mt-2" : "text-success fw-bold mt-2"}>
                                                {error ? "Passwords do not match" : "Passwords match"}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default CreatePassword;
