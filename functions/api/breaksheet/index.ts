interface Env {
  BREAKSHEET_BUCKET: R2Bucket;
  AI: Ai;
}

type Row = {
  land: string;
  sector: string;
  name: string;
  start: string;
  end: string;
  break1: string;
  lunch: string;
  break2: string;
  info: string;
};

const DATA_KEY = 'breaksheet/data.json';
const PHOTO_KEYS = [
  'breaksheet/photo-1.jpg',
  'breaksheet/photo-2.jpg',
  'breaksheet/photo-3.jpg',
  'breaksheet/photo-4.jpg',
];

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function onRequestGet(context: PagesFunction<Env>) {
  try {
    const object = await context.env.BREAKSHEET_BUCKET.get(DATA_KEY);
    if (!object) return json({ rows: [], updatedAt: null, photos: [] });
    const data = await object.json();
    return json(data);
  } catch (error) {
    console.error(error);
    return json({ error: 'Impossible de lire le planning.' }, 500);
  }
}
