// ============================================
// PROYECTO SEMANA 05: Clasificador
// Dominio: App de Valuación de Inmuebles
// ============================================

// ============================================
// SECCIÓN 1: Datos del inmueble
// ============================================

const elementName = "Apartamento Medellín";   // nombre del inmueble
const elementStatus = "active";               // estado (disponible o no)
const elementValue = 350000000;               // valor en pesos
const elementType = "apartment";              // tipo de inmueble
const elementInfo = {                         // info adicional
  location: "Medellín",
  detail: "3 habitaciones, 2 baños",
  area: 85
};

// ============================================
// SECCIÓN 2: Clasificación con if / else
// ============================================

let classification;

if (elementValue >= 500000000) {
  classification = "Alto valor 💎";
} else if (elementValue >= 200000000) {
  classification = "Valor medio 🏠";
} else {
  classification = "Bajo valor 💰";
}

// ============================================
// SECCIÓN 3: Estado con ternario
// ============================================

const statusLabel = elementStatus === "active" ? "Disponible ✅" : "No disponible ❌";

// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

let typeLabel;

switch (elementType) {
  case "house":
    typeLabel = "Casa";
    break;
  case "apartment":
    typeLabel = "Apartamento";
    break;
  case "land":
    typeLabel = "Lote";
    break;
  default:
    typeLabel = "Tipo desconocido";
}

// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

const displayName = elementName ?? "Sin nombre";
const infoDetail = elementInfo?.detail ?? "Sin información adicional";

// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

const safeProperty = elementInfo?.location ?? "Ubicación no especificada";

// ============================================
// SECCIÓN 7: Ficha de salida
// ============================================

console.log("=".repeat(40));
console.log("FICHA DE CLASIFICACIÓN");
console.log("=".repeat(40));
console.log(`Nombre: ${displayName}`);
console.log(`Estado: ${statusLabel}`);
console.log(`Clasificación: ${classification}`);
console.log(`Tipo: ${typeLabel}`);
console.log(`Detalle: ${infoDetail}`);
console.log(`Ubicación: ${safeProperty}`);
console.log("=".repeat(40));