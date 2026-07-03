import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Trophy, Info, Eye, EyeOff, CheckCircle2, Circle, ExternalLink, Target, Cpu, Activity, Database, Lock, Heart, Search, X, Users } from 'lucide-react';

// --- ADMIN PASSWORD ---
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';
// --- 128 PLAYER DATA ---
const rawPlayers = [
  { id: 1, name: "Jannik Sinner", nation: "ITA", seed: 1 },
  { id: 2, name: "Miomir Kecmanovic", nation: "SRB", seed: null },
  { id: 3, name: "Nuno Borges", nation: "POR", seed: null },
  { id: 4, name: "Tristan Boyer", nation: "USA", seed: null },
  { id: 5, name: "Aleksandar Vukic", nation: "AUS", seed: null },
  { id: 6, name: "Jenson Brooksby", nation: "USA", seed: null },
  { id: 7, name: "Emilio Nava", nation: "USA", seed: null },
  { id: 8, name: "Ignacio Buse", nation: "PER", seed: null },
  { id: 9, name: "Rafael Jodar", nation: "ESP", seed: 23 },
  { id: 10, name: "Felix Gill", nation: "GBR", seed: null },
  { id: 11, name: "Denis Shapovalov", nation: "CAN", seed: null },
  { id: 12, name: "Pablo Carreno Busta", nation: "ESP", seed: null },
  { id: 13, name: "Shintaro Mochizuki", nation: "JPN", seed: null },
  { id: 14, name: "Max Basing", nation: "GBR", seed: null },
  { id: 15, name: "Ethan Quinn", nation: "USA", seed: null },
  { id: 16, name: "Luciano Darderi", nation: "ITA", seed: 14 },
  { id: 17, name: "Casper Ruud", nation: "NOR", seed: 11 },
  { id: 18, name: "Hubert Hurkacz", nation: "POL", seed: null },
  { id: 19, name: "Hamad Medjedovic", nation: "SRB", seed: null },
  { id: 20, name: "Sebastian Ofner", nation: "AUT", seed: null },
  { id: 21, name: "Soonwoo Kwon", nation: "KOR", seed: null },
  { id: 22, name: "Martin Landaluce", nation: "ESP", seed: null },
  { id: 23, name: "Alexandre Muller", nation: "FRA", seed: null },
  { id: 24, name: "Tommy Paul", nation: "USA", seed: 21 },
  { id: 25, name: "Brandon Nakashima", nation: "USA", seed: 28 },
  { id: 26, name: "Jack Pinnington Jones", nation: "GBR", seed: null },
  { id: 27, name: "Jan-Lennard Struff", nation: "GER", seed: null },
  { id: 28, name: "Sebastian Baez", nation: "ARG", seed: null },
  { id: 29, name: "Camilo Ugo Carabelli", nation: "ARG", seed: null },
  { id: 30, name: "Daniel Merida", nation: "ESP", seed: null },
  { id: 31, name: "Marin Cilic", nation: "CRO", seed: null },
  { id: 32, name: "Daniil Medvedev", nation: "RUS", seed: 8 },
  { id: 33, name: "Felix Auger-Aliassime", nation: "CAN", seed: 3 },
  { id: 34, name: "Alexander Shevchenko", nation: "KAZ", seed: null },
  { id: 35, name: "Adam Walton", nation: "AUS", seed: null },
  { id: 36, name: "Dino Prizmic", nation: "CRO", seed: null },
  { id: 37, name: "Adolfo Daniel Vallejo", nation: "PAR", seed: null },
  { id: 38, name: "Nicolas Mejia", nation: "COL", seed: null },
  { id: 39, name: "Michael Zheng", nation: "USA", seed: null },
  { id: 40, name: "Cameron Norrie", nation: "GBR", seed: 26 },
  { id: 41, name: "Alejandro Davidovich Fokina", nation: "ESP", seed: 22 },
  { id: 42, name: "Juan Manuel Cerundolo", nation: "ARG", seed: null },
  { id: 43, name: "Thiago Agustin Tirante", nation: "ARG", seed: null },
  { id: 44, name: "Fabian Marozsan", nation: "HUN", seed: null },
  { id: 45, name: "Luca Van Assche", nation: "FRA", seed: null },
  { id: 46, name: "Marton Fucsovics", nation: "HUN", seed: null },
  { id: 47, name: "Dalibor Svrcina", nation: "CZE", seed: null },
  { id: 48, name: "Learner Tien", nation: "USA", seed: 16 },
  { id: 49, name: "Andrey Rublev", nation: "RUS", seed: 12 },
  { id: 50, name: "Roman Safiullin", nation: "RUS", seed: null },
  { id: 51, name: "Aleksandar Kovacevic", nation: "USA", seed: null },
  { id: 52, name: "Botic van de Zandschulp", nation: "NED", seed: null },
  { id: 53, name: "Jesper de Jong", nation: "NED", seed: null },
  { id: 54, name: "Rinky Hijikata", nation: "AUS", seed: null },
  { id: 55, name: "Roberto Bautista Agut", nation: "ESP", seed: null },
  { id: 56, name: "Joao Fonseca", nation: "BRA", seed: 24 },
  { id: 57, name: "Arthur Rinderknech", nation: "FRA", seed: 25 },
  { id: 58, name: "Oliver Tarvet", nation: "GBR", seed: null },
  { id: 59, name: "Marco Trungelliti", nation: "ARG", seed: null },
  { id: 60, name: "Martin Damm", nation: "USA", seed: null },
  { id: 61, name: "Hugo Gaston", nation: "FRA", seed: null },
  { id: 62, name: "Stefanos Tsitsipas", nation: "GRE", seed: null },
  { id: 63, name: "Yibing Wu", nation: "CHN", seed: null },
  { id: 64, name: "Novak Djokovic", nation: "SRB", seed: 7 },
  { id: 65, name: "Alex De Minaur", nation: "AUS", seed: 5 },
  { id: 66, name: "Roman Andres Burruchaga", nation: "ARG", seed: null },
  { id: 67, name: "Adrian Mannarino", nation: "FRA", seed: null },
  { id: 68, name: "Titouan Droguet", nation: "FRA", seed: null },
  { id: 69, name: "Pablo Llamas Ruiz", nation: "ESP", seed: null },
  { id: 70, name: "Zachary Svajda", nation: "USA", seed: null },
  { id: 71, name: "Kamil Majchrzak", nation: "POL", seed: null },
  { id: 72, name: "Alejandro Tabilo", nation: "CHI", seed: 30 },
  { id: 73, name: "Karen Khachanov", nation: "RUS", seed: 19 },
  { id: 74, name: "Billy Harris", nation: "GBR", seed: null },
  { id: 75, name: "Yannick Hanfmann", nation: "GER", seed: null },
  { id: 76, name: "Giovanni Mpetshi Perricard", nation: "FRA", seed: null },
  { id: 77, name: "Tallon Griekspoor", nation: "NED", seed: null },
  { id: 78, name: "James Duckworth", nation: "AUS", seed: null },
  { id: 79, name: "Mariano Navone", nation: "ARG", seed: null },
  { id: 80, name: "Flavio Cobolli", nation: "ITA", seed: 9 },
  { id: 81, name: "Jakub Mensik", nation: "CZE", seed: 15 },
  { id: 82, name: "Toby Samuel", nation: "GBR", seed: null },
  { id: 83, name: "Dane Sweeny", nation: "AUS", seed: null },
  { id: 84, name: "Grigor Dimitrov", nation: "BUL", seed: null },
  { id: 85, name: "Stan Wawrinka", nation: "SUI", seed: null },
  { id: 86, name: "Matteo Berrettini", nation: "ITA", seed: null },
  { id: 87, name: "Raphael Collignon", nation: "BEL", seed: null },
  { id: 88, name: "Arthur Fils", nation: "FRA", seed: 20 },
  { id: 89, name: "Ugo Humbert", nation: "FRA", seed: 27 },
  { id: 90, name: "Zizou Bergs", nation: "BEL", seed: null },
  { id: 91, name: "Sho Shimabukuro", nation: "JPN", seed: null },
  { id: 92, name: "Jaime Faria", nation: "POR", seed: null },
  { id: 93, name: "Damir Dzumhur", nation: "BIH", seed: null },
  { id: 94, name: "Arthur Fery", nation: "GBR", seed: null },
  { id: 95, name: "Otto Virtanen", nation: "FIN", seed: null },
  { id: 96, name: "Ben Shelton", nation: "USA", seed: 4 },
  { id: 97, name: "Taylor Fritz", nation: "USA", seed: 6 },
  { id: 98, name: "Dusan Lajovic", nation: "SRB", seed: null },
  { id: 99, name: "Patrick Kypson", nation: "USA", seed: null },
  { id: 100, name: "Mackenzie McDonald", nation: "USA", seed: null },
  { id: 101, name: "Benjamin Bonzi", nation: "FRA", seed: null },
  { id: 102, name: "Gabriel Diallo", nation: "CAN", seed: null },
  { id: 103, name: "Lorenzo Sonego", nation: "ITA", seed: null },
  { id: 104, name: "Tomas Martin Etcheverry", nation: "ARG", seed: 29 },
  { id: 105, name: "Frances Tiafoe", nation: "USA", seed: 17 },
  { id: 106, name: "Terence Atmane", nation: "FRA", seed: null },
  { id: 107, name: "Vit Kopriva", nation: "CZE", seed: null },
  { id: 108, name: "Jan Choinski", nation: "GBR", seed: null },
  { id: 109, name: "Kyrian Jacquet", nation: "FRA", seed: null },
  { id: 110, name: "Vilius Gaubas", nation: "LTU", seed: null },
  { id: 111, name: "Thanasi Kokkinakis", nation: "AUS", seed: null },
  { id: 112, name: "Alexander Bublik", nation: "KAZ", seed: 10 },
  { id: 113, name: "Jiri Lehecka", nation: "CZE", seed: 13 },
  { id: 114, name: "Alexei Popyrin", nation: "AUS", seed: null },
  { id: 115, name: "Alex Molcan", nation: "SVK", seed: null },
  { id: 116, name: "Daniel Altmaier", nation: "GER", seed: null },
  { id: 117, name: "Alex Michelsen", nation: "USA", seed: null },
  { id: 118, name: "Jacob Fearnley", nation: "GBR", seed: null },
  { id: 119, name: "Jaume Munar", nation: "ESP", seed: null },
  { id: 120, name: "Francisco Cerundolo", nation: "ARG", seed: 18 },
  { id: 121, name: "Matteo Arnaldi", nation: "ITA", seed: 32 },
  { id: 122, name: "Quentin Halys", nation: "FRA", seed: null },
  { id: 123, name: "Corentin Moutet", nation: "FRA", seed: null },
  { id: 124, name: "Marcos Giron", nation: "USA", seed: null },
  { id: 125, name: "Valentin Royer", nation: "FRA", seed: null },
  { id: 126, name: "Harry Wendelken", nation: "GBR", seed: null },
  { id: 127, name: "Alexander Blockx", nation: "BEL", seed: null },
  { id: 128, name: "Alexander Zverev", nation: "GER", seed: 2 }
];

const ROUNDS = [
  { id: "r128", name: "Round 128", count: 64, roundNum: 1 },
  { id: "r64",  name: "Round 64",  count: 32, roundNum: 2 },
  { id: "r32",  name: "Round 32",  count: 16, roundNum: 3 },
  { id: "r16",  name: "Round 16",  count: 8,  roundNum: 4 },
  { id: "qf",   name: "Quarterfinals", count: 4, roundNum: 5 },
  { id: "sf",   name: "Semifinals",    count: 2, roundNum: 6 },
  { id: "f",    name: "Final",         count: 1, roundNum: 7 }
];

const ROUND_KEYS = ROUNDS.map(r => r.id);

// Slamtracker URL format: 1{roundNum}{matchNo zero-padded to 2 digits}
// e.g. Round 2, Match 1 → 1201
const getSlamtrackerUrl = (roundNum, matchNo) =>
  `https://www.wimbledon.com/en_GB/scores/slamtracker/1${roundNum}${matchNo}`;

// --- National flag images from flagcdn.com with 3-letter code fallback ---
const NATION_TO_ISO2 = {
  ITA:"it", SRB:"rs", POR:"pt", USA:"us", AUS:"au", PER:"pe", ESP:"es",
  GBR:"gb", CAN:"ca", JPN:"jp", NOR:"no", POL:"pl", AUT:"at", KOR:"kr",
  FRA:"fr", GER:"de", ARG:"ar", CRO:"hr", RUS:"ru", KAZ:"kz", PAR:"py",
  COL:"co", HUN:"hu", CZE:"cz", BRA:"br", GRE:"gr", CHN:"cn", NED:"nl",
  CHI:"cl", BUL:"bg", SUI:"ch", BEL:"be", BIH:"ba", FIN:"fi", LTU:"lt",
  SVK:"sk"
};

// Full country names, used for the nation search (so users can type
// "Spain" instead of only the 3-letter code "ESP").
const NATION_NAMES = {
  ITA: "Italy", SRB: "Serbia", POR: "Portugal", USA: "United States",
  AUS: "Australia", PER: "Peru", ESP: "Spain", GBR: "Great Britain",
  CAN: "Canada", JPN: "Japan", NOR: "Norway", POL: "Poland",
  AUT: "Austria", KOR: "South Korea", FRA: "France", GER: "Germany",
  ARG: "Argentina", CRO: "Croatia", RUS: "Russia", KAZ: "Kazakhstan",
  PAR: "Paraguay", COL: "Colombia", HUN: "Hungary", CZE: "Czech Republic",
  BRA: "Brazil", GRE: "Greece", CHN: "China", NED: "Netherlands",
  CHI: "Chile", BUL: "Bulgaria", SUI: "Switzerland", BEL: "Belgium",
  BIH: "Bosnia and Herzegovina", FIN: "Finland", LTU: "Lithuania", SVK: "Slovakia"
};

const NationBadge = ({ nation }) => {
  const iso2 = NATION_TO_ISO2[nation];
  const [failed, setFailed] = useState(false);
  if (!iso2 || failed) {
    return (
      <span
        className="inline-flex items-center justify-center text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 tracking-wide shrink-0"
        style={{ minWidth: '32px' }}
        title={nation}
      >
        {nation}
      </span>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/24x18/${iso2}.png`}
      srcSet={`https://flagcdn.com/48x36/${iso2}.png 2x`}
      width={22} height={16}
      alt={nation} title={nation}
      onError={() => setFailed(true)}
      className="shrink-0 rounded-[2px] border border-gray-200 object-cover"
    />
  );
};

// Official Wimbledon logo, used in the header (replaces the old tennis-ball icon)
const WimbledonLogo = ({ size = 26 }) => (
  <img
    src="https://www.wimbledon.com/_next/static/media/Logo-Wimbledon-44px.2wyelfplbl7j4.svg?dpl=v0_115_2"
    alt="Wimbledon"
    width={size}
    height={size}
    className="shrink-0"
  />
);

// --- Password Modal ---
const AdminLoginModal = ({ onSuccess, onCancel }) => {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPwd('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-80 space-y-5">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
          <Lock size={20} className="text-emerald-700" /> Admin Login
        </div>
        <p className="text-sm text-gray-500">Enter the admin password to enable result editing.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            placeholder="Password"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition ${
              error ? 'border-red-400 ring-red-200 bg-red-50' : 'border-gray-300 focus:ring-emerald-300'
            }`}
          />
          {error && <p className="text-xs text-red-500 font-medium">Incorrect password. Try again.</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg text-sm transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-sm transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const buildInitialTournament = () => {
  const state = {};
  ROUNDS.forEach(r => {
    state[r.id] = Array.from({ length: r.count }, (_, i) => ({
      id: i,
      matchNo: String(i + 1).padStart(2, '0'),
      player1: null, player2: null,
      myProb1: null,  myProb2: null,
      ibmProb1: null, ibmProb2: null,
      actualWinnerId: null
    }));
  });
  for (let i = 0; i < 64; i++) {
    state.r128[i].player1 = rawPlayers[i * 2];
    state.r128[i].player2 = rawPlayers[i * 2 + 1];
  }
  return state;
};

// Rebuilds the ENTIRE bracket from persisted match results.
// This is the key to persistence: saved winners aren't just stamped onto
// the round they were recorded in — they have to be replayed round-by-round,
// in order, so each winner gets pushed forward into the correct player1/player2
// slot of every later round too (exactly like toggleWinner does live).
const applySavedResults = (savedData) => {
  const state = buildInitialTournament();

  ROUNDS.forEach((round) => {
    state[round.id].forEach((match, idx) => {
      const key = `${round.id}-${idx}`;
      const saved = savedData[key];
      if (!saved) return;

      // Restore IBM probability for this match
      if (saved.ibm_prob1 !== null && saved.ibm_prob1 !== undefined) {
        match.ibmProb1 = saved.ibm_prob1;
        match.ibmProb2 = 100 - saved.ibm_prob1;
      }

      // Restore winner and propagate them into the next round's slot
      if (saved.winner_id !== null && saved.winner_id !== undefined) {
        const winnerPlayer =
          match.player1 && match.player1.id === saved.winner_id ? match.player1 :
          match.player2 && match.player2.id === saved.winner_id ? match.player2 :
          null;

        if (winnerPlayer) {
          match.actualWinnerId = winnerPlayer.id;

          const nextRoundIdx = ROUND_KEYS.indexOf(round.id) + 1;
          if (nextRoundIdx < ROUND_KEYS.length) {
            const nextRoundKey = ROUND_KEYS[nextRoundIdx];
            const nextMatchIndex = Math.floor(idx / 2);
            const isPlayer1Slot = idx % 2 === 0;
            const nextMatch = state[nextRoundKey][nextMatchIndex];
            if (isPlayer1Slot) nextMatch.player1 = winnerPlayer;
            else nextMatch.player2 = winnerPlayer;
          }
        }
      }
    });
  });

  return state;
};

// Figures out which round the tournament is "currently" on, so that's the
// round the user lands on when they open the site — instead of always
// dumping them back on Round 128. Logic: walk the rounds in order; the
// "current" round is the last one that has at least one decided match. If
// that round is now fully decided (every match has a winner), the action
// has moved on to the next round, so bump forward one. Falls back to r128
// if nothing has been decided yet.
const computeCurrentRound = (state) => {
  let current = 'r128';
  for (const round of ROUNDS) {
    const matches = state[round.id];
    const anyDecided = matches.some(m => m.actualWinnerId !== null);
    if (!anyDecided) continue;
    const allDecided = matches.every(m => m.actualWinnerId !== null);
    current = round.id;
    if (allDecided) {
      const nextIdx = ROUND_KEYS.indexOf(round.id) + 1;
      if (nextIdx < ROUND_KEYS.length) current = ROUND_KEYS[nextIdx];
    }
  }
  return current;
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeRound, setActiveRound] = useState('r128');
  const [currentView, setCurrentView] = useState('bracket');
  const [visitorCount, setVisitorCount] = useState(null);

  // --- Search state ---
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSelection, setSearchSelection] = useState(null); // { type: 'player' | 'nation', value }
  const searchBoxRef = useRef(null);

  const activeRoundObj = ROUNDS.find(r => r.id === activeRound);
  const getRoundObj = (roundId) => ROUNDS.find(r => r.id === roundId);

  const [tournament, setTournament] = useState(buildInitialTournament);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted winners and IBM probabilities from the database on page load,
  // then replay them through the whole bracket so every later round is
  // correctly populated too. Runs once on mount. Also jumps the user
  // straight to whichever round the tournament is currently on.
  useEffect(() => {
   fetch(`${API_BASE_URL}/api/get-all-matches`)
      .then(res => res.json())
      .then(savedData => {
        const rebuilt = applySavedResults(savedData);
        setTournament(rebuilt);
        setActiveRound(computeCurrentRound(rebuilt));
      })
      .catch(err => {
        console.error('Failed to load saved matches:', err);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  // Record + fetch the site visit counter once per page load.
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/visit-count`, { method: 'POST' })
      .then(res => res.json())
      .then(data => setVisitorCount(data.count))
      .catch(err => console.error('Failed to record visit:', err));
  }, []);

  // Close the search suggestions dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTennisAbstractUrl = (name) =>
    `https://www.tennisabstract.com/cgi-bin/player.cgi?p=${name.replace(/\s+/g, '')}`;

  // Track which match predictions we've already requested, so re-renders
  // (which happen on every setTournament call, including the one triggered
  // by each prediction response coming back) don't re-fire duplicate fetches
  // for a match that's already in-flight or already resolved.
  const requestedPredictionsRef = useRef(new Set());

  // Fetch ML predictions for EVERY match across ALL seven rounds — not just
  // whichever tab happens to be open — as soon as the saved bracket data has
  // finished loading. This also naturally picks up newly created matches,
  // e.g. when an admin marks a winner and the next round's slot gets a
  // player populated for the first time.
  //
  // Previously this only looped over tournament[activeRound], so rounds you
  // never clicked into stayed stuck at myProb1 === null forever, which threw
  // off the per-round and global "MODEL correct" counters versus IBM's.
  //
  // IMPORTANT: this deliberately awaits each fetch in sequence (for...of +
  // await) rather than firing all of them in a .forEach. A .forEach loop
  // would kick off every match's fetch on the same tick — up to ~64
  // simultaneous POSTs on first load — which is enough concurrent load to
  // choke a Render free-tier instance and come back as a wave of 500s.
  // Awaiting each request in turn queues them one at a time instead, which
  // the backend can handle comfortably at the cost of a slightly slower
  // (but reliable) full load.
  useEffect(() => {
    if (currentView !== 'bracket' || !isLoaded) return;

    const fetchPendingPredictions = async () => {
      for (const round of ROUNDS) {
        for (let idx = 0; idx < tournament[round.id].length; idx++) {
          const match = tournament[round.id][idx];
          const key = `${round.id}-${idx}`;

          // Only fetch if both players are known, we don't have a
          // prediction yet, and we haven't already asked for this one.
          if (
            match.player1 &&
            match.player2 &&
            match.myProb1 === null &&
            !requestedPredictionsRef.current.has(key)
          ) {
            // Lock it immediately so a later pass of this effect (e.g.
            // triggered by the setTournament call below) doesn't re-request it.
            requestedPredictionsRef.current.add(key);

            try {
              const res = await fetch(`${API_BASE_URL}/api/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ p1: match.player1.name, p2: match.player2.name })
              });

              const data = await res.json();

              setTournament(prev => {
                const ns = { ...prev };
                // Safety check: ensure the round and index still exist
                if (ns[round.id] && ns[round.id][idx]) {
                  ns[round.id] = ns[round.id].map(m => ({ ...m }));
                  ns[round.id][idx].myProb1 = data.p1_prob;
                  ns[round.id][idx].myProb2 = data.p2_prob;
                }
                return ns;
              });
            } catch (err) {
              console.error("Prediction fetch error:", err);
              // Unlock it so it can be retried on a later pass.
              requestedPredictionsRef.current.delete(key);
            }
          }
        }
      }
    };

    fetchPendingPredictions();
  }, [tournament, isLoaded, currentView]);

  // Persist a single match's data to the backend database
  const saveMatch = (roundId, matchIndex, payload) => {
    fetch(`${API_BASE_URL}/api/update-match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: `${roundId}-${matchIndex}`, ...payload })
    }).catch(err => console.error('Failed to save match:', err));
  };

  const updateIbmProb = (roundId, matchIndex, p1Val) => {
    const val = Math.max(0, Math.min(100, Number(p1Val)));
    setTournament(prev => {
      const newState = { ...prev };
      newState[roundId] = newState[roundId].map(m => ({ ...m }));
      newState[roundId][matchIndex].ibmProb1 = val;
      newState[roundId][matchIndex].ibmProb2 = 100 - val;
      return newState;
    });
    // Persist IBM probability change immediately
    saveMatch(roundId, matchIndex, { ibm_prob1: val });
  };

  const clearFutureRounds = (state, roundId, matchIndex) => {
    const nextRoundIndex = ROUND_KEYS.indexOf(roundId) + 1;
    if (nextRoundIndex >= ROUND_KEYS.length) return;
    const nextRoundKey = ROUND_KEYS[nextRoundIndex];
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const isPlayer1Slot = matchIndex % 2 === 0;
    const nextMatch = state[nextRoundKey][nextMatchIndex];
    if (isPlayer1Slot) nextMatch.player1 = null; else nextMatch.player2 = null;
    nextMatch.myProb1 = null; nextMatch.myProb2 = null;
    nextMatch.ibmProb1 = null; nextMatch.ibmProb2 = null;
    if (nextMatch.actualWinnerId) {
      // Clear the persisted result for that downstream match too, since its
      // players no longer exist without this upstream result.
      saveMatch(nextRoundKey, nextMatchIndex, { winner_id: null });
      nextMatch.actualWinnerId = null;
      clearFutureRounds(state, nextRoundKey, nextMatchIndex);
    }
    // Also free up the prediction-request lock for the cleared match so it
    // can be re-fetched correctly if it gets repopulated later.
    requestedPredictionsRef.current.delete(`${nextRoundKey}-${nextMatchIndex}`);
  };

  // NOTE: no longer gated on `isSaved` — admins can keep editing results
  // after hitting Save. Save is now just a "confirm this is synced" action,
  // not a lock (see handleSave below).
  const toggleWinner = (roundId, matchIndex, clickedPlayer) => {
    if (!isAdmin || !clickedPlayer) return;
    setTournament(prev => {
      const newState = { ...prev };
      ROUNDS.forEach(r => { newState[r.id] = newState[r.id].map(m => ({ ...m })); });
      const currentMatch = newState[roundId][matchIndex];
      const isAlreadyWinner = currentMatch.actualWinnerId === clickedPlayer.id;
      if (isAlreadyWinner) {
        currentMatch.actualWinnerId = null;
        clearFutureRounds(newState, roundId, matchIndex);
        // Persist: clear winner in database
        saveMatch(roundId, matchIndex, { winner_id: null });
      } else {
        currentMatch.actualWinnerId = clickedPlayer.id;
        const nextRoundIndex = ROUND_KEYS.indexOf(roundId) + 1;
        if (nextRoundIndex < ROUND_KEYS.length) {
          const nextRoundKey = ROUND_KEYS[nextRoundIndex];
          const nextMatchIndex = Math.floor(matchIndex / 2);
          const isPlayer1Slot = matchIndex % 2 === 0;
          const nextMatch = newState[nextRoundKey][nextMatchIndex];
          if (isPlayer1Slot) nextMatch.player1 = clickedPlayer;
          else nextMatch.player2 = clickedPlayer;
          nextMatch.myProb1 = null; nextMatch.myProb2 = null;
          nextMatch.ibmProb1 = null; nextMatch.ibmProb2 = null;
          nextMatch.actualWinnerId = null;
          // New pairing in the next round — clear its prediction lock so
          // the effect above will fetch a fresh prediction for it.
          requestedPredictionsRef.current.delete(`${nextRoundKey}-${nextMatchIndex}`);
        }
        // Persist: save winner to database
        saveMatch(roundId, matchIndex, { winner_id: clickedPlayer.id });
      }
      return newState;
    });
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setIsSaved(false);
    } else {
      setShowLoginModal(true);
    }
  };

  // Every change is already persisted live via saveMatch(), so "Save" here
  // is just a quick visual confirmation flash — it does NOT lock the
  // bracket. It used to set a permanent isSaved flag that disabled every
  // input for the rest of the session; now it just flashes a "Saved" state
  // for a couple seconds and admins can keep editing right away.
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Wipe everything back to the blank initial draw and unlock editing.
  // Also clears every persisted result in the database so the reset
  // survives a refresh/restart too.
  const handleReset = () => {
    ROUNDS.forEach(r => {
      tournament[r.id].forEach((m, idx) => {
        if (m.actualWinnerId !== null || m.ibmProb1 !== null) {
          saveMatch(r.id, idx, { winner_id: null, ibm_prob1: null });
        }
      });
    });
    setTournament(buildInitialTournament());
    requestedPredictionsRef.current.clear();
    setIsSaved(false);
    setActiveRound('r128');
    setShowResetConfirm(false);
  };

  const stats = useMemo(() => {
    let globalMyCorrect = 0, globalIbmCorrect = 0, globalTotal = 0;
    const roundStats = {};
    ROUNDS.forEach(r => {
      let myC = 0, ibmC = 0, t = 0;
      tournament[r.id].forEach(m => {
        if (m.actualWinnerId) {
          t++; globalTotal++;
          if (m.myProb1 !== null) {
            if ((m.myProb1 >= 50 ? m.player1.id : m.player2.id) === m.actualWinnerId) { myC++; globalMyCorrect++; }
          }
          if (m.ibmProb1 !== null) {
            if ((m.ibmProb1 >= 50 ? m.player1.id : m.player2.id) === m.actualWinnerId) { ibmC++; globalIbmCorrect++; }
          }
        }
      });
      roundStats[r.id] = { myC, ibmC, t };
    });
    return { globalMyCorrect, globalIbmCorrect, globalTotal, roundStats };
  }, [tournament]);

  // --- Search suggestions (players + nations matching the typed query) ---
  const searchSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { players: [], nations: [] };
    const players = rawPlayers
      .filter(p => p.name.toLowerCase().includes(q))
      .slice(0, 6);
    const nations = Object.keys(NATION_NAMES)
      .filter(code => code.toLowerCase().includes(q) || NATION_NAMES[code].toLowerCase().includes(q))
      .slice(0, 6);
    return { players, nations };
  }, [searchQuery]);

  const selectPlayerSearch = (player) => {
    setSearchSelection({ type: 'player', value: player });
    setSearchQuery(player.name);
    setShowSuggestions(false);
    setCurrentView('bracket');
  };

  const selectNationSearch = (code) => {
    setSearchSelection({ type: 'nation', value: code });
    setSearchQuery(NATION_NAMES[code]);
    setShowSuggestions(false);
    setCurrentView('bracket');
  };

  const clearSearch = () => {
    setSearchSelection(null);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Reusable match-card renderer, shared between the normal single-round
  // bracket view and the per-round search results view.
  const renderMatchCard = (m, i, roundId) => {
    const roundObj = getRoundObj(roundId);
    return (
      <div key={i} className="bg-white p-4 border rounded-lg shadow-sm">
        {/* Card header */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium">Match {m.matchNo}</span>
          <a
            href={getSlamtrackerUrl(roundObj.roundNum, m.matchNo)}
            target="_blank" rel="noreferrer"
            className="flex items-center gap-1 text-emerald-600 hover:underline"
          >
            Match Center <ExternalLink size={11} />
          </a>
        </div>

        {/* Column labels */}
        <div className="flex justify-end gap-4 text-[10px] font-semibold uppercase tracking-wide pr-1 mb-1">
          <span className="text-emerald-700 w-9 text-center">Model</span>
          <span className="text-amber-600 w-12 text-center">IBM</span>
        </div>

        {/* Players */}
        {[
          { p: m.player1, probMy: m.myProb1, probIbm: m.ibmProb1, isP1: true },
          { p: m.player2, probMy: m.myProb2, probIbm: m.ibmProb2, isP1: false }
        ].map(({ p, probMy, isP1 }) => {
          const isWinner = !!p && m.actualWinnerId === p.id;
          const displayIbm = isP1 ? m.ibmProb1 : m.ibmProb2;
          const isSearchHighlight = searchSelection && p && (
            (searchSelection.type === 'player' && searchSelection.value.id === p.id) ||
            (searchSelection.type === 'nation' && searchSelection.value === p.nation)
          );
          return (
            <div
              key={isP1 ? 'p1' : 'p2'}
              className={`flex items-center justify-between gap-2 p-2 my-1 border rounded transition ${
                isWinner ? 'bg-emerald-100 border-emerald-400' : isSearchHighlight ? 'bg-amber-50 border-amber-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {isAdmin && p && (
                  <button
                    type="button"
                    onClick={() => toggleWinner(roundId, i, p)}
                    title={isWinner ? 'Unmark winner' : 'Mark as winner'}
                    className="shrink-0 transition text-emerald-600 hover:text-emerald-800"
                  >
                    {isWinner ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                )}
                {p && <NationBadge nation={p.nation} />}
                {p ? (
                  <a
                    href={getTennisAbstractUrl(p.name)}
                    target="_blank" rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className={`font-medium text-sm truncate hover:underline ${isWinner ? 'text-emerald-800' : 'text-gray-800'}`}
                  >
                    {p.name}
                  </a>
                ) : (
                  <span className="font-medium text-sm text-gray-400">TBD</span>
                )}
                {p?.seed && (
                  <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-1.5 py-0.5 shrink-0">
                    #{p.seed}
                  </span>
                )}
              </div>

              <div className="flex gap-4 text-xs font-bold shrink-0">
                <span className={`w-9 text-center ${probMy !== null && probMy >= 50 ? 'text-emerald-700' : 'text-gray-400'}`}>
                  {probMy !== null ? `${probMy}%` : '--'}
                </span>
                {isAdmin ? (
                  <input
                    type="number"
                    value={isP1 ? (m.ibmProb1 ?? '') : (m.ibmProb2 ?? '')}
                    onChange={e => {
                      const v = Number(e.target.value || 0);
                      updateIbmProb(roundId, i, isP1 ? v : 100 - v);
                    }}
                    className="w-12 border rounded text-center py-0.5 text-amber-700"
                    placeholder="--"
                  />
                ) : (
                  <span className="w-12 text-center text-amber-600">
                    {displayIbm !== null ? `${displayIbm}%` : '--'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Renders the per-round breakdown when a search (player or nation) is active.
  const renderSearchResults = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
        <div className="text-sm text-amber-800">
          Showing results for{' '}
          <span className="font-semibold">
            {searchSelection.type === 'player' ? searchSelection.value.name : NATION_NAMES[searchSelection.value]}
          </span>
          {searchSelection.type === 'nation' && (
            <span className="text-amber-600"> ({searchSelection.value})</span>
          )}
          {' '}across every round.
        </div>
        <button
          onClick={clearSearch}
          className="flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded px-3 py-1.5 transition"
        >
          <X size={13} /> Clear search
        </button>
      </div>

      {ROUNDS.map(round => {
        const matches = tournament[round.id]
          .map((m, idx) => ({ m, idx }))
          .filter(({ m }) => {
            if (searchSelection.type === 'nation') {
              return (m.player1 && m.player1.nation === searchSelection.value) ||
                     (m.player2 && m.player2.nation === searchSelection.value);
            }
            if (searchSelection.type === 'player') {
              return (m.player1 && m.player1.id === searchSelection.value.id) ||
                     (m.player2 && m.player2.id === searchSelection.value.id);
            }
            return false;
          });

        return (
          <div key={round.id}>
            <h3 className="text-sm font-bold text-emerald-900 mb-2">{round.name}</h3>
            {matches.length === 0 ? (
              <p className="text-xs text-gray-400 italic bg-gray-50 border border-dashed border-gray-200 rounded-lg px-4 py-3">
                {searchSelection.type === 'nation'
                  ? `No player from ${NATION_NAMES[searchSelection.value]} is playing in ${round.name}.`
                  : `${searchSelection.value.name} is not playing in ${round.name}.`}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map(({ m, idx }) => renderMatchCard(m, idx, round.id))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin password modal */}
      {showLoginModal && (
        <AdminLoginModal
          onSuccess={() => { setIsAdmin(true); setShowLoginModal(false); }}
          onCancel={() => setShowLoginModal(false)}
        />
      )}

      {/* Header */}
      <header className="bg-emerald-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentView('bracket'); clearSearch(); }}>
            <WimbledonLogo size={26} />
            <div>
              <h1 className="text-lg font-bold leading-tight">Wimbledon Predictor</h1>
              <p className="text-[11px] text-emerald-300 leading-tight">Live ML Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-950/40 rounded px-4 py-1.5 text-xs">
            <div className="text-center">
              <div className="text-emerald-300">TOTAL PLAYED</div>
              <div className="font-bold text-sm">{stats.globalTotal}</div>
            </div>
            <div className="w-px h-6 bg-emerald-700" />
            <div className="text-center">
              <div className="text-emerald-300">MY MODEL CORRECT</div>
              <div className="font-bold text-sm">
                {stats.globalMyCorrect}{' '}
                <span className="text-emerald-400">
                  ({stats.globalTotal > 0 ? Math.round(stats.globalMyCorrect / stats.globalTotal * 100) : 0}%)
                </span>
              </div>
            </div>
            <div className="w-px h-6 bg-emerald-700" />
            <div className="text-center">
              <div className="text-emerald-300">IBM WATSONX CORRECT</div>
              <div className="font-bold text-sm">
                {stats.globalIbmCorrect}{' '}
                <span className="text-emerald-400">
                  ({stats.globalTotal > 0 ? Math.round(stats.globalIbmCorrect / stats.globalTotal * 100) : 0}%)
                </span>
              </div>
            </div>
            <div className="w-px h-6 bg-emerald-700" />
            <div className="text-center flex items-center gap-1">
              <Users size={12} className="text-emerald-300" />
              <div>
                <div className="text-emerald-300">SITE VISITS</div>
                <div className="font-bold text-sm">{visitorCount !== null ? visitorCount : '--'}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView(currentView === 'about' ? 'bracket' : 'about')}
              className="flex items-center gap-1 text-sm bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded transition"
            >
              <Info size={14} /> {currentView === 'about' ? 'Bracket' : 'About Project'}
            </button>
            <button
              onClick={handleAdminToggle}
              className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded transition ${
                isAdmin
                  ? 'bg-amber-500 text-emerald-950 font-semibold hover:bg-amber-400'
                  : 'bg-emerald-700 hover:bg-emerald-600'
              }`}
            >
              {isAdmin ? <Eye size={14} /> : <Lock size={14} />}
              {isAdmin ? 'Admin Mode' : 'Admin Login'}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {currentView === 'about' ? (
          <div className="max-w-3xl mx-auto mt-10 mb-16 p-8 bg-white rounded-lg shadow space-y-5 leading-relaxed text-gray-700">
            <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
              <WimbledonLogo size={24} /> About This Project
            </h2>
            <p>
              The Wimbledon Predictor is a live dashboard that forecasts the outcome of every match across 
              all seven rounds of the Wimbledon Gentlemen's Singles draw—from the Round of 128 to the Final.
The fun part? There are two competing prediction models.
The first is my model, built from my hostel room on a laptop, with help from TML-dataset and a lot of trial and error.
The second is IBM's model, built with seemingly unlimited resources, years of experience, and teams of highly skilled engineers and data scientists.
So, it's the classic underdog story: one student with a laptop versus one of the world's biggest technology companies.
Let's see if I can beat them.

            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="border rounded-lg p-4 bg-emerald-50">
                <div className="flex items-center gap-2 font-semibold text-emerald-900 mb-1"><Cpu size={16} /> My Model</div>
                <p className="text-sm">
                  A custom-trained XGBoost classifier that estimates each player's win
                  probability using historical ATP match data — surface-specific form, head-to-head
                  record, recent results, and ranking trends. Predictions are generated live by
                  calling a local prediction server as each round is loaded and by the way my model 
                  got 67% accuracy over trainning data Which Sound very less if you don't involve with sport ml modeling 
                  and if you ever tried with predicting with real data on sport like tennis then you understand it is promising .
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-amber-50">
                <div className="flex items-center gap-2 font-semibold text-amber-900 mb-1"><Database size={16} /> IBM watsonx</div>
                <p className="text-sm">
                The official IBM watsonx-powered win probabilities used in Wimbledon's broadcast and Match Centre are included for comparison. Since IBM does not provide a public API for these predictions, I manually update the probabilities from the official Wimbledon website as each round progresses.

                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-semibold text-emerald-900"><Activity size={16} /> How scoring works</div>
            <p>
              For every completed match, a model is considered correct if it assigned the eventual winner a win probability of 50% or higher before the match began. Accuracy is tracked for each round as well as cumulatively across the entire tournament, allowing both models to be compared fairly as the draw unfolds and players progress through the bracket.

            </p>
            <div className="flex items-center gap-2 font-semibold text-emerald-900"><Target size={16} /> Keeping the bracket live</div>
            <p>
              Admin Mode is accessible only to me and is used to keep the dashboard up to date throughout the tournament. From here, I manually enter the winners of completed matches and update IBM's official win probabilities from the Wimbledon website, ensuring both prediction models are evaluated using the latest results.

            </p>
            <p className="text-xs text-gray-400 pt-2 border-t">
              Note: The predicted probabilities are model estimates, not guarantees. They are intended for comparison and entertainment purposes alongside the official Wimbledon coverage. Please do not place bets based solely on these predictions—you could lose your money.
            </p>
          </div>
        ) : (
          <main className="max-w-7xl mx-auto p-4">
            {isAdmin && (
              <div className="mb-4 text-sm rounded px-4 py-2 flex items-center gap-2 border bg-amber-50 border-amber-300 text-amber-800">
                <Lock size={14} />
                {isSaved
                  ? 'Saved — you can keep editing any time.'
                  : 'Admin mode active — click a player\'s circle to mark them as the match winner. Click it again to undo.'}
              </div>
            )}

            {/* Search bar */}
            <div className="relative mb-6" ref={searchBoxRef}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); if (!e.target.value) setSearchSelection(null); }}
                  onFocus={() => { if (searchQuery) setShowSuggestions(true); }}
                  placeholder="Search by player name or country..."
                  className="w-full border rounded-lg pl-9 pr-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-300 border-gray-300 bg-white shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {showSuggestions && (searchSuggestions.players.length > 0 || searchSuggestions.nations.length > 0) && (
                <div className="absolute z-40 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                  {searchSuggestions.players.length > 0 && (
                    <div>
                      <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Players</div>
                      {searchSuggestions.players.map(p => (
                        <button
                          key={p.id}
                          onClick={() => selectPlayerSearch(p)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-emerald-50 text-left"
                        >
                          <NationBadge nation={p.nation} />
                          <span className="text-gray-800">{p.name}</span>
                          {p.seed && <span className="text-[10px] text-gray-400 ml-auto">#{p.seed}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  {searchSuggestions.nations.length > 0 && (
                    <div>
                      <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Countries</div>
                      {searchSuggestions.nations.map(code => (
                        <button
                          key={code}
                          onClick={() => selectNationSearch(code)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-emerald-50 text-left"
                        >
                          <NationBadge nation={code} />
                          <span className="text-gray-800">{NATION_NAMES[code]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {searchSelection ? (
              renderSearchResults()
            ) : (
              <>
                {/* Round tabs */}
                <div className="flex gap-2 overflow-x-auto mb-6 pb-1">
                  {ROUNDS.map(r => {
                    const rs = stats.roundStats[r.id];
                    const myPct = rs.t > 0 ? Math.round(rs.myC / rs.t * 100) : 0;
                    const ibmPct = rs.t > 0 ? Math.round(rs.ibmC / rs.t * 100) : 0;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setActiveRound(r.id)}
                        className={`px-4 py-2 rounded-lg shrink-0 text-left transition ${
                          activeRound === r.id
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-white border text-gray-700 hover:border-emerald-400'
                        }`}
                      >
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className={`text-[10px] whitespace-nowrap ${activeRound === r.id ? 'text-emerald-100' : 'text-gray-400'}`}>
                          MODEL: {rs.myC}/{rs.t} ({myPct}%) &middot; IBM: {rs.ibmC}/{rs.t} ({ibmPct}%)
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Match cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tournament[activeRound].map((m, i) => renderMatchCard(m, i, activeRound))}
                </div>
              </>
            )}

          {/* Save / Reset sticky bar — only visible in admin mode */}
          {isAdmin && (
            <div className="sticky bottom-0 left-0 right-0 mt-8 bg-white border-t shadow-lg z-40">
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  {isSaved
                    ? '✅ Synced. Keep making changes any time — everything saves automatically.'
                    : 'Every change saves automatically. Hit Save any time for a quick confirmation.'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                    </svg>
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                    </svg>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
          </main>
        )}
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-80 space-y-5">
            <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Reset All Results?
            </div>
            <p className="text-sm text-gray-600">
              This will erase <strong>all match results, winners, and IBM probabilities</strong> across every round and reset the bracket to its starting state. This cannot be undone.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={handleReset}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg text-sm transition"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 py-5 border-t bg-white text-center text-sm text-gray-500 flex items-center justify-center gap-1.5">
        Made with <Heart size={14} className="text-red-500 fill-red-500" /> by{' '}
        <span className="font-semibold text-emerald-800">Digvijay & Het</span>
      </footer>
    </div>
  );
}