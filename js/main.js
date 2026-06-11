/**
 * Opulence Luxury Salon - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. LOADER PROGRESS & SIMULATION
    const loaderBar = document.getElementById('loader-bar');
    const loaderContainer = document.getElementById('loader-container');
    
    if (loaderBar && loaderContainer) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Complete loading
                loaderBar.style.width = '100%';
                setTimeout(() => {
                    loaderContainer.style.opacity = '0';
                    setTimeout(() => {
                        loaderContainer.style.display = 'none';
                    }, 800);
                }, 400);
            } else {
                loaderBar.style.width = `${progress}%`;
            }
        }, 80);
    }

    // 2. CUSTOM CURSOR TRAIL WITH SPARKLE, FLUID HALO & GLITTER PARTICLES (Desktop Only)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
        const dot = document.createElement('div');
        const ring = document.createElement('div');
        const badge = document.createElement('div');
        dot.className = 'custom-cursor-dot';
        ring.className = 'custom-cursor-ring';
        badge.className = 'custom-cursor-badge';
        document.body.appendChild(dot);
        document.body.appendChild(ring);
        document.body.appendChild(badge);

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let lastParticleX = 0, lastParticleY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.top = `${mouseY}px`;
            dot.style.left = `${mouseX}px`;
            badge.style.top = `${mouseY}px`;
            badge.style.left = `${mouseX}px`;

            // Emit glitter particles when moving
            const dist = Math.hypot(mouseX - lastParticleX, mouseY - lastParticleY);
            if (dist > 25) {
                createGlitterParticle(mouseX, mouseY);
                lastParticleX = mouseX;
                lastParticleY = mouseY;
            }
        });

        // Glitter Particle Creation
        const createGlitterParticle = (x, y) => {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            
            // Random slight horizontal drift
            const driftX = (Math.random() * 40 - 20) + 'px';
            p.style.setProperty('--drift-x', driftX);
            
            document.body.appendChild(p);
            setTimeout(() => {
                p.remove();
            }, 800);
        };

        // Smooth follow animation for the ring with speed-based organic stretching
        const tick = () => {
            const deltaX = mouseX - ringX;
            const deltaY = mouseY - ringY;
            
            ringX += deltaX * 0.15;
            ringY += deltaY * 0.15;
            
            ring.style.top = `${ringY}px`;
            ring.style.left = `${ringX}px`;

            // Compute speed and direction angle for visual stretching effect
            const speed = Math.hypot(deltaX, deltaY);
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            
            // Scale and compress ring according to speed (liquid drag look)
            const scaleX = 1 + Math.min(speed / 90, 0.45);
            const scaleY = 1 - Math.min(speed / 180, 0.25);
            
            if (document.body.classList.contains('cursor-hover')) {
                // Remove stretching on hover snaps
                ring.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1)`;
            } else {
                ring.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
            }
            
            requestAnimationFrame(tick);
        };
        tick();

        // Hover states with customized contextual badges
        const addCursorListeners = () => {
            const elements = document.querySelectorAll('a, button, input, select, textarea, .before-after-container, [role="button"]');
            
            elements.forEach(el => {
                el.addEventListener('mouseenter', (e) => {
                    document.body.classList.add('cursor-hover');
                    
                    let badgeText = '';
                    // Customize badge copy
                    if (el.classList.contains('open-booking-btn')) {
                        badgeText = 'book now';
                    } else if (el.classList.contains('before-after-container')) {
                        badgeText = 'drag curtain';
                    } else if (el.tagName === 'A') {
                        // Check if social links or widgets
                        if (el.closest('.footer-socials') || el.closest('.whatsapp-float') || el.closest('.theme-toggle-btn')) {
                            badgeText = 'visit';
                        } else {
                            badgeText = 'explore';
                        }
                    } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                        badgeText = 'type';
                    } else if (el.id === 'theme-toggle') {
                        badgeText = 'toggle theme';
                    } else {
                        badgeText = 'interact';
                    }

                    if (badgeText) {
                        badge.innerText = badgeText;
                        badge.style.opacity = '1';
                        badge.style.transform = 'translate(28px, 28px)';
                    }
                });

                el.addEventListener('mouseleave', () => {
                    document.body.classList.remove('cursor-hover');
                    badge.style.opacity = '0';
                    badge.style.transform = 'translate(24px, 24px)';
                });
            });
        };
        
        // Allow dynamic page headers/footers to compile first
        setTimeout(addCursorListeners, 150);
        // Expose to allow pages to refresh hooks
        window.refreshCursorHooks = addCursorListeners;
    }

    // 3. NAVIGATION MANAGEMENT & HAMBURGER
    setTimeout(() => {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
        
        // SCROLL NAVBAR BACKGROUND CHANGE
        const header = document.getElementById('site-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }, 100);

    // 4. THEME TOGGLER (Dark / Light)
    setTimeout(() => {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('opulence-theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            // Update icon initially
            updateThemeIcon(themeToggle, savedTheme);
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('opulence-theme', newTheme);
                updateThemeIcon(themeToggle, newTheme);
            });
        }
    }, 100);

    function updateThemeIcon(btn, theme) {
        if (theme === 'light') {
            btn.innerHTML = `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`;
        } else {
            btn.innerHTML = `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`;
        }
    }

    // 5. BOOKING MODAL TRIGGERS & SUCCESS LOGIC
    // 5. BOOKING DIRECT TO WHATSAPP REDIRECTS
    setTimeout(() => {
        const openBtns = document.querySelectorAll('.open-booking-btn');
        
        const redirectToWhatsApp = (category = '') => {
            let text = `Hello Opulence Luxury Salon! I would like to book a luxury session.`;
            if (category) {
                text = `Hello Opulence Luxury Salon! I would like to reserve a session for *${category}*.`;
            }
            const waUrl = `https://wa.me/919811630659?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
        };

        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = btn.getAttribute('data-category') || '';
                redirectToWhatsApp(cat);
            });
        });

        // Expose globally
        window.openLuxuryBooking = redirectToWhatsApp;
    }, 100);

    // 6. SCROLL REVEALS (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed to retain visual state
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial query and repeat query setup
    const refreshReveals = () => {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        reveals.forEach(el => revealObserver.observe(el));
    };
    
    // Check elements on load
    setTimeout(refreshReveals, 300);
    // Expose for page adjustments
    window.refreshScrollReveals = refreshReveals;

    // 7. BACK TO TOP BUTTON
    setTimeout(() => {
        const bttBtn = document.getElementById('back-to-top-btn');
        if (bttBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 400) {
                    bttBtn.classList.add('active');
                } else {
                    bttBtn.classList.remove('active');
                }
            });

            bttBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }, 100);

    // 8. FAQ ACCORDION TOGGLES
    setTimeout(() => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                const isActive = item.classList.contains('active');
                
                // Close other items
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                    const ans = el.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }, 100);
});
