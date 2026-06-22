import { readFileSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export function isSvg(src: string): boolean {
  return src.toLowerCase().endsWith(".svg");
}

export function getImageSize(src: string): { width: number; height: number } {
  const filePath = path.join(process.cwd(), "public", src);
  const { width, height } = imageSize(readFileSync(filePath));
  if (!width || !height) {
    throw new Error(`Could not read image dimensions for "${src}"`);
  }
  return { width, height };
}
