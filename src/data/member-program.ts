export type Satsanga = {
  id: string;
  title: string;
  guide: string;
  focus: string;
  modality: string;
};

export type UpcomingSession = {
  id: string;
  title: string;
  weekday: string;
  time: string;
  modality: string;
  detail: string;
};

export type CourseModule = {
  id: string;
  level: string;
  title: string;
  summary: string;
  lessons: string[];
  practice: string;
};

/**
 * Programa académico del campus kriyaban.
 * Los horarios son la plantilla base de la Fundación; se actualizan
 * cuando la coordinación confirma cada convocatoria.
 */
export const satsangas: Satsanga[] = [
  {
    id: "sat-apertura",
    title: "Satsanga de apertura",
    guide: "Coordinación Fundación Hariharananda",
    focus: "Lectura comentada de las enseñanzas de Baba Hariharananda y meditación guiada.",
    modality: "Encuentro virtual",
  },
  {
    id: "sat-estudio",
    title: "Satsanga de estudio",
    guide: "Grupo de estudio kriyaban",
    focus: "Análisis del Bhagavad Gita a la luz del Kriya Yoga, capítulo por capítulo.",
    modality: "Encuentro virtual",
  },
  {
    id: "sat-practica",
    title: "Satsanga de práctica",
    guide: "Instructores autorizados",
    focus: "Repaso técnico de las kriyas, postura, respiración y disciplina diaria.",
    modality: "Presencial y virtual",
  },
  {
    id: "sat-silencio",
    title: "Satsanga de silencio",
    guide: "Comunidad kriyaban",
    focus: "Meditación prolongada en silencio, sin instrucción hablada.",
    modality: "Presencial",
  },
];

export const upcomingSessions: UpcomingSession[] = [
  {
    id: "next-1",
    title: "Satsanga de apertura",
    weekday: "Primer domingo del mes",
    time: "9:00 a. m.",
    modality: "Virtual",
    detail: "Bienvenida a nuevos kriyabanes y lectura comentada.",
  },
  {
    id: "next-2",
    title: "Satsanga de estudio",
    weekday: "Miércoles",
    time: "7:00 p. m.",
    modality: "Virtual",
    detail: "Estudio guiado de los textos de la biblioteca.",
  },
  {
    id: "next-3",
    title: "Satsanga de práctica",
    weekday: "Sábado",
    time: "8:00 a. m.",
    modality: "Presencial y virtual",
    detail: "Corrección de técnica y resolución de preguntas.",
  },
  {
    id: "next-4",
    title: "Satsanga de silencio",
    weekday: "Último sábado del mes",
    time: "6:00 a. m.",
    modality: "Presencial",
    detail: "Meditación larga en silencio acompañada.",
  },
];

export const courseModules: CourseModule[] = [
  {
    id: "mod-1",
    level: "Nivel I · Fundamentos",
    title: "El camino del Kriya Yoga",
    summary: "Origen del linaje, sentido de la iniciación y disciplina del estudiante.",
    lessons: [
      "El linaje: Babaji, Lahiri Mahasaya, Sri Yukteswar, Hariharananda",
      "Qué es la iniciación y qué compromete",
      "Higiene de vida del kriyaban",
      "Preparación del lugar y del horario de práctica",
    ],
    practice: "Sentarse quince minutos diarios a la misma hora.",
  },
  {
    id: "mod-2",
    level: "Nivel I · Fundamentos",
    title: "Postura, respiración y atención",
    summary: "Bases físicas y respiratorias que sostienen toda la práctica posterior.",
    lessons: [
      "Asana estable y columna alineada",
      "Respiración consciente y ritmo interno",
      "Recogimiento de los sentidos",
      "Errores frecuentes del principiante",
    ],
    practice: "Veinte minutos de respiración consciente antes de la meditación.",
  },
  {
    id: "mod-3",
    level: "Nivel II · Profundización",
    title: "Las kriyas y el trabajo interior",
    summary: "Comprensión del proceso científico del cultivo del alma.",
    lessons: [
      "El sentido de cada kriya en el proceso",
      "Constancia, número y calidad de las repeticiones",
      "Señales de avance y señales de desvío",
      "El silencio después de la práctica",
    ],
    practice: "Registro diario breve de la práctica y de sus efectos.",
  },
  {
    id: "mod-4",
    level: "Nivel II · Profundización",
    title: "Estudio de las escrituras",
    summary: "Lectura del Bhagavad Gita y de los textos del maestro a la luz del Kriya.",
    lessons: [
      "Cómo leer una escritura como manual de práctica",
      "El cuerpo humano como campo de batalla",
      "Comentarios de Baba Hariharananda",
      "Del concepto a la experiencia directa",
    ],
    practice: "Una lectura semanal de la biblioteca con notas propias.",
  },
  {
    id: "mod-5",
    level: "Nivel III · Vida kriyaban",
    title: "La práctica en la vida diaria",
    summary: "Llevar el estado meditativo al trabajo, la familia y el servicio.",
    lessons: [
      "Acción sin apego al resultado",
      "Alimentación, descanso y economía de energía",
      "Servicio y comunidad kriyaban",
      "El último consejo del maestro",
    ],
    practice: "Recordar la respiración tres veces al día en plena actividad.",
  },
  {
    id: "mod-6",
    level: "Nivel III · Vida kriyaban",
    title: "Acompañamiento y satsanga",
    summary: "El papel del encuentro colectivo en la maduración del estudiante.",
    lessons: [
      "Para qué sirve el satsanga",
      "Preguntar bien: guía y discípulo",
      "Retiros y meditación prolongada",
      "Continuidad después de la iniciación",
    ],
    practice: "Asistir a un satsanga al mes y preparar una pregunta.",
  },
];
