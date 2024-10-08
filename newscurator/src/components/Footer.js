import React, { useEffect } from "react";
import "../Styles/Footer.css"; // Ensure to create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="index.html">
                    <img
                      src="./Untitled.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </a>
                </div>
                <div className="footer-text">
                  <p>EXCLUSIVE FOR IAS ASPIRANTS !</p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a href="#">
                    <i className="fab fa-facebook-f facebook-bg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter twitter-bg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-google-plus-g google-bg"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Portfolio</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Our Services</a>
                  </li>
                  <li>
                    <a href="#">Expert Team</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Latest News</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="column">
                  <div className="col-xl-4 col-md-4 mb-30">
                    <div className="single-cta">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="cta-text">
                        <h4>Find us</h4>
                        <span>
                          {" "}
                          N0 6 Vivekanadar theru, Dubai kurukku sandhu,
                          <br />
                          dubai main road, Dubai
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-4 mb-30">
                    <div className="single-cta">
                      <i className="fas fa-phone"></i>
                      <div className="cta-text">
                        <h4>Call us</h4>
                        <span>9876543210</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-4 mb-30">
                    <div className="single-cta">
                      <i className="far fa-envelope-open"></i>
                      <div className="cta-text">
                        <h4>Mail us</h4>
                        <span>mail@info.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>
                  Copyright &copy; 2024, All Rights Reserved{""}
                  <a href="https://github.com/Rageshwaran-HR/CodeNSurge-NewsCurators">
                    NewsCurators
                  </a>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Policy</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
