import type { ImageMetadata } from 'astro';

/**
 * Mapa de todas las imágenes de `src/assets/` indexadas por su nombre de
 * archivo (slug), sin extensión. Permite referenciarlas en cualquier
 * componente por el slug, sin escribir un `import` por imagen.
 *
 * Uso:
 *   import { img } from '@/lib/images';
 *   <Image src={img('whatsapp')} alt="…" width={20} height={20} />
 *
 * Al añadir una imagen nueva basta con dejar el archivo dentro de
 * `src/assets/` (en la subcarpeta que corresponda). El slug es el nombre del
 * archivo: `whatsapp.png` → `img('whatsapp')`.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>();

for (const [path, mod] of Object.entries(modules)) {
  const slug = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  if (bySlug.has(slug)) {
    throw new Error(
      `[images] Slug de imagen duplicado: "${slug}" (${path}). ` +
        'Los nombres de archivo en src/assets/ deben ser únicos.',
    );
  }
  bySlug.set(slug, mod.default);
}

/** Devuelve los metadatos de una imagen de `src/assets/` por su slug. */
export function img(slug: string): ImageMetadata {
  const image = bySlug.get(slug);
  if (!image) {
    throw new Error(
      `[images] No existe ninguna imagen con el slug "${slug}" en src/assets/. ` +
        `Slugs disponibles: ${[...bySlug.keys()].join(', ')}`,
    );
  }
  return image;
}
