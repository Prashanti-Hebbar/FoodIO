import React, { useState, useEffect } from 'react';
import { FaHeart, FaBookmark, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import './FoodAlert.css';

const FoodAlert = ({ 
  isOpen, 
  onClose, 
  type = 'success', 
  title, 
  message, 
  action = 'Save',
  onConfirm,
  showConfirmButton = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Auto-close after 4 seconds for non-confirmation alerts
      if (!showConfirmButton) {
        const timer = setTimeout(() => {
          handleClose();
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, showConfirmButton]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'favorite':
        return <FaHeart className="alert-icon favorite" />;
      case 'save':
        return <FaBookmark className="alert-icon save" />;
      case 'success':
        return <FaCheckCircle className="alert-icon success" />;
      case 'warning':
        return <FaExclamationTriangle className="alert-icon warning" />;
      default:
        return <FaCheckCircle className="alert-icon success" />;
    }
  };

  const getAlertClass = () => {
    return `food-alert ${type} ${isVisible ? 'show' : ''}`;
  };

  return (
    <div className="food-alert-overlay" onClick={handleClose}>
      <div className={getAlertClass()} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="alert-close-btn" onClick={handleClose}>
          <FaTimes />
        </button>

        {/* Icon and content */}
        <div className="alert-content">
          <div className="alert-icon-container">
            {getIcon()}
          </div>
          
          <div className="alert-text">
            <h3 className="alert-title">{title}</h3>
            <p className="alert-message">{message}</p>
          </div>
        </div>

        {/* Action buttons */}
        {showConfirmButton && (
          <div className="alert-actions">
            <button className="alert-btn cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="alert-btn confirm" onClick={handleConfirm}>
              {action}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodAlert;
