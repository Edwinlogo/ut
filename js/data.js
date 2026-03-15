/* ============================================================
   DATA.JS — Datos del Horario Académico
   ============================================================
   Este archivo contiene TODA la información del horario:
   - Materias y sus datos
   - Horarios por día
   - Información de docentes
   
   Para modificar el horario, solo edita este archivo.
   No necesitas tocar index.html ni app.js.
   ============================================================ */


/**
 * SCHEDULE_DATA — Objeto principal con los datos del horario.
 * 
 * Estructura:
 *   subjects  → Lista de materias con info completa
 *   stats     → Estadísticas mostradas en la parte superior
 *   links     → Enlaces del menú drawer (Academusoft, WhatsApp, Drive, etc.)
 */
const SCHEDULE_DATA = {

  /* ── ESTADÍSTICAS generales del semestre ── */
  stats: {
    hours: 57,       // Horas semanales totales
    credits: 18,     // Créditos académicos
    subjects: 7      // Número de materias
  },

  /* ── LISTA DE MATERIAS ──
     Cada materia tiene:
       id        → identificador único
       name      → nombre completo
       code      → código académico
       group     → grupo/sección
       color     → clase CSS para el color (ca, cb, cc, cd, ce)
       pillColor → clase CSS para la grilla semanal (pa, pb, pc, pd, pe)
       teacher   → datos del docente
       schedule  → array de bloques horarios
  */
  subjects: [
    {
      id: 'taller1',
      name: 'Taller I',
      code: '0603088',
      group: 'Grupo 02',
      color: 'ca',          // rojo — borde izquierdo en tarjeta diaria
      pillColor: 'pa',      // rojo — pill en grilla semanal
      teacher: {
        name: 'Hernando Carvajal Morales',
        email: 'hcarvaja@ut.edu.co',
        // URL de la foto del docente (se muestra en tarjeta y modal)
        photo: 'https://facultadtecnologias.ut.edu.co/images/presentacion/Hernando_carvajal.jpg'
      },
      // Días y horarios en que se dicta esta materia
      schedule: [
        { day: 'lunes',     time: '09:00 – 11:59', room: 'Bloque 33 - TD408', sede: 'Sede Central',     slot: '09-12' },
        { day: 'miercoles', time: '09:00 – 11:59', room: 'Bloque 33 - TD408', sede: 'Sede Central',     slot: '09-12' },
        { day: 'viernes',   time: '09:00 – 11:59', room: 'Bloque 33 - TD408', sede: 'Sede Central',     slot: '09-12' }
      ],
      // Texto corto para mostrar en el pill de la grilla semanal
      pillName: 'Taller I',
      pillRoom: 'B33-TD408',
      // Enlaces específicos de la materia (WhatsApp y Drive)
      whatsapp: 'https://chat.whatsapp.com/Jdzk1sNzifV1rpILPx75VR?mode=gi_t',
      drive: 'https://drive.google.com/drive/folders/1wjYLWKjbu26sRu060xzgiVXOuFmxYnmZ'
    },

    {
      id: 'expresion1',
      name: 'Expresión I',
      code: '0603085',
      group: 'Grupo 02',
      color: 'cc',          // morado
      pillColor: 'pc',
      teacher: {
        name: 'John Alex Pinzón Rodríguez',
        email: '',           // Sin email disponible
        photo: ''            // Sin foto disponible
      },
      schedule: [
        { day: 'martes', time: '09:00 – 11:59', room: 'Bloque 33 - TD407', sede: 'Sede Central', slot: '09-12' }
      ],
      pillName: 'Expresión I',
      pillRoom: 'B33-TD407',
      whatsapp: '',
      drive: 'https://drive.google.com/drive/folders/1wZFyyKXDX2pMZ9juDPyxzT526DajHj0I'
    },

    {
      id: 'matematica',
      name: 'Matemática de lo Cotidiano',
      code: '0701777',
      group: 'Grupo Arquitectura',
      color: 'cb',          // naranja
      pillColor: 'pb',
      teacher: {
        name: 'Marcia Carolina Rodríguez Reyes',
        email: 'mrodriguezre@ut.edu.co',
        photo: ''
      },
      schedule: [
        { day: 'miercoles', time: '14:00 – 15:59', room: 'Bloque 03 - A302', sede: 'Sede Central', slot: '14-16' }
      ],
      pillName: 'Matemática',
      pillRoom: 'B03-A302',
      whatsapp: 'https://chat.whatsapp.com/H3ZbG0sfSGxKuSo0vVdcv5',
      drive: ''
    },

    {
      id: 'teoria',
      name: 'Teoría e Historia de la Arquitectura y la Ciudad',
      code: '0603087',
      group: 'Grupo 02',
      color: 'cd',          // verde
      pillColor: 'pd',
      teacher: {
        name: 'Eduardo Peñaloza Kairuz',
        email: 'epenalozak@ut.edu.co',
        photo: 'https://facultadtecnologias.ut.edu.co/images/presentacion/docentes/Eduardo_Pe%C3%B1aloza_Kairuz.png'
      },
      schedule: [
        { day: 'miercoles', time: '16:00 – 17:59', room: 'Bloque 33 – Aula 104', sede: 'Bloque 33 – 104', slot: '16-18' }
      ],
      pillName: 'Teoría e Historia',
      pillRoom: 'B33 – 104',
      whatsapp: '',
      drive: 'https://drive.google.com/drive/folders/1c9BlpcoZFT6jjxBHEWRcU6zTkBZjZbPe'
    },

    {
      id: 'fundamentos',
      name: 'Fundamentos de Tecnología',
      code: '0603086',
      group: 'Grupo 02',
      color: 'ce',          // naranja oscuro
      pillColor: 'pe',
      teacher: {
        name: 'Jairo Antonio Gaspar Leal',
        email: 'jagasparle@ut.edu.co',
        photo: 'https://yt3.googleusercontent.com/ytc/AIdro_moIYOLWyfalc0pxVjqOk7o26XteGefYvbo-LE3sb3VDMI=s160-c-k-c0x00ffffff-no-rj'
      },
      schedule: [
        { day: 'jueves', time: '09:00 – 11:59', room: 'Bloque 4 – Sala 01', sede: 'Bloque 4 – Sala 01', slot: '09-12' }
      ],
      pillName: 'Fund. Tecnología',
      pillRoom: 'B4 – Sala 01',
      whatsapp: 'https://chat.whatsapp.com/DZ6ZdW0RkUNDo1HoGxwElf',
      drive: ''
    },

    {
      id: 'ciencia',
      name: 'Ciencia, Sociedad y Desarrollo',
      code: '0702218',
      group: 'Grupo 01',
      color: 'cb',          // naranja
      pillColor: 'pb',
      teacher: {
        name: 'Varios docentes',
        email: '',
        photo: ''
      },
      schedule: [
        { day: 'jueves', time: '14:00 – 15:59', room: 'Auditorio de la Academia', sede: 'Auditorio Academia', slot: '14-16' }
      ],
      pillName: 'Ciencia Soc.',
      pillRoom: 'Auditorio',
      whatsapp: '',
      drive: ''
    },

    {
      id: 'escritura',
      name: 'Escritura Académica',
      code: '05011106',
      group: 'Grupo 02',
      color: 'ca',          // rojo
      pillColor: 'pa',
      teacher: {
        name: 'Yenny Alexandra García Montaño',
        email: 'yennygarcia@ut.edu.co',
        photo: 'https://cinetolima.co/wp-content/uploads/2021/03/yenny.jpg'
      },
      schedule: [
        { day: 'jueves', time: '16:00 – 17:59', room: 'Bloque 32 - A402', sede: 'Sede Central', slot: '16-18' }
      ],
      pillName: 'Escritura Acad.',
      pillRoom: 'B32-A402',
      whatsapp: 'https://chat.whatsapp.com/D7lIkjk8llBC77LvvhjjGz',
      drive: ''
    }
  ],

  /* ── ENLACES del MENÚ DRAWER ──
     Cada enlace tiene:
       label   → texto visible
       sub     → texto secundario (subtítulo)
       url     → URL de destino
       iconBg  → clase CSS del color del ícono (di-blue, di-green, di-gold)
       iconImg → URL del ícono (si usa imagen en lugar de emoji)
       iconEmoji → emoji alternativo (si no hay imagen)
  */
  links: [
    {
      label: 'Academusoft',
      sub: 'Sistema académico UT',
      url: 'http://mantis.ut.edu.co:8080/tolima/hermesoft/vortal/login/login.jsp',
      iconBg: 'di-blue',
      iconImg: 'https://d17nlwiklbtu7t.cloudfront.net/27692/club/logo/square_1663687865-4-0026-8090-Universidad_del_Tolima_Logo_forma_2.png'
    },
    {
      label: 'Grupo 02 - Estudiantes',
      sub: '',
      url: 'https://chat.whatsapp.com/Bmpusi07eOV3pLL52lKZWr?mode=gi_t',
      iconBg: 'di-green',
      iconImg: 'https://cdn-icons-png.flaticon.com/256/2111/2111728.png'
    },
    {
      label: 'Grupo - Taller I',
      sub: '',
      url: 'https://chat.whatsapp.com/Jdzk1sNzifV1rpILPx75VR?mode=gi_t',
      iconBg: 'di-green',
      iconImg: 'https://cdn-icons-png.flaticon.com/256/2111/2111728.png'
    },
    {
      label: 'Escritura Académica | Grupo 2',
      sub: '',
      url: 'https://chat.whatsapp.com/D7lIkjk8llBC77LvvhjjGz',
      iconBg: 'di-green',
      iconImg: 'https://cdn-icons-png.flaticon.com/256/2111/2111728.png'
    },
    {
      label: 'Fundamentos - Grupo 2, A-2026',
      sub: '',
      url: 'https://chat.whatsapp.com/DZ6ZdW0RkUNDo1HoGxwElf',
      iconBg: 'di-green',
      iconImg: 'https://cdn-icons-png.flaticon.com/256/2111/2111728.png'
    },
    {
      label: 'G02- Matemáticas de lo Cotidiano',
      sub: '',
      url: 'https://chat.whatsapp.com/H3ZbG0sfSGxKuSo0vVdcv5',
      iconBg: 'di-green',
      iconImg: 'https://cdn-icons-png.flaticon.com/256/2111/2111728.png'
    },
    {
      label: 'Drive - Expresión I',
      sub: 'Carpeta de clase',
      url: 'https://drive.google.com/drive/folders/1wZFyyKXDX2pMZ9juDPyxzT526DajHj0I',
      iconBg: 'di-blue',
      iconImg: 'https://cdn-icons-png.flaticon.com/512/5968/5968523.png'
    },
    {
      label: 'Drive - Taller I',
      sub: 'Carpeta de clase',
      url: 'https://drive.google.com/drive/folders/1wjYLWKjbu26sRu060xzgiVXOuFmxYnmZ',
      iconBg: 'di-blue',
      iconImg: 'https://cdn-icons-png.flaticon.com/512/5968/5968523.png'
    },
    {
      label: 'Drive - Teoría A&C',
      sub: 'Carpeta de clase',
      url: 'https://drive.google.com/drive/folders/1c9BlpcoZFT6jjxBHEWRcU6zTkBZjZbPe',
      iconBg: 'di-blue',
      iconImg: 'https://cdn-icons-png.flaticon.com/512/5968/5968523.png'
    }
  ],

  /* ── FRANJAS HORARIAS para la grilla semanal ──
     Define las filas de la tabla: franja + label visible.
  */
  timeSlots: [
    { id: '09-12', label: '09:00<br>12:00' },
    { id: '14-16', label: '14:00<br>16:00' },
    { id: '16-18', label: '16:00<br>18:00' }
  ],

  /* ── DÍAS de la semana (orden de columnas en la grilla) ── */
  days: [
    { id: 'lunes',     label: 'Lunes',     tabLabel: 'Lunes' },
    { id: 'martes',    label: 'Martes',     tabLabel: 'Martes' },
    { id: 'miercoles', label: 'Miércoles',  tabLabel: 'Miércoles' },
    { id: 'jueves',    label: 'Jueves',     tabLabel: 'Jueves' },
    { id: 'viernes',   label: 'Viernes',    tabLabel: 'Viernes' }
  ]
};
