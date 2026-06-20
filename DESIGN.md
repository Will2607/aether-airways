# AetherAirways — Design Document

> **Versión:** 1.0  
> **Fecha:** Junio 2026  
> **Rol:** Senior Product Designer + Staff Frontend Engineer  
> **Alcance:** Landing Page completa — diseño previo a la implementación

---

## Filosofía de diseño

AetherAirways no es una aerolínea de bajo costo ni una aerolínea legacy. Es una marca **premium, moderna y humana** — donde volar se siente como un privilegio, no como una transacción.

La referencia visual no es otra aerolínea. Es **Apple** en su obsesión por el detalle, **Stripe** en su claridad funcional, **Linear** en su densidad de información sin ruido, **Vercel** en su uso del espacio negativo y **Airbnb** en su calidez.

### Principios que guían cada decisión

1. **Claridad sobre complejidad** — cada elemento gana su espacio.
2. **Movimiento con propósito** — las animaciones comunican estado, no decoran.
3. **Confianza a través de la consistencia** — mismos patrones, misma respuesta.
4. **Accesibilidad como base, no como capa** — WCAG AA mínimo en todo.
5. **Mobile-first siempre** — la pantalla pequeña obliga a priorizar.

---

## 1. Design System

### 1.1 Paleta de colores

La paleta se construye sobre un azul noche profundo como color dominante, complementado con un dorado suave que evoca exclusividad sin ser ostentoso. El sistema es oscuro por naturaleza — no como moda, sino porque los viajes se planifican de noche, y porque el espacio (aether = éter) es oscuro.

```
Primitivos

  Aether Blue
  ──────────────────────────────────
  50   #EBF0FF   (fondos sutiles)
  100  #C7D4FF
  200  #9AB3FF
  300  #6B8FFF
  400  #3D6AFF
  500  #1A4BF5   (acción primaria)
  600  #133BD4
  700  #0D2CA8
  800  #081F7C
  900  #041352
  950  #020A30   (fondo principal dark)

  Aether Gold
  ──────────────────────────────────
  300  #FFE5A0
  400  #FFD566
  500  #FFC72C   (acento premium)
  600  #E0A800

  Neutral
  ──────────────────────────────────
  0    #FFFFFF
  50   #F9FAFB
  100  #F3F4F6
  200  #E5E7EB
  300  #D1D5DB
  400  #9CA3AF
  500  #6B7280
  600  #4B5563
  700  #374151
  800  #1F2937
  900  #111827
  950  #090E18

  Semánticos

  Success   #22C55E  (green-500)
  Warning   #F59E0B  (amber-500)
  Error     #EF4444  (red-500)
  Info      #3B82F6  (blue-500)
```

**Tokens de uso**

| Token | Valor | Uso |
|---|---|---|
| `bg-surface` | Neutral 950 | Fondo base (dark mode) |
| `bg-card` | Neutral 900 | Tarjetas y paneles |
| `bg-elevated` | Neutral 800 | Modales, dropdowns |
| `text-primary` | Neutral 50 | Texto principal |
| `text-secondary` | Neutral 400 | Texto secundario |
| `text-muted` | Neutral 600 | Placeholders, labels |
| `border-subtle` | Neutral 800 | Bordes en dark |
| `accent-primary` | Aether Blue 500 | CTAs, links activos |
| `accent-gold` | Aether Gold 500 | Badges premium, highlights |

**Decisión UX:** El modo oscuro no es opcional — es el modo por defecto. Reduce la fatiga visual en planificación nocturna de viajes, hace que las fotografías de destinos destaquen más (contraste vivo), y posiciona la marca como moderna desde el primer render.

---

### 1.2 Tipografía

```
Display / Headings:    Inter (variable) — pesos 400, 500, 600, 700, 800
Body:                  Inter (variable) — pesos 400, 500
Mono (precios, códigos IATA): JetBrains Mono — peso 400, 600
```

**Escala tipográfica (Desktop)**

| Nombre | Tamaño | Peso | Line-height | Uso |
|---|---|---|---|---|
| `display-2xl` | 72px | 800 | 1.05 | Hero headline |
| `display-xl` | 56px | 700 | 1.1 | Section headline |
| `display-lg` | 40px | 700 | 1.15 | Sub-headline |
| `heading-xl` | 32px | 600 | 1.2 | Card headers |
| `heading-lg` | 24px | 600 | 1.3 | Sub-secciones |
| `heading-md` | 20px | 600 | 1.35 | Item titles |
| `body-lg` | 18px | 400 | 1.6 | Body text, descripciones |
| `body-md` | 16px | 400 | 1.6 | Body general |
| `body-sm` | 14px | 400 | 1.5 | Captions, labels |
| `label-lg` | 14px | 500 | 1.2 | Form labels, nav |
| `label-sm` | 12px | 500 | 1.2 | Badges, tags |
| `mono-lg` | 18px | 600 | 1.0 | Precios |
| `mono-md` | 14px | 400 | 1.0 | Códigos IATA, PNR |

**Escala Mobile:** Reducir display-2xl → 40px, display-xl → 32px, mantener body igual.

---

### 1.3 Espaciado

Sistema de 4px como unidad base. Los espaciados clave del layout:

```
4px   — micro (entre íconos y texto)
8px   — xs (padding interno de badges)
12px  — sm (gap entre elementos en fila)
16px  — md (padding de inputs, gap de cards)
24px  — lg (padding de secciones internas)
32px  — xl (gap entre columnas)
48px  — 2xl (separación entre secciones menores)
64px  — 3xl (separación entre secciones mayores)
96px  — 4xl (padding vertical de secciones principales)
128px — 5xl (hero padding top)
```

**Max-width del contenido:** `1280px` centrado con padding horizontal de `24px` (mobile) / `48px` (tablet) / `80px` (desktop).

---

### 1.4 Bordes y sombras

```
Radius
  xs     2px   — badges internos
  sm     4px   — inputs, botones pequeños
  md     8px   — cards
  lg     12px  — paneles, modales
  xl     16px  — hero cards
  2xl    24px  — search panel
  full   9999px — pills, avatares

Sombras (dark-mode)
  subtle   0 1px 2px rgba(0,0,0,0.3)
  card     0 4px 16px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)
  elevated 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)
  glow     0 0 24px rgba(26,75,245,0.35)  — efecto glow en foco/hover CTA
```

---

### 1.5 Motion

Filosofía: **fast-in, slow-out**. Los elementos entran rápido y salen lento — como los vuelos.

```
Duraciones
  instant    0ms    — sin transición (toggles de estado)
  fast       100ms  — hover, focus rings
  normal     200ms  — transiciones de color, opacidad
  moderate   300ms  — paneles, acordeones
  slow       500ms  — entrada de secciones (scroll-triggered)
  cinematic  800ms  — hero entrance, transiciones de página

Curvas
  ease-default   cubic-bezier(0.4, 0, 0.2, 1)  — movimientos generales
  ease-spring    cubic-bezier(0.34, 1.56, 0.64, 1)  — elementos que "pop"
  ease-in-out    cubic-bezier(0.4, 0, 0.6, 1)  — acordeones, drawers
  ease-out       cubic-bezier(0, 0, 0.2, 1)    — entrada de elementos

Principio de accesibilidad:
  prefers-reduced-motion: reduce → todas las animaciones a 0ms o mínimas
```

---

### 1.6 Iconografía

Librería base: **Lucide React** — líneal, consistente, 24px por defecto.  
Iconos de aerolínea custom: SVGs propios en `assets/svgs/` (avión, asiento, equipaje, destino).  
Tamaños: `16px` (inline), `20px` (UI), `24px` (acciones), `32px` (ilustraciones pequeñas).

---

## 2. Componentes del Design System

Estos son los componentes reutilizables que emergen del diseño de la landing. Se implementarán en `shared/ui/`.

| Componente | Descripción | Variantes |
|---|---|---|
| `Button` | CTA primario y acciones | `primary`, `secondary`, `ghost`, `destructive`, `link`; tallas `sm`, `md`, `lg` |
| `Badge` | Etiquetas de estado o categoría | `default`, `success`, `warning`, `error`, `gold` (premium) |
| `Input` | Campo de texto | `default`, `search`, `with-icon` |
| `Combobox` | Selector con búsqueda | Para aeropuertos |
| `DatePicker` | Selector de fecha | Single y range |
| `Counter` | Incremento/decremento numérico | Para pasajeros |
| `Card` | Contenedor visual | `default`, `interactive`, `highlighted` |
| `Tabs` | Navegación por pestañas | Horizontal, pill-style |
| `Accordion` | Contenido colapsable | Para FAQ |
| `Avatar` | Foto de perfil o placeholder | `sm`, `md`, `lg` |
| `StarRating` | Rating visual | Read-only, Interactive |
| `Skeleton` | Loading placeholder | Match al shape del contenido |
| `Divider` | Separador visual | Horizontal, con label |
| `Tag` | Filtro seleccionable | Toggle state |
| `ProgressBar` | Barra de progreso | Linear, segmentada |
| `Tooltip` | Texto de ayuda contextual | En hover/focus |

---

## 3. Layout General

### Grid system

- Desktop: 12 columnas, gap `32px`
- Tablet: 8 columnas, gap `24px`  
- Mobile: 4 columnas, gap `16px`

### Breakpoints

```
mobile   0px     — 767px   (base)
tablet   768px   — 1023px
desktop  1024px  — 1279px
wide     1280px+
```

---

## 4. Secciones de la Landing Page

---

### 4.1 Navbar

**Objetivo de negocio**  
Dar acceso a las rutas más importantes y anclar la marca en cada scroll. Convertir visitantes en usuarios registrados mediante un CTA visible de "Iniciar sesión / Registrarse".

**Estructura visual**

```
[Logo AetherAirways]   [Vuelos] [Destinos] [Ofertas] [Programa Aether+]   [ES/EN] [Iniciar sesión] [Registrarse →]
```

**Comportamiento por scroll**

- `0px`: Navbar transparente, sin background. Logo y texto en blanco. Funde con el Hero.
- `> 80px`: Transición a `bg-surface/95` con `backdrop-blur-md`. Aparece borde inferior sutil. Sombra suave. Duración: `200ms ease-out`.
- `scroll-up` desde zona media: Navbar reaparece (sticky con detección de dirección de scroll — "hide on scroll down, show on scroll up").

**Componentes necesarios**

- `Logo` — SVG inline + wordmark en Inter 700.
- `NavLink` — item de navegación con estado `active` (underline azul, `2px` bajo el texto).
- `LanguageSwitcher` — dropdown minimalista.
- `Button` variante `ghost` para "Iniciar sesión".
- `Button` variante `primary` para "Registrarse".
- `MobileMenuButton` — hamburger icon que abre un drawer.

**Responsive**

- **Desktop:** Navbar horizontal completo como se describe.
- **Tablet:** Logo + links principales visibles (3 máximo) + hamburger para el resto.
- **Mobile:** Logo + hamburger. Al abrir: full-screen drawer desde la derecha con links apilados verticalmente, CTA al final del drawer.

**Microinteracciones**

- Hover en NavLinks: el texto sube `1px` con `translateY(-1px)` y el underline aparece desde el centro hacia los lados (`scaleX` de 0 a 1, `200ms`).
- Hover en botón "Registrarse": glow azul sutil (`box-shadow` con `opacity` de 0 a 1).
- MobileMenu: el drawer entra desde `translateX(100%)` a `0` con `300ms ease-in-out`. El fondo se cubre con un overlay `bg-black/60` con `backdrop-blur-sm`.
- Los 3 trazos del hamburger se transforman en una X con rotación y escala (`300ms`).

**Accesibilidad**

- `role="navigation"` + `aria-label="Main navigation"`.
- Links accesibles por teclado con `Tab`, estado `focus-visible` con `outline` azul de `2px` a `offset 2px`.
- MobileMenu: `aria-expanded`, `aria-controls`, trap de foco dentro del drawer cuando está abierto. `Escape` cierra.
- Skip link: `"Skip to main content"` visible al primer `Tab` desde el `body`.

---

### 4.2 Hero Section

**Objetivo de negocio**  
Primera impresión. Establecer la identidad premium de la marca, transmitir destino y aspiración, y llevar al usuario directamente al Flight Search.

**Estructura visual**

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Video o imagen fullscreen de destino premium — opacity 40%]        │
│                                                                      │
│                                                                      │
│         Fly Beyond                                                   │
│         the Horizon.                                                 │
│                                                                      │
│    Discover a new era of travel. Premium flights,                    │
│    seamless booking, and destinations that inspire.                  │
│                                                                      │
│         [Scroll down ↓]                                              │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    FLIGHT SEARCH PANEL                       │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

**Decisiones de diseño**

- **Altura:** `100svh` (safe viewport height) para evitar el gap en mobile browsers.
- **Background:** Video corto (5-10s, loop, muted, autoplay) de un avión en vuelo sobre nubes iluminadas por el sol. Fallback: imagen estática con `object-fit: cover`. Overlay `linear-gradient` desde `bg-surface/0` en top a `bg-surface/80` en bottom (para que el search panel tenga legibilidad).
- **Headline:** "Fly Beyond the Horizon." en `display-2xl` (72px desktop). La palabra "Beyond" en color `accent-gold`. No es un slogan corporativo — es una invitación.
- **Sub-headline:** Una línea, máximo 100 caracteres. Describe la promesa de valor, no las features.
- **Scroll indicator:** Ícono de chevron animado en loop (bounce suave, `1.5s ease-in-out infinite`). Desaparece al hacer scroll (`opacity: 0` con `200ms`).
- **Posición del texto:** `padding-top: 180px` desde top (debajo del navbar). Centrado horizontal. El search panel empuja el contenido hacia arriba con un gap de `48px`.

**Responsive**

- **Desktop:** Texto centrado, search panel ancho total del contenedor (max `960px`).
- **Tablet:** Texto 36px, search panel comprimido con pestañas apiladas.
- **Mobile:** Texto 32px. El search panel ocupa el ancho completo y es el elemento dominante — el texto queda en segundo plano.

**Animación de entrada (cinematográfica)**

Al cargar la página:
1. El background aparece con `fadeIn` en `800ms`.
2. El headline entra con `fadeInUp` (`translateY(24px)` → `0`, `opacity 0 → 1`) en `600ms` con `delay: 200ms`.
3. El sub-headline entra igual con `delay: 400ms`.
4. El search panel entra con `fadeInUp` y `delay: 600ms`.

**Accesibilidad**

- El video tiene `aria-hidden="true"` — es decorativo.
- `prefers-reduced-motion`: el video se pausa, las animaciones de entrada se eliminan.
- El contraste de texto sobre el overlay debe pasar WCAG AA (ratio ≥ 4.5:1). Verificar con overlay al 70% mínimo.

---

### 4.3 Flight Search Panel

**Objetivo de negocio**  
La acción central de todo el sitio. La conversión principal. Debe ser inmediata, sin fricción y visualmente integrada al Hero.

**Estructura visual**

```
┌─────────────────────────────────────────────────────────────────────┐
│  [One Way]  [Round Trip]  [Multi-city]                              │
│─────────────────────────────────────────────────────────────────────│
│  [✈ From — Origin IATA]  [⇄]  [✈ To — Destination IATA]           │
│  [📅 Departure]  [📅 Return]  [👤 Passengers & Class]  [SEARCH →]  │
└─────────────────────────────────────────────────────────────────────┘
```

**Diseño del panel**

- Fondo: `bg-card` (`Neutral 900`) con `border border-subtle` y `border-radius: 2xl (24px)`.
- Padding interno: `32px` desktop, `24px` tablet, `16px` mobile.
- Sombra: `elevated` — crea profundidad sobre el hero.
- `backdrop-blur-sm` sutil para integrarse visualmente con el fondo.

**Pestañas de tipo de viaje**

- Tabs estilo pill. La tab activa tiene `bg-accent-primary` con texto blanco.
- Inactivas: `ghost` con texto `text-secondary`. Hover: `bg-elevated`.
- Transición de la tab activa: la pill se desliza bajo la tab seleccionada como un "sliding indicator" (`200ms ease`).

**Campos**

- **Origin / Destination (`Combobox`):** Al escribir, aparece un dropdown con aeropuertos sugeridos (nombre + código IATA en mono, ciudad + país en secondary). Máx. 6 resultados. El botón `⇄` swap intercambia origen y destino con una animación de rotación (`180deg`, `300ms ease-spring`).
- **Departure / Return (`DatePicker`):** Abre un calendario inline en un popover. En round-trip, el rango se selecciona como un span continuo (los días entre las fechas se colorean con `accent-primary/20`).
- **Passengers & Class:** Dropdown con contador para adultos, niños e infantes, y un selector de clase de cabina. El valor resumido se muestra como "2 Adults · Business".
- **Botón Search:** `Button` variante `primary`, tamaño `lg`. Texto "Search Flights". Ícono de avión a la derecha. Al hacer hover: glow azul. Al hacer click: el botón muestra un spinner y el texto cambia a "Searching…".

**Responsive**

- **Desktop:** Una sola fila horizontal.
- **Tablet:** Dos filas — origin/destination en la primera, fechas + pasajeros en la segunda, botón full-width al final.
- **Mobile:** Stack vertical completo. Cada campo ocupa el ancho completo. El botón es `fixed bottom-0` mientras el usuario llena el formulario (sticky CTA).

**Microinteracciones**

- Los campos muestran un `focus ring` azul (`box-shadow: 0 0 0 3px rgba(26,75,245,0.3)`).
- Al seleccionar un aeropuerto, el campo hace un breve flash de `bg-accent-primary/10` para confirmar la selección.
- El calendario aparece con `scaleY(0.95)` → `1` y `opacity 0 → 1` en `200ms`.

**Accesibilidad**

- Todos los campos tienen `<label>` asociado.
- El Combobox sigue el patrón ARIA `combobox` con `role="listbox"` en el dropdown y `role="option"` en cada resultado.
- El DatePicker tiene navegación por teclado completa: flechas para mover días, `Enter` para seleccionar, `Escape` para cerrar.
- Los errores de validación usan `aria-describedby` apuntando al mensaje de error.

---

### 4.4 Popular Destinations

**Objetivo de negocio**  
Inspirar y reducir la parálisis de decisión mostrando destinos concretos y atractivos. Generar deseo de viaje.

**Estructura visual**

```
  Popular Destinations
  Explore the world's most beloved routes

  [Todos] [Europa] [Latinoamérica] [Asia] [Caribe] [Norteamérica]

  ┌──────────┐  ┌──────────────────────────┐
  │          │  │                          │
  │  París   │  │       Tokio              │
  │  CDG     │  │        NRT               │
  │  $620    │  │        $1,240            │
  └──────────┘  └──────────────────────────┘

  ┌──────────────────────────┐  ┌──────────┐  ┌──────────┐
  │       Cartagena          │  │  NYC     │  │  Dubai   │
  │          CTG             │  │  JFK     │  │  DXB     │
  │          $320            │  │  $890    │  │  $1,100  │
  └──────────────────────────┘  └──────────┘  └──────────┘
```

**Diseño de las cards**

Layout masonry asimétrico (no una cuadrícula uniforme). Las cards de destino tienen:

- **Background:** foto de destino con `object-fit: cover`. Overlay `linear-gradient` de `transparent` (top) a `bg-surface/90` (bottom).
- **Contenido inferior:** Nombre de la ciudad en `heading-xl`, código IATA en `mono-md text-secondary`, y precio desde en `mono-lg text-accent-gold`.
- **Dimensiones:** Cards grandes `(ratio 3:4)` y pequeñas `(ratio 1:1)`. Alternadas en el grid.
- **Border-radius:** `xl (16px)`.
- **Badge opcional:** "Popular" o "New Route" en `badge gold`.

**Filtros de región**

- Tabs tipo pill horizontal con scroll horizontal en mobile.
- Al cambiar de filtro: las cards que no corresponden hacen `fadeOut` y `scale(0.95)` mientras las nuevas hacen `fadeIn`. Duración `300ms`.

**Hover en card**

1. La imagen hace `scale(1.05)` suavemente `(400ms ease-out)`.
2. El overlay aumenta de opacidad `(200ms)`.
3. Aparece un botón "Explore" con `fadeIn + translateY(-8px)`.
4. La card entera hace un `translateY(-4px)` para dar efecto de elevación.

**Responsive**

- **Desktop:** Layout asimétrico, 2 o 3 columnas según el tamaño de la card.
- **Tablet:** 2 columnas uniformes.
- **Mobile:** Carrusel horizontal con `scroll-snap`. Se ven 1.2 cards (el 20% de la siguiente indica que hay más).

**Accesibilidad**

- Cada card es un `<article>` o `<a>` con `aria-label="Fly to Paris from $620"`.
- Las imágenes tienen `alt` descriptivo: `"Aerial view of the Eiffel Tower in Paris"`.
- El carrusel mobile tiene botones de navegación `<` `>` con `aria-label`.

---

### 4.5 Featured Offers

**Objetivo de negocio**  
Urgencia y conversión. Ofertas con tiempo limitado que impulsan la reserva inmediata. Reducir el tiempo de decisión del usuario.

**Estructura visual**

```
  Limited Time Offers
  Prices drop. Don't wait.
                                              [View all offers →]

  ┌────────────────────────────────────────────────────────────────┐
  │ 🔥 HOT DEAL    BOG → MIA    Bogotá → Miami                    │
  │                                             $299   $450        │
  │ ✈ Direct  ·  Economy  ·  Expires in 02:14:33                  │
  │                                          [Book Now →]          │
  └────────────────────────────────────────────────────────────────┘

  [card 2]                          [card 3]
```

**Diseño de las offer cards**

- Orientación horizontal (widescreen). Imagen del destino a la izquierda (`1/3` del ancho), información a la derecha.
- Background: `bg-card` con un borde izquierdo de `4px solid accent-gold` en las "hot deals".
- Precio original tachado en `text-muted`, precio actual en `mono-lg text-accent-gold`.
- Countdown timer: `mono-md` en rojo cuando `< 1 hora`. El timer hace un pulso suave cada segundo.
- Badge "HOT DEAL" en `badge gold` con ícono de fuego.

**Urgencia visual sin ser agresivo**

No se usan patterns oscuros de urgencia falsa. El timer es real (calculado desde el servidor). Los precios son reales. El mensaje es directo: "Prices drop. Don't wait." — sin exclamaciones.

**Responsive**

- **Desktop:** 1 card grande + 2 cards medianas en fila.
- **Tablet:** Stack vertical, todas del mismo ancho.
- **Mobile:** Cards apiladas, imagen en top (landscape, altura fija `160px`).

**Microinteracciones**

- El countdown hace un `flash` sutil (el texto va de `text-error` a `text-error/70` y vuelve) cada segundo cuando `< 30 minutos`.
- El botón "Book Now" al hover: la flecha `→` se mueve `4px` a la derecha (`200ms`).

**Accesibilidad**

- El countdown tiene `aria-live="polite"` para lectores de pantalla (actualización cada 60s, no cada segundo, para no ser intrusivo).
- `aria-label` en el botón incluye el destino: `"Book BOG to MIA for $299"`.

---

### 4.6 Why Choose AetherAirways

**Objetivo de negocio**  
Reducir objeciones. Construir confianza y diferenciar la marca de la competencia. Responde a la pregunta implícita: "¿Por qué volar con ustedes?"

**Estructura visual**

```
  Why AetherAirways?
  We obsess over the details so you can focus on the journey.

  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │    [icon]    │  │    [icon]    │  │    [icon]    │  │    [icon]    │
  │              │  │              │  │              │  │              │
  │  Best Price  │  │ Free Changes │  │ 24/7 Support │  │  Carbon      │
  │  Guarantee   │  │ & Refunds    │  │              │  │  Neutral     │
  │              │  │              │  │              │  │  Flights     │
  │  If you find │  │  No fees...  │  │  Real humans │  │  We offset   │
  │  it cheaper  │  │              │  │  not bots    │  │  every mile  │
  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

**Diseño de las feature cards**

- Fondo: `bg-card` con borde sutil. No son tarjetas planas — tienen un `glow` azul en la parte superior (`linear-gradient` de `accent-primary/10` a `transparent`).
- Ícono: `40px`, color `accent-primary`. Dentro de un círculo de `bg-accent-primary/10`. `border-radius: full`.
- Título: `heading-md`, blanco.
- Descripción: `body-sm`, `text-secondary`. Máx. 2 líneas.

**Animación al entrar en viewport**

Las 4 cards entran con `staggered fadeInUp`:
- Card 1: `delay 0ms`
- Card 2: `delay 100ms`
- Card 3: `delay 200ms`
- Card 4: `delay 300ms`

Cada una hace `opacity: 0 → 1` + `translateY(20px) → 0` en `500ms ease-out`.

**Responsive**

- **Desktop:** 4 columnas.
- **Tablet:** 2 × 2.
- **Mobile:** 1 columna, cards horizontales (icono a la izquierda, texto a la derecha).

**Accesibilidad**

- Los íconos son `aria-hidden="true"`.
- La sección tiene `aria-labelledby` apuntando al heading.

---

### 4.7 Loyalty Program — Aether+

**Objetivo de negocio**  
Conversión de usuarios anónimos a usuarios registrados. El programa de fidelidad es el principal driver de LTV (lifetime value). Debe sentirse como una membresía exclusiva, no como un programa de puntos genérico.

**Estructura visual**

Layout dividido 50/50: lado izquierdo con contenido, lado derecho con una ilustración o mockup de la tarjeta física de membresía.

```
  ┌────────────────────────────┬────────────────────────────┐
  │                            │                            │
  │  Aether+                   │   [Tarjeta de miembro      │
  │  The world rewards         │    dorada con nombre       │
  │  those who explore it.     │    y número de miembro]    │
  │                            │                            │
  │  ✓ Miles on every flight   │                            │
  │  ✓ Priority boarding       │                            │
  │  ✓ Lounge access           │                            │
  │  ✓ Free upgrades           │                            │
  │                            │                            │
  │  [Silver] [Gold] [Platinum]│                            │
  │                            │                            │
  │  [Join Aether+ Free →]     │                            │
  └────────────────────────────┴────────────────────────────┘
```

**Diseño de niveles de membresía**

Tres tiers con tabs seleccionables:
- **Silver:** Borde `Neutral 400`. Beneficios básicos.
- **Gold:** Borde `Aether Gold 500`. Badge "Most Popular". Beneficios medios.
- **Platinum:** Borde con `gradient` dorado-azul animado (un shimmer que recorre el borde). Beneficios premium.

**La tarjeta de membresía**

- Un componente visual 3D (simulado con CSS `perspective` + `rotateY/X` en hover — máx `15deg`). 
- Material: gradiente oscuro con shimmer de oro. Logotipo embosado. El número de miembro en `mono`.
- Al hover: la tarjeta rota ligeramente siguiendo el cursor (efecto `tilt` — `mousemove` escucha la posición del cursor relativa a la tarjeta).

**Background de la sección**

No `bg-surface` plano. Un gradiente radial desde `accent-primary/10` en el centro a `transparent` — crea un foco visual sin ser agresivo. Opcional: partículas muy sutiles (estrellas, porque "aether" = espacio).

**Responsive**

- **Desktop:** 50/50 horizontal.
- **Tablet:** 60/40, la tarjeta se reduce.
- **Mobile:** Stack vertical. La tarjeta va primero (más visual), el contenido debajo.

**Accesibilidad**

- El efecto tilt de la tarjeta se desactiva con `prefers-reduced-motion`.
- Las tabs de nivel tienen `aria-selected`, `role="tab"`, `role="tabpanel"`.

---

### 4.8 Testimonials

**Objetivo de negocio**  
Prueba social. Reducir la desconfianza de nuevos usuarios. Los testimonios deben sentirse humanos y verificables — no fabricados.

**Estructura visual**

```
  What our passengers say
  Real stories. Real people.

  ┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
  │  ★★★★★               │  │  ★★★★★               │  │  ★★★★★               │
  │                       │  │                       │  │                       │
  │  "The business class  │  │  "Changed my flight   │  │  "The app is          │
  │  experience was…"     │  │  with zero fees…"     │  │  simply beautiful"    │
  │                       │  │                       │  │                       │
  │  [Avatar] Ana G.      │  │  [Avatar] Carlos M.   │  │  [Avatar] Priya S.    │
  │  Bogotá → Londres     │  │  NYC → Miami          │  │  Delhi → Dubai        │
  └───────────────────────┘  └──────────────────────┘  └───────────────────────┘

              ○  ●  ○  ○  ○          [<]  [>]
```

**Diseño de testimonial cards**

- Fondo: `bg-card`. Sin borde. Sombra `card`.
- Las estrellas en `accent-gold`.
- Quote en `body-lg italic`, `text-primary`. Máx. 120 caracteres visibles — el resto con "…" y un "Read more" link.
- Avatar: `48px`, `border-radius: full`. Si no hay foto, iniciales en `bg-accent-primary`.
- Nombre en `label-lg text-primary`, ruta en `label-sm text-secondary mono`.

**Carrusel**

- Auto-advance cada `5s`. Pausa en hover. Pausa en focus.
- Indicadores de posición: dots pequeños (`6px`), el activo se expande a `24px` pill en horizontal.
- Botones `<` `>` con `opacity: 0` en reposo, `opacity: 1` en hover del carrusel. En mobile siempre visibles.
- Transición entre slides: `fade + translateX(20px)` — no un slide duro.

**Responsive**

- **Desktop:** 3 cards visibles.
- **Tablet:** 2 cards visibles.
- **Mobile:** 1 card, carrusel con swipe gesture (touch events).

**Accesibilidad**

- `role="region"` + `aria-label="Customer testimonials"`.
- `aria-live="polite"` en el slide activo.
- El auto-advance tiene un botón de pause/play visible (`aria-label="Pause testimonials"`).
- Las estrellas tienen texto visualmente oculto para screen readers: `<span class="sr-only">5 out of 5 stars</span>`.

---

### 4.9 FAQ

**Objetivo de negocio**  
Reducir tickets de soporte y objeciones previas a la compra. Las preguntas responden a las 5 objeciones más comunes antes de reservar.

**Preguntas sugeridas**

1. How do I change or cancel my booking?
2. What's included in my ticket price?
3. How does Aether+ loyalty program work?
4. What are the baggage allowances?
5. Can I choose my seat in advance?
6. How early should I arrive at the airport?

**Estructura visual**

```
  Frequently Asked Questions

  ┌──────────────────────────────────────────────────────────────────┐
  │  How do I change or cancel my booking?                    [+]    │
  └──────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────┐
  │  What's included in my ticket price?                      [–]    │
  │                                                                  │
  │  Your ticket includes a carry-on bag (up to 10kg), in-flight    │
  │  meals on routes over 4 hours, and access to our entertainment  │
  │  system. Checked baggage can be added at checkout.              │
  └──────────────────────────────────────────────────────────────────┘
```

**Diseño del Accordion**

- Cada item tiene `border-bottom: 1px solid border-subtle`. No tarjetas.
- El botón de toggle (+/-) es un ícono `ChevronDown` que rota `180deg` al abrir (`200ms ease`).
- El contenido del panel se expande con `height: auto` via `grid-template-rows: 0fr → 1fr` (técnica CSS pura, sin JS para la altura). Duración `300ms ease-in-out`.
- `padding: 24px 0` en la pregunta, `0 0 24px 0` en la respuesta.
- La pregunta activa: texto en `text-primary` (blanco). Las cerradas: `text-secondary`.

**Layout de la sección**

Max-width `720px` centrado — las FAQs no necesitan ancho completo, mejora la legibilidad.

**Responsive**

Idéntico en todos los breakpoints — el accordion es inherentemente responsivo. Solo cambian los `padding`.

**Accesibilidad**

- Patrón ARIA accordion: `role="button"`, `aria-expanded`, `aria-controls` apuntando al panel.
- El panel tiene `role="region"`, `aria-labelledby` con el ID del botón.
- Navegable completamente por teclado (`Space`/`Enter` para toggle).

---

### 4.10 Newsletter

**Objetivo de negocio**  
Capturar leads y construir una lista de email marketing para ofertas futuras. El CTA debe justificar el intercambio de datos — qué gana el usuario.

**Estructura visual**

```
  ┌────────────────────────────────────────────────────────────────────┐
  │                                                                    │
  │         ✈  Get deals before anyone else.                          │
  │                                                                    │
  │    Subscribe and receive exclusive fares, destination guides,      │
  │    and early access to flash sales — directly to your inbox.       │
  │                                                                    │
  │         [your@email.com                    ] [Subscribe →]         │
  │                                                                    │
  │    🔒 No spam. Unsubscribe anytime.  ·  15,000+ subscribers       │
  │                                                                    │
  └────────────────────────────────────────────────────────────────────┘
```

**Diseño de la sección**

- Background diferenciado: un panel con `bg-card` y un borde sutil, o una franja con `bg-accent-primary/5` + borde izquierdo de `4px solid accent-primary`.
- El input y el botón están en línea (desktop). Stack en mobile.
- El estado de éxito al suscribirse: el formulario hace `fadeOut`, aparece un mensaje "✓ You're in! Check your inbox." con animación `fadeIn + scale(0.98 → 1)`.
- La línea "🔒 No spam…" reduce la fricción. El contador de suscriptores agrega prueba social.

**Validación**

- El email se valida al blur del input (no al submit — reduce frustración).
- Error inline debajo del input: `text-error text-sm`.
- El botón está deshabilitado si el email es inválido.

**Responsive**

- **Desktop / Tablet:** Input + botón en línea.
- **Mobile:** Stack vertical, botón full-width.

**Accesibilidad**

- Label del input visualmente oculto con `sr-only` (el placeholder no es un label).
- El mensaje de éxito tiene `role="alert"` para anunciarse en screen readers.
- `aria-invalid="true"` + `aria-describedby` para errores.

---

### 4.11 Footer

**Objetivo de negocio**  
Navegación secundaria, credibilidad legal, canales de contacto y redes sociales. El footer es la última oportunidad antes de que el usuario abandone.

**Estructura visual**

```
  ┌────────────────────────────────────────────────────────────────────┐
  │                                                                    │
  │  [Logo AetherAirways]                                              │
  │  Fly beyond the horizon.                                           │
  │  [Twitter] [Instagram] [LinkedIn] [YouTube]                        │
  │                                                                    │
  │  Company          Travel          Support           Legal          │
  │  ─────────        ─────────       ─────────         ─────────      │
  │  About Us         Flights         Help Center       Privacy Policy │
  │  Careers          Destinations    Contact Us        Terms of Use   │
  │  Press            Aether+         Baggage Info      Cookie Policy  │
  │  Investors        Offers          Accessibility     Sitemap        │
  │                   Gift Cards      Safety                           │
  │                                                                    │
  │  ─────────────────────────────────────────────────────────────────│
  │  © 2026 AetherAirways. All rights reserved.    [ES] [EN] [FR]     │
  └────────────────────────────────────────────────────────────────────┘
```

**Diseño del footer**

- Background: `bg-surface` (mismo que la página) — el footer no necesita destacarse, debe fundirse.
- Borde superior: `1px solid border-subtle`.
- Logo + tagline + redes sociales en la columna izquierda (1/4 del ancho).
- 4 columnas de links en las 3/4 restantes.
- Los links del footer: `text-secondary`, hover `text-primary`, `200ms transition`.
- Íconos de redes sociales: `24px`, `text-muted`, hover `text-primary` + `translateY(-2px)`.
- La línea inferior tiene `border-top: 1px solid border-subtle` y `padding-top: 24px`.

**Responsive**

- **Desktop:** Layout de 5 columnas descrito.
- **Tablet:** Logo + redes arriba (full-width). Links en 2 columnas debajo.
- **Mobile:** Stack completo. Cada columna de links es un accordion colapsable para no abrumar.

**Accesibilidad**

- `<footer role="contentinfo">`.
- Grupos de links tienen `<nav aria-label="Company links">`, etc.
- Las redes sociales tienen `aria-label="Visit AetherAirways on Twitter"` (no "Twitter" solo).

---

## 5. Flujo visual de la página completa

```
  Navbar (sticky, transparente → sólido)
  │
  ├── Hero Section (100svh, video/imagen + headline + tagline)
  │       └── Flight Search Panel (integrado en el hero, sticky bottom en mobile)
  │
  ├── Popular Destinations (inspiración, masonry grid)
  │
  ├── Featured Offers (urgencia, conversión)
  │
  ├── Why AetherAirways (confianza, 4 columnas)
  │
  ├── Aether+ Loyalty (retención, split layout)
  │
  ├── Testimonials (prueba social, carrusel)
  │
  ├── FAQ (reducir objeciones, accordion)
  │
  ├── Newsletter (captura de leads)
  │
  └── Footer (navegación secundaria + legal)
```

**Ritmo visual:** Las secciones alternan entre fondos `bg-surface` y `bg-card` para crear distinción sin usar colores agresivos. La secuencia:

| Sección | Background |
|---|---|
| Hero | Imagen/video |
| Popular Destinations | `bg-surface` |
| Featured Offers | `bg-card` |
| Why AetherAirways | `bg-surface` |
| Aether+ | `bg-surface` con radial gradient |
| Testimonials | `bg-card` |
| FAQ | `bg-surface` |
| Newsletter | `bg-card` o franja `accent-primary/5` |
| Footer | `bg-surface` |

---

## 6. Animaciones globales y scroll

### Scroll-triggered animations

Todas las secciones usan `IntersectionObserver` con `threshold: 0.15` — cuando el 15% del elemento es visible, se dispara la animación. Esto evita que las animaciones ocurran demasiado tarde (cuando ya se pasó el elemento) o demasiado temprano.

Patrón de animación base para secciones:
```
  opacity: 0 → 1
  transform: translateY(24px) → translateY(0)
  duration: 500ms
  easing: ease-out
```

Los elementos dentro de la sección tienen stagger de `100ms` entre ellos.

### Performance

- Las animaciones usan solo `opacity` y `transform` — ambas son propiedades que el browser compone en la GPU (no causan reflow/repaint).
- El video del hero usa `loading="lazy"` en móvil y se reemplaza por imagen estática cuando `prefers-reduced-data` está activo.
- Las imágenes de destinos usan `next/image` con `placeholder="blur"`.

---

## 7. Accesibilidad global

| Requisito | Implementación |
|---|---|
| Contraste WCAG AA | Todos los textos sobre fondos verificados (ratio ≥ 4.5:1 para body, ≥ 3:1 para large text) |
| Navegación por teclado | Tab order lógico. Skip link al contenido principal. Focus visible en todos los elementos interactivos. |
| Screen readers | ARIA roles y labels en todos los componentes interactivos. Textos alternativos en imágenes. |
| Reducción de movimiento | `prefers-reduced-motion: reduce` elimina o minimiza todas las animaciones |
| Zoom | El layout funciona correctamente hasta `200%` de zoom sin pérdida de información |
| Idioma | `lang="en"` en el html. Si se añade español: `lang="es"` con `hreflang` |
| Touch targets | Todos los elementos interactivos tienen al menos `44×44px` de área táctil |

---

## 8. Convenciones de implementación

Estas convenciones deben seguirse al trasladar este documento a código:

- **Nombres de componentes:** PascalCase. `HeroSection`, `FlightSearchPanel`, `DestinationCard`.
- **Nombres de archivos:** kebab-case. `hero-section.tsx`, `flight-search-panel.tsx`.
- **Props de variantes:** discriminated unions de TypeScript. `type ButtonVariant = "primary" | "secondary" | "ghost"`.
- **Tokens de diseño:** Variables CSS en `:root` en `styles/tokens.css`. Nunca valores hardcoded en componentes.
- **Animaciones:** Definidas en `styles/animations.css` o como variantes de Tailwind en `tailwind.config.ts`. No `style={{ animation: "..." }}` inline.
- **Responsive:** Mobile-first siempre. Clases `md:` y `lg:` para escalar hacia arriba.
- **Imágenes:** Siempre `next/image`. Nunca `<img>` nativo.
- **Íconos:** Siempre importados del wrapper en `shared/icons/` — no directamente de `lucide-react` en componentes.
