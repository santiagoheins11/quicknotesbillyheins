# 📝 Quick Notes v2 — Extensión de navegador

Extensión para Chrome/Opera que permite tomar, guardar y gestionar notas rápidas directamente desde el navegador, sin salir de la página que estás visitando.

## 🚀 Funcionalidades

- ✍️ Escribir y guardar notas con un clic o con **Ctrl+Enter**
- 🏷️ Categorías con colores: General, Trabajo, Estudio, Urgente
- 🔍 Buscar notas en tiempo real
- 🗂️ Filtrar notas por categoría
- 📊 Contador de notas por categoría
- 📤 Exportar todas las notas a un archivo `.txt`
- 🗑️ Eliminar notas individuales o limpiar todo
- 💾 Persistencia: las notas se conservan al cerrar y reabrir el navegador
- ✅ Validación: no permite guardar notas vacías

## 📁 Estructura del proyecto

```
quick-notes/
├── manifest.json   # Configuración de la extensión (Manifest V3, v1.1)
├── popup.html      # Estructura de la interfaz
├── popup.css       # Estilos visuales y colores por categoría
├── popup.js        # Lógica y funcionalidades
└── README.md       # Documentación e instrucciones
```

## 🛠️ Instalación

1. Descarga o clona este repositorio:
   ```
   https://github.com/santiagoheins11/quicknotesbillyheins
   ```
2. Abre tu navegador:
   - **Chrome:** escribe `chrome://extensions` en la barra
   - **Opera:** escribe `opera://extensions` en la barra
3. Activa el **Modo desarrollador** (interruptor arriba a la derecha)
4. Haz clic en:
   - Chrome → **"Cargar descomprimida"**
   - Opera → **"Cargar extensión sin empaquetar"**
5. Selecciona la carpeta `quick-notes` (la que contiene `manifest.json`)
6. ¡Listo! Aparece el ícono en la barra del navegador

> ⚠️ **Importante:** No muevas ni elimines la carpeta después de instalar.
> La extensión lee los archivos desde esa ubicación cada vez que se abre.

## 🔄 Cómo actualizar la extensión

Si descargaste una nueva versión o hiciste cambios en los archivos:

1. Reemplaza los archivos de tu carpeta `quick-notes` con los nuevos
2. Abre `chrome://extensions` o `opera://extensions`
3. Busca **Quick Notes** en la lista
4. Haz clic en el botón de **recarga** 🔄
5. Cierra y vuelve a abrir el popup — los cambios ya están aplicados

> 💡 **Tip:** Para que la recarga funcione, Opera/Chrome debe estar apuntando
> a la misma carpeta donde están los archivos actualizados. Verifica en
> **Detalles → Origen** dentro de la página de extensiones.
>
> Si instalaste desde una carpeta y luego modificaste otra, desinstala
> y vuelve a cargar desde la carpeta correcta.

## 🎨 Categorías disponibles

| Categoría | Color | Uso sugerido |
|-----------|-------|--------------|
| 📌 General | `#7c6af7` púrpura | Notas sin clasificar |
| 💼 Trabajo | `#3b82f6` azul | Tareas laborales |
| 📚 Estudio | `#10b981` verde | Apuntes académicos |
| ⚡ Urgente | `#ef4444` rojo | Prioridad alta |

## 💻 Tecnologías

- HTML5 · CSS3 · JavaScript Vanilla
- Chrome Extensions API (Manifest V3)
- `chrome.storage.local` — persistencia de datos
- `Blob + URL.createObjectURL()` — exportación a TXT
- Sin dependencias externas — funciona 100% offline

## 🤖 Desarrollado con IA

- **Claude (Anthropic)** — arquitectura, prompts y resolución de errores
- **Cursor (agente IA)** — generación y refactorización del código

## 📄 Licencia

MIT — libre para usar, modificar y distribuir.
