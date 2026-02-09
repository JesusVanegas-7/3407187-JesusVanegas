// ============================================
// TODO 1: Crear el objeto de datos del dominio
// Dominio: Real Estate Valuation App
// ============================================

const entityData = {
  name: 'Urban Home Valuation',
  description: 'Aplicación web para estimar el valor de inmuebles de forma rápida y precisa',
  identifier: 'REVA-001',
  isActive: true,

  contact: {
    email: 'support@urbanhome.com',
    phone: '+57 300 123 4567',
    location: 'Bogotá, Colombia'
  },

  items: [
    { name: 'Location', level: 95, category: 'environment' },
    { name: 'Property Size', level: 90, category: 'physical' },
    { name: 'Construction Quality', level: 85, category: 'physical' },
    { name: 'Nearby Services', level: 80, category: 'environment' },
    { name: 'Market Demand', level: 88, category: 'economic' },
    { name: 'Security', level: 82, category: 'environment' }
  ],

  links: [
    { platform: 'Website', url: 'https://urbanhome.com', icon: '🌐' },
    { platform: 'GitHub', url: 'https://github.com/urbanhome', icon: '💻' }
  ],

  stats: {
    totalProperties: 1200,
    activeValuations: 340,
    rating: 4.7,
    averageValue: 250000000
  }
};

// ============================================
// TODO 2: Referencias al DOM
// ============================================

const linksContainer = document.getElementById('links-container');

const appName = document.getElementById('app-name');
const appDescription = document.getElementById('app-description');
const appCode = document.getElementById('app-code');
const appStatus = document.getElementById('app-status');

const contactEmail = document.getElementById('contact-email');
const contactPhone = document.getElementById('contact-phone');
const contactLocation = document.getElementById('contact-location');

const itemsList = document.getElementById('valuation-factors');
const statsContainer = document.getElementById('stats-container');

const themeToggleBtn = document.getElementById('theme-toggle');
const copyDataBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  const {
    name,
    description,
    identifier,
    isActive,
    contact: { email, phone, location }
  } = entityData;

  appName.textContent = name;
  appDescription.textContent = description;
  appCode.textContent = `Code: ${identifier}`;
  appStatus.textContent = isActive ? 'Status: Active' : 'Status: Inactive';

  contactEmail.textContent = `Email: ${email}`;
  contactPhone.textContent = `Phone: ${phone}`;
  contactLocation.textContent = `Location: ${location}`;
};

// ============================================
// TODO 4: Renderizar factores de valuación
// ============================================

const ITEMS_VISIBLE = 3;
let showingAllItems = false;

const renderItems = () => {
  const { items } = entityData;

  const itemsToShow = showingAllItems
    ? items
    : items.slice(0, ITEMS_VISIBLE);

  itemsList.innerHTML = itemsToShow
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

  toggleItemsBtn.textContent = showingAllItems
    ? 'Mostrar menos'
    : 'Mostrar más';
};

// ============================================
// TODO 5: Renderizar enlaces
// ============================================

const renderLinks = () => {
  linksContainer.innerHTML = entityData.links
    .map(({ platform, url, icon }) => `
      <a href="${url}" target="_blank" class="app-link">
        <span>${icon}</span>
        <span>${platform}</span>
      </a>
    `)
    .join('');
};

// ============================================
// TODO 6: Renderizar estadísticas
// ============================================

const renderStats = () => {
  const { stats } = entityData;

  const statsData = [
    { label: 'Inmuebles Registrados', value: stats.totalProperties },
    { label: 'Valuaciones Activas', value: stats.activeValuations },
    { label: 'Valor Promedio', value: `$${stats.averageValue}` },
    { label: 'Calificación', value: stats.rating }
  ];

  statsContainer.innerHTML = statsData
    .map(({ label, value }) => `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `)
    .join('');
};

// ============================================
// TODO 7: Dark / Light Mode
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Copiar información
// ============================================

const copyInfo = () => {
  const {
    name,
    description,
    contact: { email, phone, location }
  } = entityData;

  const text = `
App: ${name}
Descripción: ${description}
Email: ${email}
Teléfono: ${phone}
Ubicación: ${location}
  `.trim();

  navigator.clipboard.writeText(text);
  showToast('¡Información copiada al portapapeles!');
};

// ============================================
// Toast
// ============================================

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Mostrar más / menos
// ============================================

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems();
};

// ============================================
// TODO 10: Event listeners
// ============================================

themeToggleBtn.addEventListener('click', toggleTheme);
copyDataBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar app
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();

  console.log('✅ Aplicación de valuación de inmuebles inicializada correctamente');
};

init();
