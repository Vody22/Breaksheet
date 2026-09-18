import { ai, storage, router, json, error } from '@appdeploy/sdk';

const DATA_PATH = 'breaksheet/data.json';
const SLOT_PATHS = ['breaksheet/photo-1.jpg','breaksheet/photo-2.jpg','breaksheet/photo-3.jpg','breaksheet/photo-4.jpg'];

const schema = {
  type: 'object',
  properties: {
    rows: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          land: { type: 'string' }, sector: { type: 'string' }, name: { type: 'string' },
          start: { type: 'string' }, end: { type: 'string' }, break1: { type: 'string' },
          lunch: { type: 'string' }, break2: { type: 'string' }, info: { type: 'string' }
        },
        required: ['land','sector','name','start','end','break1','lunch','break2','info']
      }
    }
  },
  required: ['rows']
};

const prompt = `Lis les 4 photos de breaksheet Custodial DLP et reconstruis le planning complet visible. Chaque photo peut contenir une ou plusieurs zones/secteurs. Fusionne les photos sans doublons. Retourne une ligne par Cast Member. Conserve exactement les noms, lands et secteurs visibles. Les horaires doivent être au format HH:MM. Si un créneau est absent ou illisible, mets une chaîne vide. Mets les remarques dans info. Ne déduis jamais un horaire qui n'est pas visible.`;

export const handler = router({
  'GET /api/breaksheet': [async () => {
    const files = await storage.read([DATA_PATH]);
    if (!files[0]?.content) return json({ rows: [], updatedAt: null, photos: [] });
    try { return json(JSON.parse(files[0].content)); } catch { return error('Données breaksheet invalides', 500); }
  }],
  'POST /api/breaksheet/process': [async ({ body }) => {
    const payload = body as { images?: Array<{ data: string; mimeType: string }> };
    if (!payload.images || payload.images.length !== 4) return error('Il faut exactement 4 photos.', 400);
    if (payload.images.some(x => !x.data || !x.mimeType?.startsWith('image/'))) return error('Une ou plusieurs photos sont invalides.', 400);
    const result = await ai.ocr({ images: payload.images, prompt, schema, maxRetries: 2, maxTokens: 8192, temperature: 0.05, thinkingMode: 'FAST' });
    const data = result.data as { rows?: unknown[] } | undefined;
    if (!data?.rows?.length) return error('Aucune ligne exploitable n’a été détectée sur les photos.', 422);
    const rows = data.rows.map(r => {
      const x = r as Record<string, unknown>;
      return { land:String(x.land??''), sector:String(x.sector??''), name:String(x.name??''), start:String(x.start??''), end:String(x.end??''), break1:String(x.break1??''), lunch:String(x.lunch??''), break2:String(x.break2??''), info:String(x.info??'') };
    }).filter(r => r.name && r.start && r.end);
    if (!rows.length) return error('Les photos ont été lues mais aucune ligne valide n’a été trouvée.', 422);
    const savedPhotos = await storage.write(payload.images.map((x,i) => ({ path:SLOT_PATHS[i], content:x.data, contentType:x.mimeType })));
    if (!savedPhotos.every(Boolean)) return error('Impossible d’enregistrer les 4 photos.', 500);
    const updatedAt = new Date().toISOString();
    const saved = await storage.write([{ path:DATA_PATH, content:JSON.stringify({ rows, updatedAt, photos:SLOT_PATHS }), contentType:'application/json' }]);
    if (!saved[0]) return error('Impossible d’enregistrer le nouveau planning.', 500);
    return json({ rows, updatedAt, photos:SLOT_PATHS, detected:rows.length });
  }]
});
