# CLAUDE.md

Guía de trabajo para Claude en este proyecto. Léela completa antes de escribir código y respétala en cada tarea. Si algo aquí entra en conflicto con una petición puntual, pregunta antes de actuar.

\---

## 1\. Proyecto

* **Cliente:** Clínica dental Dentinos.
* **Idioma del sitio:** español (`<html lang="es">`).
* **Dominio de producción:** \[https://DOMINIO.com] (se usa en `astro.config.mjs → site`, sitemap, canonical, robots y llms.txt).
* **Diseño fuente:** Figma, versión desktop a **1440 px** de ancho. **No existe diseño responsive**: Claude lo resuelve de forma fluida mientras construye cada sección (ver §6).
* **Desarrollo:** agencia Arka.

Los datos del negocio (nombre, teléfono, dirección, horarios, redes, tratamientos) viven en `src/data/` y **nunca** se escriben a mano repetidos dentro de los componentes.

\---

## 2\. Stack

|Pieza|Decisión|
|-|-|
|Framework|Astro (última versión estable), salida estática (`output: 'static'`)|
|Lenguaje|TypeScript en modo `strict`|
|Estilos|Tailwind CSS v4 vía `@tailwindcss/vite` + CSS propio|
|Sitemap|`@astrojs/sitemap`|
|Imágenes|`astro:assets` (`<Image />` / `<Picture />`, formatos avif/webp)|
|JavaScript cliente|Cero por defecto. Solo `<script>` pequeños y nativos para interacciones (menú, acordeones, reveal on scroll). Sin frameworks de UI salvo que se acuerde.|

Instalación de referencia:

```bash
npm create astro@latest
npx astro add tailwind
npx astro add sitemap
```

Comandos:

```bash
npm run dev       # desarrollo
npm run build     # build de producción (debe pasar sin warnings)
npm run preview   # revisar el build
npx astro check   # tipos y diagnósticos
```

\---

## 3\. Estructura del proyecto

```
.
├── CLAUDE.md
├── astro.config.mjs
├── tsconfig.json
├── public/
│   ├── fonts/
│   │   └── creato-display/          # .woff2 de Creato Display (self-hosted)
│   ├── favicon.svg
│   └── og-default.jpg               # imagen Open Graph por defecto (1200×630)
└── src/
    ├── assets/
    │   ├── images/                  # imágenes optimizadas por astro:assets, por página
    │   │   ├── home/
    │   │   ├── nosotros/
    │   │   └── tratamientos/
    │   └── icons/                   # SVG
    ├── components/
    │   ├── ui/                      # piezas atómicas: Button, Container, Heading, Icon, Badge…
    │   ├── layout/                  # Header, Footer, Nav, MobileMenu
    │   ├── sections/                # secciones REUTILIZADAS en varias páginas (CTA cita, FAQ, testimonios…)
    │   └── seo/                     # Seo.astro (meta/OG/canonical), SchemaDentist.astro (JSON-LD)
    ├── data/
    │   ├── site.ts                  # nombre, contacto, dirección, horarios, redes, dominio
    │   ├── navigation.ts            # menú principal y footer
    │   └── tratamientos.ts          # listado de tratamientos (slug, nombre, resumen, imagen)
    ├── layouts/
    │   └── BaseLayout.astro         # <head>, fuentes, Seo, Header, <slot />, Footer
    ├── styles/
    │   └── global.css               # ÚNICO CSS inicial (ver §5)
    └── pages/
        ├── index.astro              # ruta "/"  → ensambla las secciones de \_home
        ├── \_home/
        │   ├── 01-Hero.astro
        │   ├── 02-Tratamientos.astro
        │   ├── 03-….astro
        ├── nosotros/
        │   ├── index.astro          # ruta "/nosotros"
        │   └── \_sections/
        │       ├── 01-Hero.astro
        │       └── 02-….astro
        ├── tratamientos/
        │   ├── index.astro          # ruta "/tratamientos" (listado)
        │   ├── \_sections/           # secciones del listado
        │   ├── implantes/
        │   │   ├── index.astro      # ruta "/tratamientos/implantes"
        │   │   └── \_sections/
        │   │       ├── 01-Hero.astro
        │   │       └── 02-….astro
        │   └── ortodoncia/
        │       ├── index.astro
        │       └── \_sections/
        ├── contacto/
        │   ├── index.astro
        │   └── \_sections/
        ├── 404.astro
        ├── robots.txt.ts            # endpoint → /robots.txt
        └── llms.txt.ts              # endpoint → /llms.txt
```

### Regla clave de `pages/` (no romperla)

En Astro **todo archivo dentro de `src/pages/` se convierte en ruta**, salvo los que empiezan por guion bajo. Por eso:

* Cada página es una carpeta con su `index.astro` (la ruta) y una subcarpeta **`\_sections/`** con sus secciones. El `\_` impide que las secciones se publiquen como URLs.
* La home es la excepción obligada: su ruta debe ser `pages/index.astro`, y sus secciones van en **`pages/\_home/`**.
* El `index.astro` de cada página solo importa el layout y ensambla las secciones en orden. No contiene maquetación propia.
* Archivos de sección: `NN-NombreDescriptivo.astro` (PascalCase, prefijo con el orden de Figma: `01-Hero.astro`, `02-Beneficios.astro`).
* Si una sección aparece en **dos o más páginas**, se mueve a `src/components/sections/` y se parametriza con props. No se duplica.
* Cada tratamiento tiene su propia carpeta. Sus datos de resumen (nombre, slug, descripción corta, imagen) salen de `src/data/tratamientos.ts`, que alimenta el listado, el menú, el sitemap y el llms.txt. Al crear un tratamiento nuevo, se añade su carpeta **y** su entrada en `tratamientos.ts`.

Ejemplo de `index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from './\_sections/01-Hero.astro';
import Beneficios from './\_sections/02-Beneficios.astro';
import CtaCita from '@/components/sections/CtaCita.astro';
---
<BaseLayout title="Implantes dentales | \[Clínica]" description="…">
  <Hero />
  <Beneficios />
  <CtaCita />
</BaseLayout>
```

Configurar el alias `@/\*` → `src/\*` en `tsconfig.json`.

\---

## 4\. Tokens de diseño

### 4.1 Paleta (Blue)

**Fuente de verdad: los valores HEX.** En la hoja de Figma los valores `rgb()` y los ratios de contraste impresos de varias filas no corresponden al HEX (vienen de una versión anterior de la paleta). Usar siempre el HEX y la tabla de contraste de abajo, recalculada sobre el HEX.

|Token|HEX|Contraste texto negro|Contraste texto blanco|
|-|-|-|-|
|`blue-light`|`#F4FAFC`|19.93|1.05|
|`blue-light-hover`|`#EFF7FB`|19.37|1.08|
|`blue-light-active`|`#ACDFF0`|14.57|1.44|
|`blue-normal`|`#8EC7E1`|11.41|1.84|
|`blue-normal-hover`|`#6DA7CB`|8.04|2.61|
|`blue-normal-active`|`#5088B3`|5.51|3.81|
|`blue-dark`|`#396996`|3.64|5.78|
|`blue-dark-hover`|`#2A5685`|2.77|7.59|
|`blue-dark-active`|`#174075`|2.03|10.36|
|`blue-darker`|`#10396F`|1.84|11.43|

Reglas de uso de contraste (WCAG AA: 4.5 texto normal, 3 texto grande ≥24 px o ≥18.66 px bold):

* Fondos `light`, `light-hover`, `light-active`, `normal` → texto `blue-darker` (≥6.2) o negro.
* `normal-hover` → texto `blue-darker` solo en texto grande (4.38); negro sirve para todo.
* `normal-active` → texto blanco **solo** en texto grande (3.81); para texto normal usar negro.
* `dark`, `dark-hover`, `dark-active`, `darker` → texto blanco.
* `blue-dark` sobre `blue-light` o blanco pasa AA (\~5.5) para texto normal.
* Nunca poner texto blanco sobre `light\*` ni `normal`.

Los estados `:hover` / `:active` de la paleta se usan literalmente para esos estados en botones, links y tarjetas interactivas.

Si Figma usa colores fuera de esta paleta (blancos, grises, negros de texto), **extraerlos del Figma y añadirlos como tokens**; no inventar tonos.

### 4.2 Tipografías

* **Creato Display** — no está en Google Fonts. Self-hosted en `public/fonts/creato-display/`, en `.woff2`, todas las variantes desde Light (300) hasta la más pesada disponible, con sus itálicas. Se declara con `@font-face` en `global.css`, `font-display: swap`. Precargar en `BaseLayout` solo las 1–2 variantes que se ven above the fold.
* **Cormorant Garamond** — Google Fonts, ejes `ital,wght@0,300..700;1,300..700`. Cargar con `<link>` en el `<head>` de `BaseLayout` (con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`), **no** con `@import` dentro del CSS, para no encadenar peticiones bloqueantes:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700\&display=swap" rel="stylesheet" />
```

Tokens: `--font-sans` = Creato Display, `--font-serif` = Cormorant Garamond, ambos con fallbacks reales del sistema. El rol de cada familia (titulares, cuerpo, acentos) se toma del Figma sección por sección; no asumirlo.

Plantilla de `@font-face` (repetir por peso/estilo según los archivos que existan en la carpeta; revisar los nombres reales antes de escribirlos):

```css
@font-face {
  font-family: 'Creato Display';
  src: url('/fonts/creato-display/CreatoDisplay-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
```

### 4.3 Declaración en Tailwind v4

Los tokens viven en `@theme` dentro de `global.css`. Se eliminan los azules por defecto de Tailwind para que solo existan los de marca:

```css
@import "tailwindcss";

@theme {
  --color-blue-\*: initial;

  --color-blue-light: #F4FAFC;
  --color-blue-light-hover: #EFF7FB;
  --color-blue-light-active: #ACDFF0;
  --color-blue-normal: #8EC7E1;
  --color-blue-normal-hover: #6DA7CB;
  --color-blue-normal-active: #5088B3;
  --color-blue-dark: #396996;
  --color-blue-dark-hover: #2A5685;
  --color-blue-dark-active: #174075;
  --color-blue-darker: #10396F;

  --font-sans: 'Creato Display', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Cormorant Garamond', ui-serif, Georgia, serif;

  --breakpoint-3xl: 120rem; /\* 1920px \*/

  /\* Tipografía y espaciado fluidos: ver §6 \*/
}
```

Uso: `bg-blue-light`, `text-blue-darker`, `hover:bg-blue-dark-hover`, `font-serif`…

\---

## 5\. Reglas de CSS

**Tailwind para layout y utilidades; CSS propio para lo complejo** (degradados, animaciones, keyframes, transiciones elaboradas, máscaras, pseudo‑elementos decorativos).

* Se empieza con **un solo archivo: `src/styles/global.css`**, que contiene en este orden:

  1. `@import "tailwindcss";`
  2. `@font-face` de Creato Display
  3. `@theme` (tokens)
  4. `@layer base` — reset mínimo, `html`/`body`, tipografía base, `:focus-visible`, `::selection`
  5. `@layer components` — piezas reciclables: `.container-site`, `.btn`, `.btn-primary`, `.section`, títulos, degradados reutilizables
  6. `@utility` — utilidades propias de Tailwind v4 cuando se repitan
  7. `@keyframes` y animaciones compartidas
  8. `@media (prefers-reduced-motion: reduce)` global
* **Crear un CSS nuevo solo si hace falta de verdad**: cuando un bloque temático crece (p. ej. `styles/animations.css` si hay muchas animaciones, `styles/forms.css` si hay formularios complejos). Se importa desde `global.css` y se documenta en §12.
* Estilos que solo usa **un componente** → `<style>` dentro del `.astro` (queda scoped). No van a `global.css`.
* Nada de valores sueltos repetidos: si un color, sombra, radio o espaciado aparece dos veces, se vuelve token.
* No usar `!important`. No usar IDs para estilos. Evitar clases que se pisen entre sí (especificidad plana).
* Orden de clases Tailwind legible: layout → caja → tipografía → color → estados → responsive. Si una lista de clases supera \~12 utilidades y se repite, se extrae a `@layer components`.

\---

## 6\. Responsive fluido (desde un diseño de 1440 px)

El Figma a 1440 px es la **referencia exacta de desktop**. Desde ahí, Claude adapta cada sección hacia arriba y hacia abajo mientras la construye, no al final.

### Patrón de escalado por defecto (aplicar SIEMPRE, salvo excepción explícita)

Toda sección se construye **full-bleed y escalando de forma proporcional**, de modo que en portátiles y en pantallas grandes de 22"/24"+ se vea fiel al diseño de Figma (1440):

* **Full-bleed**: la sección ocupa el 100 % del ancho, sin cap a 1440. Los márgenes laterales se resuelven con el token `--gutter` (30 px en Figma), no con `max-width`.
* **Escala proporcional que NO se congela en 1440**: tipografía, espaciados y medidas usan `clamp()` cuyo máximo se sitúa por encima de 1440 (p. ej. el valor a ~1920–2240), para que sigan creciendo en pantallas grandes. El hero (`_home/01-Hero.astro`) es la referencia canónica.
* La **excepción** (una sección centrada con `max-width`, o con tipografía congelada en 1440) solo se aplica si Juanca lo indica expresamente para esa sección.

### Dispositivos objetivo

|Rango|Dispositivo|Qué cuidar|
|-|-|-|
|≥ 1920 px (`3xl`)|Monitores 22"/24"|Full-bleed a sangre completa; tipografía y medidas **siguen creciendo** (no se congelan) para verse fiel a Figma; nada estirado ni pixelado|
|1440 px|Diseño Figma|Fidelidad al píxel|
|1280–1536 px (`xl`/`2xl`)|Portátiles y monitores \~19" (a menudo con escalado de Windows al 125 %, ≈1536×864)|**Poca altura**: heros con `100svh` deben caber en \~700–860 px de alto|
|1024–1279 px (`lg`)|Portátiles pequeños, tablet horizontal|Rejillas de 3–4 columnas pasan a 2–3|
|768–1023 px (`md`)|Tablet vertical|Menú hamburguesa desde aquí hacia abajo (confirmar según el ancho real del nav)|
|360–767 px|Móvil|Una columna, targets táctiles ≥ 44 px, nada de scroll horizontal|

### Estrategia

1. **Fluido primero, breakpoints después.** Tipografía, espaciados verticales y gaps se escalan con `clamp()` entre 375 px y 1440 px. Los breakpoints se reservan para cambios de **estructura** (columnas, orden, mostrar/ocultar).
2. **Tailwind es mobile‑first**: la clase base es móvil y se sube con `md:`, `lg:`, `xl:`. Al traducir Figma, los valores de 1440 suelen quedar en `xl:`/`2xl:` o dentro del `clamp()`.
3. Por encima de 1440 los tamaños fluidos **siguen creciendo de forma proporcional** (no se congelan): el máximo del `clamp()` se sitúa por encima de 1440 (valor a ~1920–2240). El diseño es full-bleed (sin cap a 1440); el ancho lo ordenan el token `--gutter` y las medidas relativas, no un contenedor centrado. Ver "Patrón de escalado por defecto" arriba.
4. Contenedor único reutilizable:

```css
@layer components {
  .container-site {
    width: 100%;
    max-width: 90rem;                                  /\* 1440 \*/
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 0.5rem + 3.2vw, 7.5rem); /\* ajustar el máximo al margen real de Figma \*/
  }
}
```

5. **Fórmula de `clamp()`** (Figma a 1440 = máximo, valor móvil a 375 = mínimo):

```
pendiente  = (max − min) / (1440 − 375)
intercepto = min − pendiente × 375
clamp(min\_rem, intercepto\_rem + (pendiente × 100)vw, max\_rem)
```

Ejemplo: titular de 72 px en Figma, 40 px en móvil. La pendiente/intercepto se
calculan con el ancla de 1440, pero el **máximo se eleva** por encima del valor de
Figma para que siga creciendo en pantallas grandes (aquí ~96 px):
`clamp(2.5rem, 1.796rem + 3.005vw, 6rem)`

Estos valores se guardan como tokens en `@theme` (`--text-display`, `--text-h1`, `--text-h2`…, `--spacing-section`…) a medida que aparecen en el Figma. No se calculan ad hoc en cada componente.

6. Unidades: `rem` para tipografía y espaciado (1 rem = 16 px), `%`/`fr`/`minmax()` para rejillas, `svh`/`dvh` en lugar de `vh` para alturas de pantalla completa. Imágenes siempre con `max-width: 100%` y `aspect-ratio` o dimensiones para evitar CLS.
7. Longitud de línea del texto corrido ≤ \~75 caracteres (`max-w-\[65ch]` o similar).
8. Verificar cada sección terminada en: **375, 768, 1024, 1280, 1366×768, 1440, 1536×864 y 1920**. Sin scroll horizontal, sin textos cortados, sin solapes.

\---

## 7\. Componentes y convenciones de código

* Componentes en PascalCase (`Button.astro`). Props tipadas con `interface Props`.
* Un componente = una responsabilidad. Si una sección pasa de \~150 líneas, extraer subcomponentes.
* HTML semántico: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<article>`, `<footer>`. **Un solo `<h1>` por página** y jerarquía de encabezados sin saltos.
* Botones que navegan son `<a>`; acciones son `<button>`.
* Textos en el componente solo si son exclusivos de esa sección; si se repiten, a `src/data/`.
* Nombres de clases, variables y archivos en inglés o español, pero **consistentes**: carpetas de páginas y slugs en español (coinciden con las URLs), código en inglés.
* Comentarios solo donde el porqué no sea obvio.

\---

## 8\. Imágenes

* Toda imagen de contenido pasa por `astro:assets` desde `src/assets/images/<página>/`. `public/` solo para favicon, OG y archivos que deben servirse tal cual.
* Siempre `alt` descriptivo en español (vacío `alt=""` solo si es decorativa).
* La imagen del hero: `loading="eager"` y `fetchpriority="high"`. El resto, lazy (por defecto).
* Definir `widths` / `sizes` coherentes con el layout fluido.
* SVG de iconos inline o como componente, con `aria-hidden="true"` si son decorativos.

\---

## 9\. Animaciones y transiciones

* Hechas en CSS (keyframes, transitions). JavaScript solo para disparar clases (p. ej. `IntersectionObserver` para revelar al hacer scroll), en un `<script>` pequeño y compartido.
* Preferir una o pocas animaciones intencionadas por página antes que efectos en todos los bloques.
* Animar solo `transform` y `opacity` (evitar animar `width`, `height`, `top`, `box-shadow` pesados).
* Duraciones y curvas como tokens (`--ease-out-soft`, `--duration-base`…).
* Respetar siempre `prefers-reduced-motion: reduce` (desactivar o reducir).

\---

## 10\. SEO y archivos para buscadores / IA

### 10.1 Por página

`Seo.astro` recibe `title`, `description`, `image?`, `noindex?` y genera: `<title>`, meta description, canonical, Open Graph, Twitter card. Títulos ≤ 60 caracteres, descripciones ≤ 155.

### 10.2 Datos estructurados

`SchemaDentist.astro` inserta JSON‑LD `Dentist` (subtipo de `LocalBusiness`) en todas las páginas con nombre, dirección, teléfono, horarios, geo, URL y redes, todo leído de `src/data/site.ts`. En páginas de tratamiento, añadir `MedicalProcedure` o `Service` y, si hay FAQ, `FAQPage`.

### 10.3 Sitemap

`@astrojs/sitemap` en `astro.config.mjs`, con `site` configurado. Genera `/sitemap-index.xml` automáticamente con todas las rutas (las carpetas `\_` quedan fuera). Excluir con `filter` páginas como `404` o gracias.

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://DOMINIO.com',
  trailingSlash: 'never',
  integrations: \[sitemap({ filter: (page) => !page.includes('/404') })],
  vite: { plugins: \[tailwindcss()] },
});
```

### 10.4 robots.txt — `src/pages/robots.txt.ts`

```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(
`User-agent: \*
Allow: /

Sitemap: ${sitemap}
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
```

### 10.5 llms.txt — `src/pages/llms.txt.ts`

Nombre estándar: **`/llms.txt`** (propuesta llmstxt.org). Se genera desde `src/data/` para que nunca quede desactualizado. Formato Markdown:

```
# \[Nombre de la clínica]

> Resumen de una o dos frases: qué es, dónde está, qué ofrece.

Datos clave: dirección, teléfono, horario, idiomas.

## Páginas principales
- \[Inicio](https://DOMINIO.com/): …
- \[Nosotros](https://DOMINIO.com/nosotros): …
- \[Contacto](https://DOMINIO.com/contacto): …

## Tratamientos
- \[Implantes](https://DOMINIO.com/tratamientos/implantes): descripción corta
- … (uno por entrada de tratamientos.ts)
```

Servir con `Content-Type: text/plain; charset=utf-8`.

\---

## 11\. Accesibilidad y rendimiento (mínimos no negociables)

* Contraste AA según la tabla de §4.1.
* `:focus-visible` visible y coherente con la marca en todo elemento interactivo.
* Navegación completa por teclado, incluido el menú móvil (`aria-expanded`, cierre con Escape, foco atrapado mientras está abierto).
* Link "Saltar al contenido" al inicio del `<body>`.
* Formularios con `<label>` asociado, mensajes de error claros.
* Objetivo Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO (móvil). Sin CLS visible; LCP del hero optimizado.

\---

## 12\. Flujo de trabajo con Claude

1. Se trabaja **sección por sección**, en el orden del Figma. Juanca comparte captura y/o medidas de la sección (o el enlace si hay conexión con Figma disponible).
2. Antes de maquetar, Claude identifica: tokens nuevos (tamaños de texto, espaciados, colores fuera de paleta), componentes reutilizables existentes y si la sección ya existe en otra página.
3. Construye la sección fiel a 1440 px y resuelve el responsive en la misma tarea (§6).
4. **No inventar contenido.** Si falta texto, imagen o dato, usar un marcador claro (`\[TEXTO PENDIENTE]`) y avisarlo.
5. Si una medida del Figma parece un error (p. ej. un margen de 37 px entre elementos que deberían ir a 40), preguntar o normalizar al token más cercano y avisarlo.
6. Al terminar cada sección: `npm run build` y `npx astro check` sin errores, y revisión en los anchos de §6.
7. Si se toma una decisión de arquitectura (nuevo CSS, nuevo componente compartido, cambio de convención), anotarla en §13.

### Lo que Claude NO debe hacer

* Crear rutas accidentales: nada en `src/pages/` sin `\_` salvo `index.astro`, `404.astro` y los endpoints `.ts`.
* Duplicar secciones entre páginas en lugar de moverlas a `components/sections/`.
* Usar colores de Tailwind por defecto o valores HEX sueltos fuera de los tokens.
* Cargar fuentes con `@import` en CSS o desde CDNs distintos a los definidos.
* Añadir librerías (UI, animación, iconos) sin consultarlo.
* Usar `vh` para alturas de pantalla completa, `!important` o estilos en línea.

\---

## 13\. Registro de decisiones

|Fecha|Decisión|
|-|-|
|—|Paleta: HEX como fuente de verdad; ratios de contraste recalculados (los `rgb()` del Figma no coinciden).|
|—|Secciones en `\_sections/` (y `\_home/`) para que Astro no las publique como rutas.|
|—|Cormorant Garamond por `<link>` en el head; Creato Display self-hosted en woff2.|
|2026-09-23|Imágenes de `src/assets/` referenciadas por slug vía `@/lib/images.ts` (`img('slug')`), sin `import` por archivo. Nombres de archivo únicos.|
|2026-09-23|Hero: tokens fluidos `--text-display`, `--text-lead`, `--text-rating`, `--radius-media`; superficies "glass" (`--color-surface-glass`, `--color-border-glass`) y sombras (`--shadow-badge/glass/btn`).|
|2026-09-23|Botones: variantes reutilizables `.btn-secondary` (glass) y `.btn-sm` (compacto ~32px) en `@layer components`.|
|2026-09-23|`--color-rating-star: #FFCC00` — único color fuera de la paleta Blue, aprobado, exclusivo para las estrellas de reseñas de Google.|
|2026-09-23|Header y hero **full-bleed** (sin cap a 1440): margen lateral 30px (`--gutter`), foto a 50% con 10px de aire dcha/arriba/abajo. Debe verse igual en portátil y en pantallas de 22"/24".|
|2026-09-23|Header `position: fixed` + fondo transparente sobre el hero; blanco con sombra al hacer scroll (`.is-scrolled`). La foto del hero sube hasta arriba tras el header.|
|2026-09-23|**Estándar del proyecto (§6):** todas las secciones son full-bleed y escalan de forma proporcional sin congelarse en 1440 (siguen creciendo en 22"/24"+). El hero es la referencia. Excepción solo si Juanca lo indica por sección.|
|2026-09-23|Hero: `<h1>` = "Clínica Dental Dentinos en Teatinos, Málaga" (la píldora); el titular grande "Implantes…" es `<p>`. Titular y entradilla comparten ancho (`--hero-measure`).|
|2026-09-23|CTA "Agendar Cita" + "Teleconsulta" extraídos a componente reutilizable `components/ui/CtaButtons.astro` (prop `size`: `lg` hero / `sm` compacto). Usado en hero y en Sobre nosotros.|
|2026-09-23|Botones: `.btn-xs` (12px, radio 15px) para CTA dentro de bloques de texto; `.btn-sm`/`.btn-xs` con `min-height: 44px` en móvil (área táctil, §11).|
|2026-09-23|Eyebrow/etiqueta de sección: clase reutilizable `.eyebrow` (10px @1440 vía `--text-eyebrow`, padding `0.6em 1.5em` = 6px/15px que escala con la fuente). Usar en todas las secciones que lleven ese titulito.|
|2026-09-23|Sección "Sobre nosotros" (`_home/02-SobreNosotros.astro`): `<h2>` = "Clínica moderna y acogedora" (itálica), píldora "Sobre nosotros" como eyebrow. El cuerpo largo repetido de Figma era relleno → 1 párrafo real + marcador `[TEXTO PENDIENTE]`. CTA al mismo tamaño que el hero (`CtaButtons size="lg"`).|



