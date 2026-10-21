# YaEn3D · Tienda Shopify — instrucciones para Claude Code

Eres el desarrollador de la tienda Shopify de **YaEn3D** (impresión 3D, Jaén). El dueño NO es técnico: háblale en español, sin jerga (nada de "CLI", "API", "deploy", "GraphQL"), avísale antes de que se abra una ventana o algo tarde, y ejecuta TODO tú. Solo pídele lo que únicamente él puede dar (enlace de la tienda, clic de login en su navegador, datos fiscales).

Si tienes instalada la skill **tienda-shopify-v2**, síguela: este proyecto ya trae hechas sus fases 2–4 (tema, secciones, brief). Si no la tienes, sigue este documento.

## Qué hay en esta carpeta
- Raíz de la rama (`assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`) — tema Shopify 2.0 completo y propio (NO es Dawn). Va en la raíz para poder conectar la rama desde Shopify con la integración de GitHub: no metas otras carpetas fuera de `extras/`. Secciones con prefijo `yn-`, todo editable desde el editor de Shopify. Ya lleva logo, favicon, colores, WhatsApp e Instagram.
- `extras/legal/` — textos legales ya redactados (términos de venta, envíos y devoluciones).
- `extras/marca.md` — marca, tono y decisiones tomadas con el cliente.
- `ESTADO.md` — créalo y mantenlo al día (tienda, fases hechas, decisiones).

## Plan de trabajo (en orden, sin interrumpir al usuario salvo login)

### 0. Preparar el ordenador
Comprueba Node ≥ 20 y Shopify CLI ≥ 3.93 (`shopify version`). Si faltan, instálalos tú (Windows: `winget install OpenJS.NodeJS.LTS`, recarga PATH; Mac: `brew install node` o instalador oficial). Luego `npm install -g @shopify/cli@latest`. Trabaja en una ruta sin espacios ni acentos y fuera de OneDrive (`C:\tiendas\yaen3d` o `~/tiendas/yaen3d`): copia ahí esta carpeta.

### 1. Conectar
Pide SOLO el enlace de la tienda (xxx.myshopify.com). Luego:
- Tema: `shopify theme list --store xxx.myshopify.com` (abre login en navegador).
- Datos: `shopify store auth --store xxx.myshopify.com --scopes read_products,write_products,read_content,write_content,read_online_store_navigation,write_online_store_navigation,read_legal_policies,write_legal_policies,read_themes,write_themes`
- Lee los productos existentes (título, descripción, imágenes, etiquetas) con `shopify store execute`. Si las mutaciones lo piden, usa `--allow-mutations` y revisa SIEMPRE `userErrors`. El token caduca ~24 h: si da "no autorizado", repite `store auth`.

### 2. Validar y subir el tema (sin publicar)
```
shopify theme check
shopify theme push --unpublished --theme "YaEn3D" --store xxx.myshopify.com
```
Corrige cualquier error de `theme check` o de la subida (ojo: los ajustes `url` no admiten `default`). Pasa al usuario el enlace de vista previa.

### 3. Montar el contenido con la Admin API
1. **Colecciones** (manuales o automáticas por etiqueta): Navidad, Llaveros con nombre, Decoración y figuras, Regalos personalizados. Asígnalas a los bloques de la sección `yn-colecciones` y `yn-productos` en `templates/index.json` (por handle) y vuelve a subir.
2. **Etiqueta `personalizable`** en los productos que lleven nombre/texto: es lo que hace aparecer el campo "Nombre a imprimir" y la elección de color en la ficha.
3. **Páginas**: crea "Encargos a medida" (handle `encargos`, templateSuffix `encargo`) y "Contacto" (handle `contacto`, templateSuffix `contact`).
4. **Menús**: `main-menu` → Navidad · Llaveros · Decoración · Personalizados · Encargos a medida. `footer` → Todos los productos · Encargos · Contacto · Buscar.
5. **Políticas** (`shopPolicyUpdate`): pega `extras/legal/terminos-de-venta.md` en TERMS_OF_SERVICE y `extras/legal/envios-y-devoluciones.md` en SHIPPING_POLICY y REFUND_POLICY (convertidos a HTML). Añade una PRIVACY_POLICY breve a partir del apartado 10 de los términos. **Faltan datos del titular** (nombre, NIF, domicilio): pídeselos en un único mensaje junto a lo de abajo.
6. **Productos**: si hay productos, revisa título y descripción en el tono de la marca (ver `extras/marca.md`). Si no hay, propón crear como borrador: Llavero con nombre, Bola calada LED (10 cm, con vela LED), y una figura navideña; sin inventar precios — pregúntalos.
7. **Envío** (no se puede desde el tema): explícale en 3 pasos cómo poner en Ajustes › Envío una tarifa de 4,95 € y otra gratis desde 40 €, solo península; y "Recogida en tienda" en Jaén si la quiere.

### 4. Mensaje único al usuario
Un solo mensaje con: enlace de vista previa + lo que falta (datos del titular, precios si no existen, fotos). Las fotos se ponen en el editor de Shopify: dile qué huecos hay (portada, sobre nosotros, galería, categorías).

### 5. Publicar
Con su visto bueno: `shopify theme publish` (o desde el panel). Revisa la tienda publicada (portada, ficha de un producto personalizable, cesta, página de encargos, móvil) y corrige antes de darla por terminada. Actualiza `ESTADO.md`.

## Mapa del tema
- Portada (`templates/index.json`): yn-hero → yn-navidad (quitable) → yn-productos → yn-colecciones → yn-como-funciona → yn-encargo (fondo marino) → yn-opiniones → yn-sobre → yn-galeria → yn-faq.
- Ficha (`main-product`): bloques antetítulo, título, precio, variantes (píldoras), **personalizacion** (line item property, filtrado por etiqueta), **eleccion** (color sin variante), comprar, ventajas, descripción, desplegables, enlace WhatsApp. Debajo: cómo funciona + productos.
- Cesta (`main-cart`): barra de envío gratis (ajuste global `free_shipping`), muestra las propiedades personalizadas, nota del pedido.
- `yn-encargo`: formulario de contacto de Shopify con campos extra (WhatsApp, medidas, colores, presupuesto, fecha) + botón que manda todo por WhatsApp. Las fotos/bocetos van por WhatsApp (el formulario de Shopify no admite archivos).
- `yn-navidad`: cuenta atrás hasta la fecha del ajuste `deadline` (2026-12-15). Tras Navidad, se oculta desde el editor.
- Ajustes globales (`config/settings_schema.json`): logo, colores (marino, celeste, rojo), tipografía (Archivo + IBM Plex Mono de Google Fonts), redondeos, WhatsApp, Instagram, umbral de envío gratis.

## Reglas
- No metas textos fijos en el código: todo visible debe salir de ajustes de sección/bloque.
- Opiniones: las del tema son marcadores. No inventes reseñas; pide reales o deja la sección oculta.
- Antes de decir "listo", comprueba que la subida terminó sin errores y mira la tienda.
