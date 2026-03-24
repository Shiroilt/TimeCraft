import React from "react";
import { Link } from "react-router-dom"; // React Router for navigation

const AboutUs = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="fw-bold">About Invitar</h1>
        <p className="text-muted">Where Every Invitation Tells a Story ✨</p>
      </div>

      {/* About Us Section */}
      <div className="row mt-4 align-items-center">
        <div className="col-lg-6">
        <img src="/au.png" className="img-fluid rounded-circle" alt="About Us"/>
        </div>
        <div className="col-lg-6">
          <h3 className="fw-bold">Our Story</h3>
          <p>
            Welcome to <b>Invitar</b>, your one-stop destination for stunning,
            customizable invitations! Whether it's a grand wedding, a corporate
            gala, or a heartfelt birthday celebration, we bring your special
            moments to life with beautifully crafted digital and printed
            invitations.
          </p>
          <p>
            We believe that an invitation is more than just an invite—it's a
            first impression, a glimpse into the celebration, and a cherished
            memory. That's why we strive to create invitations that reflect your
            unique style, culture, and personality.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="row text-center mt-5">
        <h3 className="fw-bold">Why Choose Us?</h3>

        <div className="col-md-4">
          <i className="fas fa-palette fa-3x text-primary"></i>
          <h5 className="mt-3">Custom Designs</h5>
          <p>Personalized invitations as well as ready made bliss crafted just for you.</p>
        </div>

        <div className="col-md-4">
          <i className="fas fa-bolt fa-3x text-warning"></i>
          <h5 className="mt-3">Get E-Invites</h5>
          <p>Receive beautifully designed digital invitations.</p>
        </div>

        <div className="col-md-4 text-center">
          <i className="bi bi-globe-asia-australia text-success fs-1"></i>
          <h5 className="mt-3">Nationwide Delivery</h5>
          <p>We ship printed invitations across the Nation.</p>
        </div>

      </div>

      {/* Contact Section */}
      <div className="row mt-5 text-center">
        <h3 className="fw-bold">Get in Touch</h3>
        <p className="text-muted">Have questions? We'd love to hear from you!</p>

        <div className="col-md-4 text-center">
        <a href="mailto:invitar2025@gmail.com?subject=Support Request&body=Hello, I need help with..." className="text-decoration-none">
          <i className="fas fa-envelope fa-2x text-danger"></i>
          <h6 className="mt-2">Email Us</h6>
          <p>invitar2025@gmail.com</p>
        </a>
        </div>


        <div className="col-md-4">
          <i className="fas fa-phone fa-2x text-info"></i>
          <h6 className="mt-2">Call Us</h6>
          <p>+91 98765 43210</p>
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
        <Link to="/" className="btn btn-dark">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
