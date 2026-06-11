/**
 * Opulence Luxury Salon - Shared Components Dynamically Injected
 */

document.addEventListener('DOMContentLoaded', () => {
    // Determine active page filename
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // 1. INJECT LOADER OVERLAY (if container exists)
    const loaderContainer = document.getElementById('loader-container');
    if (loaderContainer) {
        loaderContainer.className = 'loader-container flex-center';
        loaderContainer.innerHTML = `
            <div class="loader-content">
                <img src="images/logo.png" alt="Opulence" class="loader-logo">
                <div class="loader-bar-bg">
                    <div class="loader-bar" id="loader-bar"></div>
                </div>
            </div>
        `;
    }

    // 2. INJECT HEADER
    const headerElement = document.getElementById('site-header');
    if (headerElement) {
        headerElement.innerHTML = `
            <div class="container">
                <a href="index.html" class="logo">
                    <img src="images/logo.png" alt="Opulence Logo">
                </a>
                <nav>
                    <ul class="nav-links" id="nav-links">
                        <li><a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Home</a></li>
                        <li><a href="about.html" class="${page === 'about.html' ? 'active' : ''}">About Us</a></li>
                        <li><a href="services.html" class="${page === 'services.html' ? 'active' : ''}">Services</a></li>
                        <li><a href="bridal.html" class="${page === 'bridal.html' ? 'active' : ''}">Bridal Studio</a></li>
                        <li><a href="gallery.html" class="${page === 'gallery.html' ? 'active' : ''}">Gallery</a></li>
                        <li><a href="reviews.html" class="${page === 'reviews.html' ? 'active' : ''}">Reviews</a></li>
                        <li><a href="contact.html" class="${page === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
                        <li class="mobile-only-action"><button class="btn btn-gold-solid open-booking-btn" style="width: 100%; margin-top: 1rem;">Book Experience</button></li>
                    </ul>
                </nav>
                <div class="nav-actions">
                    <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle Dark/Light Mode">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
                    </button>
                    <button class="btn btn-primary open-booking-btn">Book Experience</button>
                </div>
                <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Navigation Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        `;
    }

    // 3. INJECT FOOTER
    const footerElement = document.getElementById('site-footer');
    if (footerElement) {
        footerElement.innerHTML = `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <img src="images/logo.png" alt="Opulence Logo" class="footer-logo">
                        <p>Opulence Luxury Unisex Salon by Neha Aneja is Gurgaon's premier unisex destination for high-end beauty, hair, skin, and grooming couture.</p>
                        <div class="footer-socials">
                            <a href="https://instagram.com/opulenceluxurysalon" target="_blank" aria-label="Instagram">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="https://facebook.com/opulenceluxurysalon" target="_blank" aria-label="Facebook">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.61L17 8h-3V6.37C13 5.76 13.5 5 14.5 5H16V1h-3.5C9.5 1 9 2.5 9 5.25V8z"/></svg>
                            </a>
                        </div>
                    </div>
                    <div class="footer-col">
                        <h4>Navigations</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="services.html">Services & Quiz</a></li>
                            <li><a href="bridal.html">Bridal Studio</a></li>
                            <li><a href="gallery.html">Gallery Portfolio</a></li>
                            <li><a href="reviews.html">Client Reviews</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="services.html#hair">Hair Couture</a></li>
                            <li><a href="services.html#skin">Advanced Skincare</a></li>
                            <li><a href="bridal.html">Bridal Makeovers</a></li>
                            <li><a href="services.html#nails">Nail Artistry</a></li>
                            <li><a href="services.html#grooming">Gentlemen's Grooming</a></li>
                            <li><a href="services.html#membership">Luxury Packages</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Gurgaon Branches</h4>
                        <ul>
                            <li><strong>Satya The Hive Mall:</strong><br><span style="font-size:0.8rem;color:var(--color-text-muted);">Shop G-83, Sector 102, Gurugram</span></li>
                            <li><strong>Sector 109:</strong><br><span style="font-size:0.8rem;color:var(--color-text-muted);">Plot No. 16, Sector 109, Gurugram</span></li>
                            <li><strong>Contact:</strong><br><span style="font-size:0.8rem;color:var(--color-text-muted);">+91 98116 30659 / +91 99886 68335</span></li>
                            <li><strong>Email:</strong><br><span style="font-size:0.8rem;color:var(--color-text-muted);">opulenceluxurysalon@gmail.com</span></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 Opulence Luxury Unisex Salon. Crafted with luxury aesthetics. Gurgaon Location Targeting & Local SEO Optimized.</p>
                    <div class="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. INJECT BOOKING MODAL
    const modalContainer = document.getElementById('booking-modal-container');
    if (modalContainer) {
        modalContainer.className = 'modal-overlay';
        modalContainer.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="modal-close-btn" aria-label="Close Modal">&times;</button>
                <span class="eyebrow">Exquisite Grooming</span>
                <h3 style="margin-bottom: 2rem; font-size: 1.8rem; text-align:center;">Book Your Appointment</h3>
                <form id="booking-modal-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="modal-name">Full Name</label>
                            <input type="text" id="modal-name" class="form-control" placeholder="Your name" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-phone">Phone Number</label>
                            <input type="tel" id="modal-phone" class="form-control" placeholder="Your phone number" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="modal-branch">Select Branch</label>
                            <select id="modal-branch" class="form-control" required>
                                <option value="Satya The Hive Mall, Sector 102">Satya The Hive Mall, Sector 102</option>
                                <option value="Sector 109, Gurgaon">Sector 109, Gurgaon</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modal-service">Service Category</label>
                            <select id="modal-service" class="form-control" required>
                                <option value="Hair Couture">Hair Couture (Styling/Color)</option>
                                <option value="Advanced Skincare">Advanced Skincare</option>
                                <option value="Bridal Luxe Makeover">Bridal Luxe Makeover</option>
                                <option value="Nail Artistry">Nail Artistry</option>
                                <option value="Gentlemen's Grooming">Gentlemen's Grooming</option>
                                <option value="Luxury Packages">Luxury Membership/Packages</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="modal-date">Preferred Date</label>
                            <input type="date" id="modal-date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-time">Preferred Time</label>
                            <select id="modal-time" class="form-control" required>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:30 AM">11:30 AM</option>
                                <option value="01:00 PM">01:00 PM</option>
                                <option value="02:30 PM">02:30 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:30 PM">05:30 PM</option>
                                <option value="07:00 PM">07:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="modal-message">Special Instructions</label>
                        <textarea id="modal-message" class="form-control" rows="3" placeholder="Tell us about your preferences..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-gold-solid" style="width: 100%;">Confirm Reservation</button>
                </form>
            </div>
        `;
    }

    // 5. INJECT WIDGETS (WhatsApp Float + Back To Top)
    const widgetContainer = document.getElementById('floating-widgets-container');
    if (widgetContainer) {
        widgetContainer.innerHTML = `
            <a href="https://wa.me/919811630659?text=Hello%20Opulence%20Luxury%20Salon,%20I'd%20like%20to%20book%20a%20luxury%20experience." class="whatsapp-float" target="_blank" aria-label="WhatsApp Booking">
                <svg viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.25 8.477 3.517 2.266 2.268 3.513 5.28 3.511 8.483-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.115-2.883-6.978C16.594 1.898 14.116 1.87 11.48 1.87c-5.442 0-9.867 4.42-9.871 9.866-.001 1.748.476 3.456 1.381 4.954L1.936 21.8l5.244-1.376z"/>
                </svg>
            </a>
            <button class="back-to-top" id="back-to-top-btn" aria-label="Scroll to Top">
                ▲
            </button>
        `;
    }
});
