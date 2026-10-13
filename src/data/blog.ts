/**
 * Datos del blog. Fuente única de verdad (§1) para el listado, el buscador,
 * los filtros por categoría y (en el futuro) las páginas de artículo.
 *
 * ⚠️ CONTENIDO DE EJEMPLO [PENDIENTE]: los artículos de abajo son marcadores de
 * posición para maquetar y probar buscador/filtros/paginación. Sustituir por los
 * artículos reales (título, fecha, extracto, imagen y cuerpo) cuando los facilite
 * la clínica. Las imágenes aún no existen: hasta entonces la tarjeta muestra un
 * marcador visual (ver ArticleCard.astro).
 */
export const blogCategories = [
  'Consejos',
  'Curiosidades',
  'Ortodoncia',
  'Odontopediatría',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPost {
  slug: string;
  title: string;
  /** Fecha de publicación en ISO (YYYY-MM-DD). */
  date: string;
  category: BlogCategory;
  /** Resumen corto para la tarjeta/SEO. Opcional hasta tener copy real. */
  excerpt?: string;
  /** Slug de imagen en src/assets (para img()). Opcional: sin ella = marcador. */
  image?: string;
}

/** Ruta de la página de un artículo (páginas de detalle [PENDIENTE]). */
export const postHref = (slug: string): string => `/blog/${slug}`;

// --- Artículos de ejemplo [PENDIENTE] -------------------------------------
export const blogPosts: BlogPost[] = [
  {
    slug: 'higiene-dental-en-casa',
    title: 'Cómo mantener una buena higiene dental en casa',
    date: '2026-09-21',
    category: 'Consejos',
  },
  {
    slug: 'primer-dentista-de-tu-bebe',
    title: 'El primer dentista de tu bebé: cuándo acudir',
    date: '2026-09-14',
    category: 'Odontopediatría',
  },
  {
    slug: 'esmalte-tejido-mas-duro',
    title: '¿Sabías que el esmalte es el tejido más duro del cuerpo?',
    date: '2026-09-07',
    category: 'Curiosidades',
  },
  {
    slug: 'cepillado-interdental',
    title: 'La importancia del cepillado interdental',
    date: '2026-08-28',
    category: 'Consejos',
  },
  {
    slug: 'cuidar-dientes-de-leche',
    title: 'Cómo cuidar los dientes de leche de los más pequeños',
    date: '2026-08-20',
    category: 'Odontopediatría',
  },
  {
    slug: 'mitos-blanqueamiento-dental',
    title: 'Mitos y verdades sobre el blanqueamiento dental',
    date: '2026-08-11',
    category: 'Curiosidades',
  },
  {
    slug: 'ortodoncia-invisible-vs-brackets',
    title: 'Ortodoncia invisible: ventajas frente a los brackets',
    date: '2026-08-03',
    category: 'Ortodoncia',
  },
  {
    slug: 'alimentos-que-cuidan-tus-dientes',
    title: 'Alimentos que cuidan tus dientes (y los que no)',
    date: '2026-07-25',
    category: 'Consejos',
  },
  {
    slug: 'edad-primera-visita-ortodoncista',
    title: '¿A qué edad llevar a tu hijo al ortodoncista?',
    date: '2026-07-16',
    category: 'Ortodoncia',
  },
  {
    slug: 'por-que-sangran-las-encias',
    title: '¿Por qué sangran las encías y cómo evitarlo?',
    date: '2026-07-08',
    category: 'Consejos',
  },
  {
    slug: 'curiosidades-sobre-la-saliva',
    title: 'Cinco curiosidades sobre la saliva y tu salud bucodental',
    date: '2026-06-30',
    category: 'Curiosidades',
  },
  {
    slug: 'mantenimiento-de-la-ortodoncia',
    title: 'Cuidados y mantenimiento durante la ortodoncia',
    date: '2026-06-21',
    category: 'Ortodoncia',
  },
];
