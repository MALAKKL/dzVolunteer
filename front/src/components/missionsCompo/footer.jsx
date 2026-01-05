import { FaWhatsapp, FaInstagram, FaTiktok, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa"

export function Footer() {
  return (
    <footer id="footer" className="missions-footer">
      <div className="missions-footer-container">
        <div className="missions-footer-content">
          <button className="missions-footer-btn">
            contact us
          </button>

          <div className="missions-footer-contact">
            <FaPhone className="missions-footer-contact-icon" />
            <span>+213 555 123 456</span>
          </div>

          <div className="missions-footer-contact">
            <FaEnvelope className="missions-footer-contact-icon" />
            <span>at_volunteers@gmailcom</span>
          </div>

          <div className="missions-footer-socials">
            <FaWhatsapp className="missions-footer-social-icon" />
            <FaInstagram className="missions-footer-social-icon" />
            <FaTiktok className="missions-footer-social-icon" />
            <FaLinkedin className="missions-footer-social-icon" />
          </div>
        </div>
      </div>
    </footer>
  )
}
