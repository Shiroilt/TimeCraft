import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import './account.css';
function Account() {
    const [profile, setProfile] = useState({});
    const userData = UserData();

    useEffect(() => {
        if (userData) {
            apiInstance
                .get(`/user/profile/${userData.user_id}/`)
                .then((res) => {
                    setProfile(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch user data:", error);
                });
        }
    }, []);

    return (
        <main className="mt-5">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="col-lg-9 col-md-12 mt-1">
                        <div className="container px-4">
                            {/* Welcome Section */}
                            <section className="mb-5">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <h2 className="card-title fw-bold text-primary">
                                            <i className="fas fa-user-circle me-2"></i> Hi, {profile.full_name}!
                                        </h2>
                                        <p className="card-text">
                                            From your account dashboard, you can easily check & view your{" "}
                                            <Link to="/orders" className="text-decoration-none fw-bold text-success">
                                                orders
                                            </Link>
                                            , manage your{" "}
                                            <Link to="/shipping" className="text-decoration-none fw-bold text-warning">
                                                shipping
                                            </Link>
                                            , or{" "}
                                            <Link to="/settings" className="text-decoration-none fw-bold text-info">
                                                edit account
                                            </Link>
                                            . Just use the sidebar to get started.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Quick Links Section */}
                            <section>
                                <div className="row g-4">
                                    {/* Orders Card */}
                                    <div className="col-md-4">
                                        <div className="card bg-light shadow-lg h-100">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold text-primary">
                                                    <i className="fas fa-shopping-cart me-2"></i> Orders
                                                </h5>
                                                <p className="card-text">
                                                    View your recent orders, track shipments, and manage returns.
                                                </p>
                                                <Link to="/customer/orders/" className="btn btn-outline-primary w-100">
                                                    View Orders
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Settings Card */}
                                    <div className="col-md-4">
                                        <div className="card bg-light shadow-lg h-100">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold text-info">
                                                    <i className="fas fa-cog me-2"></i> Account Settings
                                                </h5>
                                                <p className="card-text">
                                                    Update your profile, change your password, and manage preferences.
                                                </p>
                                                <Link to="/customer/settings/" className="btn btn-outline-info w-100">
                                                    Edit Account
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Account;