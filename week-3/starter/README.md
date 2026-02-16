# 🏠 Sistema de Valuación Inmobiliaria - Week 3

¡Hola! En este proyecto he desarrollado una interfaz moderna, limpia y altamente funcional para el sistema de valuación inmobiliaria basado en JavaScript. El objetivo fue transformar un script de lógica pura en una aplicación web completa y profesional.

## 🚀 Características Principales

-   **Dashboard Estético**: Una interfaz inspirada en plataformas SaaS modernas, utilizando una paleta de colores profesional (Azul Royal, Grises Slate) y la tipografía 'Inter' de Google Fonts.
-   **Formulario Inteligente**: El formulario de registro adapta sus etiquetas y campos dinámicamente según el tipo de inmueble seleccionado (Casa, Apartamento o Local Comercial), mejorando significativamente la experiencia de usuario (UX).
-   **Panel de Estadísticas**: Resumen visual e inmediato del estado global del sistema (total de propiedades, activos, inactivos y usuarios).
-   **Gestión en Tiempo Real**: Capacidad para agregar, eliminar y activar/desactivar inmuebles con reflejo instantáneo en la interfaz.
-   **Búsqueda y Filtros Avanzados**: Filtrado por tipo, estado y búsqueda por nombre combinables para encontrar propiedades rápidamente.
-   **Diseño Responsive**: Layout adaptativo mediante CSS Grid y Flexbox que funciona perfectamente en dispositivos móviles, tablets y escritorio.

## 🛠️ Tecnologías Utilizadas

-   **HTML5**: Estructura semántica clara y organizada.
-   **CSS3 (Moderno)**: Uso extensivo de Variables CSS (Custom Properties) para consistencia, además de Grid Layout y Flexbox.
-   **JavaScript (ES2023)**: Implementación basada en clases, campos privados, métodos modernos de arrays y manipulación dinámica del DOM.
-   **Google Fonts**: Integración de la fuente 'Inter' para una legibilidad superior.

## 📝 Detalles Técnicos de la Implementación

Para asegurar que el sistema funcionara correctamente con la nueva interfaz, realicé los siguientes ajustes técnicos:

1.  **Refactorización de Referencias**: Ajusté el `script.js` original para elevar el scope de las referencias al DOM, permitiendo que las funciones de renderizado y lógica de negocio accedan correctamente a los elementos de la interfaz.
2.  **Lógica de Etiquetas Dinámicas**: Implementé un pequeño script auxiliar en el HTML que detecta cambios en el selector de tipo de inmueble. Esto permite que el campo `extra1` cambie entre "Habitaciones", "Piso" o "Tipo de Negocio" automáticamente.
3.  **Sistema de Estados**: Las tarjetas de inmuebles cambian visualmente su estilo (opacidad y escala de grises) cuando se desactivan, proporcionando feedback visual claro sobre su estado.
4.  **Validación Robusta**: Se mantuvieron y reforzaron las validaciones de las clases originales para asegurar que no se ingresen datos inconsistentes desde la UI.

## 💻 Cómo Ejecutar

No se necesitan dependencias externas ni compilación. Simplemente abre el archivo:

`week-3/starter/index.html`

en tu navegador favorito.

---
*Desarrollado con ❤️ para una experiencia inmobiliaria superior.*
