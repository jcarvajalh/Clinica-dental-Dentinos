/**
 * Reseñas de pacientes. Fuente única de verdad (§1) para la sección de
 * testimonios (home, blog…).
 *
 * [CONTENIDO DE EJEMPLO]: nombres y textos ficticios (y valoraciones de 4–5
 * estrellas) para maquetar la sección. Sustituir por las reseñas reales de
 * Google cuando estén disponibles. Solo 3 tienen foto real de avatar
 * (src/assets/images/home/review-*); el resto cae en un avatar con inicial.
 */
export interface Review {
  name: string;
  /** Valoración de 1 a 5 estrellas. */
  rating: number;
  /** Texto de la reseña. */
  text: string;
  /** Slug del avatar en src/assets (para img()). Opcional: sin él, inicial. */
  avatar?: string;
}

export const reviews: Review[] = [
  {
    name: 'Lucía Martín Reyes',
    rating: 5,
    text: 'Fui con bastante miedo al dentista y salí encantada. Me explicaron cada paso con calma y sin prisas; el trato humano marca la diferencia.',
  },
  {
    name: 'Carlos Jiménez Ortega',
    rating: 5,
    text: 'Me pusieron dos implantes y el resultado es espectacular. Profesionales como pocos y unas instalaciones impecables en Teatinos.',
  },
  {
    name: 'Alessandra Gómez',
    rating: 5,
    text: 'Trato cercano y profesional; me explicaron cada paso del tratamiento y el resultado fue excelente. Repetiré sin duda.',
    avatar: 'review-alessandra-gomez',
  },
  {
    name: 'Marta Ruiz Delgado',
    rating: 4,
    text: 'Muy contenta con la ortodoncia invisible. La única pega es que algún día hubo que esperar un poco en sala, pero el trato lo compensa.',
  },
  {
    name: 'Javier Moreno Cano',
    rating: 5,
    text: 'Llevo a mis hijos a la odontopediatra y los niños salen felices. Saben tratar a los más pequeños de maravilla.',
  },
  {
    name: 'Roxana Lizarazu',
    rating: 4,
    text: 'Instalaciones modernas y un equipo que te hace sentir en confianza desde la primera visita. Aparcar cerca cuesta un poco, pero el servicio es excelente.',
    avatar: 'review-roxana-lizarazu',
  },
  {
    name: 'Jhon Dennis',
    rating: 5,
    text: 'Puntuales, atentos y con una atención impecable. Me hicieron una limpieza y un empaste sin ningún dolor. Totalmente recomendados.',
    avatar: 'review-jhon-dennis',
  },
  {
    name: 'Elena Vargas Pineda',
    rating: 5,
    text: 'La mejor clínica dental de Málaga. Presupuesto claro desde el principio, sin sorpresas, y un equipo encantador.',
  },
  {
    name: 'Sergio Navarro Gil',
    rating: 4,
    text: 'Buen diagnóstico y me ofrecieron varias alternativas de tratamiento sin presionar. Volveré para el blanqueamiento.',
  },
  {
    name: 'Patricia Herrera Luna',
    rating: 5,
    text: 'Me trataron una periodoncia con muchísima paciencia y seguimiento. Mis encías han mejorado un montón. Gracias al equipo.',
  },
];
