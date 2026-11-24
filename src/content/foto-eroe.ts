// Foto della prima schermata, presa da main (assets/hero-studio-*), con lo stesso srcset di main.
// Usata dalla sezione e dal preload in index.astro: sono l'elemento LCP.
export const fotoEroe = {
  avif: '/hero/hero-studio-960.avif 960w, /hero/hero-studio-1600.avif 1600w',
  webp: '/hero/hero-studio-960.webp 960w, /hero/hero-studio-1600.webp 1600w',
  // Sotto i 768 px la foto è larga il 128% dello schermo, come su main
  sizes: '(max-width: 767px) 128vw, 100vw',
};
