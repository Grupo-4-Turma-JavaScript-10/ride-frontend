export interface Coords { lat: number; lng: number; }

const ORS_KEY = import.meta.env.VITE_ORS_API_KEY;

export async function geocodificar(local: string): Promise<Coords | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(local)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'pt-BR' } }
    );
    const data = await res.json();
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {}
  return null;
}

export async function buscarRotaReal(origem: Coords, destino: Coords): Promise<[number, number][]> {
  try {
    const res = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${origem.lng},${origem.lat}&end=${destino.lng},${destino.lat}`
    );
    const data = await res.json();
    const coords = data.features[0].geometry.coordinates as [number, number][];
    return coords.map(([lng, lat]) => [lat, lng]);
  } catch {
    return [[origem.lat, origem.lng], [destino.lat, destino.lng]];
  }
}