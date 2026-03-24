import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="fw-bold">Terms & Conditions</h1>
        <p className="text-muted">Read our terms and conditions carefully to smoothly glide through Invitar.</p>
      </div>

      {/* Terms & Conditions Section */}
      <div className="mt-4">
        <h3 className="fw-bold">1. Introduction</h3>
        <p>
          Welcome to <b>Invitar</b>.By accessing or using our platform, you agree to comply with these terms and conditions.
        </p>

        <h3 className="fw-bold mt-4">2. Use of Our Services</h3>
        <p>
          Our website provides customizable digital and printed invitations for various events. You may not misuse the services offered, including unauthorized copying or reselling of designs.
        </p>

        <h3 className="fw-bold mt-4">3. Account Registration</h3>
        <p>
          To access certain features, users may be required to register for an account.
        </p>

        <h3 className="fw-bold mt-4">4. Payments & Refund Policy</h3>
        <ul>
          <li><b>Digital Invitations:</b> Non-refundable due to instant download availability.</li>
          <li><b>Printed Invitations:</b> Refunds are applicable only for defective or incorrect items.</li>
          <li><b>Bulk Orders:</b> Custom bulk orders are non-refundable once processing begins.</li>
        </ul>

        <h3 className="fw-bold mt-4">5. Intellectual Property Rights</h3>
        <p>
          All invitation designs, content, and branding elements on **Invitar** are protected by copyright. Unauthorized reproduction or distribution is strictly prohibited.
        </p>

        <h3 className="fw-bold mt-4">6. Order Processing & Delivery</h3>
        <ul>
          <li>Digital Invitations: Instant delivery upon payment confirmation.</li>
          <li>Printed Invitations: Estimated delivery time is **3-7 business days** depending on location.</li>
          <li>International Orders: May be subject to customs processing delays.</li>
        </ul>

        <h3 className="fw-bold mt-4">7. Cancellations & Modifications</h3>
        <p>
          Order modifications can be made within 24 hours of purchase. Cancellations for printed invitations must be requested before processing begins.
        </p>

        <h3 className="fw-bold mt-4">8. User Responsibilities</h3>
        <ul>
          <li>Do not use our platform for fraudulent or illegal activities.</li>
          <li>Ensure the accuracy of the details in your invitations before checkout.</li>
        </ul>

        <h3 className="fw-bold mt-4">9. Limitation of Liability</h3>
        <p>
          Invitar shall not be liable for any indirect damages, including but not limited to **loss of profits, data, or reputation** resulting from the use of our services.
        </p>

        <h3 className="fw-bold mt-4">10. Changes to Terms</h3>
        <p>
          We reserve the right to modify these terms at any time. Users will be notified of any updates, and continued use of our platform constitutes acceptance of the revised terms.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="text-center mt-5">
        <h3 className="fw-bold">Need Assistance?</h3>
        <p className="text-muted">If you have any questions about our terms, feel free to contact us.</p>
        <Link to="/views/base/ContactUs" className="btn btn-dark">Contact Us</Link>
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default Terms;