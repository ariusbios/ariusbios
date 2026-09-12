export function buildWifiPayload(ssid: string, password: string): string {
  const escape = (v: string) => v.replace(/([\\;,:"])/g, "\\$1");
  return `WIFI:T:WPA;S:${escape(ssid)};P:${escape(password)};;`;
}
