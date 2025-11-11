import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left Section */}
        <div className="footer__brand">
          <h3>🐾 PetCare</h3>
          <p>Making pet care easy and accessible.</p>
        </div>

        {/* Middle Section */}
        <div className="footer__links">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          {/* <a href="/adoption">Adoption</a> */}    
          {/* <a href="/marketplace">Marketplace</a> */}
          {/* <a href="/community">Community</a> */}
          <a href="/features">Features</a>
        </div>

        {/* Right Section */}
        <div className="footer__social">
          <p>Follow us:</p>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} PetCare. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
