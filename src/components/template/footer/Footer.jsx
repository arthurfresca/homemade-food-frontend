import React from 'react';
import './Footer.css';

const footerStyle = {
  textAlign: 'center',
};

const Footer = () =>
  (
    <div className="footer">
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p style={footerStyle}>
                Copyright &copy; 2017 MyTaxi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default Footer;
