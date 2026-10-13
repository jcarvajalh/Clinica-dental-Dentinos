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
/** Tratamiento específico dentro de una categoría (submenú del header). */
export interface SubTreatment {
  name: string;
  href: string;
}

export interface Treatment {
  slug: string;
  name: string;
  /** Descripción corta (lista de servicios y listado). */
  summary: string;
  /** Precio orientativo «Desde X€». Opcional hasta confirmar con la clínica. */
  price?: string;
  /** Titular del panel de info (columna derecha de la sección de servicios). */
  panelTitle?: string;
  /** Descripción larga para el panel. Opcional hasta tener copy real. */
  description?: string;
  /** Slug de imagen en src/assets (para img()). Opcional hasta tenerla. */
  image?: string;
  /** Ruta a la página del tratamiento (categoría). */
  href: string;
  /** Tratamientos específicos de la categoría (mega-menú del header). */
  children?: SubTreatment[];
}

export const tratamientos: Treatment[] = [
  {
    slug: 'ortodoncia-invisible',
    name: 'Ortodoncia invisible',
    summary: 'Alinea tus dientes de forma discreta con alineadores transparentes.',
    price: 'Desde 1.800€',
    panelTitle: 'Ortodoncia invisible Invisalign en Málaga con la Dra. Ana Fernández-Cavada',
    description:
      'Alinea tus dientes de forma discreta con el sistema Invisalign en Málaga. Férulas transparentes y extraíbles que facilitan tu higiene oral y alimentación diaria.',
    image: 'servicio-ortodoncia-invisible',
    href: '/tratamientos/ortodoncia-invisible',
    children: [
      { name: 'Expansor de paladar de Invisalign', href: '/tratamientos/expansor-paladar' },
      { name: 'Invisalign First', href: '/tratamientos/ortodoncia-invisible/invisalign-first' },
      { name: 'Invisalign Teen', href: '/tratamientos/ortodoncia-invisible/invisalign-teen' },
      { name: 'Invisalign para adultos', href: '/tratamientos/ortodoncia-invisible/invisalign-adultos' },
    ],
  },
  {
    slug: 'brackets',
    name: 'Brackets',
    summary: 'Corrige la posición de tus dientes con ortodoncia fija.',
    price: 'Desde 1.500€',
    panelTitle: 'Brackets en Málaga',
    description:
      'Tratamiento efectivo para corregir la mordida, estética y funcionalidad bucal. Disponemos de diversos tipos de brackets según tus necesidades y preferencias estéticas.',
    image: 'servicio-brackets',
    href: '/tratamientos/brackets',
    children: [
      { name: 'Brackets autoligables', href: '/tratamientos/brackets/autoligables' },
      { name: 'Brackets transparentes', href: '/tratamientos/brackets/transparentes' },
      { name: 'Brackets de zafiro', href: '/tratamientos/brackets/zafiro' },
    ],
  },
  {
    slug: 'atm',
    name: 'ATM – Articulación temporomandibular',
    summary: 'Tratamos los trastornos de la articulación temporomandibular.',
    price: 'Desde 150€',
    panelTitle: 'Tratamiento de disfunción de la ATM en Teatinos',
    description:
      'Solución integral para dolores articulares y problemas de masticación. Diagnóstico y tratamiento especializado de la articulación temporomandibular en Teatinos, Málaga.',
    image: 'servicio-atm',
    href: '/tratamientos/atm',
  },
  {
    slug: 'odontopediatria',
    name: 'Odontopediatría',
    summary: 'Cuidado dental especializado y cercano para los más pequeños.',
    price: 'Desde 30€',
    panelTitle: 'Odontopediatría en Teatinos: odontología infantil',
    description:
      'Cuidado, prevención y mantenimiento de la salud bucodental de niños y adolescentes en Teatinos. Atención cercana adaptada a los más pequeños.',
    image: 'servicio-odontopediatria',
    href: '/tratamientos/odontopediatria',
  },
  {
    slug: 'odontologia-estetica',
    name: 'Estética dental',
    summary: 'Mejora la apariencia de tu sonrisa con tratamientos estéticos.',
    price: 'Desde 250€',
    panelTitle: 'Estética dental en Teatinos, Málaga',
    description:
      'Mejoramos el color, forma y alineación de tu sonrisa. Ofrecemos carillas, blanqueamiento, diseño digital de sonrisa y reconstrucciones. Primera consulta sin compromiso en Clínica Dentinos.',
    image: 'servicio-odontologia-estetica',
    href: '/tratamientos/estetica-dental',
    children: [
      { name: 'Carillas dentales', href: '/tratamientos/carillas' },
      { name: 'Carillas de composite', href: '/tratamientos/estetica-dental/carillas-composite' },
      { name: 'Carillas de porcelana', href: '/tratamientos/estetica-dental/carillas-porcelana' },
      { name: 'Blanqueamiento dental', href: '/tratamientos/estetica-dental/blanqueamiento' },
      { name: 'Blanqueamiento en clínica, casa o combinado', href: '/tratamientos/estetica-dental/blanqueamiento-opciones' },
      { name: 'Reconstrucción dental', href: '/tratamientos/estetica-dental/reconstruccion' },
    ],
  },
  {
    slug: 'endodoncia',
    name: 'Endodoncia',
    summary: 'Salva tus dientes dañados eliminando la infección de la raíz.',
    price: 'Desde 120€',
    panelTitle: 'Endodoncia especializada',
    description:
      'Tratamiento avanzado para salvar dientes con afectación en la pulpa (nervio). Tecnología de vanguardia para diagnósticos precisos y procedimientos sin dolor.',
    image: 'servicio-endodoncia',
    href: '/tratamientos/endodoncia',
  },
  {
    slug: 'implantes',
    name: 'Implantes dentales',
    summary: 'Recupera dientes perdidos con una apariencia natural.',
    price: 'Desde 700€',
    panelTitle: 'Implantes dentales en Teatinos, Málaga',
    description:
      'Recupera la estética y función masticatoria con nuestros implantes dentales. La solución fija y definitiva para sustituir piezas dañadas o ausentes.',
    image: 'servicio-implantes',
    href: '/tratamientos/implantes',
  },
  {
    slug: 'protesis-dentales',
    name: 'Prótesis dentales',
    summary: 'Restaura la función y la estética con prótesis fijas o removibles.',
    price: 'Desde 400€',
    panelTitle: 'Prótesis dentales fijas y removibles',
    description:
      'Restauramos la pérdida de uno, varios o todos los dientes. Prótesis a medida que devuelven la salud, estética y funcionalidad a tu boca.',
    image: 'servicio-protesis-dentales',
    href: '/tratamientos/protesis-dentales',
    children: [
      { name: 'Coronas dentales', href: '/tratamientos/protesis-dentales/coronas' },
      { name: 'Puentes dentales', href: '/tratamientos/protesis-dentales/puentes' },
      { name: 'Dentadura fija sobre 4 implantes', href: '/tratamientos/protesis-dentales/dentadura-fija-4-implantes' },
      { name: 'Dentadura postiza / prótesis removible', href: '/tratamientos/protesis-dentales/dentadura-removible' },
    ],
  },
  {
    slug: 'periodoncia',
    name: 'Periodoncia',
    summary: 'Cuidamos la salud de tus encías y frenamos su enfermedad.',
    price: 'Desde 50€',
    panelTitle: 'Periodoncia: cuidado de encías',
    description:
      'Prevención, diagnóstico y tratamiento de gingivitis y periodontitis. Protegemos el soporte de tus dientes para mantener encías sanas.',
    image: 'servicio-periodoncia',
    href: '/tratamientos/periodoncia',
    children: [
      { name: 'Higiene bucodental', href: '/tratamientos/periodoncia/higiene-bucodental' },
      { name: 'Limpieza dental', href: '/tratamientos/periodoncia/limpieza' },
      { name: 'Curetaje dental', href: '/tratamientos/periodoncia/curetaje' },
      { name: 'Gingivectomía', href: '/tratamientos/periodoncia/gingivectomia' },
    ],
  },
  {
    slug: 'odontologia-conservadora',
    name: 'Odontología conservadora',
    summary: 'Tratamos las caries y conservamos al máximo el diente natural.',
    price: 'Desde 45€',
    panelTitle: 'Odontología conservadora',
    description:
      'Tratamientos orientados a conservar tu pieza dental original. Eliminamos únicamente el tejido dañado respetando la estructura sana del diente.',
    image: 'servicio-odontologia-conservadora',
    href: '/tratamientos/odontologia-conservadora',
    children: [
      { name: 'Empaste dental', href: '/tratamientos/odontologia-conservadora/empaste' },
      { name: 'Férula de descarga', href: '/tratamientos/odontologia-conservadora/ferula-descarga' },
      { name: 'Incrustaciones dentales', href: '/tratamientos/odontologia-conservadora/incrustaciones' },
      { name: 'Reconstrucción dental', href: '/tratamientos/odontologia-conservadora/reconstruccion' },
    ],
  },
  {
    slug: 'cirugia-oral',
    name: 'Cirugía oral',
    summary: 'Extracciones y cirugía bucal con las máximas garantías.',
    price: 'Desde 60€',
    panelTitle: 'Cirugía oral en Teatinos, Málaga',
    description:
      'Atención quirúrgica personalizada en Clínica Dentinos. Planificación detallada, alternativas claras y acompañamiento en todo el proceso de recuperación.',
    image: 'servicio-cirugia-oral',
    href: '/tratamientos/cirugia-oral',
    children: [
      { name: 'Exodoncia', href: '/tratamientos/cirugia-oral/exodoncia' },
    ],
  },
];

/** Tratamiento activo por defecto en la sección: el primero de la lista. */
export const defaultTreatmentSlug = tratamientos[0].slug;
