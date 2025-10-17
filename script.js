 // Enhanced Mobile menu toggle
 const menuBtn = document.getElementById('menu-btn');
 const mobileNav = document.getElementById('mobile-nav');
 const mobileNavClose = document.getElementById('mobile-nav-close');

 function openMobileNav() {
   mobileNav.classList.add('active');
   menuBtn.classList.add('active');
   document.body.style.overflow = 'hidden'; // Prevent background scrolling
 }

 function closeMobileNav() {
   mobileNav.classList.remove('active');
   menuBtn.classList.remove('active');
   document.body.style.overflow = ''; // Restore scrolling
 }

 menuBtn.addEventListener('click', () => {
   if (mobileNav.classList.contains('active')) {
     closeMobileNav();
   } else {
     openMobileNav();
   }
 });

 // Close mobile menu when clicking close button
 mobileNavClose.addEventListener('click', closeMobileNav);

 // Close mobile menu when clicking on a link
 const mobileLinks = mobileNav.querySelectorAll('a');
 mobileLinks.forEach(link => {
   link.addEventListener('click', () => {
     closeMobileNav();
   });
 });

 // Close mobile menu when clicking outside
 mobileNav.addEventListener('click', (e) => {
   if (e.target === mobileNav) {
     closeMobileNav();
   }
 });

 // Close mobile menu on escape key
 document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
     closeMobileNav();
   }
 });

 // Set current year in footer
 document.getElementById('year').textContent = new Date().getFullYear();

 // Discord Webhook Integration
 const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1427391507220140064/en-T0nS81BbElU4uO6V6QFP_6TdMZ6LdiEfc8EoiN44RfOPxjuij5gc4ttKck5Myd9fT';
 
 // Contact form handling with Discord webhook
 const contactForm = document.getElementById('contact-form');
 const formStatus = document.getElementById('form-status');

 contactForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   
   // Get form data
   const formData = new FormData(contactForm);
   const name = formData.get('name');
   const email = formData.get('email');
   const subject = formData.get('subject');
   const message = formData.get('message');

   // Simple validation
   if (!name || !email || !subject || !message) {
     formStatus.textContent = 'Please fill in all fields.';
     formStatus.style.color = '#ef4444';
     return;
   }

   // Show loading state
   formStatus.textContent = 'Sending message to Discord...';
   formStatus.style.color = '#06b6d4';
   
   // Disable submit button
   const submitBtn = contactForm.querySelector('button[type="submit"]');
   submitBtn.disabled = true;
   submitBtn.textContent = 'Sending...';

   try {
     // Create Discord embed message
     const discordMessage = {
       content: '<@&1427754807053123594> New contact form submission!', // Replace ROLE_ID_HERE with actual role ID
       embeds: [{
         title: '📧 New Contact Form Submission',
         color: 0x5865F2, // Discord blurple color
         fields: [
           {
             name: '👤 Name',
             value: name,
             inline: false
           },
           {
             name: '📧 Email',
             value: email,
             inline: false
           },
           {
             name: '📝 Subject',
             value: subject,
             inline: false
           },
           {
             name: '💬 Message',
             value: message.length > 1000 ? message.substring(0, 1000) + '...' : message,
             inline: false
           }
         ],
         footer: {
           text: 'KulbuPlayz Website Contact Form',
           icon_url: 'https://cdn.discordapp.com/icons/1059742117846593617/a_webhook_avatar.png'
         },
         timestamp: new Date().toISOString()
       }]
     };

     // Send to Discord webhook
     const response = await fetch(DISCORD_WEBHOOK_URL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(discordMessage)
     });

     if (response.ok) {
       formStatus.textContent = '✅ Message sent successfully to Discord!';
       formStatus.style.color = '#10b981';
       contactForm.reset();
     } else {
       throw new Error('Discord webhook failed');
     }

   } catch (error) {
     console.error('Error sending to Discord:', error);
     formStatus.textContent = '❌ Failed to send message. Please try again.';
     formStatus.style.color = '#ef4444';
   } finally {
     // Re-enable submit button
     submitBtn.disabled = false;
     submitBtn.textContent = 'Submit';
   }
 });

 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute('href'));
     if (target) {
       target.scrollIntoView({
         behavior: 'smooth',
         block: 'start'
       });
     }
   });
 });

 // Add scroll effect to header
 window.addEventListener('scroll', () => {
   const header = document.querySelector('header');
   if (window.scrollY > 100) {
     header.classList.add('scrolled');
   } else {
     header.classList.remove('scrolled');
   }
 });

 // Add intersection observer for glass card animations
 const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.style.opacity = '1';
       entry.target.style.transform = 'translateY(0)';
     }
   });
 }, observerOptions);

 // Observe all cards
 document.querySelectorAll('.card, .feature-card, .social-card').forEach(card => {
   card.style.opacity = '0';
   card.style.transform = 'translateY(30px)';
   card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
   observer.observe(card);
 });

 // Scroll to top function
 function scrollToTop() {
   window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }

 // Show/hide floating button based on scroll position
 const floatingBtn = document.querySelector('.floating-btn');
 window.addEventListener('scroll', () => {
   if (window.scrollY > 300) {
     floatingBtn.style.opacity = '1';
     floatingBtn.style.transform = 'scale(1)';
   } else {
     floatingBtn.style.opacity = '0';
     floatingBtn.style.transform = 'scale(0.8)';
   }
 });

 // Initialize floating button as hidden
 floatingBtn.style.opacity = '0';
 floatingBtn.style.transform = 'scale(0.8)';
 floatingBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

 // Add magnetic effect to social cards
 document.querySelectorAll('.social-card').forEach(card => {
   card.addEventListener('mousemove', (e) => {
     const rect = card.getBoundingClientRect();
     const x = e.clientX - rect.left - rect.width / 2;
     const y = e.clientY - rect.top - rect.height / 2;
     
     card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
   });

   card.addEventListener('mouseleave', () => {
     card.style.transform = 'translate(0, 0) scale(1)';
   });
 });

 // Add parallax effect to background elements
 window.addEventListener('scroll', () => {
   const scrolled = window.pageYOffset;
   const parallaxElements = document.querySelectorAll('.geometric-shape, .particle');
   
   parallaxElements.forEach((element, index) => {
     const speed = 0.5 + (index * 0.1);
     element.style.transform = `translateY(${scrolled * speed}px)`;
   });
 });

 // Add typing animation delay
 setTimeout(() => {
   const typingElement = document.querySelector('.typing-text');
   if (typingElement) {
     typingElement.style.animation = 'typing 3s steps(20, end), blink-caret 0.75s step-end infinite';
   }
 }, 1000);

 // Dynamic 3D smoke effect enhancement
 function createDynamicSmoke() {
   const smokeContainer = document.querySelector('.smoke-container');
   
   // Add random 3D smoke particles periodically
   setInterval(() => {
     if (Math.random() > 0.7) { // 30% chance every interval
       const smoke = document.createElement('div');
       smoke.className = 'smoke-particle';
       
       // Random layer assignment
       const layers = ['smoke-layer-1', 'smoke-layer-2', 'smoke-layer-3', 'smoke-layer-4', 'smoke-layer-5'];
       smoke.classList.add(layers[Math.floor(Math.random() * layers.length)]);
       
       smoke.style.left = Math.random() * 100 + '%';
       smoke.style.width = (60 + Math.random() * 60) + 'px';
       smoke.style.height = smoke.style.width;
       smoke.style.animationDuration = (20 + Math.random() * 15) + 's';
       smoke.style.animationDelay = '-' + (Math.random() * 45) + 's';
       
       // Random 3D depth
       const depth = Math.random() * 400;
       smoke.style.transform = `translateZ(${depth}px)`;
       
       // Random color for variety
       const colors = [
         'rgba(255, 255, 255, 0.1)',
         'rgba(255, 107, 107, 0.08)',
         'rgba(78, 205, 196, 0.08)',
         'rgba(69, 183, 209, 0.08)',
         'rgba(150, 206, 180, 0.08)',
         'rgba(102, 126, 234, 0.08)'
       ];
       const randomColor = colors[Math.floor(Math.random() * colors.length)];
       smoke.style.background = `radial-gradient(circle, ${randomColor} 0%, ${randomColor.replace('0.08', '0.04')} 30%, transparent 70%)`;
       
       smokeContainer.appendChild(smoke);
       
       // Remove after animation completes
       setTimeout(() => {
         if (smoke.parentNode) {
           smoke.parentNode.removeChild(smoke);
         }
       }, 40000);
     }
   }, 2000);
 }

 // Initialize dynamic smoke
 createDynamicSmoke();