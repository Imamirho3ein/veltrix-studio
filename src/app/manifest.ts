import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ولتریکس استودیو | VELTRIX STUDIO",
    short_name: "VELTRIX",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    lang: "fa-IR",
    dir: "rtl",
    orientation: "portrait",
    categories: ["business", "design", "technology"],
    icons: [
      {
        src: "/brand/logo-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
