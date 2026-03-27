"use strict";

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

const DOMAIN_NAME = "App de Valuación de Inmuebles";
const VALUE_LABEL = "precio";
const CURRENCY = "COP";

const items = [
  { id: 1, name: "Apartamento Centro", category: "apartamento", value: 250000000, active: true },
  { id: 2, name: "Casa Laureles", category: "casa", value: 480000000, active: true },
  { id: 3, name: "Lote Envigado", category: "lote", value: 180000000, active: false },
  { id: 4, name: "Apartamento Poblado", category: "apartamento", value: 600000000, active: true },
  { id: 5, name: "Casa Bello", category: "casa", value: 320000000, active: true }
];

// ============================================
// SECCIÓN 2: Función de formato
// ============================================

const formatItem = (item) => {
  return `🏠 ${item.name} [${item.category}] — ${CURRENCY} ${item.value}`;
};

// ============================================
// SECCIÓN 3: Función de cálculo (pura)
// ============================================

// Simula un ajuste de precio (ej: valorización)
const calculateValue = (baseValue, factor = 1) => {
  return baseValue * factor;
};

// ============================================
// SECCIÓN 4: Función de validación
// ============================================

// Solo inmuebles disponibles
const isValid = (item) => {
  return item.active === true;
};

// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

const formatWithDefault = (value, label = VALUE_LABEL, currency = CURRENCY) => {
  return `${label}: ${currency} ${value}`;
};

// ============================================
// SECCIÓN 6: Reporte usando funciones
// ============================================

console.log(`\n${"═".repeat(45)}`);
console.log(`   REPORTE — ${DOMAIN_NAME}`);
console.log(`${"═".repeat(45)}`);

if (items.length === 0) {
  console.log("\n⚠️  No hay elementos.");
} else {

  // --- Listado ---
  console.log("\n📋 Listado:");
  let lineNumber = 1;
  for (const item of items) {
    console.log(`  ${lineNumber}. ${formatItem(item)}`);
    lineNumber++;
  }

  // --- Validación ---
  let validCount = 0;
  for (const item of items) {
    if (isValid(item)) {
      validCount++;
    }
  }
  console.log(`\n✅ Elementos válidos: ${validCount} / ${items.length}`);

  // --- Cálculo ---
  let totalValue = 0;
  for (const item of items) {
    totalValue += calculateValue(item.value ?? 0);
  }

  console.log(formatWithDefault(totalValue, `Total ${VALUE_LABEL}`));
}

console.log(`\n${"═".repeat(45)}\n`);