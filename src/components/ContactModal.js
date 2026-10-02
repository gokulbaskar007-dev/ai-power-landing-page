import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

/*
  ============================================================================
  CONTACT MODAL — Reusable popup form
  ============================================================================

  WHAT THIS COMPONENT DOES:
  - Shows a modern popup (modal) with a contact form
  - Validates required fields before submitting
  - Sends the form data to your email using EmailJS
  - Shows a success message after sending

  HOW TO USE IT:
  <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

  PROPS:
  - isOpen   (boolean)  -> true = show the modal, false = hide it
  - onClose  (function) -> called when user clicks X or clicks outside

  EMAILJS SETUP (do this once):
  1. Go to https://www.emailjs.com/ and create a free account
  2. Add an Email Service (e.g. Gmail) -> copy the SERVICE ID
  3. Create an Email Template with variables: {{from_name}}, {{from_email}},
     {{phone}}, {{message}} -> copy the TEMPLATE ID
  4. Go to Account -> Public Key -> copy the PUBLIC KEY
  5. Paste all three values into the constants below
  ========================================================================== */

// ==========================================================================
// EMAILJS CONFIGURATION — paste your own values here
// ==========================================================================
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJkL'

// ==========================================================================
// FORM FIELD CONFIGURATION
// ==========================================================================
const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactModal({ isOpen, onClose }) {
  // Form field values
  const [form, setForm] = useState(INITIAL_FORM);
  // Validation error messages (one per field)
  const [errors, setErrors] = useState({});
  // 'idle' | 'sending' | 'sent' — tracks the submission state
  const [status, setStatus] = useState('idle');

  // Close the modal when the user presses the Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent the page from scrolling while the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // If the modal is closed, render nothing
  if (!isOpen) return null;

  // Update a single field when the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate all required fields
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't send if validation fails
    if (!validate()) return;

    setStatus('sending');

    try {
      // Send the email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('sent');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('idle');
      alert('Something went wrong. Please try again.');
    }
  };

  // Close and reset the form after showing the success message
  const handleClose = () => {
    onClose();
    // Wait for the close animation to finish before resetting
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setErrors({});
      setStatus('idle');
    }, 300);
  };

  // Click on the dark overlay (outside the modal) closes it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="modal">
        {/* Close button (X) */}
        <button
          type="button"
          className="modal__close"
          onClick={handleClose}
          aria-label="Close contact form"
        >
          &times;
        </button>

        {status === 'sent' ? (
          /* SUCCESS MESSAGE */
          <div className="modal__success">
            <div className="modal__success-icon">&#10003;</div>
            <h2 className="modal__success-title">Thank you!</h2>
            <p className="modal__success-text">
              We will contact you soon.
            </p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          /* CONTACT FORM */
          <>
            <h2 id="contact-modal-title" className="modal__title">
              Get In Touch
            </h2>
            <p className="modal__subtitle">
              Fill out the form below and we'll get back to you.
            </p>

            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="modal__field">
                <label htmlFor="contact-name" className="modal__label">
                  Full Name <span className="modal__required">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className={`modal__input${errors.name ? ' modal__input--error' : ''}`}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="modal__error">{errors.name}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="modal__field">
                <label htmlFor="contact-email" className="modal__label">
                  Email Address <span className="modal__required">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className={`modal__input${errors.email ? ' modal__input--error' : ''}`}
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="modal__error">{errors.email}</p>
                )}
              </div>

              {/* Phone Number (optional) */}
              <div className="modal__field">
                <label htmlFor="contact-phone" className="modal__label">
                  Phone Number{' '}
                  <span className="modal__optional">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  className="modal__input"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="modal__field">
                <label htmlFor="contact-message" className="modal__label">
                  Message <span className="modal__required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  className={`modal__input modal__textarea${errors.message ? ' modal__input--error' : ''}`}
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <p className="modal__error">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn--primary btn--large modal__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
