<template>
  <div class="dashboard-container allow-scroll">
    <header class="dashboard-header">
      <div class="brand">
        <h1>CodeU</h1>
        <img :src="logoUrl" alt="CodeU Logo" class="logo" />
      </div>
      <div class="user-menu">
        <span v-if="user" class="user-name">{{ user.displayName }}</span>
        <button class="logout-button" @click="handleLogout">Cerrar sesión</button>
      </div>
    </header>

    <main class="dashboard-content">
      <div class="dashboard-section">
        <div class="new-project-card" @click="createNewProject">
          <div class="new-project-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <h2>Nuevo proyecto</h2>
          <p>de una de las plantillas de inicio de CodeU</p>
        </div>
      </div>

      <div class="dashboard-section">
        <div class="section-header">
          <h2>Proyectos recientes</h2>
          <button class="show-all-button" @click="showAllProjects" v-if="projects.length > 4">
            Mostrar todo
          </button>
        </div>

        <div class="projects-list">
          <div v-if="loading" class="loading-message">
            Cargando proyectos...
          </div>
          
          <div v-else-if="error" class="error-message">
            {{ errorMessage }}
          </div>
          
          <div v-else-if="projects.length === 0" class="empty-projects">
            <p>No tienes proyectos guardados todavía.</p>
            <p>¡Crea uno nuevo para comenzar!</p>
          </div>
          
          <div v-else class="projects-grid">
            <div v-for="project in projects" :key="project.id" class="project-card" @click="openProject(project.id)">
              <div class="project-info">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-date">
                  Última edición: {{ formatDate(project.updatedAt) }}
                </p>
              </div>
              <div class="project-actions">
                <button class="action-button edit-button" @click.stop="openProject(project.id)">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="action-button delete-button" @click.stop="confirmDeleteProject(project)">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal para crear nuevo proyecto -->
    <div class="modal" v-if="showNewProjectModal">
      <div class="modal-content">
        <h2>Crear nuevo proyecto</h2>
        <form @submit.prevent="saveNewProject">
          <div class="form-group">
            <label for="projectTitle">Título del proyecto</label>
            <input 
              type="text" 
              id="projectTitle" 
              v-model="newProjectTitle" 
              required 
              placeholder="Mi proyecto"
            />
          </div>
          <div class="modal-actions">
            <button type="button" class="cancel-button" @click="showNewProjectModal = false">
              Cancelar
            </button>
            <button type="submit" class="save-button" :disabled="creatingProject">
              {{ creatingProject ? 'Creando...' : 'Crear proyecto' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para confirmar eliminación -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h2>Eliminar proyecto</h2>
        <p>¿Estás seguro de que deseas eliminar el proyecto "{{ projectToDelete?.title }}"?</p>
        <p class="warning">Esta acción no se puede deshacer.</p>
        <div class="modal-actions">
          <button type="button" class="cancel-button" @click="showDeleteModal = false">
            Cancelar
          </button>
          <button type="button" class="delete-button-confirm" @click="deleteProject" :disabled="deletingProject">
            {{ deletingProject ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserFromLocalStorage, logoutUser } from '../../firebase/auth-service';
import { getUserProjects, createProject, deleteProject } from '../../firebase/projects-service';
// Importar logo como módulo
import logoPath from '@/assets/code-u-logo.svg';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      projects: [],
      loading: true,
      error: false,
      errorMessage: '',
      showNewProjectModal: false,
      showDeleteModal: false,
      newProjectTitle: '',
      creatingProject: false,
      projectToDelete: null,
      deletingProject: false,
      logoUrl: logoPath
    };
  },
  async created() {
    // Obtener usuario actual
    this.user = getUserFromLocalStorage();
    
    if (this.user) {
      await this.loadProjects();
    }
  },
  methods: {
    async loadProjects() {
      this.loading = true;
      this.error = false;
      
      try {
        this.projects = await getUserProjects(this.user.uid);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
        this.error = true;
        this.errorMessage = 'No se pudieron cargar los proyectos. Inténtalo de nuevo.';
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      if (!date) return 'Desconocido';
      
      const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return new Date(date).toLocaleDateString('es-ES', options);
    },
    async handleLogout() {
      try {
        await logoutUser();
        this.$router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
    createNewProject() {
      this.showNewProjectModal = true;
      this.newProjectTitle = '';
    },
    async saveNewProject() {
      if (!this.newProjectTitle.trim()) return;
      
      this.creatingProject = true;
      console.log('Iniciando creación de proyecto:', this.newProjectTitle);
      
      // Verificar que el usuario esté autenticado
      if (!this.user || !this.user.uid) {
        console.error('Error: Usuario no autenticado');
        alert('Debes iniciar sesión para crear un proyecto');
        this.creatingProject = false;
        return;
      }
      
      console.log('Usuario autenticado:', this.user.uid);
      
      try {
        const projectData = {
          userId: this.user.uid,
          title: this.newProjectTitle,
          html: '<h1>Mi proyecto CodeU</h1>\n<p>Comienza a editar este código para crear tu proyecto.</p>',
          css: 'body {\n  font-family: sans-serif;\n  margin: 20px;\n}\n\nh1 {\n  color: #4c84ff;\n}',
          js: '// Tu código JavaScript aquí'
        };
        
        console.log('Datos del proyecto a crear:', projectData);
        
        // Crear proyecto con contenido vacío
        const project = await createProject(projectData);
        
        console.log('Proyecto creado exitosamente:', project);
        
        // Cerrar modal
        this.showNewProjectModal = false;
        
        // Abrir editor con el nuevo proyecto
        this.$router.push(`/editor/${project.id}`);
      } catch (error) {
        console.error('Error detallado al crear proyecto:', error);
        // Mostrar mensaje con más información
        if (error.code) {
          console.error('Código de error Firebase:', error.code);
        }
        if (error.message) {
          console.error('Mensaje de error:', error.message);
        }
        alert(`Error al crear proyecto: ${error.message || 'Verifica tu conexión y permisos'}`);
      } finally {
        this.creatingProject = false;
      }
    },
    openProject(projectId) {
      this.$router.push(`/editor/${projectId}`);
    },
    confirmDeleteProject(project) {
      this.projectToDelete = project;
      this.showDeleteModal = true;
    },
    async deleteProject() {
      if (!this.projectToDelete) return;
      
      this.deletingProject = true;
      
      try {
        await deleteProject(this.projectToDelete.id);
        
        // Actualizar lista
        this.projects = this.projects.filter(p => p.id !== this.projectToDelete.id);
        
        // Cerrar modal
        this.showDeleteModal = false;
        this.projectToDelete = null;
      } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        alert('No se pudo eliminar el proyecto. Inténtalo de nuevo.');
      } finally {
        this.deletingProject = false;
      }
    },
    showAllProjects() {
      // Esta función podría implementar paginación o mostrar una vista expandida
      // Por ahora, simplemente muestra un mensaje
      alert('Función para mostrar todos los proyectos');
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #13151a 0%, #191b24 50%, #16181d 100%);
  color: #e2e8f0;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  background-color: rgba(25, 27, 36, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  width: 36px;
  height: 36px;
  margin-right: 0.75rem;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
}

.brand h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #646cff, #9179ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-name {
  font-weight: 500;
  color: #e2e8f0;
}

.logout-button {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #646cff, #9179ff);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(100, 108, 255, 0.3);
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(100, 108, 255, 0.5);
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.dashboard-section {
  margin-bottom: 4rem;
}

.new-project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e2030 0%, #252a3c 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.new-project-card:hover {
  box-shadow: 0 10px 30px rgba(100, 108, 255, 0.15);
  transform: translateY(-5px);
  border-color: rgba(100, 108, 255, 0.3);
}

.new-project-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #646cff20, #9179ff20);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #646cff;
  transition: all 0.3s;
}

.new-project-card:hover .new-project-icon {
  background: linear-gradient(135deg, #646cff30, #9179ff30);
  transform: scale(1.1);
}

.new-project-icon svg {
  width: 28px;
  height: 28px;
}

.new-project-card h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #e2e8f0;
}

.new-project-card p {
  color: #a0aec0;
  margin: 0;
  font-size: 1.1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  color: #e2e8f0;
}

.show-all-button {
  background-color: transparent;
  color: #646cff;
  border: none;
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.show-all-button:hover {
  color: #9179ff;
  transform: translateX(3px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: linear-gradient(135deg, #1e2030 0%, #252a3c 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.project-card:hover {
  box-shadow: 0 10px 30px rgba(100, 108, 255, 0.15);
  transform: translateY(-5px);
  border-color: rgba(100, 108, 255, 0.3);
}

.project-info {
  flex: 1;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #e2e8f0;
}

.project-date {
  color: #a0aec0;
  font-size: 0.95rem;
  margin: 0;
}

.project-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.action-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-button svg {
  width: 20px;
  height: 20px;
}

.edit-button {
  color: #646cff;
}

.edit-button:hover {
  background-color: rgba(100, 108, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(100, 108, 255, 0.2);
}

.delete-button {
  color: #ff6464;
}

.delete-button:hover {
  background-color: rgba(255, 100, 100, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(255, 100, 100, 0.2);
}

.loading-message,
.empty-projects,
.error-message {
  text-align: center;
  padding: 3rem;
  border-radius: 12px;
  font-size: 1.1rem;
}

.loading-message {
  color: #a0aec0;
  background: linear-gradient(135deg, #1e2030 0%, #252a3c 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.error-message {
  color: #ff6464;
  background: linear-gradient(135deg, #2a1e20 0%, #3c2529 100%);
  border: 1px solid rgba(255, 100, 100, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.empty-projects {
  background: linear-gradient(135deg, #1e2030 0%, #252a3c 100%);
  border-radius: 12px;
  padding: 3rem;
  border: 1px dashed rgba(100, 108, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #a0aec0;
}

/* Estilos para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 15, 25, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #1e2030 0%, #252a3c 100%);
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-content h2 {
  margin-top: 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #e2e8f0;
}

.form-group input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.07);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-button {
  padding: 0.7rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: #a0aec0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.save-button {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #646cff, #9179ff);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(100, 108, 255, 0.3);
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(100, 108, 255, 0.5);
}

.save-button:disabled {
  background: linear-gradient(135deg, #3a3e71, #46427a);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.delete-button-confirm {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #ff6464, #ff7a64);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(255, 100, 100, 0.3);
}

.delete-button-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 100, 100, 0.5);
}

.delete-button-confirm:disabled {
  background: linear-gradient(135deg, #71393e, #7a4246);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.warning {
  color: #ff6464;
  font-weight: 500;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.warning::before {
  content: "⚠️";
  font-size: 1.1rem;
}
</style> 