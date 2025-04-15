<template>
  <div class="auth-layout">
    <div class="login-container no-scroll">
      <div class="login-card">
        <div class="logo-container">
          <img :src="logoUrl" alt="CodeU Logo" class="logo" />
          <h1>CodeU</h1>
        </div>
        <h2>Iniciar sesión</h2>
        
        <div v-if="error" class="error-message">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              placeholder="correo@ejemplo.com"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required 
              placeholder="Ingresa tu contraseña"
            />
          </div>
          
          <button type="submit" :disabled="loading" class="login-button">
            {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
          </button>
        </form>
        
        <div class="footer-links">
          <p>¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
          <p><router-link to="/">Volver al inicio</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser, saveUserToLocalStorage } from '../../firebase/auth-service';
// Importar logo como módulo
import logoPath from '@/assets/code-u-logo.svg';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: false,
      errorMessage: '',
      logoUrl: logoPath
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = false;
      
      try {
        const user = await loginUser(this.email, this.password);
        // Guardar usuario en localStorage
        saveUserToLocalStorage(user);
        // Redireccionar al dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        this.error = true;
        
        // Manejar errores específicos
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'No existe una cuenta con este correo electrónico.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Contraseña incorrecta.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Correo electrónico inválido.';
            break;
          default:
            this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #2e1533 0%, #1e2756 50%, #0b2342 100%);
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: var(--aside-sections-background);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--aside-sections-border);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

h1 {
  font-size: 1.8rem;
  margin: 0;
  color: var(--app-foreground);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--app-foreground);
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--app-foreground);
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--input-background);
  color: var(--input-foreground);
}

.login-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4c84ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #3a70e3;
}

.login-button:disabled {
  background-color: #a0b4e0;
  cursor: not-allowed;
}

.error-message {
  padding: 0.8rem;
  background-color: rgba(211, 47, 47, 0.1);
  color: #ff5252;
  border-radius: 4px;
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
}

.footer-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--app-foreground);
}

.footer-links a {
  color: #4c84ff;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style> 