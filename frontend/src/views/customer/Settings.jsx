import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Swal from "sweetalert2";
import moment from "moment";
import './setting.css';
function Settings() {
    const userData = UserData();
    const [profile, setProfile] = useState({});

    const fetchProfileData = () => {
        apiInstance
            .get(`/user/profile/${userData?.user_id}/`)
            .then((res) => {
                setProfile(res.data);
            })
            .catch((error) => {
                console.error("Failed to fetch profile data:", error);
            });
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email" || name === "phone") {
            setProfile({
                ...profile,
                user: {
                    ...profile.user,
                    [name]: value,
                },
            });
        } else {
            setProfile({
                ...profile,
                [name]: value,
            });
        }
    };

    const handleImageChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const res = await apiInstance.get(`/user/profile/${userData?.user_id}/`);
        if (profile.image && profile.image !== res.data.profile_image) {
            const formData = new FormData();
            formData.append("image", profile.image);
            formData.append("full_name", profile.full_name);
            formData.append("address", profile.address);
            formData.append("city", profile.city);
            formData.append("state", profile.state);
            formData.append("country", profile.country);

            try {
                await apiInstance.patch(`/user/profile/${userData?.user_id}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your profile has been updated successfully!",
                });
            } catch (error) {
                console.error("Failed to update profile:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update profile. Please try again.",
                });
            }
        }
    };

    return (
        <main className="mt-5">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="col-lg-9 col-md-12 mt-1">
                        <div className="container px-4">
                            {/* Settings Header */}
                            <section className="mb-5">
                                <h3 className="mb-4 fw-bold text-primary">
                                    <i className="fas fa-gear fa-spin me-2"></i> Settings
                                </h3>
                            </section>

                            {/* Profile Update Form */}
                            <section>
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
                                            <div className="row g-4">
                                                {/* Profile Image */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="image" className="form-label fw-bold">
                                                            Profile Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            onChange={handleImageChange}
                                                            name="image"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Full Name */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="full_name" className="form-label fw-bold">
                                                            Full Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.full_name || ""}
                                                            onChange={handleInputChange}
                                                            name="full_name"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="email" className="form-label fw-bold">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            value={profile?.user?.email || ""}
                                                            onChange={handleInputChange}
                                                            name="email"
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Mobile */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label fw-bold">
                                                            Mobile
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.user?.phone || ""}
                                                            onChange={handleInputChange}
                                                            name="phone"
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Address */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label fw-bold">
                                                            Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.address || ""}
                                                            onChange={handleInputChange}
                                                            name="address"
                                                        />
                                                    </div>
                                                </div>

                                                {/* City */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="city" className="form-label fw-bold">
                                                            City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.city || ""}
                                                            onChange={handleInputChange}
                                                            name="city"
                                                        />
                                                    </div>
                                                </div>

                                                {/* State */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="state" className="form-label fw-bold">
                                                            State
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.state || ""}
                                                            onChange={handleInputChange}
                                                            name="state"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Country */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="country" className="form-label fw-bold">
                                                            Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.country || ""}
                                                            onChange={handleInputChange}
                                                            name="country"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Save Changes Button */}
                                            <div className="d-flex justify-content-end mt-4">
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="fas fa-save me-2"></i> Save Changes
                                                </button>
                                            </div>
                                        </form>
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

export default Settings;