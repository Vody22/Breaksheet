import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Moon,
  Sun,
  Clock3,
  Users,
  ChevronDown,
  X,
} from 'lucide-react';

type Row = {
  land: string;
  sector: string;
  name: string;
  start: string;
  end: string;
  break1?: string;
  lunch?: string;
  break2?: string;
  info?: string;
};
const p = (
  land: string,
  sector: string,
  name: string,
  start: string,
  end: string,
  break1 = '',
  lunch = '',
  break2 = '',
  info = ''
): Row => ({ land, sector, name, start, end, break1, lunch, break2, info });

const rows: Row[] = [
  p(
    'Fantasyland',
    'Italie',
    'MORGANE',
    '07:10',
    '17:20',
    '09:30',
    '12:00',
    '15:00'
  ),
  p('Fantasyland', 'Italie', 'ANGEL', '09:10', '14:50', '12:00', '12:15'),
  p(
    'Fantasyland',
    'Italie',
    'PIERRE C',
    '11:30',
    '18:30',
    '',
    '14:00',
    '',
    'sera là à partir de 12h30'
  ),
  p('Fantasyland', 'Italie', 'SARAH', '11:40', '20:20', '17:00', '15:00'),
  p('Fantasyland', 'Bella Luca', 'JULIET', '10:40', '18:20', '16:00', '13:00'),
  p('Fantasyland', 'Bella Luca', 'ILLONA', '10:40', '18:20', '17:00', '14:00'),
  p(
    'Fantasyland',
    'Bella Luca',
    'LUCAS',
    '12:10',
    '17:50',
    '15:30',
    '',
    '15:45'
  ),
  p(
    'Fantasyland',
    'Bella Luca',
    'STEVEN',
    '11:40',
    '20:50',
    '17:00',
    '15:00',
    '19:00'
  ),
  p('Fantasyland', 'Pays-Bas', 'JEREMY', '07:10', '14:50', '09:30', '12:00'),
  p('Fantasyland', 'Pays-Bas', 'OCEANE D', '09:40', '13:05', '11:30'),
  p(
    'Fantasyland',
    'Pays-Bas',
    'LEONARD',
    '11:40',
    '21:50',
    '17:00',
    '14:00',
    '20:00',
    'après parade 17h50'
  ),
  p(
    'Fantasyland',
    'Pays-Bas',
    'ELODIE A',
    '11:40',
    '21:50',
    '18:00',
    '15:00',
    '20:15',
    'Dlearn > 20h15-fin'
  ),
  p(
    'Fantasyland',
    'March Hare Old Mill',
    'NOEMIE MATHILDE',
    '11:40',
    '21:50',
    '17:00',
    '14:00',
    '20:00'
  ),
  p(
    'Fantasyland',
    'March Hare Old Mill',
    'GUILLAUME',
    '12:10',
    '20:50',
    '19:00',
    '15:00'
  ),
  p('Fantasyland', 'France', 'EMILIE', '07:10', '14:05', '', '10:30'),
  p(
    'Fantasyland',
    'France',
    'BADR',
    '09:10',
    '14:35',
    '11:15',
    '',
    '',
    'VM 10H15'
  ),
  p(
    'Fantasyland',
    'France',
    'CHEIKH',
    '10:10',
    '18:50',
    '17:00',
    '13:00',
    '',
    'FO > 14H-17H00'
  ),
  p('Fantasyland', 'France', 'BRICE', '12:10', '19:50', '18:00', '15:00'),
  p(
    'Fantasyland',
    'France',
    'VIVIEN',
    '14:10',
    '21:50',
    '19:00',
    '17:00',
    '20:30'
  ),
  p('Fantasyland', 'Chalet', 'KASHI', '10:40', '18:20', '16:45', '13:00'),
  p(
    'Fantasyland',
    'Chalet',
    'FRANCK',
    '11:40',
    '21:50',
    '17:00',
    '14:00',
    '19:30'
  ),
  p(
    'Fantasyland',
    'Chalet',
    'ARNO',
    '12:10',
    '19:50',
    '17:30',
    '15:00',
    '19:00',
    'après parade 17h50'
  ),
  p('Fantasyland', 'Chalet', 'SILAS', '12:10', '20:50', '19:15', '15:30'),
  p('Fantasyland', 'Angleterre', 'NDELLA', '07:10', '14:50', '09:30', '12:15'),
  p(
    'Fantasyland',
    'Angleterre',
    'SABRINA',
    '09:40',
    '13:05',
    '11:30',
    '',
    '',
    'DA à 12h45'
  ),
  p(
    'Fantasyland',
    'Angleterre',
    'WILLIAM',
    '11:10',
    '21:20',
    '18:30',
    '14:15',
    '20:00',
    'Toad > 15h30-16h15'
  ),
  p('Fantasyland', 'Angleterre', 'CHLOE R', '12:10', '20:50', '19:00', '15:15'),
  p('Fantasyland', 'Toad Hall', 'MARIA PILAR', '11:00', '18:00', '', '14:30'),
  p(
    'Fantasyland',
    'Toad Hall',
    'LUDOVIC',
    '12:10',
    '19:20',
    '18:30',
    '15:30',
    '',
    'Dlearn > 17h30-fin'
  ),
  p('Fantasyland', 'Land', 'NELLY', '09:40', '13:20', '11:00'),

  p(
    'Frontierland',
    'Mississippi',
    'DIARRA',
    '07:10',
    '14:50',
    '09:30',
    '12:00'
  ),
  p(
    'Frontierland',
    'Mississippi',
    'ALEXANDRE D',
    '09:10',
    '16:50',
    '11:30',
    '12:30',
    '',
    'FO > 09H-12h30'
  ),
  p(
    'Frontierland',
    'Mississippi',
    'ALEXANDRA',
    '11:10',
    '18:50',
    '17:00',
    '14:00'
  ),
  p(
    'Frontierland',
    'Mississippi',
    'NICOLAS FO',
    '14:25',
    '21:05',
    '',
    '17:45',
    '',
    'après parade 17h50'
  ),
  p('Frontierland', 'Mississippi', 'KIYAN', '15:40', '21:50', '', '18:30'),
  p('Frontierland', 'Last Chance', 'UGO', '11:25', '16:50', '14:15'),
  p('Frontierland', 'Last Chance', 'PASCHALIS', '11:30', '18:30', '', '14:45'),
  p(
    'Frontierland',
    'Last Chance',
    'RICHARD',
    '14:10',
    '21:50',
    '16:00',
    '17:30',
    '19:45'
  ),
  p(
    'Frontierland',
    'Last Chance',
    'AUDRICK',
    '15:25',
    '21:05',
    '18:00',
    '',
    '18:15'
  ),
  p(
    'Frontierland',
    'Nouveau Mexique',
    'KILLIAN',
    '07:10',
    '17:20',
    '09:30',
    '12:00',
    '15:15'
  ),
  p(
    'Frontierland',
    'Nouveau Mexique',
    'ERICA',
    '09:10',
    '16:50',
    '11:00',
    '13:00'
  ),
  p(
    'Frontierland',
    'Nouveau Mexique',
    'PRISCA',
    '10:40',
    '18:20',
    '16:30',
    '13:45',
    '',
    'après parade 17h50'
  ),
  p('Frontierland', 'Nouveau Mexique', 'CELINE', '14:10', '21:05', '', '17:30'),
  p('Frontierland', 'Casa de Coco', 'ENZO', '10:40', '18:50', '17:30', '13:45'),
  p(
    'Frontierland',
    'Casa de Coco',
    'PIERRE V',
    '10:30',
    '19:30',
    '17:15',
    '13:00'
  ),
  p(
    'Frontierland',
    'Casa de Coco',
    'IVAN JUSTINO',
    '15:10',
    '21:50',
    '',
    '18:00'
  ),
  p('Frontierland', 'Casa de Coco', 'BASTIEN', '14:25', '21:05', '', '17:00'),
  p('Frontierland', 'Texas', 'ELOISE', '09:40', '17:20', '11:30', '13:00'),
  p(
    'Frontierland',
    'Texas',
    'LEYRE',
    '11:40',
    '19:20',
    '16:30',
    '14:00',
    '',
    'après parade 17h50'
  ),
  p('Frontierland', 'Texas', 'NICOLAS J', '15:25', '21:50', '', '18:00'),
  p('Frontierland', 'Cow Boy', 'RKIA', '11:40', '18:05', '', '14:45'),
  p('Frontierland', 'Cow Boy', 'SACHA', '11:40', '17:20', '14:15'),
  p('Frontierland', 'Land', 'VINCENT M', '14:10', '21:50', '19:15', '17:15'),

  p(
    'Main Street U.S.A.',
    'Town Square',
    'MADISON',
    '07:10',
    '13:50',
    '',
    '10:30'
  ),
  p(
    'Main Street U.S.A.',
    'Town Square',
    'FERNANDA',
    '09:40',
    '17:20',
    '15:00',
    '13:00'
  ),
  p(
    'Main Street U.S.A.',
    'Town Square',
    'TIANA',
    '14:40',
    '21:50',
    '20:00',
    '17:00'
  ),
  p('Main Street U.S.A.', 'Rue', 'EMILIEN', '07:10', '14:20', '09:30', '12:00'),
  p(
    'Main Street U.S.A.',
    'Rue',
    'IKBEL',
    '10:10',
    '18:50',
    '16:00',
    '13:00',
    '',
    'FO > 14H-17H00'
  ),
  p('Main Street U.S.A.', 'Rue', 'RUBEN', '11:10', '16:20', '14:00'),
  p('Main Street U.S.A.', 'Rue', 'LORIE', '14:25', '21:35', '20:00', '17:00'),
  p('Main Street U.S.A.', 'Hub', 'CLAUDIA', '07:10', '15:50', '09:30', '12:00'),
  p('Main Street U.S.A.', 'Hub', 'REMY', '09:40', '14:35', '11:45'),
  p(
    'Main Street U.S.A.',
    'Hub',
    'ALEXANDRE V',
    '10:40',
    '20:50',
    '17:00',
    '13:00',
    '19:30'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'ESTHER',
    '09:10',
    '16:50',
    '15:00',
    '12:00'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'JENA',
    '10:10',
    '17:05',
    '',
    '13:00',
    '',
    'FO > 14H-17H00'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'EMILE S',
    '10:40',
    '20:50',
    '16:00',
    '13:45',
    '19:00'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'CHLOE L',
    '14:55',
    '21:50',
    '',
    '18:00'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'THIERRY',
    '14:10',
    '21:50',
    '19:45',
    '16:30'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'EVANN',
    '14:10',
    '21:50',
    '20:15',
    '17:15'
  ),
  p(
    'Main Street U.S.A.',
    'Casey’s Corner',
    'PERRINE',
    '15:25',
    '21:50',
    '',
    '18:30'
  ),
  p(
    'Main Street U.S.A.',
    'Market House Deli & Victoria',
    'JUDES',
    '07:10',
    '14:50',
    '09:30',
    '12:00'
  ),
  p(
    'Main Street U.S.A.',
    'Market House Deli & Victoria',
    'SON',
    '09:10',
    '16:50',
    '11:00',
    '13:15'
  ),
  p(
    'Main Street U.S.A.',
    'Market House Deli & Victoria',
    'LEA',
    '14:10',
    '21:05',
    '',
    '17:30'
  ),
  p(
    'Main Street U.S.A.',
    'Market House Deli & Victoria',
    'MIGUEL',
    '14:10',
    '21:50',
    '19:00',
    '16:45'
  ),
  p(
    'Main Street U.S.A.',
    'Market House Deli & Victoria',
    'DAVID H',
    '11:40',
    '21:50',
    '18:15',
    '14:30',
    '20:45'
  ),
  p(
    'Main Street U.S.A.',
    'Market House Deli & Victoria',
    'DIDIER',
    '13:10',
    '21:50',
    '20:00',
    '16:00'
  ),
  p(
    'Main Street U.S.A.',
    'Trasheurs + Annexes',
    'JULIAN',
    '07:10',
    '17:20',
    '09:15',
    '12:00',
    '15:00'
  ),
  p(
    'Main Street U.S.A.',
    'Trasheurs + Annexes',
    'ALEX T',
    '10:40',
    '19:20',
    '17:15',
    '13:30'
  ),
  p(
    'Main Street U.S.A.',
    'Trasheurs + Annexes',
    'PAULINE',
    '14:55',
    '21:50',
    '',
    '18:00'
  ),

  p(
    'Discoveryland',
    '1',
    'CEDRIC',
    '07:10',
    '17:20',
    '09:30',
    '12:00',
    '15:00'
  ),
  p('Discoveryland', '1', 'KHADIDIATOU', '09:10', '16:50', '11:30', '13:00'),
  p(
    'Discoveryland',
    '1',
    'ELENA',
    '11:40',
    '20:50',
    '17:00',
    '15:00',
    '19:00',
    'après parade 17h50'
  ),
  p('Discoveryland', '1', 'DAVID B', '13:25', '21:05', '19:00', '16:00'),
  p('Discoveryland', '3', 'ALAIN', '07:10', '15:50', '09:30', '12:00'),
  p('Discoveryland', '3', 'HASSAN', '09:10', '16:50', '11:30', '13:00'),
  p('Discoveryland', '3', 'BENEDICTE', '11:40', '17:20', '14:45', '', '15:00'),
  p('Discoveryland', '3', 'JULIEN', '14:40', '21:05', '', '17:30'),
  p(
    'Discoveryland',
    '3',
    'VINCENT G',
    '13:10',
    '21:50',
    '19:00',
    '16:00',
    '',
    'après parade 17h50'
  ),

  p(
    'Adventureland',
    'Jungle',
    'NESRINE',
    '07:10',
    '12:50',
    '10:30',
    '',    '10:45'
  ),
  p('Adventureland', 'Jungle', 'BEATRICE', '09:10', '12:35', '11:00'),
  p(
    'Adventureland',
    'Jungle',
    'LILLAH',
    '11:25',
    '21:35',
    '18:00',
    '14:00',
    '20:00',
    'après parade 17h50'
  ),
  p(
    'Adventureland',
    'Jungle',
    'LUCIANA',
    '11:40',
    '21:50',
    '17:00',
    '14:45',
    '19:00'
  ),
  p('Adventureland', 'Desert', 'GUILLEM', '07:00', '16:00', '09:15', '12:00'),
  p('Adventureland', 'Desert', 'SILVIA', '09:10', '16:50', '11:30', '13:00'),
  p(
    'Adventureland',
    'Desert',
    'MATHIS',
    '14:10',
    '21:20',
    '20:00',
    '17:00',
    '',
    'après parade 17h50'
  ),
  p('Adventureland', 'Desert', 'MICKAEL D', '16:40', '21:50', '19:30'),
  p(
    'Adventureland',
    'Hakuna',
    'MAXENCE',
    '11:40',
    '17:20',
    '14:00',
    '',
    '14:15'
  ),
  p(
    'Adventureland',
    'Hakuna',
    'HATAYI',
    '11:40',
    '19:20',
    '17:00',
    '14:30',
    '18:00',
    'Dlearn > 17h30-fin'
  ),
];

const radios = [
  ['10.00', 'Essai radio'],
  ['10.01', 'mauvaise réception'],
  ['10.02', 'bonne réception'],
  ['10.04', 'Bien reçu'],
  ['10.09', 'Répétez'],
  ['10.20', 'Position'],
  ['10.22', 'Annulez'],
  ['10.23', 'En attente'],
  ['10.26', 'Copié ?'],
  ['10.45', 'Appel tel'],
  ['10.51', 'En chemin'],
  ['10.53', 'Affirmatif'],
  ['10.54', 'Négatif'],
  ['10.56', 'Rendez-vous'],
  ['10.65', 'Transmettez'],
  ['10.96', 'Chgt de canal'],
  ['18', 'Evacuation'],
  ['22', 'Trouble ordre public'],
  ['24', 'Guest Situation'],
  ['25', 'Incendie'],
  ['35', 'Bagarre'],
  ['43', 'Personne accidentée'],
  ['44', 'malaise'],
  ['95', 'Suspicion de drogue'],
];
const leaders = {
  OPEN: ['GIUSEPPE', 'ERICK'],
  'MIDDLE 1': ['RAI', 'MATHIEU'],
  'MIDDLE 2': ['FLO'],
  CLOSE: ['MAHER', 'JP'],
};
const lands = [
  'Tous',
  'Fantasyland',
  'Frontierland',
  'Main Street U.S.A.',
  'Discoveryland',
  'Adventureland',
];

const api = {
  async get(path: string) {
    const res = await fetch(path);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Erreur réseau');
    return { data };
  },
  async post(path: string, body: unknown) {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data: any = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = {}; }
    if (!res.ok) {
      throw new Error(data?.error || `Erreur serveur (${res.status})${text ? ` : ${text.slice(0, 180)}` : ''}`);
    }
    return { data };
  },
};

async function resizeImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const maxDimension = 1200;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas indisponible');
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.68);
}

function minutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
function state(r: Row, now: number) {
  const s = minutes(r.start),
    e = minutes(r.end);
  if (now < s || now > e) return 'Hors shift';
  for (const [key, label] of [
    ['break1', 'Pause'],
    ['lunch', 'Lunch'],
    ['break2', 'Pause'],
  ]) {
    const v = r[key as keyof Row] as string;
    if (v && Math.abs(now - minutes(v)) <= 15) return label;
  }
  return 'En shift';
}
function App() {
  const [land, setLand] = useState('Tous'),
    [sector, setSector] = useState('Tous'),
    [q, setQ] = useState(''),
    [tab, setTab] = useState<'planning' | 'now'>('planning'),
    [dark, setDark] = useState(false),
    [selected, setSelected] = useState<Row | null>(null),
    [now, setNow] = useState(new Date()),
    [liveRows, setLiveRows] = useState<Row[] | null>(null),
    [photoFiles, setPhotoFiles] = useState<(File | null)[]>([null, null, null, null]),
    [photoPreviews, setPhotoPreviews] = useState<string[]>(['','','','']),
    [processing, setProcessing] = useState(false),
    [updateMessage, setUpdateMessage] = useState('');
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    api.get('/api/breaksheet').then(({ data }) => {
      if (data?.rows?.length) setLiveRows(data.rows);
    }).catch(() => undefined);
  }, []);
  const activeRows = rows;
  const sectors = useMemo(
    () => [
      'Tous',
      ...Array.from(
        new Set(
          activeRows
            .filter(r => land === 'Tous' || r.land === land)
            .map(r => r.sector)
        )
      ),
    ],
    [land, activeRows]
  );
  const filtered = useMemo(
    () =>
      activeRows.filter(
        r =>
          (land === 'Tous' || r.land === land) &&
          (sector === 'Tous' || r.sector === sector) &&
          r.name.toLowerCase().includes(q.toLowerCase())
      ),
    [land, sector, q, activeRows]
  );
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const nowRows = useMemo(
    () =>
      activeRows
        .filter(r => state(r, currentMinutes) === 'En shift')
        .sort((a, b) => minutes(a.end) - minutes(b.end)),
    [currentMinutes, activeRows]
  );
  const landClass = (l: string) => l.toLowerCase().replace(/[^a-z]+/g, '-');
  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="top">
        <div>
          <div className="eyebrow">CUSTODIAL DLP</div>
          <h1>
            Breaksheet
          </h1>
          <div className="meta">
            Vendredi 18/09/2026 · planning chargé depuis les photos
          </div>
        </div>
        <button
          className="icon"
          onClick={() => setDark(!dark)}
          aria-label="Mode sombre"
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>
      {false && <div className="hero">
        <div className="heroStat">
          <Clock3 />
          <div>
            <b>
              {now.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </b>
            <small>heure actuelle</small>
          </div>
        </div>
        <div className="heroStat heroNext">
          <Clock3 />
          <div>
            <b>{nextEvent ? nextEvent.time : '—'}</b>
            <small>{nextEvent ? nextEvent.type + ' · ' + nextEvent.r.name : 'aucun créneau restant'}</small>
          </div>
        </div>
        <div className="heroStat heroCountdown">
          <div>
            <b>—</b>
            <small>prochaine pause / lunch</small>
          </div>
        </div>
        <div className="heroStat">
          <Users />
          <div>
            <b>{nowRows.length}</b>
            <small>en shift maintenant</small>
          </div>
        </div>
      </div>}
      <nav className="tabs">
        <button
          className={tab === 'planning' ? 'active' : ''}
          onClick={() => setTab('planning')}
        >
          Planning
        </button>
        <button
          className={tab === 'now' ? 'active' : ''}
          onClick={() => setTab('now')}
        >
          Maintenant
        </button>
      </nav>
      {tab === 'radios' ? (
        <main className="content">
          <section className="panel">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">RÉFÉRENCE</div>
                <h2>Codes radios</h2>
              </div>
            </div>
            <div className="radioGrid">
              {radios.map(([c, d]) => (
                <div className="radio">
                  <b>{c}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="panel">
            <div className="sectionHead">
              <div className="eyebrow">ENCADREMENT</div>
              <h2>Team Leaders</h2>
            </div>
            <div className="leaders">
              {Object.entries(leaders).map(([role, names]) => (
                <div>
                  <small>{role}</small>
                  <b>{names.join(' · ')}</b>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="content">
          <div className="filters">
            <div className="search">
              <Search />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Rechercher un Cast Member..."
              />
              {q && (
                <button onClick={() => setQ('')}>
                  <X />
                </button>
              )}
            </div>
            <div className="selects">
              <label>
                Land
                <select
                  value={land}
                  onChange={e => {
                    setLand(e.target.value);
                    setSector('Tous');
                  }}
                >
                  {lands.map(x => (
                    <option>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Secteur
                <select
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                >
                  {sectors.map(x => (
                    <option>{x}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {tab === 'now' ? (
            <section className="panel">
              <div className="sectionHead">
                <div>
                  <div className="eyebrow">TEMPS RÉEL</div>
                  <h2>En shift maintenant</h2>
                </div>
                <span className="count">{nowRows.length}</span>
              </div>
              <div className="cards">
                {nowRows.map(r => (
                  <Card
                    key={r.name + r.sector}
                    r={r}
                    onClick={() => setSelected(r)}
                    current={true}
                  />
                ))}
              </div>
            </section>
          ) : (
            <>
              {lands.slice(1).map(l => {
                if (land !== 'Tous' && land !== l) return null;
                const rs = filtered.filter(r => r.land === l);
                if (!rs.length) return null;
                return (
                  <section className="panel landPanel" key={l}>
                    <div className={'landAccent ' + landClass(l)}></div>
                    <div className="sectionHead">
                      <div>
                        <div className="eyebrow">{l}</div>
                        <h2>
                          {Array.from(new Set(rs.map(r => r.sector))).length}{' '}
                          secteurs · {rs.length} personnes
                        </h2>
                      </div>
                      <ChevronDown />
                    </div>
                    <div className="cards">
                      {rs.map(r => (
                        <Card
                          key={r.name + r.sector}
                          r={r}
                          onClick={() => setSelected(r)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </main>
      )}
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>
              <X />
            </button>
            <div className="eyebrow">
              {selected.land} · {selected.sector}
            </div>
            <h2>{selected.name}</h2>
            <div className="bigShift">
              {selected.start} <span>→</span> {selected.end}
            </div>
            <div className="detailGrid">
              <div>
                <small>Break 1</small>
                <b>{selected.break1 || '—'}</b>
              </div>
              <div>
                <small>Lunch</small>
                <b>{selected.lunch || '—'}</b>
              </div>
              <div>
                <small>Break 2</small>
                <b>{selected.break2 || '—'}</b>
              </div>
            </div>
            {selected.info && <div className="info">{selected.info}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
function Card({
  r,
  onClick,
  current = false,
}: {
  r: Row;
  onClick: () => void;
  current?: boolean;
}) {
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const shiftStart = minutes(r.start);
  const shiftEnd = minutes(r.end);
  const status = state(r, nowMin);
  const progress = Math.min(100, Math.max(0, ((nowMin - shiftStart) / Math.max(1, shiftEnd - shiftStart)) * 100));
  return (
    <button className="card" onClick={onClick}>
      <div className="cardTop">
        <div>
          <small>
            {r.land} · {r.sector}
          </small>
          <h3>{r.name}</h3>
        </div>
        {current && <span className="live">EN SHIFT</span>}
      </div>
      <div className="shiftRow">
        <div className="shift">{r.start}<span>→</span>{r.end}</div>
        <span className={'stateBadge ' + status.toLowerCase().replace(' ', '-')}>{status}</span>
      </div>
      <div className="progressTrack">
        <div className="progressFill" style={{ width: progress + '%' }} />
      </div>
      <div className="times">
        <span>
          <i>Break</i>
          {r.break1 || '—'}
        </span>
        <span>
          <i>Lunch</i>
          {r.lunch || '—'}
        </span>
        <span>
          <i>Break</i>
          {r.break2 || '—'}
        </span>
      </div>
      {r.info && <div className="cardInfo">{r.info}</div>}
    </button>
  );
}
export default App;
