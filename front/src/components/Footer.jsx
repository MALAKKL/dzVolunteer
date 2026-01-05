import React from "react";
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import "../styles/homePage.css";

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-bottom">
        <div className="footer-bar">
          <span>+213 555 123 456</span>
          <span>dz_volunteers@gmail.com</span>
        </div>
        <div className="footer-socials">
          <a href="#" className="footer-icon"><FaWhatsapp size={20} /></a>
          <a href="#" className="footer-icon"><FaFacebookF size={20} /></a>
          <a href="#" className="footer-icon"><FaLinkedinIn size={20} /></a>
          <a href="#" className="footer-icon"><FaInstagram size={20} /></a>
          <a href="#" className="footer-icon"><SiX size={20} /></a>
        </div>
      </div>
    </footer>
  );
}

