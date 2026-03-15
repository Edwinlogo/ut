/* ============================================================
   APP.JS — Lógica Principal del Horario Académico
   ============================================================
   Este archivo maneja TODA la interactividad del sitio:
     1. Renderizado dinámico (vistas diaria y semanal)
     2. Drawer (menú lateral)
     3. Toggle de tema claro/oscuro
     4. Cambio de vista (diaria ↔ semanal)
     5. Tabs de días (lunes a viernes)
     6. Modal de detalle de materia
     7. Lightbox de fotos de docentes
     8. Atajos de teclado (Escape)
   
   Depende de: data.js (debe cargarse ANTES de este archivo)
   ============================================================ */


/* ──────────────────────────────────────────────────────────────
   INICIALIZACIÓN
   Se ejecuta cuando el DOM termina de cargar.
   Genera todo el contenido dinámicamente desde SCHEDULE_DATA.
   ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  renderStats();       // Renderiza las tarjetas de estadísticas
  renderDrawerLinks(); // Renderiza los enlaces del menú drawer
  renderDailyView();   // Genera las tarjetas por día
  renderWeeklyView();  // Genera la grilla semanal
  setupKeyboardShortcuts(); // Configura atajos de teclado
});


/* ──────────────────────────────────────────────────────────────
   1. RENDERIZADO DE ESTADÍSTICAS
   Genera las 3 tarjetas: Horas, Créditos, Materias.
   ────────────────────────────────────────────────────────────── */
function renderStats() {
  // Obtenemos el contenedor de stats desde el HTML
  const container = document.getElementById('stats-container');
  if (!container) return;

  const { hours, credits, subjects } = SCHEDULE_DATA.stats;

  // Insertamos las 3 tarjetas
  container.innerHTML = `
    <div class="stat-card"><div class="val">${hours}</div><div class="lbl">Horas</div></div>
    <div class="stat-card"><div class="val">${credits}</div><div class="lbl">Créditos</div></div>
    <div class="stat-card"><div class="val">${subjects}</div><div class="lbl">Materias</div></div>
  `;
}


/* ──────────────────────────────────────────────────────────────
   2. RENDERIZADO DE ENLACES DEL DRAWER
   Genera los links de WhatsApp, Drive, Academusoft, etc.
   ────────────────────────────────────────────────────────────── */
function renderDrawerLinks() {
  const container = document.getElementById('drawer-links');
  if (!container) return;

  // Para cada enlace en los datos, creamos un <a> con ícono y texto
  let html = '';
  SCHEDULE_DATA.links.forEach(function(link) {
    html += `
      <a class="drawer-item" href="${link.url}" target="_blank">
        <div class="di-icon ${link.iconBg}">
          <img src="${link.iconImg}" style="width:22px;height:22px;object-fit:contain;" alt="">
        </div>
        <div class="di-text">
          ${link.label}
          <small>${link.sub}</small>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;
}


/* ──────────────────────────────────────────────────────────────
   3. RENDERIZADO DE VISTA DIARIA
   Para cada día, genera las tarjetas de clase correspondientes.
   ────────────────────────────────────────────────────────────── */
function renderDailyView() {
  const container = document.getElementById('daily-cards');
  if (!container) return;

  // Recorremos cada día de la semana
  SCHEDULE_DATA.days.forEach(function(day, index) {
    // Creamos el contenedor del día
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-view' + (index === 0 ? ' active' : ''); // El primer día está activo
    dayDiv.id = day.id;

    // Buscamos todas las materias que caen en este día
    let cardsHtml = '';
    SCHEDULE_DATA.subjects.forEach(function(subject) {
      subject.schedule.forEach(function(sched) {
        if (sched.day === day.id) {
          cardsHtml += buildClassCard(subject, sched);
        }
      });
    });

    dayDiv.innerHTML = cardsHtml;
    container.appendChild(dayDiv);
  });
}


/**
 * Construye el HTML de una tarjeta de clase para la vista diaria.
 * 
 * @param {Object} subject - Datos de la materia (de SCHEDULE_DATA.subjects)
 * @param {Object} sched   - Datos del bloque horario específico
 * @returns {string} HTML de la tarjeta
 */
function buildClassCard(subject, sched) {
  const teacher = subject.teacher;

  // Foto del docente o avatar por defecto
  let photoHtml;
  if (teacher.photo) {
    // Si hay foto: imagen clickeable que abre el lightbox
    photoHtml = `
      <img class="teacher-photo" src="${teacher.photo}"
        alt="${teacher.name}"
        onclick="openLightbox('${teacher.photo}','${teacher.name}')"
        onerror="this.outerHTML='<div class=\\'teacher-avatar\\'>👤</div>'">
    `;
  } else {
    // Sin foto: avatar con emoji
    photoHtml = `<div class="teacher-avatar">👤</div>`;
  }

  // Email o texto "no encontrado"
  let emailHtml;
  if (teacher.email) {
    emailHtml = `✉️ <a href="mailto:${teacher.email}">${teacher.email}</a>`;
  } else {
    emailHtml = `<span class="no-mail">✉️ mail no encontrado</span>`;
  }

  // Enlaces rápidos de la materia (WhatsApp y/o Drive)
  let linksHtml = '';
  if (subject.whatsapp || subject.drive) {
    linksHtml = '<div class="class-links">';
    if (subject.whatsapp) {
      linksHtml += `<a href="${subject.whatsapp}" target="_blank" class="class-link class-link-wa"><img src="https://cdn-icons-png.flaticon.com/256/2111/2111728.png" class="link-icon" alt=""> Grupo WhatsApp</a>`;
    }
    if (subject.drive) {
      linksHtml += `<a href="${subject.drive}" target="_blank" class="class-link class-link-drive"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968523.png" class="link-icon" alt=""> Carpeta Drive</a>`;
    }
    linksHtml += '</div>';
  }

  // Armamos la tarjeta completa
  return `
    <div class="class-card ${subject.color}">
      <div class="class-time">🕘 ${sched.time}</div>
      <div class="class-name">${subject.name}</div>
      <div class="class-meta-row">
        <span>📍 ${sched.room}</span>
        <span>🔢 ${subject.group} · Cód. ${subject.code}</span>
      </div>
      <div class="teacher-row">
        ${photoHtml}
        <div class="teacher-info">
          <strong>${teacher.name}</strong>
          ${emailHtml}
        </div>
      </div>
      <span class="badge">${sched.sede}</span>
      ${linksHtml}
    </div>
  `;
}


/* ──────────────────────────────────────────────────────────────
   4. RENDERIZADO DE VISTA SEMANAL (GRILLA)
   Genera la tabla de 6 columnas × N filas con los pills.
   ────────────────────────────────────────────────────────────── */
function renderWeeklyView() {
  const container = document.getElementById('weekly-grid');
  if (!container) return;

  let html = '';

  // --- Encabezados: "Hora" + los 5 días ---
  html += '<div class="wg-header">Hora</div>';
  SCHEDULE_DATA.days.forEach(function(day) {
    html += `<div class="wg-header">${day.label}</div>`;
  });

  // --- Filas: una por cada franja horaria ---
  SCHEDULE_DATA.timeSlots.forEach(function(slot) {
    // Celda de hora (columna izquierda)
    html += `<div class="wg-time">${slot.label}</div>`;

    // Para cada día, buscar si hay materia en esta franja
    SCHEDULE_DATA.days.forEach(function(day) {
      const match = findSubjectForSlot(day.id, slot.id);

      if (match) {
        // Hay materia → renderizar pill con datos
        html += buildWeeklyPill(match.subject, match.sched);
      } else {
        // Sin materia → celda vacía
        html += '<div class="wg-cell"></div>';
      }
    });
  });

  container.innerHTML = html;
}


/**
 * Busca qué materia se dicta en un día y franja horaria específicos.
 * 
 * @param {string} dayId  - ID del día (ej: 'lunes')
 * @param {string} slotId - ID de la franja (ej: '09-12')
 * @returns {Object|null} - { subject, sched } si hay coincidencia, o null
 */
function findSubjectForSlot(dayId, slotId) {
  for (let i = 0; i < SCHEDULE_DATA.subjects.length; i++) {
    const subject = SCHEDULE_DATA.subjects[i];
    for (let j = 0; j < subject.schedule.length; j++) {
      const sched = subject.schedule[j];
      if (sched.day === dayId && sched.slot === slotId) {
        return { subject: subject, sched: sched };
      }
    }
  }
  return null; // No hay materia en esa franja
}


/**
 * Construye el HTML de un pill para la grilla semanal.
 * 
 * @param {Object} subject - Datos de la materia
 * @param {Object} sched   - Datos del bloque horario
 * @returns {string} HTML de la celda con el pill
 */
function buildWeeklyPill(subject, sched) {
  const teacher = subject.teacher;

  // Foto del docente o emoji por defecto
  let photoHtml;
  if (teacher.photo) {
    photoHtml = `<img src="${teacher.photo}" onerror="this.outerHTML='<div class=\\'pill-ico\\'>👤</div>'" alt="">`;
  } else {
    photoHtml = '<div class="pill-ico">👤</div>';
  }

  // Al hacer clic en el pill → abre el modal con los detalles
  // Incluimos whatsapp y drive como los últimos 2 argumentos
  const onclickArgs = [
    subject.name,
    sched.time,
    sched.room,
    teacher.name,
    teacher.email,
    teacher.photo,
    subject.code,
    sched.sede,
    subject.whatsapp || '',
    subject.drive || ''
  ].map(function(arg) {
    // Escapar comillas simples para evitar romper el onclick
    return "'" + String(arg).replace(/'/g, "\\'") + "'";
  }).join(',');

  return `
    <div class="wg-cell">
      <div class="wg-pill ${subject.pillColor}" onclick="openModal(${onclickArgs})">
        ${photoHtml}
        <div class="pill-name">${subject.pillName}</div>
        <div class="pill-room">${subject.pillRoom}</div>
      </div>
    </div>
  `;
}


/* ──────────────────────────────────────────────────────────────
   5. DRAWER (MENÚ LATERAL)
   Funciones para abrir, cerrar y toggle del panel lateral.
   ────────────────────────────────────────────────────────────── */

/**
 * Alterna la visibilidad del drawer (abre si cerrado, cierra si abierto).
 */
function toggleDrawer() {
  const drawer  = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const btn     = document.getElementById('menuBtn');

  // toggle('open') devuelve true si se agregó la clase
  const isOpen = drawer.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
  btn.classList.toggle('open', isOpen);
}

/**
 * Cierra el drawer (se llama al hacer clic en el overlay).
 */
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
  document.getElementById('menuBtn').classList.remove('open');
}


/* ──────────────────────────────────────────────────────────────
   6. TOGGLE DE TEMA (CLARO / OSCURO)
   Cambia el atributo data-theme en <html> y actualiza el UI.
   ────────────────────────────────────────────────────────────── */
let isDark = true; // El tema por defecto es oscuro

function toggleTheme() {
  isDark = !isDark;

  // Cambiar el atributo data-theme que activa las variables CSS
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

  // Actualizar ícono y texto en el drawer
  document.getElementById('themeIcon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('themeLabel').textContent = isDark ? 'Activo' : 'Inactivo';

  // Actualizar el toggle visual
  document.getElementById('toggleTrack').classList.toggle('on', isDark);
}


/* ──────────────────────────────────────────────────────────────
   7. CAMBIO DE VISTA (DIARIA ↔ SEMANAL)
   Muestra una vista y oculta la otra.
   ────────────────────────────────────────────────────────────── */

/**
 * Cambia entre vista diaria y semanal.
 * 
 * @param {string}      view - 'daily' o 'weekly'
 * @param {HTMLElement}  btn  - el botón presionado
 */
function switchView(view, btn) {
  // Desactivar todos los botones de vista
  document.querySelectorAll('.view-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  // Activar el botón presionado
  btn.classList.add('active');

  // Mostrar/ocultar las vistas
  document.getElementById('daily-view').style.display  = view === 'daily'  ? 'block' : 'none';
  document.getElementById('weekly-view').style.display = view === 'weekly' ? 'block' : 'none';
}


/* ──────────────────────────────────────────────────────────────
   8. TABS DE DÍAS — Cambia el día visible en la vista diaria
   ────────────────────────────────────────────────────────────── */

/**
 * Muestra las tarjetas de un día específico.
 * 
 * @param {string}      day - ID del día (ej: 'lunes')
 * @param {HTMLElement}  btn - el tab presionado
 */
function showDay(day, btn) {
  // Ocultar todos los días
  document.querySelectorAll('.day-view').forEach(function(d) {
    d.classList.remove('active');
  });
  // Desactivar todos los tabs
  document.querySelectorAll('.tab').forEach(function(t) {
    t.classList.remove('active');
  });

  // Mostrar el día seleccionado y activar su tab
  document.getElementById(day).classList.add('active');
  btn.classList.add('active');
}


/* ──────────────────────────────────────────────────────────────
   9. MODAL — Detalle de materia
   Se abre al hacer clic en una materia de la grilla semanal.
   Muestra toda la información detallada.
   ────────────────────────────────────────────────────────────── */

/**
 * Abre el modal con los detalles de una materia.
 * 
 * @param {string} name     - Nombre de la materia
 * @param {string} time     - Horario (ej: '09:00–11:59')
 * @param {string} room     - Aula/salón
 * @param {string} teacher  - Nombre del docente
 * @param {string} email    - Email del docente
 * @param {string} photo    - URL de la foto del docente
 * @param {string} code     - Código de la materia
 * @param {string} sede     - Ubicación/sede
 * @param {string} whatsapp - URL del grupo de WhatsApp (opcional)
 * @param {string} drive    - URL de la carpeta de Drive (opcional)
 */
function openModal(name, time, room, teacher, email, photo, code, sede, whatsapp, drive) {
  // Título del modal
  document.getElementById('modal-name').textContent = name;

  // Foto o avatar del docente
  const wrap = document.getElementById('modal-photo-wrap');
  if (photo) {
    wrap.innerHTML = `<img class="modal-photo" src="${photo}" alt="${teacher}"
      onclick="openLightbox('${photo}','${teacher}')"
      onerror="this.outerHTML='<div class=\\'modal-avatar\\'>👤</div>'">`;
  } else {
    wrap.innerHTML = '<div class="modal-avatar">👤</div>';
  }

  // Email: enlace o texto "no encontrado"
  const emailHtml = email
    ? `<a href="mailto:${email}">${email}</a>`
    : '<span style="font-style:italic;color:var(--subtext)">mail no encontrado</span>';

  // Sede o aviso de "sin aula asignada"
  const sedeHtml = sede
    ? `<div class="mi">🏛️ <span>${sede}</span></div>`
    : '<div class="mi">⚠️ <span style="color:#f59e0b">Sin aula asignada</span></div>';

  // Enlaces rápidos: WhatsApp y/o Drive (solo si existen)
  let linksHtml = '';
  if (whatsapp || drive) {
    linksHtml = '<div class="modal-divider"></div><div class="modal-links">';
    if (whatsapp) {
      linksHtml += `<a href="${whatsapp}" target="_blank" class="modal-link modal-link-wa"><img src="https://cdn-icons-png.flaticon.com/256/2111/2111728.png" class="link-icon" alt=""> Grupo WhatsApp</a>`;
    }
    if (drive) {
      linksHtml += `<a href="${drive}" target="_blank" class="modal-link modal-link-drive"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968523.png" class="link-icon" alt=""> Carpeta Drive</a>`;
    }
    linksHtml += '</div>';
  }

  // Cuerpo del modal
  document.getElementById('modal-body').innerHTML = `
    <div class="mi">🕐 <span>${time}</span></div>
    <div class="mi">📍 <span>${room}</span></div>
    <div class="mi">👤 <span>${teacher}</span></div>
    <div class="mi">✉️ <span>${emailHtml}</span></div>
    <div class="mi">🔢 <span>Cód. ${code}</span></div>
    ${sedeHtml}
    ${linksHtml}
  `;

  // Mostrar el modal
  document.getElementById('modal').classList.add('show');
}


/* ──────────────────────────────────────────────────────────────
   10. LIGHTBOX — Vista ampliada de fotos
   Se abre al hacer clic en la foto de un docente.
   ────────────────────────────────────────────────────────────── */

/**
 * Abre el lightbox con la foto ampliada.
 * 
 * @param {string} src  - URL de la imagen
 * @param {string} name - Nombre del docente (se muestra debajo)
 */
function openLightbox(src, name) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-name').textContent = name;
  document.getElementById('lightbox').classList.add('show');

  // Cerrar el modal si estaba abierto (para no quedar doble overlay)
  document.getElementById('modal').classList.remove('show');
}

/**
 * Cierra el lightbox.
 */
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('show');
}


/* ──────────────────────────────────────────────────────────────
   11. ATAJOS DE TECLADO
   Escape cierra cualquier overlay abierto.
   ────────────────────────────────────────────────────────────── */
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();                                              // Cerrar lightbox
      document.getElementById('modal').classList.remove('show');     // Cerrar modal
      closeDrawer();                                                // Cerrar drawer
    }
  });
}
