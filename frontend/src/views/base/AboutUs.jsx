import React from "react";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="au-page">

      {/* ── Hero ── */}
      <section className="au-hero">
        <div className="au-hero__inner">
          <p className="au-eyebrow">Established in Perpetuity</p>
          <h1 className="au-hero__title">The Precision<br />Marketplace</h1>
          <p className="au-hero__sub">
            Where the world's finest timepieces meet discerning collectors.
          </p>
        </div>
        <div className="au-hero__overlay" />
      </section>

      {/* ── Trust Bar ── */}
      <div className="au-trust-bar">
        <div className="au-trust-item">
          <i className="fas fa-certificate" />
          <span>Certified Provenance</span>
        </div>
        <div className="au-trust-item">
          <i className="fas fa-tools" />
          <span>Master Horologist</span>
        </div>
        <div className="au-trust-item">
          <i className="fas fa-shield-alt" />
          <span>Digital Vault Protection</span>
        </div>
      </div>

      {/* ── Our Story ── */}
      <section className="au-section au-story">
        <div className="au-container au-story__grid">
          <div className="au-story__img-wrap">
            <img src="/au.jpg" alt="Our Story" className="au-story__img" />
            <div className="au-story__img-badge">
              <span className="au-story__img-badge-num">10+</span>
              <span className="au-story__img-badge-label">Years of Excellence</span>
            </div>
          </div>
          <div className="au-story__content">
            <p className="au-eyebrow">Our Story</p>
            <h2 className="au-section__title">A Marketplace Built for Horology</h2>
            <p className="au-story__text">
              TimeCraft was founded with a singular vision — to create the most trusted marketplace for luxury timepieces in the world. We bring together authorized dealers, certified pre-owned specialists, and independent collectors under one curated platform.
            </p>
            <p className="au-story__text">
              Every watch listed on our platform undergoes a rigorous authentication process by our in-house master horologists. From Patek Philippe to Rolex, Audemars Piguet to A. Lange & Söhne — we ensure every transaction reflects the heritage and craftsmanship of the piece.
            </p>
            <div className="au-story__stats">
              <div className="au-stat">
                <span className="au-stat__num">50+</span>
                <span className="au-stat__label">Brand Partners</span>
              </div>
              <div className="au-stat">
                <span className="au-stat__num">12K+</span>
                <span className="au-stat__label">Watches Sold</span>
              </div>
              <div className="au-stat">
                <span className="au-stat__num">98%</span>
                <span className="au-stat__label">Buyer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="au-section au-why">
        <div className="au-container">
          <p className="au-eyebrow au-center">Why TimeCraft</p>
          <h2 className="au-section__title au-center">The Standard of Excellence</h2>
          <div className="au-why__grid">
            <div className="au-why__card">
              <div className="au-why__icon"><i className="fas fa-certificate" /></div>
              <h4 className="au-why__title">Authenticated Pieces</h4>
              <p className="au-why__text">Every timepiece is verified by certified horologists with detailed movement inspection and provenance documentation.</p>
            </div>
            <div className="au-why__card">
              <div className="au-why__icon"><i className="fas fa-store" /></div>
              <h4 className="au-why__title">Multi-Brand Marketplace</h4>
              <p className="au-why__text">Shop from 50+ luxury watch brands — authorized dealers and certified pre-owned sellers all in one place.</p>
            </div>
            <div className="au-why__card">
              <div className="au-why__icon"><i className="fas fa-lock" /></div>
              <h4 className="au-why__title">Secure Transactions</h4>
              <p className="au-why__text">Our digital vault escrow system ensures funds are held safely until the buyer confirms receipt and authenticity.</p>
            </div>
            <div className="au-why__card">
              <div className="au-why__icon"><i className="fas fa-shipping-fast" /></div>
              <h4 className="au-why__title">Insured Logistics</h4>
              <p className="au-why__text">Every shipment is fully insured and tracked with white-glove delivery options for high-value pieces.</p>
            </div>
            <div className="au-why__card">
              <div className="au-why__icon"><i className="fas fa-crown" /></div>
              <h4 className="au-why__title">Luxury Subscription</h4>
              <p className="au-why__text">Subscribe to TimeCraft Prestige for priority access to rare drops, concierge service, and exclusive member pricing.</p>
            </div>
            <div className="au-why__card">
              <div className="au-why__icon"><i className="fas fa-chart-line" /></div>
              <h4 className="au-why__title">Market Intelligence</h4>
              <p className="au-why__text">Access real-time price trends, auction results, and investment-grade watch analytics as a premium member.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subscription Plans ── */}
      <section className="au-section au-plans">
        <div className="au-container">
          <p className="au-eyebrow au-center">Membership</p>
          <h2 className="au-section__title au-center">Subscribe to Prestige Service</h2>
          <p className="au-plans__sub au-center">Unlock exclusive benefits, early access to rare pieces, and dedicated concierge support.</p>

          <div className="au-plans__grid">
            <div className="au-plan">
              <p className="au-plan__tier">Collector</p>
              <div className="au-plan__price">
                <span className="au-plan__currency">₹</span>
                <span className="au-plan__amount">999</span>
                <span className="au-plan__period">/mo</span>
              </div>
              <ul className="au-plan__features">
                <li><i className="fas fa-check" /> Browse all listings</li>
                <li><i className="fas fa-check" /> Price history access</li>
                <li><i className="fas fa-check" /> Basic authentication reports</li>
                <li><i className="fas fa-check" /> Email support</li>
              </ul>
              <Link to="/register" className="au-plan__btn au-plan__btn--outline">Get Started</Link>
            </div>

            <div className="au-plan au-plan--featured">
              <div className="au-plan__popular">Most Popular</div>
              <p className="au-plan__tier">Connoisseur</p>
              <div className="au-plan__price">
                <span className="au-plan__currency">₹</span>
                <span className="au-plan__amount">2,999</span>
                <span className="au-plan__period">/mo</span>
              </div>
              <ul className="au-plan__features">
                <li><i className="fas fa-check" /> Everything in Collector</li>
                <li><i className="fas fa-check" /> Priority access to new drops</li>
                <li><i className="fas fa-check" /> Full authentication certificates</li>
                <li><i className="fas fa-check" /> Dedicated account manager</li>
                <li><i className="fas fa-check" /> Market analytics dashboard</li>
              </ul>
              <Link to="/register" className="au-plan__btn au-plan__btn--gold">Subscribe Now</Link>
            </div>

            <div className="au-plan">
              <p className="au-plan__tier">Prestige</p>
              <div className="au-plan__price">
                <span className="au-plan__currency">₹</span>
                <span className="au-plan__amount">7,999</span>
                <span className="au-plan__period">/mo</span>
              </div>
              <ul className="au-plan__features">
                <li><i className="fas fa-check" /> Everything in Connoisseur</li>
                <li><i className="fas fa-check" /> White-glove concierge</li>
                <li><i className="fas fa-check" /> Private auction access</li>
                <li><i className="fas fa-check" /> Investment portfolio reports</li>
                <li><i className="fas fa-check" /> 24/7 expert hotline</li>
              </ul>
              <Link to="/register" className="au-plan__btn au-plan__btn--outline">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="au-section au-contact">
        <div className="au-container">
          <p className="au-eyebrow au-center">Get in Touch</p>
          <h2 className="au-section__title au-center">We're Here to Help</h2>
          <div className="au-contact__grid">
            <a href="mailto:support@timecraft.com?subject=Support Request" className="au-contact__card">
              <div className="au-contact__icon"><i className="fas fa-envelope" /></div>
              <h5 className="au-contact__title">Email Us</h5>
              <p className="au-contact__detail">support@timecraft.com</p>
            </a>
            <div className="au-contact__card">
              <div className="au-contact__icon"><i className="fas fa-phone" /></div>
              <h5 className="au-contact__title">Call Us</h5>
              <p className="au-contact__detail">+91 98765 43210</p>
            </div>
            <a
              href="https://wa.me/9876543210?text=Hello!%20I%20have%20a%20query."
              target="_blank"
              rel="noopener noreferrer"
              className="au-contact__card"
            >
              <div className="au-contact__icon"><i className="fab fa-whatsapp" /></div>
              <h5 className="au-contact__title">WhatsApp</h5>
              <p className="au-contact__detail">Chat with an expert</p>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="au-cta">
        <div className="au-container au-cta__inner">
          <h3 className="au-cta__title">Ready to Find Your Next Timepiece?</h3>
          <Link to="/" className="au-cta__btn">Browse Inventory</Link>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;