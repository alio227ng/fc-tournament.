import React, { useEffect, useState } from 'react';
import type { Tournament, Match, PlayerLeaderboard } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { formatDateFrench, formatMAD } from '../utils/format.ts';
import { apiClient } from '../services/apiClient.ts';
import {
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
  Gamepad2,
  ShieldCheck,
  Flame,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Check,
  CreditCard,
  Zap,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerLeaderboard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [tournData, matchData, leadData] = await Promise.all([
          apiClient.getTournaments(),
          apiClient.getMatches(),
          apiClient.getLeaderboard(),
        ]);

        setTournaments(tournData);
        setMatches(matchData);
        setLeaderboard(leadData);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const featuredTournaments = tournaments.slice(0, 3);
  const completedMatches = matches.filter((m) => m.status === 'completed').slice(0, 4);
  const scheduledMatches = matches.filter((m) => m.status !== 'completed').slice(0, 2);
  const topPlayers = leaderboard.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      {/* ============================================================ */}
      {/* HERO SECTION                                                */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-b border-[#161e2c]">
        {/* Background Visual Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/f455c630-cebe-4da1-8e64-ad18d396300f_73791cd5.png"
            alt="EA SPORTS FC eSport Tournament"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-125"
            referrerPolicy="no-referrer"
          />
          {/* Dark Scrims ensuring high contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/50" />
          <div className="absolute inset-0 gaming-grid-bg opacity-40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121926]/90 border border-[#233146] text-xs font-mono text-[#00ff66]">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
              <span>FC eSPORT · SAISON OFFICIELLE 2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] text-balance">
              Ton talent.<br />
              Ton équipe.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-[#22c55e] to-[#a3e635] neon-text-glow">
                Ta compétition.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
              Rejoins les tournois <span className="text-white font-semibold">EA SPORTS FC</span> et affronte les meilleurs compétiteurs dans une ambiance e-sport professionnelle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('tournaments')}
                className="px-6 py-3.5 rounded-xl bg-[#00ff66] text-black font-display text-lg font-bold uppercase tracking-wider hover:bg-[#00e65c] transition-all duration-200 shadow-[0_0_25px_rgba(0,255,102,0.45)] hover:shadow-[0_0_35px_rgba(0,255,102,0.7)] flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <span>Découvrir les tournois</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {user ? (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-6 py-3.5 rounded-xl bg-[#121824]/90 border border-[#232f44] text-white hover:border-[#00ff66]/50 transition-colors font-display text-lg font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Trophy className="w-5 h-5 text-[#00ff66]" />
                  <span>Mon espace joueur</span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('register')}
                  className="px-6 py-3.5 rounded-xl bg-[#121824]/90 border border-[#232f44] text-white hover:border-[#00ff66]/50 transition-colors font-display text-lg font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Créer mon compte</span>
                </button>
              )}

              <a
                href="https://wa.me/212681337566"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#121824]/90 border border-[#232f44] text-[#00ff66] hover:border-[#00ff66]/50 transition-colors font-display text-base font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer whitespace-nowrap"
                title="Poser une question ou rejoindre la communauté sur WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[#00ff66]" />
                <span>WhatsApp (+212 681 337 566)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: COMMENT PARTICIPER EN 3 ÉTAPES                      */}
      {/* ============================================================ */}
      <section className="py-12 bg-[#090d14] border-b border-[#161e2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-mono text-[#00ff66] uppercase tracking-wider font-semibold">
              GUIDE DU COMPÉTITEUR
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Comment participer à un tournoi ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Un parcours fluide, transparent et sécurisé : de votre inscription jusqu'au versement garanti de votre Cash Prize.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-[#0e131d] border border-[#1b2537] hover:border-[#00ff66]/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-3xl text-[#00ff66]">01</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-black text-white uppercase tracking-wide">
                  Choisis ton Tournoi
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Consulte le calendrier des tournois, choisis ta formule de compétition (Aller-Retour ou Élimination) et inscris ton Gamertag et ton équipe de prédilection.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-[#172030] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>Tous niveaux acceptés · Inscriptions 24h/24</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-[#0e131d] border border-[#1b2537] hover:border-[#00ff66]/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-3xl text-[#00ff66]">02</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-black text-white uppercase tracking-wide">
                  Règle les Frais & Rejoins WhatsApp
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Effectue ton règlement sécurisé par CIH Bank, virement ou CashPlus. Dès validation, tu es automatiquement ajouté au salon officiel WhatsApp des compétiteurs.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-[#172030] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>Salon WhatsApp officiel · Support réactif</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-[#0e131d] border border-[#1b2537] hover:border-[#00ff66]/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-3xl text-[#00ff66]">03</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-black text-white uppercase tracking-wide">
                  Joue tes Matchs & Gagne
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dispute tes rencontres chaque week-end de 14h à 21h. Téléverse la capture de fin de match : l'arbitre homologue le résultat et ton Cash Prize est versé sous 24h !
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-[#172030] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>Cash Prize garanti · Homologation certifiée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: TOURNOIS À DÉCOUVRIR                              */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#192130]">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide">
              Tournois à l'Affiche
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tournaments')}
            className="text-xs font-semibold text-[#00ff66] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Voir tous les tournois</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-[480px] rounded-3xl bg-[#0e131d] border border-[#1b2333] animate-pulse" />
            ))}
          </div>
        ) : featuredTournaments.length === 0 ? (
          <div className="text-center py-12 bg-[#0e131d] rounded-2xl border border-[#1b2333]">
            <p className="text-slate-400">Aucun tournoi disponible actuellement.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTournaments.map((tournament) => {
              const isOpen = tournament.status === 'open';
              const isOngoing = tournament.status === 'ongoing';
              const placesLeft = tournament.maxParticipants - (tournament.confirmedCount || 0);
              const progressPercent = Math.min(
                100,
                Math.round(((tournament.confirmedCount || 0) / tournament.maxParticipants) * 100)
              );

              return (
                <div
                  key={tournament.id}
                  className="bg-[#0b0f16] border border-[#1c2435] hover:border-[#00ff66]/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(0,255,102,0.12)]"
                >
                  {/* Poster Banner - Prominent Height and Artwork */}
                  <div className="relative h-72 sm:h-80 md:h-88 overflow-hidden bg-slate-900">
                    <img
                      src={tournament.bannerImage || '/assets/aistudio/f455c630-cebe-4da1-8e64-ad18d396300f_73791cd5.png'}
                      alt={tournament.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-[#0b0f16]/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <div className="bg-[#07090e]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#222e44] text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                        {isOpen && (
                          <>
                            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                            <span className="text-[#00ff66] font-bold">Inscriptions ouvertes</span>
                          </>
                        )}
                        {isOngoing && (
                          <>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400 font-bold">Compétition en cours</span>
                          </>
                        )}
                        {tournament.status === 'completed' && <span className="text-slate-400">Terminé</span>}
                      </div>

                      <div className="bg-[#07090e]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#222e44] text-xs font-mono text-slate-300">
                        {tournament.gameVersion}
                      </div>
                    </div>

                    {/* Bottom of poster overlay: Dotation and Fee */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <div className="bg-[#00ff66]/15 border border-[#00ff66]/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-[#00ff66] flex items-center gap-1.5 shadow-lg">
                        <Trophy className="w-4 h-4 text-[#00ff66] shrink-0" />
                        <span className="truncate">{tournament.prizePool}</span>
                      </div>
                      <div className="bg-[#07090e]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#222e44] text-xs font-mono font-bold text-white">
                        Frais : <span className="text-[#00ff66]">{formatMAD(tournament.entryFeeMAD)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body - Balanced, informative, zero wasted space */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-2.5">
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-[#00ff66] transition-colors uppercase tracking-tight leading-snug">
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {tournament.description}
                      </p>
                    </div>

                    {/* Structured Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 font-mono">
                      <div className="p-3 rounded-2xl bg-[#101622] border border-[#1b2638] flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#00ff66] shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-400 block uppercase">Date & Heure</span>
                          <span className="font-semibold text-white truncate">{formatDateFrench(tournament.startDate)} · {tournament.time}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#101622] border border-[#1b2638] flex items-center gap-2.5">
                        <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-400 block uppercase">Dotation</span>
                          <span className="font-semibold text-white truncate">{tournament.prizePool}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#101622] border border-[#1b2638] flex items-center gap-2.5">
                        <Gamepad2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-400 block uppercase">Format</span>
                          <span className="font-semibold text-white truncate">
                            {tournament.format === 'aller_retour'
                              ? 'Aller-Retour'
                              : tournament.format === 'groups_playoffs'
                              ? 'Poules + Finales'
                              : 'Élimination Directe'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar of Registrations */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Remplissage du tableau</span>
                        {isOpen ? (
                          <span className="text-[#00ff66] font-semibold">
                            {placesLeft > 0 ? `${placesLeft} places restantes` : 'Complet'}
                          </span>
                        ) : isOngoing ? (
                          <span className="text-amber-400 font-semibold">Phase éliminatoire active</span>
                        ) : (
                          <span className="text-slate-500">Archivé</span>
                        )}
                      </div>
                      <div className="w-full bg-[#121824] h-2 rounded-full overflow-hidden border border-[#1e273a]">
                        <div
                          className="bg-gradient-to-r from-[#00ff66] to-[#22c55e] h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <button
                      onClick={() => onNavigate('tournament-detail', tournament.id)}
                      className="w-full py-3.5 rounded-xl bg-[#00ff66] hover:bg-[#00e65c] text-black font-display text-base font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,255,102,0.35)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {isOpen ? 'Participer au tournoi' : isOngoing ? 'Suivre les matchs en direct' : 'Consulter les résultats'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: MATCHS RÉCENTS & TOP JOUEURS                      */}
      {/* ============================================================ */}
      <section className="py-14 bg-[#0a0d15] border-y border-[#161e2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Derniers résultats homologués */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2538]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00ff66]" />
                  <h3 className="font-display text-2xl font-bold text-white uppercase">
                    Derniers Résultats Homologués
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('results')}
                  className="text-xs text-[#00ff66] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Tous les résultats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {completedMatches.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-[#0e131d] rounded-2xl border border-[#1d273a]">
                  Les premiers résultats seront publiés dès l'issue des matchs.
                </div>
              ) : (
                <div className="space-y-3">
                  {completedMatches.map((m) => {
                    const isP1Winner = m.winnerId === m.player1Id;
                    const isP2Winner = m.winnerId === m.player2Id;

                    return (
                      <div
                        key={m.id}
                        className="p-4 rounded-2xl bg-[#0e131d] border border-[#1c2638] flex items-center justify-between gap-4 text-xs shadow-md"
                      >
                        <div className="font-mono text-slate-400 w-32 truncate">
                          <span className="block font-semibold text-white truncate">{m.stageName}</span>
                          <span className="text-[10px] text-slate-500">{formatDateFrench(m.scheduledDate)}</span>
                        </div>

                        <div className="flex items-center gap-3 flex-1 justify-center">
                          <span className={`font-semibold truncate max-w-[110px] sm:max-w-[140px] text-right ${isP1Winner ? 'text-[#00ff66]' : 'text-slate-300'}`}>
                            {m.player1Gamertag}
                          </span>
                          <span className="px-3 py-0.5 rounded-lg bg-[#141b27] border border-[#242f44] font-mono font-bold text-white text-xs">
                            {m.player1Score} - {m.player2Score}
                          </span>
                          <span className={`font-semibold truncate max-w-[110px] sm:max-w-[140px] text-left ${isP2Winner ? 'text-[#00ff66]' : 'text-slate-300'}`}>
                            {m.player2Gamertag}
                          </span>
                        </div>

                        <div className="text-right w-24 hidden sm:block">
                          <span className="text-[11px] font-mono text-[#00ff66] flex items-center justify-end gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Validé</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Top 5 Joueurs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2538]">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-display text-2xl font-bold text-white uppercase">
                    Top Joueurs
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="text-xs text-yellow-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Classement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="rounded-2xl bg-[#0e131d] border border-[#1c2638] overflow-hidden divide-y divide-[#172030] shadow-md">
                {topPlayers.map((p) => (
                  <div
                    key={p.userId}
                    onClick={() => onNavigate('leaderboard')}
                    className="p-3.5 flex items-center justify-between gap-3 text-xs hover:bg-[#131a26] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-display font-black text-sm w-5 text-center ${
                        p.rank === 1 ? 'text-yellow-400 text-base' : p.rank === 2 ? 'text-slate-300' : 'text-amber-600'
                      }`}>
                        #{p.rank}
                      </span>
                      <div>
                        <span className="font-bold text-white block">{p.gamertag}</span>
                        <span className="text-[10px] text-slate-400">{p.wins}V - {p.losses}D</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#00ff66]">{p.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: NOS GARANTIES & ENGAGEMENTS OFFICIELS               */}
      {/* ============================================================ */}
      <section className="py-14 bg-[#090d14] border-b border-[#161e2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-mono text-[#00ff66] uppercase tracking-wider font-semibold">
              TRANSPARENCE & INTÉGRITÉ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Pourquoi nous faire confiance ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Des standards professionnels appliqués à chaque match pour garantir la meilleure expérience compétitive au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#1c2638] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">Cash Prize Garanti</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Toutes les dotations annoncées sont 100% garanties et versées sous 24h par virement bancaire ou CashPlus dès la finale terminée.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#1c2638] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">Arbitrage Neutre</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chaque score est vérifié sur capture d'écran certifiée avec historique complet des matchs et contrôle strict de l'éthique sportive.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#1c2638] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">Salon WhatsApp Dédié</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Un groupe WhatsApp officiel rassemble tous les compétiteurs du tournoi pour faciliter l'échange des IDs et le lancement immédiat des matchs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e131d] border border-[#1c2638] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">Support 7j/7 Réactif</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Notre staff est joignable en permanence au +212 681 337 566 et par e-mail alio227ng@gmail.com pour vous guider et résoudre tout litige.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: FOIRE AUX QUESTIONS (FAQ)                           */}
      {/* ============================================================ */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-mono text-[#00ff66] uppercase tracking-wider font-semibold">
            RÉPONSES À VOS QUESTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Foire Aux Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tout ce qu'il faut savoir sur le déroulement des tournois, l'arbitrage et le paiement des gains.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Quels sont les jours et horaires officiels des compétitions ?",
              a: "Les matchs se déroulent les week-ends de 14h00 à 21h00 (heure marocaine / Africa/Casablanca). Les inscriptions en ligne restent ouvertes 24h/24 jusqu'à la clôture des places.",
            },
            {
              q: "Comment sont versés les Cash Prizes en cas de victoire ?",
              a: "Les dotations financières (Cash Prizes) sont garanties et transmises sous 24h après la finale officielle, par virement bancaire (CIH, Attijariwafa, etc.) ou transfert d'argent CashPlus/Wafacash selon la préférence du vainqueur.",
            },
            {
              q: "Comment est validé le score d'un match ?",
              a: "À l'issue de chaque rencontre, le joueur vainqueur téléverse la capture d'écran du score final directement sur la plateforme ou dans le salon WhatsApp. L'équipe d'arbitrage vérifie l'authenticité et homologue le résultat dans le tableau officiel.",
            },
            {
              q: "Quelles sont les règles de jeu et modes adoptés ?",
              a: "Par défaut, les tournois appliquent le mode 95 compétitif (toutes les équipes ont le même niveau de statistiques pour un équilibre parfait) avec des mi-temps de 6 minutes. En cas d'égalité en élimination directe, prolongations classiques puis tirs au but.",
            },
            {
              q: "Que se passe-t-il si un joueur quitte ou subit une déconnexion ?",
              a: "En cas de déconnexion avant la 15e minute sans but marqué, le match est rejoué avec l'accord de l'arbitre. Passé ce délai ou en cas de ragequit volontaire, la défaite par forfait (3-0) est automatiquement appliquée.",
            },
            {
              q: "Comment contacter l'organisation en cas de problème ?",
              a: "Notre équipe est joignable 7j/7 directement par WhatsApp au +212 681 337 566 ou par e-mail à alio227ng@gmail.com pour vous assister immédiatement.",
            },
          ].map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0b0f16] border border-[#1b2537] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#101724] transition-colors"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#141d2c] border border-[#223046] flex items-center justify-center text-[#00ff66] shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#162031] pt-3 bg-[#0d121c]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Official Rules & Fair-Play Callout Section */}
      <section className="py-12 bg-gradient-to-b from-[#07090e] to-[#0a0e16] border-t border-[#161e2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0d121c] via-[#101726] to-[#0d121c] border border-[#1e2738] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
                <span>RÈGLEMENT OFFICIEL DES COMPÉTITIONS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                Cadre de jeu équitable, certifié & transparent
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Format 5 min par mi-temps, formule Aller-Retour, contrôle technique des manettes, vérification rigoureuse des captures d'écran et tolérance zéro envers la fraude.
              </p>
            </div>

            <button
              onClick={() => onNavigate('rules')}
              className="px-6 py-3 rounded-xl bg-[#00ff66] hover:bg-[#00e65c] text-black font-display font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Consulter le Règlement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
