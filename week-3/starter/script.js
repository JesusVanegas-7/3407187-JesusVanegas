// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// Dominio: App de Valuación de Inmuebles
// ============================================


// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// Valor base del inmueble
const PROPERTY_VALUE = 350000000; // valor en pesos

// Porcentaje de comisión de la inmobiliaria
const COMMISSION_RATE = 0.03; // 3%

// Porcentaje de valorización anual estimada
const APPRECIATION_RATE = 0.08; // 8%

// Número de inmuebles evaluados en el día
const PROPERTIES_EVALUATED = 5;


// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

// cálculo de comisión
const commissionValue = PROPERTY_VALUE * COMMISSION_RATE;
console.log("Comisión por venta:", commissionValue);

// valor estimado después de valorización
const appreciatedValue = PROPERTY_VALUE * (1 + APPRECIATION_RATE);
console.log("Valor con valorización:", appreciatedValue);

// valor promedio de inmuebles evaluados
const averageValue = PROPERTY_VALUE / PROPERTIES_EVALUATED;
console.log("Valor promedio evaluado:", averageValue);

// potencia para proyección a 2 años
const valueInTwoYears = PROPERTY_VALUE * (1 + APPRECIATION_RATE) ** 2;
console.log("Valor estimado en 2 años:", valueInTwoYears);

console.log("");


// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

let totalCommissions = 0;

console.log("Comisiones iniciales:", totalCommissions);

totalCommissions += commissionValue;
console.log("Tras primera venta:", totalCommissions);

totalCommissions += commissionValue;
console.log("Tras segunda venta:", totalCommissions);

totalCommissions *= 0.95; // descuento del 5% por promoción
console.log("Con descuento aplicado:", totalCommissions);

console.log("");


// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

const MINIMUM_LUXURY_PRICE = 500000000;

const isLuxuryProperty = PROPERTY_VALUE >= MINIMUM_LUXURY_PRICE;
console.log("¿Es inmueble de lujo?", isLuxuryProperty);

const exactMatchPrice = PROPERTY_VALUE === 350000000;
console.log("¿Coincide exactamente con el valor esperado?", exactMatchPrice);

console.log("");


// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

const isAvailable = true;
const isHighValue = PROPERTY_VALUE > 300000000;

// condición con &&
const isPremiumListing = isAvailable && isHighValue;
console.log("¿Es propiedad premium?", isPremiumListing);

// condición con ||
const qualifiesForPromotion = isLuxuryProperty || isHighValue;
console.log("¿Aplica para promoción?", qualifiesForPromotion);

// negación
console.log("¿No está disponible?", !isAvailable);

console.log("");


// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

console.log("Valor del inmueble:", PROPERTY_VALUE);
console.log("Comisión estimada:", commissionValue);
console.log("Valor con valorización:", appreciatedValue);
console.log("Valor proyectado en 2 años:", valueInTwoYears);
console.log("Total comisiones acumuladas:", totalCommissions);

console.log("");