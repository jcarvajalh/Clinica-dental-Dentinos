/**
 * Datos del negocio. Fuente única de verdad (§1).
 * Los valores marcados como [PENDIENTE] deben completarse con datos reales.
 */
export const site = {
  name: 'Dentinos',
  legalName: 'Clínica dental Dentinos',
  // TODO: dominio de producción real (coincidir con astro.config.mjs → site)
  domain: 'https://dominio.com',

  // --- Contacto ([PENDIENTE]) ---
  phone: '', // [PENDIENTE] teléfono en formato legible, p. ej. "+57 300 000 0000"
  whatsapp: '', // [PENDIENTE] número internacional SIN "+" ni espacios, p. ej. "573000000000"
  email: '', // [PENDIENTE] correo de contacto
  mapsUrl: '', // [PENDIENTE] URL de Google Maps / cómo llegar

  // --- Dirección ([PENDIENTE]) ---
  address: {
    street: '', // [PENDIENTE]
    city: '', // [PENDIENTE]
    region: '', // [PENDIENTE]
    postalCode: '', // [PENDIENTE]
    country: '', // [PENDIENTE]
  },

  // --- Horarios ([PENDIENTE]) ---
  hours: [] as { days: string; open: string; close: string }[],

  // --- Redes sociales ([PENDIENTE]) ---
  social: {} as Record<string, string>,
} as const;

/**
 * CTA "Agendar Cita" del header.
 * TODO: confirmar destino (página de contacto, agenda online o WhatsApp).
 */
export const appointmentHref = '/contacto';

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
