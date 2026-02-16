// ============================================
// TODO 1: Crear el objeto de datos del dominio
// Dominio: Real Estate Valuation App
// ============================================

// Se crea un objeto llamado entityData.
// Este objeto guarda toda la información principal de la aplicación
// de valuación de inmuebles en una sola estructura organizada.
const entityData = {

  // Nombre de la aplicación o proyecto.
  // Sirve para identificar la app en la interfaz o en el sistema.
  name: 'Urban Home Valuation',

  // Descripción breve de lo que hace la aplicación.
  // Se puede mostrar en la página principal o en la sección "Acerca de".
  description: 'Aplicación web para estimar el valor de inmuebles de forma rápida y precisa',

  // Identificador único del proyecto.
  // Puede usarse como código interno para diferenciar esta app de otras.
  identifier: 'REVA-001',

  // Indica si la aplicación está activa o no.
  // Si es true significa que está funcionando.
  // Si fuera false podría indicar que está deshabilitada.
  isActive: true,

  // Objeto que guarda la información de contacto.
  // Se agrupa en un subobjeto para mantener organizado el código.
  contact: {

    // Correo electrónico de soporte.
    // Sirve para que los usuarios puedan comunicarse.
    email: 'support@urbanhome.com',

    // Número telefónico de contacto.
    phone: '+57 300 123 4567',

    // Ubicación principal del servicio o empresa.
    location: 'Bogotá, Colombia'
  },

  // Arreglo que contiene los factores que influyen en la valuación del inmueble.
  // Cada elemento representa un criterio importante para calcular el valor.
  items: [

    // Cada objeto dentro del arreglo representa un factor.
    // name: nombre del factor
    // level: nivel o importancia (porcentaje o peso)
    // category: categoría a la que pertenece

    { name: 'Location', level: 95, category: 'environment' },
    { name: 'Property Size', level: 90, category: 'physical' },
    { name: 'Construction Quality', level: 85, category: 'physical' },
    { name: 'Nearby Services', level: 80, category: 'environment' },
    { name: 'Market Demand', level: 88, category: 'economic' },
    { name: 'Security', level: 82, category: 'environment' }
  ],

  // Arreglo que contiene enlaces externos relacionados con la aplicación.
  // Puede usarse para mostrar botones de redes o páginas oficiales.
  links: [

    // platform: nombre de la plataforma
    // url: enlace web
    // icon: emoji o icono representativo

    { platform: 'Website', url: 'https://urbanhome.com', icon: '🌐' },
    { platform: 'GitHub', url: 'https://github.com/urbanhome', icon: '💻' }
  ],

  // Objeto que almacena estadísticas generales del sistema.
  // Sirve para mostrar datos importantes en el dashboard.
  stats: {

    // Total de propiedades registradas en el sistema.
    totalProperties: 1200,

    // Cantidad de valuaciones que están activas actualmente.
    activeValuations: 340,

    // Calificación promedio del servicio.
    rating: 4.7,

    // Valor promedio de las propiedades (en pesos).
    averageValue: 250000000
  }
};

// ============================================
// TODO 2: Referencias al DOM
// ============================================

// Se obtiene el elemento del HTML que tiene el id 'links-container'.
// Este contenedor se usará para mostrar dinámicamente los enlaces
// (como Website o GitHub) que vienen del objeto entityData.
const linksContainer = document.getElementById('links-container');


// Se obtiene el elemento donde se mostrará el nombre de la app.
// Sirve para insertar el nombre dinámicamente en la interfaz.
const appName = document.getElementById('app-name');

// Elemento donde se mostrará la descripción de la aplicación.
const appDescription = document.getElementById('app-description');

// Elemento donde se mostrará el código o identificador del proyecto.
const appCode = document.getElementById('app-code');

// Elemento donde se mostrará el estado (activo/inactivo) de la app.
const appStatus = document.getElementById('app-status');


// Elementos relacionados con la información de contacto.
// Cada uno permitirá mostrar los datos del objeto contact.

const contactEmail = document.getElementById('contact-email');     // Muestra el correo
const contactPhone = document.getElementById('contact-phone');     // Muestra el teléfono
const contactLocation = document.getElementById('contact-location'); // Muestra la ubicación


// Se obtiene la lista donde se mostrarán los factores de valuación.
// Aquí se insertarán dinámicamente los elementos del arreglo "items".
const itemsList = document.getElementById('valuation-factors');

// Contenedor donde se mostrarán las estadísticas generales del sistema.
const statsContainer = document.getElementById('stats-container');


// Botón para cambiar el tema de la aplicación (modo claro/oscuro).
const themeToggleBtn = document.getElementById('theme-toggle');

// Botón que permite copiar información (por ejemplo, datos de la app).
const copyDataBtn = document.getElementById('copy-btn');

// Botón que permite mostrar u ocultar la lista de factores de valuación.
const toggleItemsBtn = document.getElementById('toggle-items');


// Elemento principal del mensaje emergente (toast).
// Sirve para mostrar notificaciones temporales al usuario.
const toast = document.getElementById('toast');

// Elemento donde se insertará el mensaje del toast.
// Aquí se cambia el texto según la acción realizada.
const toastMessage = document.getElementById('toast-message');

// ============================================
// TODO 3: Renderizar información básica
// ============================================

// Se crea una función llamada renderBasicInfo.
// Es una función flecha (arrow function).
// Su objetivo es mostrar en pantalla la información básica
// de la aplicación usando los datos del objeto entityData.
const renderBasicInfo = () => {

  // Aquí se usa "desestructuración" para extraer directamente
  // las propiedades del objeto entityData.
  // Esto permite trabajar con las variables sin tener que escribir
  // entityData.name, entityData.description, etc.

  const {
    name,          // Nombre de la aplicación
    description,   // Descripción de la aplicación
    identifier,    // Código identificador
    isActive,      // Estado de la aplicación (true o false)

    // También se desestructura el objeto contact
    // para obtener email, phone y location directamente.
    contact: { email, phone, location }

  } = entityData;


  // Se asigna el nombre al elemento del HTML.
  // textContent cambia el texto interno del elemento.
  appName.textContent = name;

  // Se muestra la descripción en la interfaz.
  appDescription.textContent = description;

  // Se muestra el código del proyecto usando template string.
  // `${identifier}` inserta el valor dinámicamente.
  appCode.textContent = `Code: ${identifier}`;

  // Se usa un operador ternario para mostrar el estado.
  // Si isActive es true → muestra "Active"
  // Si es false → muestra "Inactive"
  appStatus.textContent = isActive ? 'Status: Active' : 'Status: Inactive';


  // Se muestran los datos de contacto en pantalla.
  // También se usan template strings para formatear el texto.
  contactEmail.textContent = `Email: ${email}`;
  contactPhone.textContent = `Phone: ${phone}`;
  contactLocation.textContent = `Location: ${location}`;
};

// ============================================
// TODO 4: Renderizar factores de valuación
// ============================================

// Constante que define cuántos items se mostrarán inicialmente.
// En este caso solo se mostrarán 3 factores al cargar la página.
const ITEMS_VISIBLE = 3;

// Variable que controla si se muestran todos los items o solo algunos.
// Empieza en false, o sea que inicialmente NO se muestran todos.
let showingAllItems = false;


// Función que se encarga de renderizar (mostrar en pantalla)
// los factores de valuación.
const renderItems = () => {

  // Se extrae el arreglo "items" del objeto entityData
  // usando desestructuración.
  const { items } = entityData;


  // Aquí se decide qué elementos se van a mostrar.
  // Si showingAllItems es true → muestra todos los items.
  // Si es false → solo muestra los primeros 3 usando slice().
  const itemsToShow = showingAllItems
    ? items
    : items.slice(0, ITEMS_VISIBLE);


  // Se genera el HTML dinámicamente.
  // innerHTML reemplaza el contenido del contenedor.
  // map() recorre cada item y crea una estructura HTML por cada uno.
  itemsList.innerHTML = itemsToShow
    .map(({ name, level }) => `
      <div class="item">
        <div class="item-name">${name}</div>

        <div class="item-level">
          <span>${level}%</span>

          <div class="level-bar">
            <!-- Barra visual que representa el porcentaje -->
            <div class="level-fill" style="width: ${level}%"></div>
          </div>

        </div>
      </div>
    `)
    // join('') une todos los elementos generados en un solo string.
    .join('');


  // Cambia el texto del botón dependiendo del estado.
  // Si se están mostrando todos → dice "Mostrar menos".
  // Si no → dice "Mostrar más".
  toggleItemsBtn.textContent = showingAllItems
    ? 'Mostrar menos'
    : 'Mostrar más';
};

// ============================================
// TODO 5: Renderizar enlaces
// ============================================

// Función que renderiza (muestra en pantalla) los enlaces
// que están guardados en entityData.links.
const renderLinks = () => {

  // Se modifica el contenido interno del contenedor de enlaces.
  // innerHTML reemplaza todo lo que haya dentro.
  linksContainer.innerHTML = entityData.links

    // map() recorre cada objeto dentro del arreglo "links".
    // Se usa desestructuración para obtener platform, url e icon.
    .map(({ platform, url, icon }) => `

      <!-- Se crea un enlace (<a>) dinámicamente -->
      <a href="${url}" target="_blank" class="app-link">

        <!-- Se muestra el icono (emoji) -->
        <span>${icon}</span>

        <!-- Se muestra el nombre de la plataforma -->
        <span>${platform}</span>

      </a>
    `)

    // join('') une todos los enlaces generados
    // en un solo string para insertarlo en el HTML.
    .join('');
};


// ============================================
// TODO 6: Renderizar estadísticas
// ============================================

// Función que se encarga de renderizar (mostrar en pantalla)
// las estadísticas principales de la aplicación.
const renderStats = () => {

  // Se extrae el objeto "stats" desde entityData
  // usando desestructuración.
  const { stats } = entityData;


  // Se crea un nuevo arreglo llamado statsData.
  // Aquí se organizan los datos en formato más fácil
  // para recorrerlos y mostrarlos en pantalla.
  const statsData = [

    // Cada objeto tiene:
    // label → texto descriptivo
    // value → valor numérico o dato a mostrar

    { label: 'Inmuebles Registrados', value: stats.totalProperties },
    { label: 'Valuaciones Activas', value: stats.activeValuations },

    // Aquí se usa template string para agregar el símbolo $
    { label: 'Valor Promedio', value: `$${stats.averageValue}` },

    { label: 'Calificación', value: stats.rating }
  ];


  // Se inserta el contenido generado dentro del contenedor.
  // map() recorre cada estadística y crea su estructura HTML.
  statsContainer.innerHTML = statsData
    .map(({ label, value }) => `
      
      <div class="stat-item">
        <!-- Muestra el valor principal -->
        <span class="stat-value">${value}</span>

        <!-- Muestra la etiqueta descriptiva -->
        <span class="stat-label">${label}</span>
      </div>

    `)

    // join('') une todo el HTML generado en un solo string.
    .join('');
};


// ============================================
// TODO 7: Dark / Light Mode
// ============================================

// Función que cambia el tema de la aplicación
// entre modo claro (light) y modo oscuro (dark).
const toggleTheme = () => {

  // Se obtiene el tema actual desde el atributo data-theme
  // del elemento raíz del documento (<html>).
  const currentTheme = document.documentElement.dataset.theme;

  // Se define el nuevo tema:
  // Si el actual es 'dark' → cambia a 'light'
  // Si no → cambia a 'dark'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Se actualiza el atributo data-theme en el <html>.
  // Esto normalmente activa estilos CSS diferentes.
  document.documentElement.dataset.theme = newTheme;

  // Se cambia el icono del botón según el tema actual.
  // Si está en modo oscuro → muestra ☀️ (para cambiar a claro)
  // Si está en modo claro → muestra 🌙 (para cambiar a oscuro)
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';

  // Se guarda el tema seleccionado en el navegador
  // usando localStorage para que no se pierda al recargar la página.
  localStorage.setItem('theme', newTheme);
};



// Función que carga el tema guardado cuando se abre la página.
const loadTheme = () => {

  // Se intenta obtener el tema guardado en localStorage.
  // Si no existe ninguno, por defecto usa 'light'.
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Se aplica el tema guardado al documento.
  document.documentElement.dataset.theme = savedTheme;

  // Se actualiza el icono del botón según el tema guardado.
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Copiar información
// ============================================

// Función que copia información básica de la aplicación
// al portapapeles del usuario.
const copyInfo = () => {

  // Se extraen datos del objeto entityData usando desestructuración.
  // Se obtienen el nombre, descripción y datos de contacto.
  const {
    name,
    description,
    contact: { email, phone, location }
  } = entityData;


  // Se construye un texto con la información que se va a copiar.
  // Se usan template strings para insertar los valores dinámicamente.
  const text = `
App: ${name}
Descripción: ${description}
Email: ${email}
Teléfono: ${phone}
Ubicación: ${location}
  `.trim(); 
  // trim() elimina espacios en blanco al inicio y al final del texto.


  // Se usa la API del navegador (clipboard)
  // para copiar el texto al portapapeles.
  navigator.clipboard.writeText(text);

  // Se llama a la función showToast para mostrar
  // un mensaje emergente confirmando que se copió la información.
  showToast('¡Información copiada al portapapeles!');
};

// ============================================
// Toast
// ============================================

// Función que muestra un mensaje emergente (toast)
// Recibe como parámetro el mensaje que se quiere mostrar.
const showToast = message => {

  // Se cambia el texto interno del elemento del toast
  // por el mensaje recibido.
  toastMessage.textContent = message;

  // Se agrega la clase 'show' al toast.
  // Esta clase normalmente activa una animación o lo hace visible con CSS.
  toast.classList.add('show');


  // setTimeout ejecuta una función después de cierto tiempo.
  // Aquí espera 3000 milisegundos (3 segundos).
  setTimeout(() => {

    // Después de 3 segundos, se elimina la clase 'show'.
    // Esto hace que el toast desaparezca visualmente.
    toast.classList.remove('show');

  }, 3000);
};

// ============================================
// TODO 9: Mostrar más / menos
// ============================================

// Función que se ejecuta cuando el usuario presiona
// el botón de "Mostrar más / Mostrar menos".
const handleToggleItems = () => {

  // Se cambia el valor de showingAllItems.
  // Si era true pasa a false.
  // Si era false pasa a true.
  showingAllItems = !showingAllItems;

  // Se vuelve a renderizar la lista de items
  // para que se actualice lo que se muestra en pantalla.
  renderItems();
};


// ============================================
// TODO 10: Event listeners
// ============================================

// Se agrega un evento al botón de cambiar tema.
// Cuando el usuario haga clic, se ejecuta toggleTheme.
themeToggleBtn.addEventListener('click', toggleTheme);

// Evento para el botón de copiar información.
// Al hacer clic se ejecuta copyInfo.
copyDataBtn.addEventListener('click', copyInfo);

// Evento para el botón de mostrar más/menos factores.
// Ejecuta la función handleToggleItems.
toggleItemsBtn.addEventListener('click', handleToggleItems);


// ============================================
// TODO 11: Inicializar app
// ============================================

// Función que se encarga de iniciar toda la aplicación.
const init = () => {

  // Carga el tema guardado en el navegador.
  loadTheme();

  // Muestra la información básica en pantalla.
  renderBasicInfo();

  // Renderiza los factores de valuación.
  renderItems();

  // Renderiza los enlaces (Website, GitHub).
  renderLinks();

  // Renderiza las estadísticas del sistema.
  renderStats();

  // Mensaje en consola para confirmar que todo cargó bien.
  console.log('✅ Aplicación de valuación de inmuebles inicializada correctamente');
};


// Se llama la función init para que la app se ejecute
// apenas cargue el archivo JavaScript.
init();
