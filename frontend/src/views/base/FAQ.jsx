import React from "react";
import { Link } from "react-router-dom";
//chnages in file
const FAQ = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="fw-bold">Frequently Asked Questions</h1>
        <p className="text-muted">Find answers to commonly asked questions about Invitar</p>
      </div>

      {/* FAQ Section */}
      <div className="accordion mt-4" id="faqAccordion">
        {/* Question 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
               What is TIMECRAFT❓
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
            ✉️"Your Perfect Invitation, Just a Click Away!"<br></br>
            ✉️"From Digital to Printed- We've Got You Covered!"<br></br>
            ✉️"Start the Celebration with Invitar!"<br></br>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              💳 What payment methods do you accept?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Vendors accept **credit/debit cards, UPI, PayPal, and net banking**. For bulk orders, they also offer secure direct bank transfers.<br></br>
              For queries- No worries <Link to="/views/base/ContactUs" className="text-dark">click me🫡</Link>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
              🛒 How do I place an order?
            </button>
          </h2>
          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Browse our collection, select a design, discuss with vendor and proceed to checkout. Once payment is completed, you'll receive a confirmation email with order details.
            </div>
          </div>
        </div>

        {/* Question 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
              🚚 How long does it take to receive my order?
            </button>
          </h2>
          <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
                 🔜Digital Invitations: Instant download available upon purchase.<br></br> 
                 🔜Printed Invitations: Delivery times vary based on location, but typically range from 3 to 7 business days/as discussed with Vendor.
            </div>
          </div>
        </div>

        {/* Question 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
              🎨 Can I customize the invitation designs?
            </button>
          </h2>
          <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              <img src="/yes.gif" alt="Yes GIF" className="me-2" width="200" height="100"/><br></br>
            We offer customization options for all invitations. You can modify text,colors,fonts or even upload personal images to  match your theme.<br></br>
            📝Note:Should be discussed through vendor.<br></br>
            
            </div>
          </div>
        </div>

        {/* Question 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
              📦 Do you offer bulk orders for businesses?
            </button>
          </h2>
          <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Absolutely! We provide bulk ordering options for **corporate events, weddings, and large gatherings**. Contact Vendors for special discounts and bulk pricing.
            </div>
          </div>
        </div>

        {/* Question 7 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7">
              ❌ What is your cancellation and refund policy?
            </button>
          </h2>
          <div id="faq7" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              - Digital Invitations: Non-refundable.  
              - Printed Invitations: Refunds available only for defective or incorrect items. Contact support within 48 hours of delivery.
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="text-center mt-5">
        <h3 className="fw-bold">Still Have Questions?</h3>
        <p className="text-muted">Reach out to us, and we'd be happy to assist you!</p>
        <Link to="/views/base/ContactUs" className="btn btn-dark">🙏Contact Us</Link>
      </div>
    </div>
  );
};

export default FAQ;