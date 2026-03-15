// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// Dominio: App de Valuación de Inmuebles
// ============================================


// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// Nombre del dominio
const DOMAIN_NAME = "App de Valuación de Inmuebles";

// Nombre del inmueble (con espacios para usar trim)
const rawEntityName = "  Apartamento Mirador del Norte  ";

// Categoría del inmueble
const entityCategory = "Apartamento Residencial";

// Código del inmueble
const entityCode = "INM-001";

// Descripción del inmueble
const entityDescription = "Inmueble residencial evaluado para estimar su valor comercial dentro del sistema de valuación inmobiliaria.";

// Valor estimado del inmueble
const mainValue = 420000000;

// Estado del inmueble
const isActive = true;


// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================

// limpiar nombre
const entityName = rawEntityName.trim();

// nombre en mayúsculas
const entityNameUpper = entityName.toUpperCase();

// nombre en minúsculas
const entityNameLower = entityName.toLowerCase();

// prefijo del código
const codePrefix = entityCode.slice(0, 3);


// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

// validar prefijo
const hasValidPrefix = entityCode.startsWith(codePrefix);

// verificar palabra clave
const descriptionIsRelevant = entityDescription.includes("valor");

// validar sufijo
const hasValidSuffix = entityCode.endsWith("001");


// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(45);
const subSeparator = "-".repeat(45);

const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()} — FICHA DE INMUEBLE
${separator}
Nombre:      ${entityNameUpper}
Categoría:   ${entityCategory}
Código:      ${entityCode}
Prefijo:     ${codePrefix}
Valor:       ${mainValue}
Estado:      ${isActive ? "Activo" : "Inactivo"}

${subSeparator}
Descripción:
${entityDescription}
${separator}
`;

console.log(mainCard);


// ============================================
// SECCIÓN 5: Validaciones
// ============================================

console.log("--- Validaciones ---");

console.log(`¿Código empieza con '${codePrefix}'?: ${hasValidPrefix}`);
console.log(`¿Descripción contiene 'valor'?: ${descriptionIsRelevant}`);
console.log(`¿Código termina con '001'?: ${hasValidSuffix}`);

console.log("");


// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación ---");

const notification = `📢 Nuevo inmueble registrado: ${entityName} (${entityCode})`;

console.log(notification);
console.log("");