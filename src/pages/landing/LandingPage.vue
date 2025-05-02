<template>
  <div class="landing-page">
    <header class="main-header">
      <div class="logo-section">
        <h1 class="logo">CodeU</h1>
        <img src="../../assets/code-u-logo.svg" alt="Logo CodeU" class="lightning-logo" />
      </div>
      <nav class="main-nav">
        <ul>
          <li><a href="#features">Características</a></li>
          <li><a href="#how-it-works">Cómo funciona</a></li>
          <li><a href="#pricing">Precios</a></li>
          <li><a href="#testimonials">Testimonios</a></li>
        </ul>
      </nav>
      <div class="auth-section">
        <router-link class="sign-in-button" to="/login">Iniciar sesión</router-link>
      </div>
      <button class="mobile-menu-button" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
        <ul>
          <li><a href="#features" @click="closeMobileMenu">Características</a></li>
          <li><a href="#how-it-works" @click="closeMobileMenu">Cómo funciona</a></li>
          <li><a href="#pricing" @click="closeMobileMenu">Precios</a></li>
          <li><a href="#testimonials" @click="closeMobileMenu">Testimonios</a></li>
          <li><router-link to="/login" @click="closeMobileMenu">Iniciar sesión</router-link></li>
        </ul>
      </div>
    </header>

    <main class="hero-section">
      <div class="hero-content">
        <span class="hero-tag">Editor de código web de Html, Css y JavaScript</span>
        <h2 class="hero-title">
          Practica, Aprende y Construye <br />
          el futuro web <br />
          de CodeU
        </h2>
        <p class="hero-description">
          Transforma texto en aplicaciones web funcionales en segundos. CodeU gestiona el código mientras tú te 
          centras en tu visión, permitiéndote <strong>crear</strong> y <strong>practicar</strong> los fundamentos web directamente desde tu navegador.
        </p>
        <div class="hero-buttons">
          <router-link to="/editor" class="try-button">Prueba CodeU ahora</router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="mockup-editor">
          <!-- Reemplazando las líneas de código simuladas con la imagen del editor -->
          <img src="../../assets/Editor_landin.png" alt="Editor CodeU" class="editor-preview-image">
        </div>
      </div>
    </main>

    <section id="features" class="features-section">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <div class="decoration decoration-3"></div>
      <div class="section-header">
        <h2>Características Potentes</h2>
        <p>Todo lo que necesitas para crear aplicaciones web extraordinarias</p>
      </div>
      <div class="features-container">
        <div class="feature">
          <div class="feature-icon">💻</div>
          <h3>Desarrollo Web Instantáneo</h3>
          <p>Crea y comparte proyectos al instante sin configuración previa. Comienza en segundos con nuestra interfaz intuitiva.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔮</div>
          <h3>Practica en Tiempo Real</h3>
          <p>Trabaja en tantas aplicaciones en tiempo real de la manera mas sencilla y rapida. Ve los cambios mientras ocurren.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🚀</div>
          <h3>Vista Previa Instantánea</h3>
          <p>Visualiza tus cambios en tiempo real con nuestra vista previa en vivo. Sin necesidad de recargar o reconstruir tu aplicación.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">✨</div>
          <h3>Editor de Código Inteligente</h3>
          <p>Disfruta de resaltado de sintaxis, autocompletado y sugerencias inteligentes para HTML, CSS y JavaScript.</p>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-it-works-section">
      <div class="section-header">
        <h2>Cómo Funciona</h2>
        <p>Comienza a construir en pocos pasos simples</p>
      </div>
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Regístrate gratis</h3>
          <p>Crea una cuenta gratuita para empezar con CodeU. No se requiere tarjeta de crédito.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Crea un proyecto</h3>
          <p>Comienza desde cero o elige una de nuestras plantillas para acelerar tu desarrollo.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Codifica y previsualiza</h3>
          <p>Escribe tu código y ve los resultados instantáneamente con nuestra función de vista previa en vivo.</p>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <h3>Guarda y Practica</h3>
          <p>Guarda Proyectos y retomalos despues para que sigas mejorando tus habilidades.</p>
        </div>
      </div>
    </section>

    <section id="pricing" class="pricing-section">
      <div class="section-header">
        <h2>Precios Transparentes</h2>
        <p>Elige el plan que se adapte a tus necesidades</p>
      </div>
      <div class="pricing-container">
        <div class="pricing-plan">
          <div class="plan-header">
            <h3>Free</h3>
            <div class="plan-price">$0<span>/mes</span></div>
          </div>
          <ul class="plan-features">
            <li>Hasta 3 proyectos</li>
            <li>Características básicas del editor</li>
            <li>Soporte comunitario</li>
            <li>1GB de almacenamiento</li>
          </ul>
          <router-link to="/register" class="plan-button">Comenzar gratis</router-link>
        </div>
        <div class="pricing-plan popular">
          <div class="popular-badge">Más Popular</div>
          <div class="plan-header">
            <h3>Pro</h3>
            <div class="plan-price">$12<span>/mes</span></div>
          </div>
          <ul class="plan-features">
            <li>Proyectos ilimitados</li>
            <li>Características avanzadas del editor</li>
            <li>Soporte prioritario</li>
            <li>10GB de almacenamiento</li>
            <li>Dominios personalizados</li>
          </ul>
          <router-link to="/register" class="plan-button">Prueba gratuita</router-link>
        </div>
        <div class="pricing-plan">
          <div class="plan-header">
            <h3>Equipo</h3>
            <div class="plan-price">$49<span>/mes</span></div>
          </div>
          <ul class="plan-features">
            <li>Todo lo incluido en Pro</li>
            <li>Herramientas de colaboración en equipo</li>
            <li>Permisos avanzados</li>
            <li>50GB de almacenamiento</li>
            <li>Soporte prioritario</li>
          </ul>
          <router-link to="/register" class="plan-button">Contactar ventas</router-link>
        </div>
      </div>
    </section>

    <section id="testimonials" class="testimonials-section">
      <div class="section-header">
        <h2>Lo Que Dicen Nuestros Usuarios</h2>
        <p>Únete a miles de desarrolladores satisfechos</p>
      </div>
      <div class="testimonials-container">
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"CodeU ha transformado completamente la forma en que nuestro equipo colabora en proyectos web. La función de vista previa en vivo es revolucionaria!"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">JD</div>
            <div class="author-info">
              <h4>Juan Díaz</h4>
              <p>Desarrollador Senior en TechCorp</p>
            </div>
          </div>
        </div>
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"He probado muchas plataformas de codificación, pero CodeU destaca por su interfaz intuitiva y características potentes. Se ha convertido en una herramienta esencial en mi flujo de trabajo."</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">AS</div>
            <div class="author-info">
              <h4>Ana Sánchez</h4>
              <p>Desarrolladora Web Freelance</p>
            </div>
          </div>
        </div>
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"Enseñar desarrollo web nunca ha sido tan fácil. Mis estudiantes adoran lo rápido que pueden ver su código cobrar vida con CodeU."</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">MW</div>
            <div class="author-info">
              <h4>Miguel Wilson</h4>
              <p>Profesor de Informática</p>
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
          <p class="footer-tagline">Transforma texto en aplicaciones web funcionales.</p>
          <div class="social-links">
            <a href="#" class="social-link">
              <span class="social-icon">𝕏</span>
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
          <h3>Producto</h3>
          <ul>
            <li><a href="#features">Características</a></li>
            <li><a href="#pricing">Precios</a></li>
            <li><a href="#how-it-works">Cómo funciona</a></li>
            <li><a href="#testimonials">Testimonios</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Empresa</h3>
          <ul>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Carreras</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Términos de servicio</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary-gradient: linear-gradient(135deg, #646cff 0%, #8c56ff 100%);
  --secondary-gradient: linear-gradient(135deg, #42b883 0%, #347deb 100%);
  --accent-gradient: linear-gradient(135deg, #ff6b6b 0%, #ff9e7a 100%);
  --purple-accent: linear-gradient(135deg, #9d50bb 0%, #6e48aa 100%);
  --teal-accent: linear-gradient(135deg, #00b8a9 0%, #0072ff 100%);
  --orange-accent: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
  
  /* Base de colores para el fondo */
  --bg-primary: #13151a;
  --bg-secondary: #16181f;
  --bg-tertiary: #1a1c25;
  
  --glass-background: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.landing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #f0f0f0;
  background: var(--bg-primary);
  overflow-x: hidden;
  background: linear-gradient(165deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  color: #646cff;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
  letter-spacing: -0.5px;
  position: relative;
  z-index: 5;
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  background-clip: initial;
}

.lightning-logo {
  height: 2.2rem;
  width: auto;
  margin-left: 0.5rem;
}

.main-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2rem;
}

.main-nav a {
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 0.25rem;
}

.main-nav a:hover {
  color: #fff;
}

.main-nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

.main-nav a:hover::after {
  width: 100%;
}

.auth-section .sign-in-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.auth-section .sign-in-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--primary-gradient);
  transition: all 0.4s ease;
  z-index: -1;
}

.auth-section .sign-in-button:hover {
  transform: translateY(-2px);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(100, 108, 255, 0.3);
}

.auth-section .sign-in-button:hover::before {
  left: 0;
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.mobile-menu-button span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #121212;
  padding: 5rem 2rem;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  margin-bottom: 1.5rem;
}

.mobile-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
}

/* Hero Section con título descriptivo adicional */
.hero-section {
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
  min-height: 80vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

/* Transición suave hacia features-section */
.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, transparent, var(--bg-secondary));
  z-index: 1;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  position: relative;
}

.hero-tag {
  display: inline-block;
  background: var(--accent-gradient);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.35);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 5;
  text-shadow: none;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #646cff;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 5;
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  background-clip: initial;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 5;
}

.hero-description strong {
  color: #fff;
  position: relative;
  z-index: 1;
}

.hero-description strong::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 6px;
  background: var(--primary-gradient);
  opacity: 0.3;
  z-index: -1;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.try-button {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  background: var(--primary-gradient);
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 15px rgba(100, 108, 255, 0.3);
}

.try-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(100, 108, 255, 0.4);
  background-size: 150% 150%;
}

.hero-image {
  flex: 1;
  max-width: 550px;
  position: relative;
  z-index: 1;
}

.mockup-editor {
  width: 100%;
  aspect-ratio: 16/9;
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow), 0 0 30px rgba(100, 108, 255, 0.15);
  border: 1px solid var(--glass-border);
  padding: 1rem;
  position: relative;
  transform: perspective(1000px) rotateY(-5deg);
  transition: all 0.5s ease;
}

.mockup-editor:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.mockup-editor::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(100, 108, 255, 0.1), rgba(140, 86, 255, 0.15));
  pointer-events: none;
}

.mockup-code {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.code-line {
  height: 1rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  width: 85%;
  position: relative;
  overflow: hidden;
}

.code-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  animation: shine 2s infinite;
}

.code-line:nth-child(2) {
  width: 60%;
  animation-delay: 0.2s;
}

.code-line:nth-child(3) {
  width: 75%;
  animation-delay: 0.4s;
}

.code-line:nth-child(4) {
  width: 40%;
  animation-delay: 0.6s;
}

.code-line:nth-child(5) {
  width: 65%;
  animation-delay: 0.8s;
}

/* Features Section con transición de color suave */
.features-section {
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  margin-top: -2px; /* Eliminar posibles líneas entre secciones */
}

/* Transición al final de features */
.features-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, transparent, var(--bg-primary));
  z-index: 1;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(140, 86, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 180, 0, 0.12) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  opacity: 0.3;
}

.decoration-1 {
  top: 20%;
  left: 15%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(130, 80, 255, 0.3) 0%, rgba(80, 30, 170, 0.1) 70%);
  animation: float 8s ease-in-out infinite alternate;
}

.decoration-2 {
  top: 50%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 180, 0, 0.25) 0%, rgba(255, 100, 50, 0.1) 70%);
  animation: float 10s ease-in-out infinite alternate-reverse;
}

.decoration-3 {
  bottom: 15%;
  left: 30%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 150, 255, 0.25) 0%, rgba(50, 100, 200, 0.1) 70%);
  animation: float 7s ease-in-out infinite alternate;
}

@keyframes float {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #646cff;
  position: relative;
  z-index: 5;
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  background-clip: initial;
  display: inline-block;
}

.section-header p {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.7);
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.feature {
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
}

.feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow);
}

.feature:hover::before {
  opacity: 1;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;
}

.feature-icon::after {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.2;
  top: 0;
  left: 0;
  filter: blur(10px);
}

.feature h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.feature p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
}

/* How It Works Section */
.how-it-works-section {
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;
  margin-top: -2px;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.step {
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--glass-border);
  position: relative;
}

.step:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: 50%;
  font-weight: 700;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(100, 108, 255, 0.3);
}

.step h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.step p {
  color: rgba(255, 255, 255, 0.7);
}

/* Añadir gradientes sutiles a otras secciones para integración visual */
.how-it-works-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 10% 20%, rgba(100, 108, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(66, 184, 131, 0.08) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  position: relative;
  overflow: hidden;
  margin-top: -2px;
}

.pricing-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.pricing-plan {
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--glass-border);
  position: relative;
}

.pricing-plan:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow);
}

.pricing-plan.popular {
  background: linear-gradient(180deg, rgba(100, 108, 255, 0.1) 0%, rgba(30, 30, 30, 0.5) 100%);
  border-color: rgba(100, 108, 255, 0.3);
  transform: scale(1.05);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(100, 108, 255, 0.3);
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.plan-price {
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
}

.plan-price span {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.plan-features li {
  padding: 0.75rem 0;
  position: relative;
  padding-left: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.plan-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #646cff;
  font-weight: bold;
}

.plan-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pricing-plan.popular .plan-button {
  background: var(--primary-gradient);
  border: none;
  box-shadow: 0 4px 15px rgba(100, 108, 255, 0.3);
}

.plan-button:hover {
  background: var(--glass-border);
  transform: translateY(-2px);
}

.pricing-plan.popular .plan-button:hover {
  box-shadow: 0 8px 20px rgba(100, 108, 255, 0.4);
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, var(--bg-tertiary) 0%, var(--bg-primary) 100%);
  position: relative;
  overflow: hidden;
  margin-top: -2px;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.testimonial {
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--glass-border);
}

.testimonial:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow);
}

.testimonial-content {
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-content::before {
  content: '"';
  position: absolute;
  top: -20px;
  left: -10px;
  font-size: 4rem;
  color: rgba(100, 108, 255, 0.2);
  z-index: -1;
}

.testimonial-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}

.author-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.author-info p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Footer */
.main-footer {
  background: var(--bg-primary);
  padding: 4rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.brand-column {
  grid-column: 1;
}

.footer-logo {
  margin-bottom: 1rem;
}

.footer-tagline {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-gradient);
  transform: translateY(-2px);
}

.footer-column h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 0.75rem;
}

.footer-column a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: #fff;
}

/* Animaciones adicionales */
@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    padding: 3rem 1.5rem;
  }

  .hero-content {
    max-width: 100%;
    margin-bottom: 3rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .brand-column {
    grid-column: 1 / -1;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .main-nav {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .pricing-plan.popular {
    transform: none;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .section-header h2 {
    font-size: 1.75rem;
  }

  .feature, .step, .pricing-plan, .testimonial {
    padding: 1.5rem;
  }
}

/* Asegurar que todo el texto tenga un z-index alto y sea visible */
.hero-content, .section-header, .feature h3, .step h3, .pricing-plan h3, .testimonial-content p {
  position: relative;
  z-index: 5;
}

/* Transición visual entre secciones */
.section-transition {
  height: 150px;
  position: relative;
  z-index: 5;
  margin-top: -75px;
  margin-bottom: -75px;
  background: transparent;
  pointer-events: none;
}

/* Añadir gradientes sutiles a otras secciones para integración visual */
.pricing-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 80% 30%, rgba(100, 108, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 20% 70%, rgba(140, 86, 255, 0.08) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 70% 20%, rgba(66, 184, 131, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 30% 80%, rgba(100, 108, 255, 0.08) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

/* Hero section con gradientes sutiles */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 10% 30%, rgba(100, 108, 255, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 90% 70%, rgba(140, 86, 255, 0.08) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}

.editor-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}
</style> 