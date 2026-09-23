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
