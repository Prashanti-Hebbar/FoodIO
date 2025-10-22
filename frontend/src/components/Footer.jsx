import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaApple, FaFacebookF, FaInstagram, FaPinterestP, FaGlobeAmericas, FaGooglePlay } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/Footer.css";

const currentUser = (() => {
  const userStr = localStorage.getItem("user");
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
})();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Footer() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState("en");
  const [modalItem, setModalItem] = useState(null);
  const [loading, setLoading] = useState(false);


const submitNewsletter = async (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter your email.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), // no userId
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Unexpected server response" };
    }

    if (response.ok) {
      const successMessage = data.message || "Subscribed successfully!";
      toast.success(successMessage);
      setEmail(""); // clear input
    } else {
      toast.error(data.message || "Subscription failed.");
    }
  } catch (error) {
    console.error("Subscription error:", error);
    toast.error("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};



  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
  ];

  const t = useMemo(() => {
    const dict = {
      en: {
        quickLinks: "Quick Links",
        topRated: "Top Rated Recipes",
        trending: "Trending Recipes",
        submit: "Submit Recipe",
        about: "About Us",
        careers: "Careers",
        faq: "FAQ",
        community: "Community",
        blog: "Blog",
        descTopRated: "Our community’s most loved dishes curated for you.",
        descTrending: "See what’s buzzing in the kitchen right now.",
        descSubmit: "Share your own creation with FoodIO and inspire others.",
        descAbout: "Learn more about the project and the team behind FoodIO.",
        descCareers: "Build the future of cooking with us.",
        descFAQ: "Answers to common questions and support.",
        descCommunity: "Join discussions, tips, and community events.",
        descBlog: "Stories, tips, and behind-the-scenes reads.",
        openPage: "Open Page",
      },
      hi: {
        quickLinks: "त्वरित लिंक",
        topRated: "सबसे पसंदीदा रेसिपी",
        trending: "ट्रेंडिंग रेसिपी",
        submit: "रेसिपी भेजें",
        about: "हमारे बारे में",
        careers: "करियर",
        faq: "सामान्य प्रश्न",
        community: "समुदाय",
        blog: "ब्लॉग",
        descTopRated: "समुदाय की सबसे पसंदीदा डिशेज।",
        descTrending: "अभी रसोई में क्या ट्रेंड कर रहा है।",
        descSubmit: "अपनी रेसिपी साझा करें और दूसरों को प्रेरित करें।",
        descAbout: "प्रोजेक्ट और टीम के बारे में जानें।",
        descCareers: "हमारे साथ भविष्य बनाएं।",
        descFAQ: "सामान्य प्रश्न और सहायता।",
        descCommunity: "चर्चाओं, सुझावों और कार्यक्रमों में शामिल हों।",
        descBlog: "कहानियां, सुझाव और पर्दे के पीछे की बातें।",
        openPage: "पेज खोलें",
      },
    };
    const current = dict[languageCode] || dict.en;
    return (key) => current[key] || dict.en[key] || key;
  }, [languageCode]);

  const quickLinkItems = [
    { id: "top-rated", labelKey: "topRated", to: "/Home#top-rated", descKey: "descTopRated" },
    { id: "trending", labelKey: "trending", to: "/Home#trending", descKey: "descTrending" },
    { id: "submit", labelKey: "submit", to: "/AddRecipe", descKey: "descSubmit" },
    { id: "about", labelKey: "about", to: "/About", descKey: "descAbout" },
    { id: "careers", labelKey: "careers", to: "/Careers", descKey: "descCareers" },
    { id: "faq", labelKey: "faq", to: "/HelpCenter", descKey: "descFAQ" },
    { id: "community", labelKey: "community", to: "/Community", descKey: "descCommunity" },
    { id: "blog", labelKey: "blog", to: "/Blog", descKey: "descBlog" },
  ];

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    // Change hardcoded colors to use CSS variables
    <footer className=" dark:bg-gray-900 dark:text-gray-200 enhanced-footer">
      <div className="container-fluid px-4">
        <div className="row align-items-start g-4 justify-content-between">
          <div className="col-12 col-md-6 col-lg-3 footer-section">
            <h3 className="footer-section-heading">FoodIO</h3>
            <p style={{ color: "var(--footer-text-muted)" }}>
              Foodio is a collaborative recipe sharing platform. Discover, share, and engage with recipes from a global community.
            </p>

            {/* Language Selector */}
            <div className="language-selector" aria-label="Language selector">
              <button
                type="button"
                className="language-btn"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((o) => !o)}
              >
                <FaGlobeAmericas aria-hidden="true" />
                <span>{(languages.find(l => l.code === languageCode) || languages[0]).label}</span>
              </button>
              {langOpen && (
                <div className="language-dropdown" role="listbox">
                  {languages.map((l) => (
                    <div
                      key={l.code}
                      className="language-option"
                      role="option"
                      aria-selected={languageCode === l.code}
                      onClick={() => {
                        setLanguageCode(l.code);
                        setLangOpen(false);
                      }}
                    >
                      {l.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            {/* <div className="theme-toggle" aria-label="Theme toggle">
              <button
                type="button"
                className={`theme-toggle-btn ${theme === "dark" ? "active" : ""}`}
                onClick={toggleTheme}
                aria-pressed={theme === "dark"}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="theme-toggle-slider" aria-hidden="true">
                  {theme === "dark" ? <IoMoon /> : <IoSunny />}
                </span>
              </button>
              <span>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3 footer-section">
            <h3 className="footer-section-heading">{t("quickLinks")}</h3>
            <ul className="footer-list">
              {quickLinkItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="footer-link footer-link-button"
                    onClick={() => openModal(item)}
                    aria-haspopup="dialog"
                    aria-controls={`footer-modal-${item.id}`}
                  >
                    <span className="footer-link-icon" aria-hidden="true"><RiArrowRightSLine /></span>
                    {t(item.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + App Store */}
          <div className="col-12 col-md-6 col-lg-3 footer-section">
            <h3 className="footer-section-heading">Connect With Us</h3>
            <div className="social-icons" role="list" aria-label="Social media links">
              <a href="#" className="social-icon social-facebook" aria-label="Visit our Facebook page" role="listitem">
                <FaFacebookF aria-hidden="true" />
              </a>
              <a href="#" className="social-icon social-instagram" aria-label="Visit our Instagram profile" role="listitem">
                <FaInstagram aria-hidden="true" />
              </a>
              <a href="#" className="social-icon social-twitter" aria-label="Visit our Twitter profile" role="listitem">
                <FaXTwitter aria-hidden="true" />
              </a>
              <a href="#" className="social-icon social-pinterest" aria-label="Visit our Pinterest profile" role="listitem">
                <FaPinterestP aria-hidden="true" />
              </a>
            </div>

            <h4 className="footer-section-heading" style={{ fontSize: "1.1rem" }}>Get the App</h4>
            <div className="app-store-buttons" aria-label="Download our mobile app">
              <a href="#" className="app-store-btn" aria-label="Download on the App Store">
                <FaApple className="app-store-icon" aria-hidden="true" />
                App Store
              </a>
              <a href="#" className="app-store-btn" aria-label="Get it on Google Play">
                <FaGooglePlay className="app-store-icon" aria-hidden="true" />
                Google Play
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-6 col-lg-3 footer-section">
            <h3 className="footer-section-heading">Contact</h3>
            <p className="contact-item"><span className="contact-icon" aria-hidden="true">📧</span> support@foodio.com</p>
            <p className="contact-item"><span className="contact-icon" aria-hidden="true">📞</span> +1 (555) 123-4567</p>
            <p className="contact-item"><span className="contact-icon" aria-hidden="true">📍</span> 123 Foodio St, Flavor City</p>
          </div>
        </div>

        {/* Newsletter (moved below columns and centered) */}
        <section className="newsletter-section newsletter-centered" aria-labelledby="newsletter-title">
          <h2 id="newsletter-title" className="newsletter-title">Stay in the loop</h2>
          <p className="newsletter-subtitle">Get tasty tips, trending recipes, and app updates. No spam—unsubscribe anytime.</p>
          <form className="newsletter-form" onSubmit={submitNewsletter} aria-label="Newsletter signup form">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">Subscribe</button>
          </form>
          <div className="newsletter-privacy">We care about your data. Read our <Link to="/PrivacyPolicy" className="newsletter-privacy-link">Privacy Policy</Link>.</div>
        </section>

        <div className="copyright-section">
          <p className="copyright-text">&copy; {new Date().getFullYear()} Foodio. All rights reserved.</p>
          <div className="copyright-links">
            <Link to="/PrivacyPolicy" className="copyright-link">Privacy Policy</Link>
            <Link to="/TermsOfService" className="copyright-link">Terms of Service</Link>
          </div>
        </div>
      </div>

      {modalItem && (
        <div className="footer-modal-overlay" onClick={closeModal}>
          <div
            className="footer-modal"
            role="dialog"
            aria-modal="true"
            id={`footer-modal-${modalItem.id}`}
            aria-labelledby="footer-modal-title"
            aria-describedby="footer-modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="footer-modal-close" onClick={closeModal} aria-label="Close">×</button>
            <h3 id="footer-modal-title">{t(modalItem.labelKey)}</h3>
            <p id="footer-modal-desc">{t(modalItem.descKey)}</p>
            <div className="footer-modal-actions">
              <Link to={modalItem.to} className="app-store-btn" onClick={closeModal}>
                {t("openPage")}
              </Link>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

export default Footer;
