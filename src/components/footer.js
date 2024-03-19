
import React from 'react';
import '../assets/css/footer.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left-content">ConsultIT © 2023. All Rights Reserved.</div>
        <div className="right-content">
        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        <FontAwesomeIcon icon={faInstagram}className="social-icon" />
        <FontAwesomeIcon icon={faXTwitter}className="social-icon" />
        <FontAwesomeIcon icon={faLinkedin}className="social-icon" />


        </div>
      </div>
    </footer>
  );
};

export default Footer;
