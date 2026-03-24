import { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import { Link } from "react-router-dom";
import './sidebar.css';
function Sidebar() {
  const [profile, setProfile] = useState({});
  const userData = UserData();

  useEffect(() => {
    apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
      setProfile(res.data);
    });
  }, []);

  return (
    <div className="col-lg-3">
      {/* Profile Section */}
      <div className="card shadow-lg mb-4 text-center">
        <div className="card-body">
          <img
            src={profile.image}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
            alt="Profile"
            className="img-fluid"
          />
          <h3 className="card-title mb-2">{profile.full_name}</h3>
          <p className="card-text text-muted">Welcome back!</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="card shadow-lg">
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/customer/account/" className="text-decoration-none text-dark">
                <i className="fas fa-user-circle me-2"></i> Account
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/customer/orders/" className="text-decoration-none text-dark">
                <i className="fas fa-shopping-cart me-2"></i> Orders
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/customer/wishlist/" className="text-decoration-none text-dark">
                <i className="fas fa-heart me-2"></i> Wishlist
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/customer/notifications/" className="text-decoration-none text-dark">
                <i className="fas fa-bell me-2"></i> Notifications
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/customer/settings/" className="text-decoration-none text-dark">
                <i className="fas fa-cog me-2"></i> Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;