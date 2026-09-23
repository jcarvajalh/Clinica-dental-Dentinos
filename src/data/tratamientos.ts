/**
 * Listado de tratamientos. Fuente única de verdad (§3): alimenta la sección de
 * servicios de la home, el listado, el menú, el sitemap y el llms.txt.
 *
 * Campos opcionales (`description`, `image`) están [PENDIENTE] hasta tener el
 * contenido real de cada tratamiento; de momento solo «Odontología estética».
 */
export interface Treatment {
  slug: string;
  name: string;
  /** Descripción corta (lista de servicios y listado). */
  summary: string;
  /** Descripción larga para el panel. Opcional hasta tener copy real. */
  description?: string;
  /** Palabra final en acento serif (como «Sonrisa.»). */
  descriptionAccent?: string;
  /** Slug de imagen en src/assets (para img()). Opcional hasta tenerla. */
  image?: string;
  /** Ruta a la página del tratamiento. */
  href: string;
}

export const tratamientos: Treatment[] = [
  {
    slug: 'odontologia-general',
    name: 'Odontología general',
    summary: 'Mantén dientes y encías saludables con atención preventiva.',
    href: '/tratamientos/odontologia-general',
  },
  {
    slug: 'odontologia-estetica',
    name: 'Odontología estética',
    summary: 'Mejora la apariencia de tu sonrisa con tratamientos estéticos.',
    description:
      'Evaluamos tus dientes y características faciales para diseñar un tratamiento que busque resultados naturales y acordes con tu',
    descriptionAccent: 'Sonrisa.',
    image: 'servicio-odontologia-estetica',
    href: '/tratamientos/odontologia-estetica',
  },
  {
    slug: 'implantes',
    name: 'Implantes dentales',
    summary: 'Recupera dientes perdidos con una apariencia natural.',
    href: '/tratamientos/implantes',
  },
  {
    slug: 'invisalign',
    name: 'Invisalign',
    summary: 'Alinea tus dientes de forma discreta con alineadores transparentes.',
    href: '/tratamientos/invisalign',
  },
];

/** Tratamiento activo por defecto en la sección (el que tiene contenido completo). */
export const defaultTreatmentSlug = 'odontologia-estetica';
