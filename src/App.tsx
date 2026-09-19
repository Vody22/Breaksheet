import {
  Search,
  Moon,
  Sun,
  Clock3,
  Users,
  X,
  CalendarDays,
  Coffee,
  Utensils,
  MapPin,
  ChevronRight,
  CircleUserRound,
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
  // Discoveryland
  p('Discoveryland','1','CEDRIC','07:10','12:50','10:30','','10:45'),
  p('Discoveryland','1','LUDOVIC','10:10','17:05','','13:30'),
  p('Discoveryland','1','NOEMIE MATHILD','11:40','21:50','17:00','14:30','20:00'),
  p('Discoveryland','1','PERRINE','13:10','22:50','15:15','17:30','20:15'),
  p('Discoveryland','2','CALYPSO','07:00','14:15','09:30','12:00'),
  p('Discoveryland','2','DAVID H','11:25','21:35','17:00','14:30','20:15','après parade 17h50'),
  p('Discoveryland','2','VINCENT G','15:25','22:20','','18:30'),
  p('Discoveryland','3','NDELLA','10:10','14:50','09:30','12:00'),
  p('Discoveryland','3','SLIMANI','09:10','15:05','','12:30'),
  p('Discoveryland','3','MARLAINE','09:40','17:20','11:00','13:30'),
  p('Discoveryland','3','ARNO','11:40','19:20','17:00','14:30','18:00','après parade 17h50'),
  p('Discoveryland','3','KASHI','15:10','22:50','21:00','18:30'),
  p('Discoveryland','Land','HAWA','09:10','16:50','14:30','11:30'),

  // Adventureland
  p('Adventureland','Jungle','JEREMY','07:10','14:50','09:30','12:00'),
  p('Adventureland','Jungle','BEATRICE','09:10','12:35','11:00'),
  p('Adventureland','Jungle','LUCAS','12:55','18:35','15:30','','15:45','après parade 17h50'),
  p('Adventureland','Jungle','NICOLAS J','14:10','22:50','20:30','17:30'),
  p('Adventureland','Caraibes','GUILLEM','07:00','16:00','09:30','12:00'),
  p('Adventureland','Caraibes','EMILIE S','09:10','19:20','11:00','13:00','16:00'),
  p('Adventureland','Caraibes','RKIA','11:10','19:50','17:00','14:00'),
  p('Adventureland','Caraibes','EVANN','15:10','22:50','21:00','18:15'),
  p('Adventureland','Desert','TOM','07:10','17:20','09:30','12:00','15:00'),
  p('Adventureland','Desert','ENZO','10:40','16:20','13:00','','13:15'),
  p('Adventureland','Desert','MARIE','15:40','21:20','18:30','','18:45','après parade 17h50'),
  p('Adventureland','Desert','GUILLAUME','16:25','22:50','','19:30'),
  p('Adventureland','Hakuna','KRZYSZTOF','11:40','17:05','14:15'),
  p('Adventureland','Hakuna','STEFANO','12:10','20:05','18:00','15:30','', 'Dlearn > 17h30 - fin'),

  // Frontierland
  p('Frontierland','Mississippi','ALAIN','07:10','14:20','09:30','12:00'),
  p('Frontierland','Mississippi','REMY','09:40','14:20','11:30'),
  p('Frontierland','Mississippi','ALEXANDRA','11:10','18:50','16:00','13:15','','après parade 17h50'),
  p('Frontierland','Last Chance','DIDIER','15:40','22:50','20:30','18:00'),
  p('Frontierland','Last Chance','CHLOE R','10:10','18:50','16:30','13:15'),
  p('Frontierland','Last Chance','ALEX T','11:40','20:20','17:30','14:15','','HR de 15h30 à 17h lockers'),
  p('Frontierland','Last Chance','REMY H','11:40','17:05','14:45'),
  p('Frontierland','Last Chance','TIANA','14:10','22:50','20:00','17:00'),
  p('Frontierland','Last Chance','CELINE','14:10','22:50','20:30','18:00'),
  p('Frontierland','Nouveau Mexique','MORGAN','07:10','12:35','10:30'),
  p('Frontierland','Nouveau Mexique','IKBEL','10:10','18:50','16:00','12:15'),
  p('Frontierland','Nouveau Mexique','HATAYI','11:10','18:50','15:45','13:00','17:15','D learn de 17h30 à 18h50'),
  p('Frontierland','Nouveau Mexique','MIGUEL','15:10','22:50','20:30','18:00'),
  p('Frontierland','Casa de Coco','WILLIAM','10:40','16:20','13:45','14:00'),
  p('Frontierland','Casa de Coco','ILLONA','10:40','18:20','17:00','13:45','','après parade 17h50'),
  p('Frontierland','Casa de Coco','ALEXANDRE B','12:40','22:50','18:00','15:45','21:00'),
  p('Frontierland','Casa de Coco','LEA','14:10','22:50','20:30','17:15'),
  p('Frontierland','Texas','SARAH C','07:10','17:20','09:30','12:00','15:00','Cow boy > 13h30-14h15'),
  p('Frontierland','Texas','FERNANDA','09:40','17:20','15:00','13:00'),
  p('Frontierland','Texas','SACHA','15:10','20:50','18:15','','18:30','après parade 17h50'),
  p('Frontierland','Texas','ERWAN','15:55','22:50','','19:00'),
  p('Frontierland','Cow Boy','NESRINE','11:10','21:20','17:00','13:30','20:00'),
  p('Frontierland','Cow Boy','BRICE','11:40','19:20','17:30','14:30'),

  // Main Street U.S.A.
  p('Main Street U.S.A.','Town Square','DIARRA','07:10','14:50','09:30','12:00'),
  p('Main Street U.S.A.','Town Square','OCEANE D','09:40','13:05','11:30'),
  p('Main Street U.S.A.','Town Square','CHLOE L','15:40','22:50','21:00','18:00'),
  p('Main Street U.S.A.','Rue','KILLIAN','07:10','12:50','10:30','','10:45'),
  p('Main Street U.S.A.','Rue','CHEIKH','10:10','18:20','16:00','12:00','','après parade 17h50'),
  p('Main Street U.S.A.','Rue','DAVID B','14:40','22:20','20:00','17:00'),
  p('Main Street U.S.A.','Hub','ELOISE','07:10','14:50','09:30','12:00'),
  p('Main Street U.S.A.','Hub','ROBERTO','11:10','18:50','18:00','14:00','', 'après parade 17h50'),
  p('Main Street U.S.A.','Hub','VIVIEN','15:10','22:50','20:00','18:00','21:00'),
  p('Main Street U.S.A.','Casey’s Corner','MAXENCE','09:40','15:20','10:30','','13:00'),
  p('Main Street U.S.A.','Casey’s Corner','PAULINE','11:10','19:50','18:00','14:00'),
  p('Main Street U.S.A.','Casey’s Corner','PASCHALIS','11:30','18:30','17:00','14:45'),
  p('Main Street U.S.A.','Casey’s Corner','ROCIO','12:10','19:50','18:30','15:30'),
  p('Main Street U.S.A.','Casey’s Corner','MICKAEL D','14:40','22:50','21:00','17:30'),
  p('Main Street U.S.A.','Casey’s Corner','HAYDEN','15:55','22:50','','18:30'),
  p('Main Street U.S.A.','Casey’s Corner','GWENN','16:30','22:50','','19:30'),
  p('Main Street U.S.A.','Market house Deli & Victoria','JUDES','07:10','14:50','09:30','12:00'),
  p('Main Street U.S.A.','Market house Deli & Victoria','LEON PAUL','10:10','18:50','16:00','12:30','18:00'),
  p('Main Street U.S.A.','Market house Deli & Victoria','ELODIE A','10:40','16:05','','13:15'),
  p('Main Street U.S.A.','Market house Deli & Victoria','LEYRE','11:40','19:20','18:00','14:30'),
  p('Main Street U.S.A.','Market house Deli & Victoria','SARAH','12:10','19:05','','15:30'),
  p('Main Street U.S.A.','Market house Deli & Victoria','KIYAN','15:40','22:35','','18:30'),
  p('Main Street U.S.A.','Market house Deli & Victoria','IVAN JUSTINO','16:10','22:50','','19:30'),
  p('Main Street U.S.A.','Market house Deli & Victoria','MAXIME V','17:10','22:50','20:00','','20:15'),
  p('Main Street U.S.A.','Trasheurs + Annexes','CLAUDIA','07:10','14:05','','10:30'),
  p('Main Street U.S.A.','Trasheurs + Annexes','ALEXY','12:10','19:50','18:00','15:30'),
  p('Main Street U.S.A.','Trasheurs + Annexes','SILAS','14:10','22:50','20:00','17:00'),

  // Fantasyland
  p('Fantasyland','Italie','EMILIE','07:10','13:50','','10:30'),
  p('Fantasyland','Italie','ALEXANDRE V','10:40','16:20','13:00','','13:15'),
  p('Fantasyland','Italie','MAXIME G','12:10','17:35','15:30'),
  p('Fantasyland','Italie','STEVEN','13:10','21:20','19:30','16:00'),
  p('Fantasyland','Bella Luca','ELENA','10:40','17:50','16:30','13:00'),
  p('Fantasyland','Bella Luca','AUDRICK','11:40','17:20','14:00','','14:15'),
  p('Fantasyland','Bella Luca','ALEXANDRE D','12:10','19:50','14:00','15:30'),
  p('Fantasyland','Bella Luca','LORIE','15:25','20:50','18:30','15:30'),
  p('Fantasyland','Pays-Bas','JULIAN','07:10','17:20','09:30','12:00','15:00'),
  p('Fantasyland','Pays-Bas','FRANCK','10:10','15:50','13:00','','13:15'),
  p('Fantasyland','Pays-Bas','JENA','11:10','18:50','18:00','14:00'),
  p('Fantasyland','Pays-Bas','LUCIANA','13:10','22:05','19:00','16:00','','après parade 17h50'),
  p('Fantasyland','March Hare Old Mill','BADR','11:40','21:50','17:00','14:00','19:30'),
  p('Fantasyland','March Hare Old Mill','NICOLAS FO','11:40','18:20','','14:45'),
  p('Fantasyland','France','MADISON','07:10','14:05','','10:30'),
  p('Fantasyland','France','JULIET','10:40','18:20','16:45','13:00'),
  p('Fantasyland','France','AMANULLAH','12:10','19:50','18:00','15:30','20:45'),
  p('Fantasyland','France','RICHARD','14:10','21:50','19:30','17:00'),
  p('Fantasyland','Chalet','LILLAH','10:40','16:05','13:00'),
  p('Fantasyland','Chalet','BENEDICTE','11:40','17:20','14:00','','14:15'),
  p('Fantasyland','Chalet','JULIEN','15:10','22:05','','18:30'),
  p('Fantasyland','Chalet','THIERRY','14:40','22:20','21:00','17:30'),
  p('Fantasyland','Angleterre','EMILIEN','07:10','15:50','09:30','12:00'),
  p('Fantasyland','Angleterre','UGO','11:40','21:50','17:00','14:00','20:00'),
  p('Fantasyland','Angleterre','BASTIEN','15:10','22:20','21:30','18:30'),
  p('Fantasyland','Angleterre','LEONARD','16:25','21:50','19:30','','','après parade 17h50'),
  p('Fantasyland','Toad Hall','MATHIS','11:10','19:50','16:45','13:15','','Dlearn > 17h30-fin'),
  p('Fantasyland','Toad Hall','SANDRA','11:00','20:00','18:15','14:00','','après parade 17h50'),
];



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
  const s = minutes(r.start);
  const e = minutes(r.end);
  if (now < s) return 'À venir';
  if (now > e) return 'Terminé';
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

function nextBreak(r: Row, now: number) {
  return [r.break1, r.lunch, r.break2]
    .filter(Boolean)
    .map(time => ({ time: time as string, type: time === r.lunch ? 'Lunch' : 'Pause' }))
    .find(x => minutes(x.time) > now);
}

function App() {
  const [land, setLand] = useState('Tous');
  const [sector, setSector] = useState('Tous');
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'planning' | 'now'>('planning');
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState<Row | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const activeRows = rows;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

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
    [land]
  );

  const filtered = useMemo(
    () =>
      activeRows.filter(
        r =>
          (land === 'Tous' || r.land === land) &&
          (sector === 'Tous' || r.sector === sector) &&
          r.name.toLowerCase().includes(q.toLowerCase())
      ),
    [land, sector, q]
  );

  const liveRows = useMemo(
    () => activeRows.filter(r => {
      const s = state(r, currentMinutes);
      return s === 'En shift' || s === 'Pause' || s === 'Lunch';
    }),
    [currentMinutes]
  );

  const breakRows = useMemo(
    () => activeRows.filter(r => ['Pause', 'Lunch'].includes(state(r, currentMinutes))),
    [currentMinutes]
  );

  const nextEvents = useMemo(
    () =>
      activeRows
        .flatMap(r => {
          const next = nextBreak(r, currentMinutes);
          return next ? [{ r, ...next }] : [];
        })
        .sort((a, b) => minutes(a.time) - minutes(b.time))
        .slice(0, 3),
    [currentMinutes]
  );

  const displayedNow = useMemo(() => {
    const order = { Pause: 0, Lunch: 1, 'En shift': 2 } as Record<string, number>;
    return [...liveRows].sort(
      (a, b) => (order[state(a, currentMinutes)] ?? 9) - (order[state(b, currentMinutes)] ?? 9)
    );
  }, [liveRows, currentMinutes]);

  const landClass = (l: string) => l.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="top">
        <div className="brand">
          <div className="brandMark">B</div>
          <div>
            <div className="eyebrow">CUSTODIAL DLP</div>
            <h1>Breaksheet</h1>
            <div className="meta"><CalendarDays /> Samedi 19/09/2026 · planning chargé</div>
          </div>
        </div>
        <button className="icon" onClick={() => setDark(!dark)} aria-label="Mode sombre">
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>

      <section className="dashboard">
        <div className="welcome">
          <div>
            <div className="eyebrow">AUJOURD'HUI</div>
            <h2>{tab === 'now' ? 'Vue en direct' : 'Planning du jour'}</h2>
            <p>{liveRows.length} Cast Members actuellement actifs · {breakRows.length} en pause ou lunch</p>
          </div>
          <div className="liveClock">
            <span>MAINTENANT</span>
            <strong>{now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</strong>
          </div>
        </div>
        <div className="stats">
          <div className="statCard"><Users /><strong>{rows.length}</strong><span>Cast Members</span></div>
          <div className="statCard"><Clock3 /><strong>{liveRows.length}</strong><span>En shift</span></div>
          <div className="statCard"><Coffee /><strong>{breakRows.length}</strong><span>Pause / lunch</span></div>
        </div>
        {nextEvents.length > 0 && (
          <div className="nextStrip">
            <div className="nextLabel"><Clock3 /> PROCHAINS CRÉNEAUX</div>
            <div className="nextItems">
              {nextEvents.map(x => (
                <button key={x.r.name + x.time} onClick={() => setSelected(x.r)}>
                  <b>{x.time}</b>
                  <span>{x.type} · {x.r.name}</span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <nav className="tabs">
        <button className={tab === 'planning' ? 'active' : ''} onClick={() => setTab('planning')}>
          <CalendarDays /> Planning
        </button>
        <button className={tab === 'now' ? 'active' : ''} onClick={() => setTab('now')}>
          <Clock3 /> Maintenant
          {liveRows.length > 0 && <span className="tabCount">{liveRows.length}</span>}
        </button>
      </nav>

      <main className="content">
        <div className="filters">
          <div className="search">
            <Search />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un Cast Member..." />
            {q && <button onClick={() => setQ('')}><X /></button>}
          </div>
          <div className="landPills">
            {lands.map(x => (
              <button key={x} className={land === x ? 'selected' : ''} onClick={() => { setLand(x); setSector('Tous'); }}>
                {x}
              </button>
            ))}
          </div>
          {land !== 'Tous' && (
            <select className="sectorSelect" value={sector} onChange={e => setSector(e.target.value)}>
              {sectors.map(x => <option key={x}>{x}</option>)}
            </select>
          )}
        </div>

        {tab === 'now' ? (
          <section className="nowPage">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">TEMPS RÉEL</div>
                <h2>Ce qui se passe maintenant</h2>
              </div>
              <span className="count">{displayedNow.length}</span>
            </div>
            {displayedNow.length ? (
              <div className="cards">
                {displayedNow.map(r => <Card key={r.name + r.sector} r={r} onClick={() => setSelected(r)} current />)}
              </div>
            ) : (
              <div className="empty"><Clock3 /><b>Aucun shift en cours</b><span>Consulte le planning pour les prochains départs.</span></div>
            )}
          </section>
        ) : (
          <>
            {lands.slice(1).map(l => {
              if (land !== 'Tous' && land !== l) return null;
              const rs = filtered.filter(r => r.land === l);
              if (!rs.length) return null;
              return (
                <section className="panel landPanel" key={l}>
                  <div className={'landAccent ' + landClass(l)} />
                  <div className="sectionHead">
                    <div>
                      <div className="eyebrow">{l}</div>
                      <h2>{rs.length} personnes <span>·</span> {Array.from(new Set(rs.map(r => r.sector))).length} secteurs</h2>
                    </div>
                    <MapPin className="sectionIcon" />
                  </div>
                  <div className="cards">
                    {rs.map(r => <Card key={r.name + r.sector} r={r} onClick={() => setSelected(r)} />)}
                  </div>
                </section>
              );
            })}
            {!filtered.length && <div className="empty"><CircleUserRound /><b>Aucun Cast Member trouvé</b><span>Modifie la recherche ou le filtre.</span></div>}
          </>
        )}
      </main>

      <nav className="bottomNav">
        <button className={tab === 'planning' ? 'active' : ''} onClick={() => setTab('planning')}><CalendarDays /><span>Planning</span></button>
        <button className={tab === 'now' ? 'active' : ''} onClick={() => setTab('now')}><Clock3 /><span>Maintenant</span>{liveRows.length > 0 && <i>{liveRows.length}</i>}</button>
        <button className={q ? 'active' : ''} onClick={() => { setTab('planning'); document.querySelector<HTMLInputElement>('.search input')?.focus(); }}><Search /><span>Recherche</span></button>
      </nav>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}><X /></button>
            <div className="modalTop">
              <div className="avatar">{selected.name.slice(0, 1)}</div>
              <div><div className="eyebrow">{selected.land}</div><span className="modalSector">{selected.sector}</span></div>
            </div>
            <h2>{selected.name}</h2>
            <div className="modalShift"><Clock3 /> {selected.start} <span>→</span> {selected.end}</div>
            <div className="detailGrid">
              <div><Coffee /><small>Break 1</small><b>{selected.break1 || '—'}</b></div>
              <div><Utensils /><small>Lunch</small><b>{selected.lunch || '—'}</b></div>
              <div><Coffee /><small>Break 2</small><b>{selected.break2 || '—'}</b></div>
            </div>
            {nextBreak(selected, currentMinutes) && (
              <div className="nextBreak">
                <span>PROCHAIN CRÉNEAU</span>
                <b>{nextBreak(selected, currentMinutes)?.time}</b>
                <small>{nextBreak(selected, currentMinutes)?.type}</small>
              </div>
            )}
            {selected.info && <div className="info">{selected.info}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ r, onClick, current = false }: { r: Row; onClick: () => void; current?: boolean }) {
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const status = state(r, nowMin);
  return (
    <button className={'card ' + (current ? 'currentCard' : '')} onClick={onClick}>
      <div className="cardTop">
        <div className="person">
          <div className="avatar">{r.name.slice(0, 1)}</div>
          <div>
            <small>{r.sector}</small>
            <h3>{r.name}</h3>
          </div>
        </div>
        <span className={'stateBadge ' + status.toLowerCase().replaceAll(' ', '-')}>{status}</span>
      </div>
      <div className="shiftRow"><Clock3 /><div className="shift">{r.start}<span>→</span>{r.end}</div></div>
      <div className="times">
        <span><i>Break</i>{r.break1 || '—'}</span>
        <span><i>Lunch</i>{r.lunch || '—'}</span>
        <span><i>Break</i>{r.break2 || '—'}</span>
      </div>
      {r.info && <div className="cardInfo">{r.info}</div>}
    </button>
  );
}

export default App;
