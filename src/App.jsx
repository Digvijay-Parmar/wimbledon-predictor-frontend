import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Trophy, Info, Eye, EyeOff, CheckCircle2, Circle, ExternalLink, Target, Cpu, Activity, Database, Lock, Heart } from 'lucide-react';

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

// Tennis ball icon for the header
const TennisBallIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="#D9E021" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M16 1c-3 5-3 10 0 15 3 5 3 10 0 15" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
    <path d="M2.2 11c4.6 2.6 9.3 2.6 13.8 0M30.8 21c-4.6-2.6-9.3-2.6-13.8 0" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
  </svg>
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

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeRound, setActiveRound] = useState('r128');
  const [currentView, setCurrentView] = useState('bracket');

  const activeRoundObj = ROUNDS.find(r => r.id === activeRound);

  const [tournament, setTournament] = useState(buildInitialTournament);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted winners and IBM probabilities from the database on page load,
  // then replay them through the whole bracket so every later round is
  // correctly populated too. Runs once on mount.
  useEffect(() => {
   fetch(`${API_BASE_URL}/api/get-all-matches`)
      .then(res => res.json())
      .then(savedData => {
        setTournament(applySavedResults(savedData));
      })
      .catch(err => {
        console.error('Failed to load saved matches:', err);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const getTennisAbstractUrl = (name) =>
    `https://www.tennisabstract.com/cgi-bin/player.cgi?p=${name.replace(/\s+/g, '')}`;

  // Auto-fetch ML predictions when a round loads.
  // Waits until the saved-results load above has finished, so it doesn't
  // fire predict() calls against the blank initial bracket and then get
  // wiped out a moment later when the saved data arrives.
  useEffect(() => {
    if (currentView !== 'bracket' || !isLoaded) return;

    tournament[activeRound].forEach((match, idx) => {
      // Only fetch if we have players and probabilities are still null
      if (match.player1 && match.player2 && match.myProb1 === null) {
       fetch(`${API_BASE_URL}/api/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ p1: match.player1.name, p2: match.player2.name })
        })
        .then(res => res.json())
        .then(data => {
          setTournament(prev => {
            const ns = { ...prev };
            // Safety check: ensure the round and index exist
            if (ns[activeRound] && ns[activeRound][idx]) {
              ns[activeRound] = ns[activeRound].map(m => ({ ...m }));
              ns[activeRound][idx].myProb1 = data.p1_prob;
              ns[activeRound][idx].myProb2 = data.p2_prob;
            }
            return ns;
          });
        })
        .catch(err => console.error("Prediction fetch error:", err));
      }
    });
  }, [activeRound, isLoaded, currentView]);

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
  };

  const toggleWinner = (roundId, matchIndex, clickedPlayer) => {
    if (!isAdmin || !clickedPlayer || isSaved) return;
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

  // Lock in all current results — disables further editing until reset
  const handleSave = () => {
    setIsSaved(true);
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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('bracket')}>
            <TennisBallIcon size={26} />
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
              <TennisBallIcon size={24} /> About This Project
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
              <div className={`mb-4 text-sm rounded px-4 py-2 flex items-center gap-2 border ${
                isSaved
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-amber-50 border-amber-300 text-amber-800'
              }`}>
                <Lock size={14} />
                {isSaved
                  ? 'Results are saved and locked. Click Reset to start over.'
                  : 'Admin mode active — click a player\'s circle to mark them as the match winner. Click it again to undo.'}
              </div>
            )}

            {/* Round tabs */}
            <div className="flex gap-2 overflow-x-auto mb-6 pb-1">
              {ROUNDS.map(r => {
                const rs = stats.roundStats[r.id];
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
                    <div className={`text-[10px] ${activeRound === r.id ? 'text-emerald-100' : 'text-gray-400'}`}>
                      MODEL: {rs.myC}/{rs.t} &middot; IBM: {rs.ibmC}/{rs.t}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Match cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournament[activeRound].map((m, i) => (
                <div key={i} className="bg-white p-4 border rounded-lg shadow-sm">
                  {/* Card header */}
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span className="font-medium">Match {m.matchNo}</span>
                    <a
                      href={getSlamtrackerUrl(activeRoundObj.roundNum, m.matchNo)}
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
                  ].map(({ p, probMy, probIbm, isP1 }) => {
                    const isWinner = !!p && m.actualWinnerId === p.id;
                    const displayIbm = isP1 ? m.ibmProb1 : m.ibmProb2;
                    return (
                      <div
                        key={isP1 ? 'p1' : 'p2'}
                        className={`flex items-center justify-between gap-2 p-2 my-1 border rounded transition ${
                          isWinner ? 'bg-emerald-100 border-emerald-400' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isAdmin && p && (
                            <button
                              type="button"
                              onClick={() => toggleWinner(activeRound, i, p)}
                              title={isSaved ? 'Results locked — reset to edit' : isWinner ? 'Unmark winner' : 'Mark as winner'}
                              disabled={isSaved}
                              className={`shrink-0 transition ${isSaved ? 'opacity-40 cursor-not-allowed text-gray-400' : 'text-emerald-600 hover:text-emerald-800'}`}
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
                                updateIbmProb(activeRound, i, isP1 ? v : 100 - v);
                              }}
                              disabled={isSaved}
                              className={`w-12 border rounded text-center py-0.5 text-amber-700 ${isSaved ? 'opacity-40 cursor-not-allowed bg-gray-50' : ''}`}
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
              ))}
            </div>
          {/* Save / Reset sticky bar — only visible in admin mode */}
          {isAdmin && (
            <div className="sticky bottom-0 left-0 right-0 mt-8 bg-white border-t shadow-lg z-40">
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  {isSaved
                    ? '✅ All results are saved and locked.'
                    : 'Make your changes, then save to lock them in.'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition ${
                      isSaved
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                    }`}
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