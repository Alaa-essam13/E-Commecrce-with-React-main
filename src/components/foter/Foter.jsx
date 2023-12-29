import React from "react";
import "./footer.css";

const categories = {
  men: ["Men Fashion", "Men Clothing", "Men Accessories", "Men Shoes"],
  women: ["Women Fashion", "Women Clothing", "Women Accessories", "Women Shoes"],
  girls: ["Girls Fashion", "Girls Clothing", "Girls Accessories", "Girls Shoes"],
  boys: ["Boys Fashion", "Boys Clothing", "Boys Accessories", "Boys Shoes"],
};

const getRandomCategory = (category) => {
  const randomIndex = Math.floor(Math.random() * categories[category].length);
  return categories[category][randomIndex];
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3 className="footer-top-title"> We are always here to help you </h3>
        <div className="footer-top-email">
          <span className="footer-top-email-text"> Contact us via email </span>
          <span className="footer-top-email-address">
            <i className="bi bi-envelope text-center">   </i>
            shokrymansor123@Gmail.com
          </span>
        </div>
      </div>
      <div className="footer-items-wrapper">
        {Object.keys(categories).map((category) => (
          <div key={category} className="footer-item">
            <h4 className="footer-item-title">{category.charAt(0).toUpperCase() + category.slice(1)} Fashion</h4>
            <ul className="footer-item-links">
              {[...Array(6)].map((_, index) => (
                <li key={index} className="footer-item-link">
                  {getRandomCategory(category)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <i className="bi bi-c-circle"></i> all rights are saved 2024
      </div>
    </footer>
  );
};

export default Footer;
