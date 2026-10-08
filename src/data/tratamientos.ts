/**
 * Listado de tratamientos. Fuente única de verdad (§3): alimenta la sección de
 * servicios de la home, el listado, el menú, el sitemap y el llms.txt.
 *
 * Campos opcionales (`description`, `image`) están [PENDIENTE] hasta tener el
 * contenido real de cada tratamiento; de momento solo «Estética dental».
 *
 * Precios «Desde X€» = orientativos de mercado para clínicas de Málaga
 * (estimación a revisar/confirmar con la clínica antes de publicar).
 */
export interface Treatment {
  slug: string;
  name: string;
  /** Descripción corta (lista de servicios y listado). */
  summary: string;
  /** Precio orientativo «Desde X€». Opcional hasta confirmar con la clínica. */
  price?: string;
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
    slug: 'ortodoncia-invisible',
    name: 'Ortodoncia invisible',
    summary: 'Alinea tus dientes de forma discreta con alineadores transparentes.',
    price: 'Desde 1.800€',
    href: '/tratamientos/ortodoncia-invisible',
  },
  {
    slug: 'brackets',
    name: 'Brackets',
    summary: 'Corrige la posición de tus dientes con ortodoncia fija.',
    price: 'Desde 1.500€',
    href: '/tratamientos/brackets',
  },
  {
    slug: 'atm',
    name: 'ATM',
    summary: 'Tratamos los trastornos de la articulación temporomandibular.',
    price: 'Desde 150€',
    href: '/tratamientos/atm',
  },
  {
    slug: 'odontopediatria',
    name: 'Odontopediatría',
    summary: 'Cuidado dental especializado y cercano para los más pequeños.',
    price: 'Desde 30€',
    href: '/tratamientos/odontopediatria',
  },
  {
    slug: 'odontologia-estetica',
    name: 'Estética dental',
    summary: 'Mejora la apariencia de tu sonrisa con tratamientos estéticos.',
    price: 'Desde 250€',
    description:
      'Evaluamos tus dientes y características faciales para diseñar un tratamiento que busque resultados naturales y acordes con tu',
    descriptionAccent: 'Sonrisa.',
    image: 'servicio-odontologia-estetica',
    href: '/tratamientos/estetica-dental',
  },
  {
    slug: 'endodoncia',
    name: 'Endodoncia',
    summary: 'Salva tus dientes dañados eliminando la infección de la raíz.',
    price: 'Desde 120€',
    href: '/tratamientos/endodoncia',
  },
  {
    slug: 'implantes',
    name: 'Implantes dentales',
    summary: 'Recupera dientes perdidos con una apariencia natural.',
    price: 'Desde 700€',
    href: '/tratamientos/implantes',
  },
  {
    slug: 'protesis-dentales',
    name: 'Prótesis dentales',
    summary: 'Restaura la función y la estética con prótesis fijas o removibles.',
    price: 'Desde 400€',
    href: '/tratamientos/protesis-dentales',
  },
  {
    slug: 'periodoncia',
    name: 'Periodoncia',
    summary: 'Cuidamos la salud de tus encías y frenamos su enfermedad.',
    price: 'Desde 50€',
    href: '/tratamientos/periodoncia',
  },
  {
    slug: 'odontologia-conservadora',
    name: 'Odontología conservadora',
    summary: 'Tratamos las caries y conservamos al máximo el diente natural.',
    price: 'Desde 45€',
    href: '/tratamientos/odontologia-conservadora',
  },
  {
    slug: 'cirugia-oral',
    name: 'Cirugía oral',
    summary: 'Extracciones y cirugía bucal con las máximas garantías.',
    price: 'Desde 60€',
    href: '/tratamientos/cirugia-oral',
  },
];

/** Tratamiento activo por defecto en la sección: el primero de la lista. */
export const defaultTreatmentSlug = tratamientos[0].slug;
