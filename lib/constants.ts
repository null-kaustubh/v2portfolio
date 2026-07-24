export const ASSETS_REPO = "https://assets.1xkaustubh.com";

export function resolveImage(src?: string) {
  if (!src) return "";

  return src.startsWith("http") ? src : `${ASSETS_REPO}${src}`;
}
