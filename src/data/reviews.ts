/**
 * Reseñas de pacientes. Fuente única de verdad (§1) para la sección de
 * testimonios (home, blog…).
 *
 * [TEXTO PENDIENTE]: faltan las reseñas reales de Google. Los textos van
 * marcados «[Reseña pendiente]» hasta tener las valoraciones definitivas.
 * Las fotos de avatar sí son las reales (src/assets/images/home/review-*).
 */
export interface Review {
  name: string;
  /** Slug del avatar en src/assets (para img()). */
  avatar: string;
  text: string;
}

export const reviews: Review[] = [
  {
    name: 'Alessandra Gómez',
    avatar: 'review-alessandra-gomez',
    text: '[Reseña pendiente] Trato cercano y profesional; me explicaron cada paso del tratamiento y el resultado fue excelente.',
  },
  {
    name: 'Roxana Lizarazu',
    avatar: 'review-roxana-lizarazu',
    text: '[Reseña pendiente] Instalaciones modernas y un equipo que te hace sentir en confianza desde la primera visita.',
  },
  {
    name: 'Jhon Dennis',
    avatar: 'review-jhon-dennis',
    text: '[Reseña pendiente] Puntuales, atentos y con una atención impecable. Totalmente recomendados.',
  },
];
