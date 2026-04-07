import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="fw-bold">Contact TIMECRAFT</h1>
        <p className="text-muted">We're here to assist you 24/7! 🌟</p>
      </div>

      {/* Contact Information */}
      <div className="row mt-4 text-center">
        <div className="col-md-4 text-center">
        <a href="mailto:invitar2025@gmail.com?subject=Support Request&body=Hello, I need help with..." className="text-decoration-none">
          <i className="fas fa-envelope fa-2x text-danger"></i>
          <h6 className="mt-2">Email Us</h6>
          <p>invitar2025@gmail.com</p>
        </a>
        </div>

        <div className="col-md-4">
          <a href="tel:+919157585636" className="text-decoration-none">
            <i className="fas fa-phone fa-2x text-danger"></i>
            <h6 className="mt-2">Call Us</h6>
            <p>+91 7862988589</p>
          </a>
        </div>


        <div className="col-md-4">
        <i className="fab fa-whatsapp fa-3x me-2"></i>
          <h6 className="mt-2">Quick Chat With Us</h6>
          <a 
            href="https://wa.me/9876543210?text=Hello!%20I%20have%20a%20query." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-2">
            Chat on WhatsApp
          </a>
        </div>
      </div>
      {/* Back to Home Button */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
};

export default ContactUs;
