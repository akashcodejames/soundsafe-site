/** Build public URL from API local_path (assets/images/… or legacy assets/file.ext). */
export function assetUrl(localPath) {
  if (!localPath) return "";
  let rel = localPath.replace(/^\/+/, "").replace(/^assets\/?/, "");
  return rel ? `/assets/${rel}` : "";
}
