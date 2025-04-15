import { createRouter, createWebHistory } from 'vue-router'
import { getUserFromLocalStorage } from '../firebase/auth-service'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../pages/landing/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/auth/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/auth/Register.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/test-auth',
    name: 'TestAuth',
    component: () => import('../components/TestAuth.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editor/:projectId?',
    name: 'Editor',
    // Mantenemos la ruta del editor actual pero la integramos con Vue Router
    component: () => import('../pages/dashboard/EditorContainer.vue'),
    meta: { requiresAuth: true }
  },
  // Nueva ruta para capturar los códigos base64 del editor
  // Esta ruta usará el mismo componente EditorContainer
  {
    path: '/:pathMatch(.*)*',
    name: 'EditorCode',
    component: () => import('../pages/dashboard/EditorContainer.vue'),
    beforeEnter: (to, from, next) => {
      // Comprobar si la ruta parece un código base64 (contiene | o %7C)
      if (to.path.includes('|') || to.path.includes('%7C')) {
        console.log('Detectada URL de editor con código base64:', to.path);
        next(); // Es una URL de editor, permitir
      } else {
        // No es una URL de editor, redirigir a la página principal
        next('/');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navegación protegida
router.beforeEach((to, from, next) => {
  const user = getUserFromLocalStorage();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !user) {
    // Si la ruta requiere autenticación y no hay usuario
    next('/login');
  } else if (requiresGuest && user) {
    // Si la ruta es solo para invitados y hay un usuario autenticado
    next('/dashboard');
  } else {
    // Permitir la navegación
    next();
  }
})

export default router 