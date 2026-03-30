import React from 'react'
import { Link } from "react-router-dom";
import "./StoreFooter.css";

const whatsappNumber = "7862988589";

function StoreFooter() {
  return (
    <footer className="tc-footer">
      <div className="tc-footer-container">
        
        {/* Top Section - Socials */}
        <div className="tc-footer-top">
          <div className="tc-footer-social-text">
            <strong>Get connected with us on social networks</strong>
          </div>
          <div className="tc-footer-social-links">
            <a
              className="tc-social-btn"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/share/1AEKDLaUqa/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="tc-social-btn"
              style={{ backgroundColor: "#bd081c" }}
              href="https://pin.it/6emvOa9Tf"
              target="_blank"
              rel="noopener noreferrer"
              title="Pinterest"
            >
              <i className="fab fa-pinterest" />
            </a>
            <a
              className="tc-social-btn"
              style={{ backgroundColor: "#ff0000" }}
              href="https://youtube.com/@invitar2025?si=vCcv_9e6Zu0M6qo9"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="tc-footer-content container-fluid px-0">
          <div className="row">
            
            {/* Column 1 - Brand */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h6>Invitar: Where Every Invitation Tells a Story.</h6>
              <p>Your one-stop destination for stunning, customizable invitations! Whether it's a grand wedding, a corporate gala, or a heartfelt birthday celebration, we bring your special moments to life with beautifully crafted digital & printed invitations.</p>
            </div>

            {/* Column 2 - Vendor & Business */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <strong>Vendor & Business</strong>
              <ul className="tc-footer-list">
                <li>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am Interested in joining your website")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Become a Vendor
                  </a>
                </li>
                <li>
                  <Link to="/vendor/dashboard/">
                    Vendor Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I Want to add product advertisement")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add Advertisement
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Categories */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <strong>Explore Categories</strong>
              <ul className="tc-footer-list">
                <li>
                  <Link to="/search?query=Wedding">Wedding</Link>
                </li>
                <li>
                  <Link to="/search?query=Birthday">Birthday</Link>
                </li>
                <li>
                  <Link to="/search?query=Corporates">Corporates</Link>
                </li>
                <li>
                  <Link to="/search?query=Inaugration">Inauguration</Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Support */}
            <div className="col-lg-2 mb-4 mb-lg-0">
              <strong>Support</strong>
              <ul className="tc-footer-list">
                <li>
                  <Link to="/views/base/AboutUs">About Us</Link>
                </li>
                <li>
                  <Link to="/views/base/ContactUs">Contact Us</Link>
                </li>
                <li>
                  <Link to="/views/base/FAQ">FAQ</Link>
                </li>
                <li>
                  <Link to="/views/base/TermsCondition">T&C</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="tc-footer-bottom">
        © 2025 Copyright: <a href="#">Invitar</a>
      </div>
    </footer>
  )
}

export default StoreFooter