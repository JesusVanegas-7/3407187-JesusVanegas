🏠 Real Estate Valuation App

Aplicación web desarrollada en JavaScript para gestionar inmuebles y estimaciones de valoración.
Permite crear, editar, eliminar y filtrar propiedades, manteniendo los datos persistentes mediante localStorage.

📌 Descripción del proyecto

Este proyecto consiste en una aplicación tipo gestor (CRUD) adaptada al dominio de valuación de inmuebles.

Cada inmueble contiene información relevante como:

Nombre de la propiedad

Ubicación

Precio estimado

Categoría

Prioridad

Estado (activo / inactivo)

La aplicación permite administrar estos registros de forma dinámica sin recargar la página.

⚙️ Funcionalidades implementadas
✅ CRUD completo

Crear nuevos inmuebles

Editar propiedades existentes

Eliminar inmuebles

Marcar como activo/inactivo

Las operaciones están construidas usando:

map() para actualizar elementos

filter() para eliminar

find() para buscar

reduce() para estadísticas

Nunca se muta directamente el estado, siempre se generan nuevas copias usando spread operator.

✅ Persistencia de datos

Se implementó almacenamiento local usando:

localStorage.setItem()
localStorage.getItem()


Esto permite que los inmuebles se mantengan incluso al recargar la página.

✅ Sistema de filtros dinámicos

Se pueden filtrar los inmuebles por:

Estado

Categoría

Prioridad

Búsqueda en tiempo real

Cada cambio ejecuta handleFilterChange() y vuelve a renderizar la lista aplicando los filtros actuales.

✅ Renderizado dinámico

Se implementó:

renderItem() → genera el HTML individual

renderItems() → genera la lista completa usando map().join("")

renderStats() → muestra estadísticas dinámicas

Se utilizaron template literals para todo el HTML generado dinámicamente.

✅ Event Delegation

Para manejar botones de editar, eliminar y checkbox, se utilizó delegación de eventos:

document.getElementById('item-list').addEventListener('click', e => {


Esto mejora el rendimiento y evita agregar listeners individuales por cada elemento.

✅ Inicialización controlada

La aplicación se inicializa mediante:

document.addEventListener('DOMContentLoaded', init);


El método init():

Carga datos desde localStorage

Renderiza la lista inicial

Renderiza estadísticas

Adjunta event listeners

Muestra mensaje en consola

🧠 Buenas prácticas aplicadas

Uso de funciones puras

No mutación directa del estado

Spread operator

Default parameters

Destructuring

Template literals

Nomenclatura técnica en inglés

Comentarios explicativos en español

🏗 Estructura lógica

La aplicación sigue esta estructura:

Configuración del dominio (categorías y prioridades)

Funciones de utilidad

CRUD

Renderizado

Filtros

Event Listeners

Inicialización

🎯 Conclusión

Esta implementación demuestra el manejo de:

Manipulación avanzada de arrays

Gestión del estado

Interacción con el DOM

Persistencia de datos

Organización modular del código

La aplicación está completamente adaptada al dominio de valuación de inmuebles y cumple con todos los requisitos técnicos solicitados.