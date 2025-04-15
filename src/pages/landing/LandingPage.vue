<template>
  <div class="landing-page">
    <header class="main-header">
      <div class="logo-section">
        <h1 class="logo">CodeU</h1>
        <div class="lightning-icon">⚡</div>
      </div>
      <nav class="main-nav">
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>
      </nav>
      <div class="auth-section">
        <router-link class="sign-in-button" to="/login">Sign In</router-link>
      </div>
      <button class="mobile-menu-button" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
        <ul>
          <li><a href="#features" @click="closeMobileMenu">Features</a></li>
          <li><a href="#how-it-works" @click="closeMobileMenu">How it works</a></li>
          <li><a href="#pricing" @click="closeMobileMenu">Pricing</a></li>
          <li><a href="#testimonials" @click="closeMobileMenu">Testimonials</a></li>
          <li><router-link to="/login" @click="closeMobileMenu">Sign In</router-link></li>
        </ul>
      </div>
    </header>

    <main class="hero-section">
      <div class="hero-content">
        <h2 class="hero-title">
          How product & <br />
          engineering teams <br />
          work together with AI
        </h2>
        <p class="hero-description">
          Turn text into working web apps. CodeU handles the code while you focus on
          your vision, letting you <strong>create</strong> and <strong>launch</strong> applications directly from your
          browser.
        </p>
        <div class="hero-buttons">
          <router-link to="/editor" class="try-button">Try CodeU now</router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="mockup-editor">
          <!-- Editor mockup para la imagen de la derecha -->
          <div class="mockup-code">
            <div class="code-line"></div>
            <div class="code-line"></div>
            <div class="code-line"></div>
            <div class="code-line"></div>
            <div class="code-line"></div>
          </div>
        </div>
      </div>
    </main>

    <section id="features" class="features-section">
      <div class="section-header">
        <h2>Powerful Features</h2>
        <p>Everything you need to build amazing web applications</p>
      </div>
      <div class="features-container">
        <div class="feature">
          <div class="feature-icon">💻</div>
          <h3>Instant Web Development</h3>
          <p>Create and share projects instantly with zero setup. Get started in seconds with our intuitive interface.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">👥</div>
          <h3>True Live Collaboration</h3>
          <p>Collaborate with others in real-time as if you're in the same room. See changes as they happen.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔍</div>
          <h3>Multi-Language Support</h3>
          <p>HTML, CSS, and JavaScript with syntax highlighting, autocomplete, and intelligent suggestions.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🚀</div>
          <h3>Instant Preview</h3>
          <p>See your changes in real-time with our live preview. No need to reload or rebuild your application.</p>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-it-works-section">
      <div class="section-header">
        <h2>How It Works</h2>
        <p>Start building in just a few simple steps</p>
      </div>
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Sign up for an account</h3>
          <p>Create a free account to get started with CodeU. No credit card required.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Create a new project</h3>
          <p>Start with a blank canvas or choose from our templates to jumpstart your development.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Code and preview</h3>
          <p>Write your code and see the results instantly with our live preview feature.</p>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <h3>Share and collaborate</h3>
          <p>Invite team members to collaborate or share your project with a simple URL.</p>
        </div>
      </div>
    </section>

    <section id="pricing" class="pricing-section">
      <div class="section-header">
        <h2>Simple Pricing</h2>
        <p>Choose the plan that fits your needs</p>
      </div>
      <div class="pricing-container">
        <div class="pricing-plan">
          <div class="plan-header">
            <h3>Free</h3>
            <div class="plan-price">$0<span>/month</span></div>
          </div>
          <ul class="plan-features">
            <li>Up to 3 projects</li>
            <li>Basic editor features</li>
            <li>Community support</li>
            <li>1GB storage</li>
          </ul>
          <router-link to="/register" class="plan-button">Get Started</router-link>
        </div>
        <div class="pricing-plan popular">
          <div class="popular-badge">Most Popular</div>
          <div class="plan-header">
            <h3>Pro</h3>
            <div class="plan-price">$12<span>/month</span></div>
          </div>
          <ul class="plan-features">
            <li>Unlimited projects</li>
            <li>Advanced editor features</li>
            <li>Priority support</li>
            <li>10GB storage</li>
            <li>Custom domains</li>
          </ul>
          <router-link to="/register" class="plan-button">Start Free Trial</router-link>
        </div>
        <div class="pricing-plan">
          <div class="plan-header">
            <h3>Team</h3>
            <div class="plan-price">$49<span>/month</span></div>
          </div>
          <ul class="plan-features">
            <li>Everything in Pro</li>
            <li>Team collaboration tools</li>
            <li>Advanced permissions</li>
            <li>50GB storage</li>
            <li>Priority support</li>
          </ul>
          <router-link to="/register" class="plan-button">Contact Sales</router-link>
        </div>
      </div>
    </section>

    <section id="testimonials" class="testimonials-section">
      <div class="section-header">
        <h2>What Our Users Say</h2>
        <p>Join thousands of satisfied developers</p>
      </div>
      <div class="testimonials-container">
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"CodeU has completely transformed how our team collaborates on web projects. The live preview feature is a game changer!"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">JD</div>
            <div class="author-info">
              <h4>John Doe</h4>
              <p>Senior Developer at TechCorp</p>
            </div>
          </div>
        </div>
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"I've tried many coding platforms, but CodeU stands out with its intuitive interface and powerful features. It's become an essential tool in my workflow."</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">AS</div>
            <div class="author-info">
              <h4>Alex Smith</h4>
              <p>Freelance Web Developer</p>
            </div>
          </div>
        </div>
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"Teaching web development has never been easier. My students love how quickly they can see their code come to life with CodeU."</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">MW</div>
            <div class="author-info">
              <h4>Maria Williams</h4>
              <p>Computer Science Professor</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="main-footer">
      <div class="footer-grid">
        <div class="footer-column brand-column">
          <div class="footer-logo">
            <h2 class="logo">CodeU<span class="lightning-icon">⚡</span></h2>
          </div>
          <p class="footer-tagline">Turn text into working web apps.</p>
          <div class="social-links">
            <a href="#" class="social-link">
              <span class="social-icon">X</span>
            </a>
            <a href="#" class="social-link">
              <span class="social-icon">in</span>
            </a>
            <a href="#" class="social-link">
              <span class="social-icon">G</span>
            </a>
            <a href="#" class="social-link">
              <span class="social-icon">f</span>
            </a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Product</h3>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">API Reference</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 CodeU. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
</script>

<style>
.landing-page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #fff;
  background-color: #13151f;
  overflow-x: hidden;
}

/* Header y Navbar */
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background-color: rgba(19, 21, 31, 0.98);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.lightning-icon {
  margin-left: 4px;
  font-size: 20px;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li {
  margin: 0 16px;
}

.main-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.main-nav a:hover {
  color: #3e63dd;
}

.auth-section {
  margin-left: auto;
}

.sign-in-button {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.sign-in-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile menu */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  position: relative;
  z-index: 101;
}

.mobile-menu-button span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #fff;
  margin: 4px 0;
  transition: transform 0.3s, opacity 0.3s;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #13151f;
  z-index: 100;
  padding: 80px 24px 24px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.mobile-menu.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  margin: 16px 0;
}

.mobile-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 8px 0;
}

/* Sección Hero */
.hero-section {
  display: flex;
  padding: 80px 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: 60px;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 24px;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.8);
  max-width: 90%;
}

.hero-buttons {
  margin-top: 32px;
}

.try-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3e63dd;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.try-button:hover {
  background-color: #2c4bba;
}

.hero-image {
  flex: 1;
  padding: 20px;
}

.mockup-editor {
  background-color: #1e2235;
  border-radius: 8px;
  height: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mockup-code {
  padding: 20px;
}

.code-line {
  height: 10px;
  margin-bottom: 15px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.01) 100%);
}

.code-line:nth-child(odd) {
  width: 85%;
}

.code-line:nth-child(even) {
  width: 65%;
}

/* Encabezado de sección común */
.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
}

.section-header h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Sección Features */
.features-section {
  background-color: #171923;
  padding: 100px 60px;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  background-color: #1e2235;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 20px;
}

.feature h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #fff;
}

.feature p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Sección How it Works */
.how-it-works-section {
  padding: 100px 60px;
  background-color: #13151f;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.step {
  position: relative;
  padding: 30px;
  background-color: #1e2235;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 30px;
  width: 40px;
  height: 40px;
  background-color: #3e63dd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: white;
}

.step h3 {
  margin-top: 10px;
  margin-bottom: 16px;
  font-size: 18px;
}

.step p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Sección Pricing */
.pricing-section {
  padding: 100px 60px;
  background-color: #171923;
}

.pricing-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-plan {
  background-color: #1e2235;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pricing-plan:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.pricing-plan.popular {
  border-color: #3e63dd;
  transform: scale(1.05);
}

.popular-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #3e63dd;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
}

.plan-header {
  padding: 30px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.plan-header h3 {
  font-size: 24px;
  margin-bottom: 16px;
}

.plan-price {
  font-size: 36px;
  font-weight: 700;
}

.plan-price span {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.plan-features {
  list-style: none;
  padding: 30px;
  margin: 0;
}

.plan-features li {
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  padding-left: 24px;
}

.plan-features li:before {
  content: "✓";
  color: #3e63dd;
  position: absolute;
  left: 0;
}

.plan-button {
  display: block;
  margin: 0 30px 30px;
  padding: 12px;
  text-align: center;
  background-color: rgba(62, 99, 221, 0.1);
  color: #3e63dd;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.pricing-plan.popular .plan-button {
  background-color: #3e63dd;
  color: white;
}

.plan-button:hover {
  background-color: rgba(62, 99, 221, 0.2);
}

.pricing-plan.popular .plan-button:hover {
  background-color: #2c4bba;
}

/* Testimonios */
.testimonials-section {
  padding: 100px 60px;
  background-color: #13151f;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial {
  background-color: #1e2235;
  border-radius: 8px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-content {
  margin-bottom: 20px;
}

.testimonial-content p {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3e63dd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  margin-right: 12px;
  font-size: 14px;
}

.author-info h4 {
  margin: 0 0 4px;
  font-size: 16px;
}

.author-info p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Footer */
.main-footer {
  background-color: #171923;
  padding: 80px 60px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto 60px;
}

.footer-column h3 {
  font-size: 16px;
  margin: 0 0 20px;
  color: #fff;
}

.footer-tagline {
  margin: 16px 0 24px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  transition: background-color 0.2s;
}

.social-link:hover {
  background-color: #3e63dd;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 12px;
}

.footer-column a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-column a:hover {
  color: #3e63dd;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-bottom p {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #3e63dd;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 48px;
  }
  
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-column.brand-column {
    grid-column: 1 / -1;
  }
}

@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-image {
    margin-top: 40px;
    width: 100%;
  }

  .features-section,
  .how-it-works-section,
  .pricing-section,
  .testimonials-section {
    padding: 60px 20px;
  }
  
  .pricing-plan.popular {
    transform: none;
  }
}

@media (max-width: 768px) {
  .main-nav,
  .auth-section {
    display: none;
  }
  
  .mobile-menu-button {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .mobile-menu-button.active span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }
  
  .mobile-menu-button.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-button.active span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }
  
  .section-header h2 {
    font-size: 30px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .section-header h2 {
    font-size: 24px;
  }
  
  .section-header p {
    font-size: 16px;
  }
}
</style> 