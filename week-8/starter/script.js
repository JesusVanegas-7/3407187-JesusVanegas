// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// Dominio: App de Valuación de Inmuebles
// ============================================

const DOMAIN_NAME = "Valuación de Inmuebles";
const VALUE_LABEL = "inmuebles";

// ============================================
// 1. ARRAY INICIAL
// ============================================

const items = [
  { id: 1, name: "Apartamento Centro", price: 250000000, type: "apartamento", location: "Medellín", active: true },
  { id: 2, name: "Casa Laureles", price: 480000000, type: "casa", location: "Medellín", active: true },
  { id: 3, name: "Lote Envigado", price: 180000000, type: "lote", location: "Envigado", active: false },
  { id: 4, name: "Apartamento Poblado", price: 600000000, type: "apartamento", location: "Medellín", active: true },
  { id: 5, name: "Casa Bello", price: 320000000, type: "casa", location: "Bello", active: true }
];

// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================

const addItem = (newItem) => {
  items.push(newItem);
  console.log(`Agregado: ${newItem.name}`);
};

const removeLastItem = () => {
  const removed = items.pop();
  console.log(`Eliminado: ${removed?.name}`);
  return removed;
};

const addPriorityItem = (priorityItem) => {
  items.unshift(priorityItem);
  console.log(`Elemento prioritario agregado: ${priorityItem.name}`);
};

const removeByIndex = (index) => {
  const removed = items.splice(index, 1);
  console.log(`Eliminado por índice: ${removed[0]?.name}`);
};

const getActiveItems = () => {
  return items.filter(item => item.active === true);
};

const findByName = (name) => {
  return items.find(item => item.name === name);
};

const formatItem = (item) => {
  return `[${item.id}] ${item.name} — ${item.type} — $${item.price} — ${item.location} — ${item.active ? "Disponible" : "No disponible"}`;
};

// ============================================
// 3. REPORTE
// ============================================

console.log(`\n${"=".repeat(50)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(50)}\n`);

console.log(`📋 Inventario inicial (${items.length} ${VALUE_LABEL}):`);

items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Operaciones de mutación ---\n");

// Agregar nuevo inmueble
addItem({ id: 6, name: "Lote Rionegro", price: 210000000, type: "lote", location: "Rionegro", active: true });

// Agregar prioritario
addPriorityItem({ id: 0, name: "Casa Premium", price: 900000000, type: "casa", location: "El Poblado", active: true });

// Eliminar del medio
removeByIndex(2);

// Eliminar último
removeLastItem();

console.log("\n--- Inventario después de mutaciones ---\n");

items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Búsqueda y filtrado ---\n");

// Buscar por nombre
const found = findByName("Casa Laureles");
console.log("Búsqueda:", found ? formatItem(found) : "No encontrado");

// Activos
const activeItems = getActiveItems();
console.log(`Activos: ${activeItems.length}`);

// Snapshot inmutable
const snapshot = [...items, { id: 99, name: "Nuevo Proyecto", price: 700000000, type: "apartamento", location: "Sabaneta", active: true }];
console.log(`Snapshot (no modifica original): ${snapshot.length} elementos`);

console.log("\n--- Transformación con map ---\n");

// Solo nombres
const names = items.map(item => item.name);
console.log("Nombres:", names);

// Precios con aumento del 10%
const increasedPrices = items.map(item => item.price * 1.10);
console.log("Precios +10%:", increasedPrices);

console.log("\n--- Resumen final ---\n");

console.log(`Total en inventario: ${items.length} ${VALUE_LABEL}`);

const activeCount = getActiveItems().length;
console.log(`Activos: ${activeCount} | Inactivos: ${items.length - activeCount}`);

console.log(`\n${"=".repeat(50)}`);
console.log("✅ Reporte completado");
console.log(`${"=".repeat(50)}\n`);