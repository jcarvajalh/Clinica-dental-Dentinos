/**
 * Datos del negocio. Fuente única de verdad (§1).
 * Los valores marcados como [PENDIENTE] deben completarse con datos reales.
 */
export const site = {
  name: 'Dentinos',
  legalName: 'Clínica dental Dentinos',
  // TODO: dominio de producción real (coincidir con astro.config.mjs → site)
  domain: 'https://dominio.com',

  // --- Contacto ---
  phone: '+34 649 989 506', // móvil (formato legible)
  phoneLandline: '951 93 53 78', // fijo
  whatsapp: '34649989506', // internacional SIN "+" ni espacios
  email: 'clinicadentaldentinos@gmail.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Calle+Poeta+Aurora+Albornoz+7+Teatinos+29010+M%C3%A1laga',

  // --- Dirección ---
  address: {
    street: 'Calle Poeta Aurora Albornoz, 7',
    district: 'Teatinos',
    postalCode: '29010',
    city: 'Málaga',
    region: 'Málaga',
    country: 'España',
  },

  // --- Horarios ([PENDIENTE]) ---
  hours: [] as { days: string; open: string; close: string }[],

  // --- Redes sociales ([PENDIENTE]) ---
  social: {} as Record<string, string>,

  // --- Reseñas (se muestran en el hero) ---
  reviews: {
    rating: '4.9',
    count: '+250',
    // TODO: enlace al perfil de reseñas de Google
    url: '',
  },
} as const;

/**
 * CTA "Agendar Cita" del header.
 * TODO: confirmar destino (página de contacto, agenda online o WhatsApp).
 */
export const appointmentHref = '/contacto';

/**
 * CTA "Teleconsulta" del hero.
 * TODO: confirmar destino (formulario, videollamada o WhatsApp).
 */
export const teleconsultaHref = '#';

export type ContactLinkType = 'location' | 'email' | 'whatsapp';

export interface ContactLink {
  type: ContactLinkType;
  /** Nombre accesible del enlace (aria-label). */
  label: string;
  href: string;
}

/**
 * Accesos rápidos de contacto (iconos del header).
 * Cuando falta el dato en site.ts, el href cae en '#' — completar arriba.
 */
export const contactLinks: ContactLink[] = [
  {
    type: 'location',
    label: 'Cómo llegar',
    href: site.mapsUrl || '#',
  },
  {
    type: 'email',
    label: 'Escríbenos por correo',
    href: site.email ? `mailto:${site.email}` : '#',
  },
  {
    type: 'whatsapp',
    label: 'Escríbenos por WhatsApp',
    href: site.whatsapp ? `https://wa.me/${site.whatsapp}` : '#',
  },
];
