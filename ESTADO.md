# Estado del proyecto · YaEn3D

## Cómo se entrega
- El dueño ya tiene su tienda en Shopify y **solo quiere el tema**: no se conecta con su tienda.
- Entrega: el tema está en la raíz de la rama `claude/beautiful-clarke-ggjji2`, que el dueño conecta
  desde Shopify (Tienda online › Temas › Añadir tema › Conectar desde GitHub). También hay un zip
  para subirlo a mano (Añadir tema › Subir archivo zip).
- Productos de ejemplo: `extras/productos-ejemplo.csv`, para importar en Productos › Importar
  (3 productos en borrador y **sin precio**, porque los precios los pone el dueño).

## Fases
- [x] Tema revisado con el comprobador de Shopify: sin errores, solo 4 avisos por cargar las fuentes desde Google.
- [x] Vista previa local con datos de prueba (ordenador y móvil) y auto-revisión.
- [x] Arreglos sobre el tema original del zip:
  - Ficha de producto: los datos del producto quedaban fuera del bloque que lee el script, así que
    fallaban las variantes, las miniaturas y el aviso de nombre obligatorio.
  - Secciones con fondo marino: los estilos para fondo oscuro no se aplicaban nunca (botones azul
    sobre azul, campos del formulario claros). Ahora cada sección marina lleva la marca `.on-dark`
    y `base.css` la usa.
- [x] Opiniones ocultas en la portada hasta tener reseñas reales.
- [x] Bloque de Navidad visible, con cuenta atrás hasta el 15/12/2026.
- [x] Producto real: **Virgen de la Cabeza** en `extras/producto-virgen-de-la-cabeza.csv`. Tiene 12 opciones
  (Color: Azul claro / Rosa claro / Blanco × Tamaño: 10 / 15 / 20 / 25 cm), va en borrador y sin precio.
  Cada color lleva su foto: las hizo el dueño con IA y están en `extras/fotos/`. La importación las
  descarga de GitHub con enlaces fijados a un commit (el proyecto es público).
- [x] Ficha de producto: la proporción de las fotos ahora es un ajuste (vertical 4:5 por defecto).
  Antes era cuadrada a fuego y cortaba las fotos verticales. Más aire entre las opciones de color y de tamaño.
- [ ] **Cambios de diseño**: el dueño eligió "el diseño del zip, pero con cambios"; falta que diga cuáles.

## Decisiones
- Fotos: se dejan los huecos y el dueño las pone desde el editor de Shopify.
- Etiquetas de los productos de ejemplo: `personalizable` y `llaveros` en el llavero;
  `navidad` y `decoracion` en la bola y la figura. La etiqueta `personalizable` activa en la
  ficha el campo «Nombre a imprimir» y la elección de color.
