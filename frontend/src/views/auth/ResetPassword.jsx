import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [uidb64, setUidb64] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setOtp(searchParams.get("otp") || "");
        setUidb64(searchParams.get("uidb64") || "");
    }, [searchParams]);

    const handleResetPassword = async () => {
        if (!password) {
            setMessage("Password cannot be empty.");
            return;
        }

        const response = await fetch("https://your-backend-url.com/api/user/password-change/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp, uidb64, password }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (response.status === 201) {
            setTimeout(() => navigate("/login"), 2000);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-4">
                <h2 className="text-center">Reset Password</h2>
                <input
                    type="password"
                    className="form-control mt-3"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary w-100 mt-3" onClick={handleResetPassword}>
                    Reset Password
                </button>
                {message && <p className="mt-2 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
