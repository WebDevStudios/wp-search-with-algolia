export function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}
export function deserializePayload(payload) {
  return JSON.parse(decodeURIComponent(atob(payload)));
}