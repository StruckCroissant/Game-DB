const baseUrl = "https://localhost:9191/api/v1";

export function endpoint(location: string): string {
  return baseUrl + location;
}
