<template>
  <div class="test-auth">
    <h1>Prueba de Autenticación</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <div v-if="user">
        <h2>Usuario autenticado</h2>
        <p>Email: {{ user.email }}</p>
        <p>UID: {{ user.uid }}</p>
        <button @click="logout" class="btn">Cerrar sesión</button>
      </div>
      <div v-else>
        <h2>No autenticado</h2>
        <div class="auth-form">
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Contraseña" />
          <button @click="login" class="btn">Iniciar sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'TestAuth',
  setup() {
    const auth = getAuth()
    const router = useRouter()
    const user = ref(null)
    const loading = ref(true)
    const email = ref('')
    const password = ref('')

    onMounted(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        loading.value = false
        console.log('Estado de autenticación:', currentUser)
      })

      return () => unsubscribe()
    })

    const login = async () => {
      try {
        loading.value = true
        await signInWithEmailAndPassword(auth, email.value, password.value)
        console.log('Inicio de sesión exitoso')
      } catch (error) {
        console.error('Error de inicio de sesión:', error.message)
        alert('Error: ' + error.message)
      } finally {
        loading.value = false
      }
    }

    const logout = async () => {
      try {
        loading.value = true
        await signOut(auth)
        console.log('Cierre de sesión exitoso')
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      user,
      loading,
      email,
      password,
      login,
      logout
    }
  }
}
</script>

<style scoped>
.test-auth {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}
</style> 