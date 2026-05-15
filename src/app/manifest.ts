import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tanner O'Rourke",
    short_name: "Tanner O",
    description: "Tanner O\'Rourke | selected ML and web Engineering work.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2A5F58",
    icons: [
      { src: "/icon16.png",         sizes: "16x16",   type: "image/png" },
      { src: "/icon32.png",         sizes: "32x32",   type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}