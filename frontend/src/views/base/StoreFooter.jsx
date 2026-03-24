import React from 'react'

const whatsappNumber = "7862988589";
import { Link } from "react-router-dom";
function StoreFooter() {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
        {/* Grid container */}
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
              <strong>Get connected with us on social networks</strong>
            </div>
            <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
              {/* Facebook */}
              <a
                className="btn btn-primary btn-sm btn-floating me-2"
                style={{ backgroundColor: "#3b5998" }}
                href="https://www.facebook.com/share/1AEKDLaUqa/"
                role="button"
              >
                <i className="fab fa-facebook-f" />
              </a>
              {/* Pinterest */}
              <a
                className="btn text-white btn-sm btn-floating me-2"
                style={{ backgroundColor: "#c61118" }}
                href="https://pin.it/6emvOa9Tf"
                role="button"
              >
                <i className="fab fa-pinterest" />
              </a>
              {/* Youtube */}
              <a
                className="btn text-white btn-sm btn-floating me-2"
                style={{ backgroundColor: "#ed302f" }}
                href="https://youtube.com/@invitar2025?si=vCcv_9e6Zu0M6qo9"
                role="button"
              >
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
          <hr className="my-3" />
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="col-lg-4 mb-4 mb-lg-0">
              {/* <p>
                <strong>About us</strong>//added little desc for footer
              </p> */}<h6><b>Invitar: Where Every Invitation Tells a Story.</b></h6>
              <p>Your one-stop destination for stunning, customizable invitations! Whether it's a grand wedding, a corporate gala, or a heartfelt birthday celebration, we bring your special moments to life with beautifully crafted digital & printed invitations.</p>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <p>
                <strong>Vendor & Business</strong>
              </p>
              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am Interested in joining your website")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark" style={{ textDecoration: "none", color: "inherit" }}
                  >
                      become a vendor{/*chnage by s */}
                  </a>
                </li>
                <li>{/*chnage by s */}
                  <Link className="text-dark" to="/vendor/dashboard/"style={{ textDecoration: "none", color: "inherit" }}>
                      {" "}
                      Vendor Dashboard
                  </Link>
                </li>
                <li>
                  <a
                     href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I Want to add product advertisement")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                       Add Advertisment{/*chnage by s */}
                  </a>
                </li>
              </ul>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <p>
                <strong>Explore Categories</strong>{/*chnage by y */}
              </p>
              <ul className="list-unstyled">
                <li>
                  <Link to="http://localhost:5173/search?query=Wedding" style={{ textDecoration: "none", color: "inherit" }} className="text-dark">
                  Wedding
                  </Link>
                </li>
                <li>
                  <Link to="http://localhost:5173/search?query=Birthday" style={{ textDecoration: "none", color: "inherit" }} className="text-dark"
                  >Birthday
                  </Link>
                  </li>
                <li>
                  <Link to="http://localhost:5173/search?query=Corporates" style={{ textDecoration: "none", color: "inherit" }} className="text-dark">
                  Corporates
                </Link>
                </li>
                <li>
                  <Link to="http://localhost:5173/search?query=Inaugration " style={{ textDecoration: "none", color: "inherit" }} className="text-dark">
                  Inauguration
                </Link>
                </li>
              </ul>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-2 mb-4 mb-lg-0">
              <p>
                <strong>Support</strong>
              </p>
              <ul className="list-unstyled" >
              <li>
                <Link to="/views/base/AboutUs" style={{ textDecoration: "none", color: "inherit" }} className="text-dark">
                  About Us {/* Changed by y */}
                </Link>
              </li>
              <li>
                <Link to="/views/base/ContactUs" style={{ textDecoration: "none", color: "inherit" }} className="text-dark">
                  Contact Us{/*chnage by y */}
                </Link>
              </li>
              <li>
                <Link to="/views/base/FAQ"  style={{ textDecoration: "none", color: "inherit" }}className="text-dark">
                  FAQ {/* Changed by y */}
                </Link>
              </li>
              <li>
                <Link to="/views/base/TermsCondition" style={{ textDecoration: "none", color: "inherit" }} className="text-dark">
                  T&C {/* Changed by y */}
                </Link>
              </li>
              </ul>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2025 Copyright:&nbsp;{/*added space*/}
          <a className="text-dark" href="#">
            Invitar
          </a>
        </div>
        {/* Copyright */}
      </footer>

    </div>
  )
}

export default StoreFooter