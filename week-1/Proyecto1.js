// TODO 1: Crear el objeto de datos del dominio
// Dominio: Real Estate Valuation App
// ============================================

const entityData = {
  // Propiedades básicas del inmueble
  name: 'Urban Home Valuation',
  description: 'Aplicación web para estimar el valor de inmuebles de forma rápida y precisa',
  identifier: 'REVA-001',
  isActive: true,

  // Información de contacto de la app o empresa
  contact: {
    email: 'support@urbanhome.com',
    phone: '+57 300 123 4567',
    location: 'Bogotá, Colombia'
  },

  // Elementos relacionados: factores que influyen en la valuación
  items: [
    { name: 'Location', level: 95, category: 'environment' },
    { name: 'Property Size', level: 90, category: 'physical' },
    { name: 'Construction Quality', level: 85, category: 'physical' },
    { name: 'Nearby Services', level: 80, category: 'environment' }
  ],

  // Enlaces de referencia de la aplicación
  links: [
    { platform: 'Website', url: 'https://urbanhome.com', icon: '🌐' },
    { platform: 'GitHub', url: 'https://github.com/urbanhome', icon: '💻' }
  ],

  // Estadísticas generales de la app
  stats: {
    totalProperties: 1200,
    activeValuations: 340,
    rating: 4.7,
    averageValue: 250000000
  }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// Dominio: Real Estate Valuation App
// ============================================

// Contenedor de enlaces
const linksContainer = document.getElementById('links-container');

// Información principal de la aplicación
const appName = document.getElementById('app-name');
const appDescription = document.getElementById('app-description');
const appCode = document.getElementById('app-code');
const appStatus = document.getElementById('app-status');

// Información de contacto
const contactEmail = document.getElementById('contact-email');
const contactPhone = document.getElementById('contact-phone');
const contactLocation = document.getElementById('contact-location');

// Contenedor de factores de valuación
const itemsList = document.getElementById('valuation-factors');

// Contenedor de estadísticas
const statsContainer = document.getElementById('stats-container');
const totalProperties = document.getElementById('total-properties');
const activeValuations = document.getElementById('active-valuations');
const averageValue = document.getElementById('average-value');
const ratingValue = document.getElementById('rating-value');

// Botones de interacción
const themeToggleBtn = document.getElementById('theme-toggle');
const copyDataBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');

// Elementos de notificación (toast)
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ============================================
// TODO 3: Renderizar información básica
// ============================================
// Muestra la información principal de la app de valuación de inmuebles

const renderBasicInfo = () => {
  // Destructuring del objeto principal
  const {
    name,
    description,
    identifier,
    isActive,
    contact: { email, phone, location }
  } = entityData;

  // Actualizar información principal en el DOM
  appName.textContent = name;
  appDescription.innerHTML = `<p>${description}</p>`;
  appCode.textContent = `Code: ${identifier}`;
  appStatus.textContent = isActive ? 'Status: Active' : 'Status: Inactive';

  // Actualizar información de contacto
  contactEmail.textContent = `Email: ${email}`;
  contactPhone.textContent = `Phone: ${phone}`;
  contactLocation.textContent = `Location: ${location}`;
};

// ============================================
// ============================================
// TODO 4: Renderizar lista de elementos
// ============================================
// Renderiza los factores que influyen en la valuación del inmueble

const renderItems = (showAll = false) => {
  // Destructuring del array de items
  const { items } = entityData;

  // Determinar qué items mostrar
  const itemsToShow = showAll ? items : items.slice(0, 4);

  // Generar el HTML de cada item
  const itemsHtml = itemsToShow
    .map(({ name, level }) => `
      <div class="item">
        <div class="item-name">${name}</div>
        <div class="item-level">
          <span>${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `)
    .join('');

  // Actualizar el contenedor de items
  itemsList.innerHTML = itemsHtml;
};

// ============================================
// TODO 5: Renderizar enlaces / referencias
// ============================================
// Muestra los enlaces relacionados con la app de valuación de inmuebles

const renderLinks = () => {
  // Destructuring del array de enlaces
  const { links } = entityData;

  // Crear el HTML de los enlaces usando map
  const linksHTML = links
    .map(({ platform, url, icon }) => {
      return `
        <a href="${url}" target="_blank" class="app-link">
          <span class="icon">${icon}</span>
          <span class="platform">${platform}</span>
        </a>
      `;
    })
    .join('');

  // Actualizar el contenedor de enlaces
  linksContainer.innerHTML = linksHTML;
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================
// Muestra las estadísticas principales de la app

const renderStats = () => {
  // Destructuring del objeto stats
  const { stats } = entityData;

  // Array de estadísticas con etiquetas en español
  const statsArray = [
    { label: 'Inmuebles Registrados', value: stats.totalProperties },
    { label: 'Valuaciones Activas', value: stats.activeValuations },
    { label: 'Valor Promedio', value: `$${stats.averageValue}` },
    { label: 'Calificación', value: stats.rating }
  ];

  // Generar HTML de las estadísticas
  const statsHtml = statsArray
    .map(({ label, value }) => `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `)
    .join('');

  // Actualizar el contenedor de estadísticas
  statsContainer.innerHTML = statsHtml;
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================
// Permite alternar entre modo claro y oscuro

const toggleTheme = () => {
  // Obtener el tema actual
  const currentTheme = document.documentElement.dataset.theme;

  // Calcular el nuevo tema
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Aplicar el nuevo tema
  document.documentElement.dataset.theme = newTheme;

  // Actualizar el ícono del botón
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';

  // Guardar preferencia en localStorage
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  // Cargar el tema guardado o usar claro por defecto
  const savedTheme = localStorage.getItem('theme') ?? 'light';

  // Aplicar el tema
  document.documentElement.dataset.theme = savedTheme;

  // Ajustar el ícono del botón
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================
// Copia la información principal de la app al portapapeles

const copyInfo = () => {
  // Destructuring de la información principal
  const {
    name,
    description,
    contact: { email, phone, location }
  } = entityData;

  // Construir el texto a copiar usando template literals
  const infoText = `
App: ${name}
Descripción: ${description}
Email: ${email}
Teléfono: ${phone}
Ubicación: ${location}
  `.trim();

  // Copiar al portapapeles
  navigator.clipboard.writeText(infoText);

  // Mostrar notificación de éxito
  showToast('¡Información copiada al portapapeles!');
};

// ============================================
// Función auxiliar para mostrar notificaciones toast
// ============================================

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar / ocultar items
// ============================================
// Controla la visualización de los factores de valuación

let showingAllItems = false;

const handleToggleItems = () => {
  // Alternar el estado de visualización
  showingAllItems = !showingAllItems;

  // Renderizar los items según el estado actual
  renderItems(showingAllItems);

  // Actualizar el texto del botón
  toggleItemsBtn.textContent = showingAllItems
    ? 'Mostrar menos'
    : 'Mostrar más';
};

// ============================================
// TODO 10: Event Listeners
// ============================================
// Conecta los botones con sus respectivas funciones

themeToggleBtn.addEventListener('click', toggleTheme);
copyDataBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================
// Inicializa todos los componentes de la app

const init = () => {
  // Cargar tema guardado
  loadTheme();

  // Renderizar información principal
  renderBasicInfo();

  // Renderizar lista de factores (por defecto, vista reducida)
  renderItems(false);

  // Renderizar enlaces de referencia
  renderLinks();

  // Renderizar estadísticas
  renderStats();

  // Mensaje de éxito en consola
  console.log('✅ Aplicación de valuación de inmuebles inicializada correctamente');
};

// Ejecutar init cuando el DOM esté listo
init();


