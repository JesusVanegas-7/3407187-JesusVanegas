/**
 * ============================================
 * PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN DE CURSOS
 * Dominio: Plataforma de Cursos en Línea
 * ============================================
 */

// ============================================
// TODO 1: CLASE BASE - Course (Anteriormente Property)
// ============================================

/**
 * Clase base abstracta para todos los cursos del sistema
 * Implementa encapsulación mediante campos privados
 */
class Course {
  // ============================================
  // CAMPOS PRIVADOS
  // ============================================
  #id;
  #name;
  #active;
  #instructor;
  #dateCreated;

  /**
   * Constructor de la clase Course
   * @param {string} name - Nombre del curso
   * @param {string} instructor - Nombre del instructor
   */
  constructor(name, instructor) {
    if (!name || name.trim() === '') {
      throw new Error('El nombre del curso no puede estar vacío');
    }

    if (!instructor || instructor.trim() === '') {
      throw new Error('El instructor no puede estar vacío');
    }

    this.#id = crypto.randomUUID();
    this.#name = name.trim();
    this.#instructor = instructor.trim();
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  // ============================================
  // GETTERS
  // ============================================

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get isActive() {
    return this.#active;
  }

  get instructor() {
    return this.#instructor;
  }

  get dateCreated() {
    return this.#dateCreated;
  }

  // ============================================
  // SETTERS
  // ============================================

  set instructor(value) {
    if (!value || value.trim() === '') {
      throw new Error('El instructor no puede estar vacío');
    }

    this.#instructor = value.trim();
  }

  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  activate() {
    if (this.#active) {
      return { success: false, message: 'El curso ya está disponible' };
    }
    this.#active = true;
    return { success: true, message: 'Curso activado correctamente' };
  }

  deactivate() {
    if (!this.#active) {
      return { success: false, message: 'El curso ya está marcado como no disponible' };
    }
    this.#active = false;
    return { success: true, message: 'Curso desactivado correctamente' };
  }

  /**
   * Método abstracto
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Cursos
// ============================================

/**
 * Clase VideoCourse - Representa un curso pre-grabado
 */
class VideoCourse extends Course {
  #duration;      // horas
  #resolution;    // ej: 1080p
  #hasSubtitles;  // booleano

  constructor(name, instructor, duration, resolution, hasSubtitles) {
    super(name, instructor);

    if (duration <= 0) throw new Error('La duración debe ser mayor a 0');
    if (!resolution || resolution.trim() === '') throw new Error('La resolución es obligatoria');

    this.#duration = duration;
    this.#resolution = resolution.trim();
    this.#hasSubtitles = Boolean(hasSubtitles);
  }

  get duration() { return this.#duration; }
  get resolution() { return this.#resolution; }
  get hasSubtitles() { return this.#hasSubtitles; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      instructor: this.instructor,
      duration: this.#duration,
      resolution: this.#resolution,
      hasSubtitles: this.#hasSubtitles,
      active: this.isActive
    };
  }
}


/**
 * Clase LiveCourse - Representa una clase transmitida en vivo
 */
class LiveCourse extends Course {
  #duration;
  #platform;
  #capacity;

  constructor(name, instructor, duration, platform, capacity) {
    super(name, instructor);

    if (duration <= 0) throw new Error('La duración debe ser mayor a 0');
    if (capacity <= 0) throw new Error('La capacidad debe ser mayor a 0');

    this.#duration = duration;
    this.#platform = platform.trim();
    this.#capacity = Number(capacity);
  }

  get duration() { return this.#duration; }
  get platform() { return this.#platform; }
  get capacity() { return this.#capacity; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      instructor: this.instructor,
      duration: this.#duration,
      platform: this.#platform,
      capacity: this.#capacity,
      active: this.isActive
    };
  }
}


/**
 * Clase Workshop - Representa un taller práctico
 */
class Workshop extends Course {
  #duration;
  #intensity;
  #materialIncluded;

  constructor(name, instructor, duration, intensity, materialIncluded) {
    super(name, instructor);

    if (duration <= 0) throw new Error('La duración debe ser mayor a 0');
    if (!intensity || intensity.trim() === '') throw new Error('La intensidad es obligatoria');

    this.#duration = duration;
    this.#intensity = intensity.trim();
    this.#materialIncluded = Boolean(materialIncluded);
  }

  get duration() { return this.#duration; }
  get intensity() { return this.#intensity; }
  get materialIncluded() { return this.#materialIncluded; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      instructor: this.instructor,
      duration: this.#duration,
      intensity: this.#intensity,
      materialIncluded: this.#materialIncluded,
      active: this.isActive
    };
  }
}

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================

class User {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    if (!name || name.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }

    this.#id = crypto.randomUUID();
    this.#name = name.trim();
    this.#email = email;
    this.#registrationDate = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }
    this.#email = value;
  }

  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      registrationDate: this.#registrationDate
    };
  }
}

// ============================================
// TODO 4: CLASES DE ROLES - Usuarios especializados
// ============================================

class Instructor extends User {
  #specialty;
  #experienceYears;
  #coursesGiven;

  constructor(name, email, specialty, experienceYears) {
    super(name, email);

    if (!specialty || specialty.trim() === '') {
      throw new Error('La especialidad es obligatoria');
    }

    this.#specialty = specialty.trim();
    this.#experienceYears = Number(experienceYears);
    this.#coursesGiven = 0;
  }

  recordCourse() {
    this.#coursesGiven++;
  }

  get specialty() { return this.#specialty; }
  get experienceYears() { return this.#experienceYears; }
  get coursesGiven() { return this.#coursesGiven; }

  getInfo() {
    return {
      ...super.getInfo(),
      role: this.constructor.name,
      specialty: this.#specialty,
      experienceYears: this.#experienceYears,
      coursesGiven: this.#coursesGiven
    };
  }
}

class Student extends User {
  #enrolledCourses;
  #certificatesEarned;

  constructor(name, email) {
    super(name, email);
    this.#enrolledCourses = [];
    this.#certificatesEarned = 0;
  }

  enrollInCourse(course) {
    this.#enrolledCourses.push(course);
  }

  earnCertificate() {
    this.#certificatesEarned++;
  }

  get enrolledCourses() { return this.#enrolledCourses; }
  get certificatesEarned() { return this.#certificatesEarned; }

  getInfo() {
    return {
      ...super.getInfo(),
      role: this.constructor.name,
      totalEnrolled: this.#enrolledCourses.length,
      certificatesEarned: this.#certificatesEarned
    };
  }
}

// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================

class MainSystem {
  #items = [];
  #users = [];

  static {
    this.VERSION = '2.0.0';
    this.MAX_ITEMS = 500;
    this.SYSTEM_NAME = 'Plataforma de Cursos en Línea';
    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  static isValidId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  addItem(item) {
    if (!(item instanceof Course)) {
      return { success: false, message: 'El item debe ser instancia de Course' };
    }
    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      return { success: false, message: 'Límite de cursos alcanzado' };
    }
    this.#items.push(item);
    return { success: true, message: 'Curso agregado correctamente', item };
  }

  removeItem(id) {
    const index = this.#items.findIndex(item => item.id === id);
    if (index === -1) return { success: false, message: 'Curso no encontrado' };
    const removed = this.#items.splice(index, 1)[0];
    return { success: true, message: 'Curso eliminado', item: removed };
  }

  findItem(id) {
    return this.#items.find(item => item.id === id) ?? null;
  }

  getAllItems() {
    return [...this.#items];
  }

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(item => item.isActive).length;
    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return {
      system: MainSystem.SYSTEM_NAME,
      totalCourses: total,
      availableCourses: active,
      coursesByType: byType,
      totalUsers: this.#users.length
    };
  }

  addUser(user) {
    if (!(user instanceof User)) {
      return { success: false, message: 'Debe ser instancia de User' };
    }
    this.#users.push(user);
    return { success: true, message: 'Usuario registrado', user };
  }

  getAllUsers() {
    return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA Y DATOS DE PRUEBA
// ============================================

const system = new MainSystem();

const course1 = new VideoCourse('JavaScript Moderno', 'Erick Galindo', 20, '1080p', true);
const course2 = new LiveCourse('React Avanzado', 'Jesus Vanegas', 15, 'Zoom', 30);
const workshop1 = new Workshop('Diseño UI/UX', 'Maria Lopez', 10, 'Alta', true);

system.addItem(course1);
system.addItem(course2);
system.addItem(workshop1);

const instructor1 = new Instructor('Erick Galindo', 'erick@cursos.com', 'Web Development', 5);
const student1 = new Student('Ana Gomez', 'ana@gmail.com');

system.addUser(instructor1);
system.addUser(student1);

// ============================================
// TODO 7-11: REFERENCIAS AL DOM Y LÓGICA
// ============================================

let itemForm, itemList, statsContainer, filterType, filterStatus, searchInput;

const renderItem = item => {
  const info = item.getInfo();
  const typeLabels = {
    VideoCourse: 'Video',
    LiveCourse: 'En Vivo',
    Workshop: 'Workshop'
  };

  let extraInfo = '';
  if (item instanceof VideoCourse) {
    extraInfo = `<p><strong>Resolución:</strong> ${info.resolution}</p>
                 <p><strong>Subtítulos:</strong> ${info.hasSubtitles ? 'Sí' : 'No'}</p>`;
  } else if (item instanceof LiveCourse) {
    extraInfo = `<p><strong>Plataforma:</strong> ${info.platform}</p>
                 <p><strong>Capacidad:</strong> ${info.capacity} alumnos</p>`;
  } else if (item instanceof Workshop) {
    extraInfo = `<p><strong>Intensidad:</strong> ${info.intensity}</p>
                 <p><strong>Material:</strong> ${info.materialIncluded ? 'Incluido' : 'No incluido'}</p>`;
  }

  return `
    <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
      <div class="item-header">
        <h3>${item.name}</h3>
        <span class="badge">${typeLabels[item.getType()] || item.getType()}</span>
      </div>
      <div class="item-details">
        <p><strong>Instructor:</strong> ${item.instructor}</p>
        <p><strong>Duración:</strong> ${info.duration} horas</p>
        ${extraInfo}
        <p><strong>Estado:</strong> ${item.isActive ? 'Disponible' : 'No Disponible'}</p>
      </div>
      <div class="item-actions">
        <button class="btn-toggle" data-id="${item.id}">
          ${item.isActive ? 'Desactivar' : 'Activar'}
        </button>
        <button class="btn-delete" data-id="${item.id}">
          Eliminar
        </button>
      </div>
    </div>
  `;
};

const renderItems = (items = []) => {
  if (!itemList) return;
  if (items.length === 0) {
    itemList.innerHTML = '<p class="empty">No hay cursos que coincidan con la búsqueda</p>';
    return;
  }
  itemList.innerHTML = items.map(renderItem).join('');
};

const renderStats = stats => {
  if (!statsContainer) return;
  statsContainer.innerHTML = `
    <div class="stat"><strong>Total Cursos:</strong> ${stats.totalCourses}</div>
    <div class="stat"><strong>Disponibles:</strong> ${stats.availableCourses}</div>
    <div class="stat"><strong>Usuarios:</strong> ${stats.totalUsers}</div>
  `;
};

const handleFormSubmit = e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const instructor = formData.get('instructor');
  const type = formData.get('type');
  const duration = Number(formData.get('duration'));
  const extra1 = formData.get('extra1');
  const extra2 = formData.get('extra2');

  try {
    let newItem;
    switch (type) {
      case 'VideoCourse':
        newItem = new VideoCourse(name, instructor, duration, extra1, extra2 === 'true');
        break;
      case 'LiveCourse':
        newItem = new LiveCourse(name, instructor, duration, extra1, Number(extra2));
        break;
      case 'Workshop':
        newItem = new Workshop(name, instructor, duration, extra1, extra2 === 'true');
        break;
    }
    system.addItem(newItem);
    handleFilterChange();
    renderStats(system.getStats());
    e.target.reset();
    document.getElementById('type').dispatchEvent(new Event('change'));
  } catch (error) {
    alert(error.message);
  }
};

const handleFilterChange = () => {
  let filtered = system.getAllItems();
  const typeValue = filterType.value;
  const statusValue = filterStatus.value;
  const searchValue = searchInput.value.toLowerCase();

  if (typeValue !== 'all') filtered = filtered.filter(item => item.getType() === typeValue);
  if (statusValue !== 'all') filtered = filtered.filter(item => item.isActive === (statusValue === 'active'));
  if (searchValue) filtered = filtered.filter(item => item.name.toLowerCase().includes(searchValue));

  renderItems(filtered);
};

const handleItemAction = e => {
  const target = e.target;
  const itemId = target.dataset.id;
  if (!itemId) return;
  const item = system.findItem(itemId);
  if (!item) return;

  if (target.classList.contains('btn-toggle')) {
    item.isActive ? item.deactivate() : item.activate();
  } else if (target.classList.contains('btn-delete')) {
    if (confirm('¿Eliminar este curso?')) system.removeItem(itemId);
  }

  handleFilterChange();
  renderStats(system.getStats());
};

const init = () => {
  itemForm = document.getElementById('item-form');
  itemList = document.getElementById('item-list');
  statsContainer = document.getElementById('stats');
  filterType = document.getElementById('filter-type');
  filterStatus = document.getElementById('filter-status');
  searchInput = document.getElementById('search-input');

  if (!itemForm || !itemList) return;

  itemForm.addEventListener('submit', handleFormSubmit);
  filterType.addEventListener('change', handleFilterChange);
  filterStatus.addEventListener('change', handleFilterChange);
  searchInput.addEventListener('input', handleFilterChange);
  itemList.addEventListener('click', handleItemAction);

  renderItems(system.getAllItems());
  renderStats(system.getStats());
};

document.addEventListener('DOMContentLoaded', init);
