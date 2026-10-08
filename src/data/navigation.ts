export interface NavItem {
  label: string;
  href: string;
}

/** Menú principal del header (orden según Figma). */
export const mainNav: NavItem[] = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Tratamientos', href: '/tratamientos' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Contacto', href: '/contacto' },
];

/* --- Footer (orden según Figma) ------------------------------------------- */

/** Columna "Tratamientos". Rutas intencionadas (algunas páginas [PENDIENTE]). */
export const footerTreatments: NavItem[] = [
  { label: 'Ortodoncia invisible', href: '/tratamientos/ortodoncia-invisible' },
  { label: 'Odontopediatría', href: '/tratamientos/odontopediatria' },
  { label: 'Brackets', href: '/tratamientos/brackets' },
  { label: 'Estética dental', href: '/tratamientos/estetica-dental' },
  { label: 'Implantes dentales', href: '/tratamientos/implantes' },
  { label: 'Prótesis dentales', href: '/tratamientos/protesis-dentales' },
  { label: 'Periodoncia', href: '/tratamientos/periodoncia' },
  { label: 'Endodoncia', href: '/tratamientos/endodoncia' },
  { label: 'Cirugía oral', href: '/tratamientos/cirugia-oral' },
  { label: 'Articulación temporomandibular', href: '/tratamientos/atm' },
  {
    label: 'Odontología conservadora',
    href: '/tratamientos/odontologia-conservadora',
  },
];

/** Columna "Recursos". */
export const footerResources: NavItem[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Contactanos', href: '/contacto' },
  { label: 'Agendar cita', href: '/contacto' },
];

/** Enlaces legales (barra inferior). */
export const footerLegal: NavItem[] = [
  { label: 'Política de privacidad', href: '/politica-de-privacidad' },
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Política de cookies (UE)', href: '/politica-de-cookies' },
  { label: 'LLM.txt', href: '/llms.txt' },
  { label: 'Sitemap', href: '/sitemap-index.xml' },
];
