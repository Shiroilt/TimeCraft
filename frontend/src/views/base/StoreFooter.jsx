import React from 'react'
import { Link } from "react-router-dom";
import "./StoreFooter.css";

const whatsappNumber = "7862988589";

function StoreFooter() {
  return (
    <footer className="tc-footer">

      {/* ── Top Bar ── */}
      <div className="tc-footer__topbar">
        <span className="tc-footer__topbar-text">Get connected with us on social networks</span>
        <div className="tc-footer__socials">
          <a
            className="tc-social-btn"
            href="https://www.facebook.com/share/1AEKDLaUqa/"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
          >
            <i className="fab fa-facebook-f" />
          </a>
          <a
            className="tc-social-btn"
            href="https://pin.it/6emvOa9Tf"
            target="_blank"
            rel="noopener noreferrer"
            title="Pinterest"
          >
            <i className="fab fa-pinterest" />
          </a>
          <a
            className="tc-social-btn"
            href="https://youtube.com/@invitar2025?si=vCcv_9e6Zu0M6qo9"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
          >
            <i className="fab fa-youtube" />
          </a>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="tc-footer__divider" />

      {/* ── Main Grid ── */}
      <div className="tc-footer__grid">

        {/* Brand */}
        <div className="tc-footer__brand">
          <div className="tc-footer__logo">
            <span className="tc-footer__logo-icon">◎</span>
            <span className="tc-footer__logo-text">TIMECRAFT</span>
          </div>
          <p className="tc-footer__brand-desc">
            The world's most trusted marketplace for luxury timepieces. Buy, sell, and
            authenticate watches from 50+ heritage brands — with expert curation,
            certified provenance, and white-glove service.
          </p>
        </div>

        {/* Vendor & Business */}
        <div className="tc-footer__col">
          <p className="tc-footer__col-heading">Vendor & Business</p>
          <ul className="tc-footer__list">
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am Interested in joining your website")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-footer__link"
              >
                Become a Vendor
              </a>
            </li>
            <li>
              <Link className="tc-footer__link" to="/vendor/dashboard/">
                Vendor Dashboard
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I Want to add product advertisement")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-footer__link"
              >
                Add Advertisement
              </a>
            </li>
          </ul>
        </div>

        {/* Explore Categories */}
        <div className="tc-footer__col">
          <p className="tc-footer__col-heading">Explore Categories</p>
          <ul className="tc-footer__list">
            <li><Link to="/search?query=Luxury" className="tc-footer__link">Luxury</Link></li>
            <li><Link to="/search?query=digital" className="tc-footer__link">digital</Link></li>
            <li><Link to="/search?query=analog" className="tc-footer__link">analog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="tc-footer__col">
          <p className="tc-footer__col-heading">Support</p>
          <ul className="tc-footer__list">
            <li><Link to="/views/base/AboutUs" className="tc-footer__link">About Us</Link></li>
            <li><Link to="/views/base/ContactUs" className="tc-footer__link">Contact Us</Link></li>
            <li><Link to="/views/base/FAQ" className="tc-footer__link">FAQ</Link></li>
            <li><Link to="/views/base/TermsCondition" className="tc-footer__link">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* ── Copyright ── */}
      <div className="tc-footer__copyright">
        <span>© 2025 Invitar. All rights reserved.</span>
      </div>

    </footer>
  );
}

export default StoreFooter;