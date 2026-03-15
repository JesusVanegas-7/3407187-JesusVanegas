// ============================================
// PROYECTO SEMANA 02: Ficha de Datos del Dominio
// Dominio: App de Valuación de Inmuebles
// ============================================

// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

// Nombre del dominio
const DOMAIN_NAME = "App de Valuación de Inmuebles";

// Nombre del inmueble
const itemName = "Apartamento Mirador del Norte";

// Categoría del inmueble
const itemCategory = "Apartamento Residencial";

// Valor estimado del inmueble (en pesos colombianos)
const itemQuantity = 320000000;

// Boolean indicando si está disponible para venta
const isItemAvailable = true;

// Valor pendiente: avalúo oficial aún no asignado
const pendingAppraisal = null;


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================
console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
console.log("");

console.log(`Nombre:       ${itemName}`);
console.log(`Categoría:    ${itemCategory}`);
console.log(`Valor avalúo: ${itemQuantity}`);
console.log(`Disponible:   ${isItemAvailable}`);

console.log("");


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS CON typeof
// ============================================
console.log("--- Tipos de datos ---");

console.log("typeof itemName:      ", typeof itemName);
console.log("typeof itemQuantity:  ", typeof itemQuantity);
console.log("typeof isItemAvailable:", typeof isItemAvailable);

console.log("");


// ============================================
// SECCIÓN 4: CONVERSIONES EXPLÍCITAS
// ============================================
console.log("--- Conversiones ---");

// Convertir número a texto para mostrarlo formateado
const priceAsText = String(itemQuantity);

console.log("Valor como texto:", priceAsText);
console.log("typeof (convertido):", typeof priceAsText);

console.log("");


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================
console.log("--- Valor nulo ---");

console.log("Avalúo pendiente:", pendingAppraisal);
console.log("typeof null:", typeof pendingAppraisal);
console.log("¿Es null?:", pendingAppraisal === null);

console.log("");


// ============================================
// CIERRE
// ============================================
console.log("===========================");
console.log("FIN DE FICHA");
console.log("===========================");