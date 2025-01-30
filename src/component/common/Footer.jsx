import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-pink-800 mb-4">
            MediCamp Hub
          </h2>
          <p className="text-gray-600">
            Empowering communities through healthcare camps. Join, explore, or
            organize camps that make a real difference.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-pink-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-pink-600 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/availableCamp"
                className="hover:text-pink-600 transition-colors duration-300"
              >
                Available Camps
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-pink-600 transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-pink-600 transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Information */}
        <div>
          <h3 className="text-xl font-semibold text-pink-800 mb-4">
            Contact Us
          </h3>
          <p className="text-gray-600">
            <i className="fas fa-map-marker-alt mr-2 text-pink-800"></i>
            Plot # 77-78 Road # 9 Rupnagar Mirpur-2
          </p>
          <p className="text-gray-600">
            <i className="fas fa-phone-alt mr-2 text-pink-800"></i>
            +88 (017) 123-4567
          </p>
          <p className="text-gray-600">
            <i className="fas fa-envelope mr-2 text-pink-800"></i>
            support@medicamphub.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MediCamp Hub. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="https://www.facebook.com/marsel.CSE.PUST"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
