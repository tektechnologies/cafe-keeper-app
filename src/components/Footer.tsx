import React from "react";

const Footer: React.FC = () => {
  return (
    <>
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Products / Features</h4>
          <ul>
            <li>
              <a href="#">Features Overview</a>
            </li>
            <li>
              <a href="#">Pricing / Plans</a>
            </li>
            <li>
              <a href="#">Demo / Free Trial</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources / Learn</h4>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Data Entry Service</a>
            </li>
            <li>
              <a href="#">Case Studies / Success Stories</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal / Policies</h4>
          <ul>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Security / Compliance</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">Support / Contact</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Newsletter / Updates</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 TEKTechnologies. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;