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

const rows: Row[] = [];


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
    [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
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
