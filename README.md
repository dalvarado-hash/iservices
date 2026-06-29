# Scout — by Impulse

**Propuesta: Editorial / Long-form**

Estilo revista: columna central de lectura interrumpida por secciones a sangre completa, demo antes→después vertical y razones en lista numerada gigante. Claro.

## Stack
Vite + Vue 3 + Tailwind CSS.

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Deploy en Netlify
Conectar el repo y seleccionar esta rama. La config (`netlify.toml`) ya define:
- Build: `npm run build`
- Publish: `dist`
- Redirect SPA a `index.html`

> `scout-landing.original.html` es la landing original generada con AI, conservada como referencia.
