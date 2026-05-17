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
  };
}