import React, { useState } from "react";
import "../assets/styles/ProductShare.css";

const ProductShare = ({ product }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Build shareable URL (use current URL + product ID or customize as needed)
  const productUrl = `${window.location.origin}/products?id=${product.id}`;
  const productTitle = product.name;
  const productDescription =
    product.description || `Check out ${product.name} at TopRoof Solutions`;

  // Share URLs for different platforms
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(productTitle + " - " + productUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(productTitle)}&body=${encodeURIComponent(productDescription + "\n\n" + productUrl)}`,
  };

  const handleShare = (platform) => {
    if (platform === "native" && navigator.share) {
      // Use native Web Share API (mobile devices)
      navigator
        .share({
          title: productTitle,
          text: productDescription,
          url: productUrl,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else if (platform === "copy") {
      // Copy link to clipboard
      navigator.clipboard
        .writeText(productUrl)
        .then(() => {
          alert("Link copied to clipboard!");
          setShowShareMenu(false);
        })
        .catch((err) => console.error("Failed to copy:", err));
    } else {
      // Open social media share window
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

  return (
    <div className="product-share-container">
      <button
        className="share-toggle-btn"
        onClick={() => setShowShareMenu(!showShareMenu)}
        title="Share this product"
      >
        📤
      </button>

      {showShareMenu && (
        <div className="share-menu">
          <div className="share-menu-header">
            <h4>Share Product</h4>
            <button
              className="close-share-menu"
              onClick={() => setShowShareMenu(false)}
            >
              ✕
            </button>
          </div>

          <div className="share-buttons">
            {/* Native Share (for mobile) */}
            {navigator.share && (
              <button
                className="share-btn native-share"
                onClick={() => handleShare("native")}
                title="Share"
              >
                <span className="share-icon">📱</span>
                <span className="share-label">Share</span>
              </button>
            )}

            {/* Facebook */}
            <button
              className="share-btn facebook-share"
              onClick={() => handleShare("facebook")}
              title="Share on Facebook"
            >
              <span className="share-icon">📘</span>
              <span className="share-label">Facebook</span>
            </button>

            {/* Twitter */}
            <button
              className="share-btn twitter-share"
              onClick={() => handleShare("twitter")}
              title="Share on Twitter"
            >
              <span className="share-icon">🐦</span>
              <span className="share-label">Twitter</span>
            </button>

            {/* WhatsApp */}
            <button
              className="share-btn whatsapp-share"
              onClick={() => handleShare("whatsapp")}
              title="Share on WhatsApp"
            >
              <span className="share-icon">💬</span>
              <span className="share-label">WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              className="share-btn linkedin-share"
              onClick={() => handleShare("linkedin")}
              title="Share on LinkedIn"
            >
              <span className="share-icon">💼</span>
              <span className="share-label">LinkedIn</span>
            </button>

            {/* Email */}
            <button
              className="share-btn email-share"
              onClick={() => handleShare("email")}
              title="Share via Email"
            >
              <span className="share-icon">📧</span>
              <span className="share-label">Email</span>
            </button>

            {/* Copy Link */}
            <button
              className="share-btn copy-link"
              onClick={() => handleShare("copy")}
              title="Copy Link"
            >
              <span className="share-icon">🔗</span>
              <span className="share-label">Copy Link</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close menu when clicking outside */}
      {showShareMenu && (
        <div
          className="share-menu-backdrop"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ProductShare;
