// ============================================
// TODO 1: DEFINIR CATEGORÍAS DEL DOMINIO
// Dominio: App de Valuación de Inmuebles
// ============================================

const CATEGORIES = {
  house: { name: 'Casa', emoji: '🏠' },
  apartment: { name: 'Apartamento', emoji: '🏢' },
  commercial: { name: 'Local Comercial', emoji: '🏬' },
  land: { name: 'Terreno', emoji: '🌄' },
  office: { name: 'Oficina', emoji: '🏢' },
};

// Prioridades
const PRIORITIES = {
  low: { name: 'Baja', color: '#4caf50' },
  medium: { name: 'Media', color: '#ff9800' },
  high: { name: 'Alta', color: '#f44336' }
};

// Estado global
let items = [];
let editingItemId = null;

// ============================================
// TODO 2: PERSISTENCIA (LocalStorage)
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Carga los inmuebles desde LocalStorage
 * @returns {Array} Array de inmuebles guardados, o array vacío
 */
const loadItems = () => {
  // Se obtiene la información almacenada en localStorage
  // Si no existe nada, se retorna un array vacío usando ??
  return JSON.parse(localStorage.getItem('realEstateValuations') ?? '[]');
};

/**
 * Guarda los inmuebles en LocalStorage
 * @param {Array} itemsToSave - Array de inmuebles a guardar
 */
const saveItems = itemsToSave => {
  // Se convierte el array a string JSON y se guarda
  localStorage.setItem(
    'realEstateValuations',
    JSON.stringify(itemsToSave)
  );
};

// ============================================
// TODO 3: CRUD - CREAR INMUEBLE
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Crea un nuevo inmueble con los datos proporcionados
 * @param {Object} itemData - Datos del nuevo inmueble
 * @returns {Array} Nuevo array de inmuebles (sin mutar el original)
 */
const createItem = (itemData = {}) => {
  // Objeto base del inmueble con valores por defecto
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    category: itemData.category ?? 'house',
    priority: itemData.priority ?? 'medium',
    location: itemData.location ?? '',
    area: itemData.area ?? 0, // metros cuadrados
    bedrooms: itemData.bedrooms ?? 0,
    bathrooms: itemData.bathrooms ?? 0,
    price: itemData.price ?? 0, // valor estimado
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,

    // Permite sobrescribir propiedades si vienen adicionales
    ...itemData
  };

  // Se crea un nuevo array sin mutar el original
  const newItems = [...items, newItem];

  // Se guarda en localStorage
  saveItems(newItems);

  return newItems;
};

// ============================================
// TODO 4: CRUD - ACTUALIZAR INMUEBLE
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Actualiza un inmueble existente
 * @param {Number} id - ID del inmueble a actualizar
 * @param {Object} updates - Propiedades a actualizar
 * @returns {Array} Nuevo array con el inmueble actualizado
 */
const updateItem = (id, updates = {}) => {
  // Se crea un nuevo array usando map (sin mutar el original)
  const updatedItems = items.map(item =>
    item.id === id
      ? {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        }
      : item
  );

  // Se guarda el nuevo estado en localStorage
  saveItems(updatedItems);

  return updatedItems;
};

// ============================================
// TODO 5: CRUD - ELIMINAR INMUEBLE
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Elimina un inmueble por su ID
 * @param {Number} id - ID del inmueble a eliminar
 * @returns {Array} Nuevo array sin el inmueble eliminado
 */
const deleteItem = id => {
  // Se crea un nuevo array excluyendo el inmueble con el ID indicado
  const filteredItems = items.filter(item => item.id !== id);

  // Se guarda el nuevo estado en localStorage
  saveItems(filteredItems);

  return filteredItems;
};

// ============================================
// TODO 6: CRUD - TOGGLE ESTADO ACTIVO
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Alterna el estado activo/inactivo de un inmueble
 * @param {Number} id - ID del inmueble
 * @returns {Array} Nuevo array con el estado actualizado
 */
const toggleItemActive = id => {
  // Se crea un nuevo array usando map (sin mutar el original)
  const updatedItems = items.map(item =>
    item.id === id
      ? {
          ...item,
          active: !item.active,
          updatedAt: new Date().toISOString()
        }
      : item
  );

  // Se guarda el nuevo estado en localStorage
  saveItems(updatedItems);

  return updatedItems;
};

/**
 * Elimina todos los inmuebles inactivos
 * @returns {Array} Nuevo array solo con inmuebles activos
 */
const clearInactive = () => {
  // Se filtran solo los inmuebles activos
  const activeItems = items.filter(item => item.active);

  // Se guarda el nuevo estado
  saveItems(activeItems);

  return activeItems;
};

// ============================================
// TODO 7: FILTROS Y BÚSQUEDA
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Filtra inmuebles por estado (activo/inactivo)
 * @param {Array} itemsToFilter - Array de inmuebles
 * @param {String} status - 'all' | 'active' | 'inactive'
 * @returns {Array} Inmuebles filtrados
 */
const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'all') return itemsToFilter;
  if (status === 'active') return itemsToFilter.filter(item => item.active);
  if (status === 'inactive') return itemsToFilter.filter(item => !item.active);
  return itemsToFilter;
};

/**
 * Filtra inmuebles por categoría
 * @param {Array} itemsToFilter - Array de inmuebles
 * @param {String} category - Categoría o 'all'
 * @returns {Array} Inmuebles filtrados
 */
const filterByCategory = (itemsToFilter, category = 'all') => {
  if (category === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.category === category);
};

/**
 * Filtra inmuebles por prioridad
 * @param {Array} itemsToFilter - Array de inmuebles
 * @param {String} priority - Prioridad o 'all'
 * @returns {Array} Inmuebles filtrados
 */
const filterByPriority = (itemsToFilter, priority = 'all') => {
  if (priority === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.priority === priority);
};

/**
 * Busca inmuebles por texto en nombre y descripción
 * @param {Array} itemsToFilter - Array de inmuebles
 * @param {String} query - Texto a buscar
 * @returns {Array} Inmuebles que coinciden
 */
const searchItems = (itemsToFilter, query = '') => {
  // Si no hay texto de búsqueda, se retornan todos
  if (!query || query.trim() === '') return itemsToFilter;

  const searchTerm = query.toLowerCase();

  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description ?? '').toLowerCase().includes(searchTerm)
  );
};

/**
 * Aplica todos los filtros de forma encadenada
 * @param {Array} itemsToFilter - Array de inmuebles
 * @param {Object} filters - Objeto con todos los filtros
 * @returns {Array} Inmuebles filtrados
 */
const applyFilters = (itemsToFilter, filters = {}) => {
  // Se extraen los filtros con valores por defecto
  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;

  // Aplicación encadenada de filtros
  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);

  return result;
};

// ============================================
// TODO 8: ESTADÍSTICAS
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Calcula estadísticas generales de los inmuebles
 * @param {Array} itemsToAnalyze - Array de inmuebles
 * @returns {Object} Objeto con estadísticas
 */
const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;

  // Conteo de activos usando reduce
  const active = itemsToAnalyze.reduce(
    (count, item) => count + (item.active ? 1 : 0),
    0
  );

  const inactive = total - active;

  // Agrupación por categoría (casa, apartamento, etc.)
  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  // Agrupación por prioridad (alta, media, baja)
  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  return {
    total,
    active,
    inactive,
    byCategory,
    byPriority
  };
};

/**
 * Obtiene el emoji de una categoría
 * @param {String} category - Clave de la categoría
 * @returns {String} Emoji de la categoría
 */
const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '🏠';
};

/**
 * Formatea una fecha ISO a formato legible
 * @param {String} dateString - Fecha en formato ISO
 * @returns {String} Fecha formateada
 */
const formatDate = dateString => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Aplica los filtros actuales y retorna los elementos filtrados
 * @returns {Array} Elementos filtrados
 */
const applyCurrentFilters = () => {
  const filters = getCurrentFilters();
  return applyFilters(items, filters);
};

/**
 * Renderiza un inmueble individual como HTML
 * @param {Object} item - Objeto del inmueble
 * @returns {String} HTML del inmueble
 */
const renderItem = item => {
  // Se extraen propiedades usando destructuring
  const {
    id,
    name,
    description,
    category,
    priority,
    location,
    area,
    bedrooms,
    bathrooms,
    price,
    active,
    createdAt
  } = item;

  return `
    <div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
      
      <input 
        type="checkbox" 
        class="item-checkbox" 
        data-id="${id}"
        ${active ? 'checked' : ''}
      >

      <div class="item-content">
        <h3 class="item-name">
          ${getCategoryEmoji(category)} ${name}
        </h3>

        ${description ? `<p class="item-description">${description}</p>` : ''}

        <div class="item-details">
          <span>📍 ${location}</span>
          <span>📐 ${area} m²</span>
          <span>🛏 ${bedrooms}</span>
          <span>🚿 ${bathrooms}</span>
          <span>💰 $${Number(price).toLocaleString()}</span>
        </div>

        <div class="item-meta">
          <span class="badge badge-category">
            ${CATEGORIES[category]?.name ?? category}
          </span>

          <span class="badge badge-priority priority-${priority}">
            ${PRIORITIES[priority]?.name ?? priority}
          </span>

          <span class="item-date">
            📅 ${formatDate(createdAt)}
          </span>
        </div>
      </div>

      <div class="item-actions">
        <button class="btn-edit" data-id="${id}" title="Editar">✏️</button>
        <button class="btn-delete" data-id="${id}" title="Eliminar">🗑️</button>
      </div>
    </div>
  `;
};

// ============================================
// TODO 10: RENDERIZADO - LISTA COMPLETA
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Renderiza la lista completa de inmuebles
 * @param {Array} itemsToRender - Array de inmuebles a renderizar
 */
const renderItems = (itemsToRender = []) => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  // Si no hay inmuebles, se muestra el estado vacío
  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    // Si hay inmuebles, se oculta el estado vacío
    emptyState.style.display = 'none';

    // Se genera el HTML usando map + join
    itemList.innerHTML = itemsToRender
      .map(renderItem)
      .join('');
  }
};

/**
 * Renderiza las estadísticas en el DOM
 * @param {Object} stats - Objeto con estadísticas
 */
const renderStats = stats => {
  // Estadísticas generales
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  // Estadísticas por categoría (casas, apartamentos, etc.)
  const categoryStats = Object.entries(stats.byCategory)
    .map(([category, count]) =>
      `${getCategoryEmoji(category)} ${CATEGORIES[category]?.name ?? category}: ${count}`
    )
    .join(' | ');

  // Estadísticas por prioridad
  const priorityStats = Object.entries(stats.byPriority)
    .map(([priority, count]) =>
      `${PRIORITIES[priority]?.name ?? priority}: ${count}`
    )
    .join(' | ');

  // Se muestran combinadas
  document.getElementById('stats-details').textContent =
    `${categoryStats} || ${priorityStats}`;
};

// ============================================
// TODO 11: EVENT HANDLERS
// Dominio: App de Valuación de Inmuebles
// ============================================

/**
 * Maneja el envío del formulario (crear/editar inmueble)
 */
const handleFormSubmit = e => {
  e.preventDefault();

  // Obtener valores del formulario
  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  const location = document.getElementById('item-location').value.trim();
  const area = Number(document.getElementById('item-area').value);
  const bedrooms = Number(document.getElementById('item-bedrooms').value);
  const bathrooms = Number(document.getElementById('item-bathrooms').value);
  const price = Number(document.getElementById('item-price').value);

  // Validación básica
  if (!name) {
    alert('El nombre del inmueble es obligatorio');
    return;
  }

  const itemData = {
    name,
    description,
    category,
    priority,
    location,
    area,
    bedrooms,
    bathrooms,
    price
  };

  // Crear o actualizar
  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el toggle activo/inactivo
 */
const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja la edición de un inmueble
 */
const handleItemEdit = itemId => {
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;

  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description ?? '';
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;
  document.getElementById('item-location').value = itemToEdit.location ?? '';
  document.getElementById('item-area').value = itemToEdit.area ?? 0;
  document.getElementById('item-bedrooms').value = itemToEdit.bedrooms ?? 0;
  document.getElementById('item-bathrooms').value = itemToEdit.bathrooms ?? 0;
  document.getElementById('item-price').value = itemToEdit.price ?? 0;

  document.getElementById('form-title').textContent = '✏️ Editar Inmueble';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';

  editingItemId = itemId;
};

/**
 * Maneja la eliminación de un inmueble
 */
const handleItemDelete = itemId => {
  if (!confirm('¿Estás seguro de que deseas eliminar este inmueble?')) return;

  items = deleteItem(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Obtiene los filtros actuales
 */
const getCurrentFilters = () => {
  return {
    status: document.getElementById('filter-status').value,
    category: document.getElementById('filter-category').value,
    priority: document.getElementById('filter-priority').value,
    search: document.getElementById('search-input').value
  };
};

/**
 * Maneja cambios en filtros
 */
const handleFilterChange = () => {
  const filteredItems = applyCurrentFilters();
  renderItems(filteredItems);
};

/**
 * Resetea el formulario
 */
const resetForm = () => {
  document.getElementById('item-form').reset();
  document.getElementById('form-title').textContent = '➕ Nuevo Inmueble';
  document.getElementById('submit-btn').textContent = 'Crear';
  document.getElementById('cancel-btn').style.display = 'none';
  editingItemId = null;
};
// ============================================
// TODO 12: EVENT LISTENERS
// ============================================

/**
 * Adjunta todos los event listeners necesarios
 */
const attachEventListeners = () => {
  // Form submit
  document
    .getElementById('item-form')
    .addEventListener('submit', handleFormSubmit);

  // Cancel button
  document
    .getElementById('cancel-btn')
    .addEventListener('click', resetForm);

  // Filtros
  document
    .getElementById('filter-status')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-category')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-priority')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('search-input')
    .addEventListener('input', handleFilterChange);

  // Botón limpiar inactivos
  document
    .getElementById('clear-inactive')
    .addEventListener('click', () => {
      if (confirm('¿Eliminar todos los elementos inactivos?')) {
        items = clearInactive();
        renderItems(applyCurrentFilters());
        renderStats(getStats(items));
      }
    });

  // Event delegation para la lista
  document
    .getElementById('item-list')
    .addEventListener('click', e => {
      const itemElement = e.target.closest('.item');
      if (!itemElement) return;

      const itemId = parseInt(itemElement.dataset.itemId);

      if (e.target.classList.contains('item-checkbox')) {
        handleItemToggle(itemId);
      } else if (e.target.classList.contains('btn-edit')) {
        handleItemEdit(itemId);
      } else if (e.target.classList.contains('btn-delete')) {
        handleItemDelete(itemId);
      }
    });
};

// ============================================
// TODO 13: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // Cargar los elementos desde localStorage
  items = loadItems();
  
  // Renderizar la lista inicial
  renderItems(items);
  
  // Renderizar las estadísticas iniciales
  renderStats(getStats(items));
  
  // Adjuntar los event listeners
  attachEventListeners();
  
  console.log('✅ Aplicación de Valuación de Inmuebles inicializada correctamente');
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
