/** Build public URL from API local_path (assets/images/… or legacy assets/file.ext). */
export function publicUrl(path) {
  const rel = String(path).replace(/^\/+/, "");
  return rel ? `${import.meta.env.BASE_URL}${rel}` : import.meta.env.BASE_URL;
}

export function assetUrl(localPath) {
  if (!localPath) return "";
  let rel = localPath.replace(/^\/+/, "").replace(/^assets\/?/, "");
  return rel ? publicUrl(`assets/${rel}`) : "";
}
