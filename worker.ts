interface Env {
  BREAKSHEET_BUCKET: R2Bucket;
  AI: Ai;
  ASSETS: Fetcher;
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

const prompt = `Lis cette photo de breaksheet Custodial DLP. Retourne UNIQUEMENT un tableau JSON valide, sans markdown et sans commentaire.
Chaque objet doit contenir exactement:
{"land":"","sector":"","name":"","start":"","end":"","break1":"","lunch":"","break2":"","info":""}
Retourne une ligne par Cast Member visible sur cette photo. Conserve exactement les noms, lands et secteurs visibles. Les horaires doivent être HH:MM. Si un créneau est absent ou illisible, mets "". Mets les remarques visibles dans info. Ne déduis jamais un horaire qui n'est pas visible.`;

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function extractRows(value: unknown): Row[] {
  const raw = typeof value === 'string'
    ? value
    : String((value as any)?.response ?? (value as any)?.result ?? '');
  const cleaned = raw.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start < 0 || end <= start) return [];
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (!Array.isArray(parsed)) return [];
    return parsed.map((x: any) => ({
      land: String(x?.land ?? ''),
      sector: String(x?.sector ?? ''),
      name: String(x?.name ?? ''),
      start: String(x?.start ?? ''),
      end: String(x?.end ?? ''),
      break1: String(x?.break1 ?? ''),
      lunch: String(x?.lunch ?? ''),
      break2: String(x?.break2 ?? ''),
      info: String(x?.info ?? ''),
    })).filter((x: Row) => x.name && x.start && x.end);
  } catch {
    return [];
  }
}

function decodeDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) throw new Error('Image invalide');
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return { mimeType: match[1], bytes };
}

async function getPlanning(env: Env) {
  const object = await env.BREAKSHEET_BUCKET.get(DATA_KEY);
  if (!object) return json({ rows: [], updatedAt: null, photos: [] });
  return json(await object.json());
}

async function processPhotos(request: Request, env: Env) {
  const payload = await request.json() as {
    images?: Array<{ data: string; mimeType: string }>;
  };

  if (!payload.images || payload.images.length !== 4) {
    return json({ error: 'Il faut exactement 4 photos.' }, 400);
  }
  if (payload.images.some(x => !x.data || !x.mimeType?.startsWith('image/'))) {
    return json({ error: 'Une ou plusieurs photos sont invalides.' }, 400);
  }

  const allRows: Row[] = [];

  for (const image of payload.images) {
    const result = await env.AI.run(
      '@cf/google/gemma-4-26b-a4b-it',
      {
        messages: [
          {
            role: 'system',
            content: 'Tu es un extracteur de données de planning. Respecte strictement le format JSON demandé.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: image.data } },
            ],
          },
        ],
        max_tokens: 4096,
        temperature: 0,
      }
    );
    allRows.push(...extractRows(result));
  }

  const deduped = Array.from(new Map(
    allRows.map(row => [
      [row.land, row.sector, row.name, row.start, row.end].join('|'),
      row,
    ])
  ).values());

  if (!deduped.length) {
    return json({ error: 'Aucune ligne exploitable n’a été détectée sur les photos.' }, 422);
  }

  await Promise.all(payload.images.map(async (image, index) => {
    const decoded = decodeDataUrl(image.data);
    await env.BREAKSHEET_BUCKET.put(PHOTO_KEYS[index], decoded.bytes, {
      httpMetadata: { contentType: decoded.mimeType },
    });
  }));

  const updatedAt = new Date().toISOString();
  await env.BREAKSHEET_BUCKET.put(
    DATA_KEY,
    JSON.stringify({ rows: deduped, updatedAt, photos: PHOTO_KEYS }),
    { httpMetadata: { contentType: 'application/json' } }
  );

  return json({
    rows: deduped,
    updatedAt,
    photos: PHOTO_KEYS,
    detected: deduped.length,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    try {
      if (url.pathname === '/api/breaksheet' && request.method === 'GET') {
        return await getPlanning(env);
      }

      if (url.pathname === '/api/breaksheet/process' && request.method === 'POST') {
        return await processPhotos(request, env);
      }

      if (url.pathname.startsWith('/api/')) {
        return json({ error: 'Route API introuvable.' }, 404);
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : String(error);
      return json({ error: `OCR Cloudflare : ${message}` }, 500);
    }
  },
};
