// ============================================
// TODO 1: CLASE BASE - Property
// ============================================

/**
 * Clase base abstracta para todos los inmuebles del sistema
 * Implementa encapsulación mediante campos privados
 */
class Property {
  // ============================================
  // CAMPOS PRIVADOS
  // ============================================
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  /**
   * Constructor de la clase Property
   * @param {string} name - Nombre del inmueble
   * @param {string} location - Ubicación del inmueble
   */
  constructor(name, location) {
    if (!name || name.trim() === '') {
      throw new Error('El nombre del inmueble no puede estar vacío');
    }

    if (!location || location.trim() === '') {
      throw new Error('La ubicación no puede estar vacía');
    }

    this.#id = crypto.randomUUID();
    this.#name = name.trim();
    this.#location = location.trim();
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Retorna el ID único del inmueble
   */
  get id() {
    return this.#id;
  }

  /**
   * Retorna el nombre del inmueble
   */
  get name() {
    return this.#name;
  }

  /**
   * Retorna si el inmueble está activo
   */
  get isActive() {
    return this.#active;
  }

  /**
   * Retorna la ubicación del inmueble
   */
  get location() {
    return this.#location;
  }

  /**
   * Retorna la fecha de creación
   */
  get dateCreated() {
    return this.#dateCreated;
  }

  // ============================================
  // SETTERS
  // ============================================

  /**
   * Modifica la ubicación con validación
   */
  set location(value) {
    if (!value || value.trim() === '') {
      throw new Error('La ubicación no puede estar vacía');
    }

    this.#location = value.trim();
  }

  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  /**
   * Activa el inmueble
   */
  activate() {
    if (this.#active) {
      return {
        success: false,
        message: 'El inmueble ya está activo'
      };
    }

    this.#active = true;

    return {
      success: true,
      message: 'Inmueble activado correctamente'
    };
  }

  /**
   * Desactiva el inmueble
   */
  deactivate() {
    if (!this.#active) {
      return {
        success: false,
        message: 'El inmueble ya está inactivo'
      };
    }

    this.#active = false;

    return {
      success: true,
      message: 'Inmueble desactivado correctamente'
    };
  }

  /**
   * Método abstracto
   * Debe implementarse en las clases hijas
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  /**
   * Retorna el tipo de objeto
   */
  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Inmuebles
// ============================================

/**
 * Clase House - Representa una casa residencial
 */
class House extends Property {
  #area;          // metros cuadrados
  #bedrooms;      // número de habitaciones
  #hasGarage;     // tiene garaje

  constructor(name, location, area, bedrooms, hasGarage) {
    super(name, location);

    if (area <= 0) throw new Error('El área debe ser mayor a 0');
    if (bedrooms < 0) throw new Error('Las habitaciones no pueden ser negativas');

    this.#area = area;
    this.#bedrooms = bedrooms;
    this.#hasGarage = Boolean(hasGarage);
  }

  get area() { return this.#area; }
  get bedrooms() { return this.#bedrooms; }
  get hasGarage() { return this.#hasGarage; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      area: this.#area,
      bedrooms: this.#bedrooms,
      hasGarage: this.#hasGarage,
      active: this.isActive
    };
  }
}


/**
 * Clase Apartment - Representa un apartamento
 */
class Apartment extends Property {
  #area;
  #floor;
  #hasElevator;

  constructor(name, location, area, floor, hasElevator) {
    super(name, location);

    if (area <= 0) throw new Error('El área debe ser mayor a 0');
    if (floor < 0) throw new Error('El piso no puede ser negativo');

    this.#area = area;
    this.#floor = floor;
    this.#hasElevator = Boolean(hasElevator);
  }

  get area() { return this.#area; }
  get floor() { return this.#floor; }
  get hasElevator() { return this.#hasElevator; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      area: this.#area,
      floor: this.#floor,
      hasElevator: this.#hasElevator,
      active: this.isActive
    };
  }
}


/**
 * Clase CommercialProperty - Representa un inmueble comercial
 */
class CommercialProperty extends Property {
  #area;
  #businessType;
  #parkingSpaces;

  constructor(name, location, area, businessType, parkingSpaces) {
    super(name, location);

    if (area <= 0) throw new Error('El área debe ser mayor a 0');
    if (!businessType || businessType.trim() === '') {
      throw new Error('El tipo de negocio es obligatorio');
    }

    this.#area = area;
    this.#businessType = businessType.trim();
    this.#parkingSpaces = parkingSpaces ?? 0;
  }

  get area() { return this.#area; }
  get businessType() { return this.#businessType; }
  get parkingSpaces() { return this.#parkingSpaces; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      area: this.#area,
      businessType: this.#businessType,
      parkingSpaces: this.#parkingSpaces,
      active: this.isActive
    };
  }
}

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================

/**
 * Clase base para todos los usuarios del sistema
 * Representa una persona registrada en la app de valuación
 */
class Person {
  // ============================================
  // CAMPOS PRIVADOS
  // ============================================
  #id;
  #name;
  #email;
  #registrationDate;

  /**
   * Constructor de la clase Person
   * @param {string} name - Nombre completo del usuario
   * @param {string} email - Correo electrónico del usuario
   */
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

  // ============================================
  // GETTERS
  // ============================================

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get registrationDate() {
    return this.#registrationDate;
  }

  // ============================================
  // SETTER CON VALIDACIÓN
  // ============================================

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }

    this.#email = value;
  }

  // ============================================
  // MÉTODOS
  // ============================================

  /**
   * Retorna la información básica del usuario
   */
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

/**
 * Clase Appraiser
 * Representa un evaluador profesional de inmuebles
 */
class Appraiser extends Person {
  #licenseNumber;
  #specialty;
  #valuationsPerformed;

  constructor(name, email, licenseNumber, specialty) {
    super(name, email);

    if (!licenseNumber || licenseNumber.trim() === '') {
      throw new Error('El número de licencia es obligatorio');
    }

    if (!specialty || specialty.trim() === '') {
      throw new Error('La especialidad es obligatoria');
    }

    this.#licenseNumber = licenseNumber.trim();
    this.#specialty = specialty.trim();
    this.#valuationsPerformed = 0;
  }

  // Método para registrar una nueva valuación realizada
  recordValuation() {
    this.#valuationsPerformed++;
  }

  get licenseNumber() {
    return this.#licenseNumber;
  }

  get specialty() {
    return this.#specialty;
  }

  get valuationsPerformed() {
    return this.#valuationsPerformed;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      role: this.constructor.name,
      licenseNumber: this.#licenseNumber,
      specialty: this.#specialty,
      valuationsPerformed: this.#valuationsPerformed
    };
  }
}


/**
 * Clase Client
 * Representa un cliente o propietario de inmuebles
 */
class Client extends Person {
  #ownedProperties;
  #valuationRequests;

  constructor(name, email) {
    super(name, email);
    this.#ownedProperties = [];
    this.#valuationRequests = 0;
  }

  // Agrega una propiedad al cliente
  addProperty(property) {
    this.#ownedProperties.push(property);
  }

  // Registra una solicitud de valuación
  requestValuation() {
    this.#valuationRequests++;
  }

  get ownedProperties() {
    return this.#ownedProperties;
  }

  get valuationRequests() {
    return this.#valuationRequests;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      role: this.constructor.name,
      totalProperties: this.#ownedProperties.length,
      valuationRequests: this.#valuationRequests
    };
  }
}

// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================

class MainSystem {
  // ============================================
  // CAMPOS PRIVADOS
  // ============================================
  #items = [];
  #users = [];
  #transactions = [];

  // ============================================
  // STATIC BLOCK - Configuración inicial
  // ============================================
  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Real Estate Valuation System';

    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado correctamente`);
  }

  // ============================================
  // MÉTODOS ESTÁTICOS
  // ============================================

  static isValidId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  // ============================================
  // CRUD PARA PROPERTIES
  // ============================================

  addItem(item) {
    if (!(item instanceof Property)) {
      return { success: false, message: 'El item debe ser instancia de Property' };
    }

    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      return { success: false, message: 'Límite de inmuebles alcanzado' };
    }

    this.#items.push(item);

    return { success: true, message: 'Inmueble agregado correctamente', item };
  }

  removeItem(id) {
    if (!MainSystem.isValidId(id)) {
      return { success: false, message: 'ID inválido' };
    }

    const index = this.#items.findIndex(item => item.id === id);

    if (index === -1) {
      return { success: false, message: 'Inmueble no encontrado' };
    }

    const removed = this.#items.splice(index, 1)[0];

    return { success: true, message: 'Inmueble eliminado', item: removed };
  }

  findItem(id) {
    return this.#items.find(item => item.id === id) ?? null;
  }

  getAllItems() {
    return [...this.#items];
  }

  // ============================================
  // BÚSQUEDA Y FILTROS
  // ============================================

  searchByName(query) {
    const searchTerm = query.toLowerCase();

    return this.#items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  filterByType(type) {
    return this.#items.filter(item => item.getType() === type);
  }

  filterByStatus(active) {
    return this.#items.filter(item => item.isActive === active);
  }

  // ============================================
  // ESTADÍSTICAS
  // ============================================

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(item => item.isActive).length;
    const inactive = total - active;

    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return {
      system: MainSystem.SYSTEM_NAME,
      version: MainSystem.VERSION,
      totalProperties: total,
      activeProperties: active,
      inactiveProperties: inactive,
      propertiesByType: byType,
      totalUsers: this.#users.length
    };
  }

  // ============================================
  // GESTIÓN DE USUARIOS
  // ============================================

  addUser(user) {
    if (!(user instanceof Person)) {
      return { success: false, message: 'Debe ser instancia de Person' };
    }

    this.#users.push(user);

    return { success: true, message: 'Usuario registrado correctamente', user };
  }

  findUserByEmail(email) {
    return this.#users.find(user => user.email === email) ?? null;
  }

  getAllUsers() {
    return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// Crear instancia principal
const system = new MainSystem();

// ============================================
// CREAR INMUEBLES DE PRUEBA
// ============================================

// Casas
const house1 = new House(
  'Casa Campestre El Retiro',
  'El Retiro, Antioquia',
  250,
  4,
  true
);

const house2 = new House(
  'Casa Familiar Laureles',
  'Medellín, Antioquia',
  180,
  3,
  false
);

// Apartamentos
const apartment1 = new Apartment(
  'Apartamento Vista Mar',
  'Cartagena, Bolívar',
  95,
  12,
  true
);

const apartment2 = new Apartment(
  'Apartamento Centro',
  'Bogotá, Cundinamarca',
  70,
  5,
  true
);

// Propiedad comercial
const commercial1 = new CommercialProperty(
  'Local Comercial Premium',
  'Cali, Valle del Cauca',
  320,
  'Restaurante',
  10
);

// Agregar inmuebles al sistema
system.addItem(house1);
system.addItem(house2);
system.addItem(apartment1);
system.addItem(apartment2);
system.addItem(commercial1);

// ============================================
// CREAR USUARIOS DE PRUEBA
// ============================================

// Evaluador
const appraiser1 = new Appraiser(
  'Carlos Ramírez',
  'carlos@valuaciones.com',
  'LIC-AV-2024-001',
  'Inmuebles residenciales'
);

// Cliente
const client1 = new Client(
  'María González',
  'maria@gmail.com'
);

// Asociar propiedades al cliente
client1.addProperty(house1);
client1.addProperty(apartment1);
client1.requestValuation();

// Registrar usuarios en el sistema
system.addUser(appraiser1);
system.addUser(client1);

// ============================================
// PRUEBAS RÁPIDAS
// ============================================

console.log('=== TODOS LOS INMUEBLES ===');
console.log(system.getAllItems());

console.log('=== ESTADÍSTICAS DEL SISTEMA ===');
console.log(system.getStats());

console.log('=== USUARIOS REGISTRADOS ===');
console.log(system.getAllUsers());

// ============================================
// TODO 7: REFERENCIAS AL DOM
// ============================================

// Variables globales para el DOM
let itemForm;
let itemList;
let statsContainer;
let filterType;
let filterStatus;
let searchInput;

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Estructura DOM cargada');
});

/**
 * Renderiza un inmueble individual
 * @param {Property} item
 * @returns {string}
 */
const renderItem = item => {
  const info = item.getInfo();

  return `
    <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
      
      <div class="item-header">
        <h3>${item.name}</h3>
        <span class="badge">${item.getType()}</span>
      </div>

      <div class="item-details">
        <p><strong>Ubicación:</strong> ${item.location}</p>
        <p><strong>Estado:</strong> ${item.isActive ? 'Activo' : 'Inactivo'}</p>
        <p><strong>Fecha registro:</strong> ${new Date(item.dateCreated).toLocaleDateString()}</p>
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

/**
 * Renderiza todos los inmuebles
 * @param {Array} items
 */
const renderItems = (items = []) => {

  if (!itemList) return;

  if (items.length === 0) {
    itemList.innerHTML = `
      <p class="empty">
        No hay inmuebles registrados en el sistema
      </p>
    `;
    return;
  }

  itemList.innerHTML = items.map(renderItem).join('');
};

/**
 * Renderiza estadísticas del sistema
 * @param {Object} stats
 */
const renderStats = stats => {

  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <div class="stat">
      <strong>Total:</strong> ${stats.totalProperties}
    </div>
    <div class="stat">
      <strong>Activos:</strong> ${stats.activeProperties}
    </div>
    <div class="stat">
      <strong>Inactivos:</strong> ${stats.inactiveProperties}
    </div>
    <div class="stat">
      <strong>Usuarios:</strong> ${stats.totalUsers}
    </div>
  `;
};

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const name = formData.get('name');
  const location = formData.get('location');
  const type = formData.get('type');
  const area = Number(formData.get('area'));
  const extra1 = formData.get('extra1');
  const extra2 = formData.get('extra2');

  let newItem;

  try {

    switch (type) {

      case 'House':
        newItem = new House(
          name,
          location,
          area,
          Number(extra1),      // bedrooms
          extra2 === 'true'    // hasGarage
        );
        break;

      case 'Apartment':
        newItem = new Apartment(
          name,
          location,
          area,
          Number(extra1),      // floor
          extra2 === 'true'    // hasElevator
        );
        break;

      case 'CommercialProperty':
        newItem = new CommercialProperty(
          name,
          location,
          area,
          extra1,              // businessType
          Number(extra2)       // parkingSpaces
        );
        break;

      default:
        alert('Tipo de inmueble inválido');
        return;
    }

    system.addItem(newItem);

    renderItems(system.getAllItems());
    renderStats(system.getStats());

    e.target.reset();

  } catch (error) {
    alert(error.message);
  }
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {

  let filtered = system.getAllItems();

  const typeValue = filterType.value;
  const statusValue = filterStatus.value;
  const searchValue = searchInput.value.toLowerCase();

  // Filtrar por tipo
  if (typeValue !== 'all') {
    filtered = filtered.filter(item => item.getType() === typeValue);
  }

  // Filtrar por estado
  if (statusValue !== 'all') {
    const isActive = statusValue === 'active';
    filtered = filtered.filter(item => item.isActive === isActive);
  }

  // Filtrar por nombre
  if (searchValue) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );
  }

  renderItems(filtered);
};

/**
 * Maneja acciones en los elementos (toggle, delete)
 */
const handleItemAction = e => {

  const target = e.target;
  const itemId = target.dataset.id;

  if (!itemId) return;

  const item = system.findItem(itemId);
  if (!item) return;

  // Activar / Desactivar
  if (target.classList.contains('btn-toggle')) {

    if (item.isActive) {
      item.deactivate();
    } else {
      item.activate();
    }

  }

  // Eliminar
  if (target.classList.contains('btn-delete')) {

    if (confirm('¿Eliminar este inmueble?')) {
      system.removeItem(itemId);
    }

  }

  handleFilterChange();
  renderStats(system.getStats());
};

// ============================================
// TODO 10 y 11: EVENT LISTENERS + INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {

  // ============================================
  // REFERENCIAS A ELEMENTOS DEL DOM
  // ============================================
  itemForm = document.getElementById('item-form');
  itemList = document.getElementById('item-list');
  statsContainer = document.getElementById('stats');
  filterType = document.getElementById('filter-type');
  filterStatus = document.getElementById('filter-status');
  searchInput = document.getElementById('search-input');

  // Verificar que los elementos existan
  if (!itemForm || !itemList || !statsContainer) {
    console.error('❌ Error: No se encontraron elementos del DOM');
    return;
  }

  // ============================================
  // Adjuntar Event Listeners
  // ============================================

  itemForm.addEventListener('submit', handleFormSubmit);
  filterType.addEventListener('change', handleFilterChange);
  filterStatus.addEventListener('change', handleFilterChange);
  searchInput.addEventListener('input', handleFilterChange);
  itemList.addEventListener('click', handleItemAction);

  // ============================================
  // Render inicial
  // ============================================

  renderItems(system.getAllItems());
  renderStats(system.getStats());

  console.log('✅ Real Estate Valuation System inicializado correctamente');
};


// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
