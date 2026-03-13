import React, { useState, useMemo } from 'react'
import Header from './components/Header'
import ThemeFilter from './components/ThemeFilter'
import SourceMonitor from './components/SourceMonitor'
import VibrantCard from './components/VibrantCard'
import { allVideos, sources, themes, lastUpdate } from './data'
import './index.css'

function App() {
    const [activeTheme, setActiveTheme] = useState('Tous');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastSync, setLastSync] = useState(lastUpdate || new Date().toLocaleTimeString());
    const [showAll, setShowAll] = useState(false);
    const [showPromoGallery, setShowPromoGallery] = useState(false);

    // Archives state (persisted in localStorage)
    const [archivedVideos, setArchivedVideos] = useState(() => {
        try {
            const saved = localStorage.getItem('veilleia_archives');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const toggleArchive = (videoId) => {
        setArchivedVideos(prev => {
            const newArchives = prev.includes(videoId)
                ? prev.filter(id => id !== videoId)
                : [...prev, videoId];
            localStorage.setItem('veilleia_archives', JSON.stringify(newArchives));
            return newArchives;
        });
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setLastSync(new Date().toLocaleTimeString());
        }, 2000);
    };

    // Fenêtre glissante de 2 mois : ne garder que les vidéos récentes
    const twoMonthsAgo = useMemo(() => {
        const d = new Date();
        d.setMonth(d.getMonth() - 2);
        return d;
    }, []);

    // Toutes les vidéos triées par date décroissante, filtrées sur 2 mois
    const sortedVideos = useMemo(() => {
        return [...allVideos]
            .filter(v => new Date(v.date) >= twoMonthsAgo)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [twoMonthsAgo]);

    // Les 5 plus récentes pour la page d'accueil (exclut vidéos promo ET archives)
    const latestVideos = useMemo(() =>
        sortedVideos
            .filter(v => v.category !== 'Vidéos Promotionnelles' && !archivedVideos.includes(v.id))
            .slice(0, 5),
        [sortedVideos, archivedVideos]);

    // Toutes les vidéos promotionnelles (exclut les archives)
    const allPromoVideos = useMemo(() =>
        sortedVideos
            .filter(v => v.category === 'Vidéos Promotionnelles' && !archivedVideos.includes(v.id)),
        [sortedVideos, archivedVideos]);

    // L'aperçu pour la page d'accueil (les 4 premières)
    const promoVideos = useMemo(() => allPromoVideos.slice(0, 4), [allPromoVideos]);

    // Thèmes dynamiques incluant les archives
    const appThemes = useMemo(() => [...themes.filter(t => t !== 'Vidéos Promotionnelles'), '📥 Archives'], []);

    // Vidéos filtrées par thème
    const filteredByTheme = useMemo(() => {
        if (activeTheme === '📥 Archives') return sortedVideos.filter(v => archivedVideos.includes(v.id));
        if (activeTheme === 'Tous') return sortedVideos.filter(v => v.category !== 'Vidéos Promotionnelles' && !archivedVideos.includes(v.id));
        return sortedVideos.filter(v => v.category === activeTheme && !archivedVideos.includes(v.id));
    }, [activeTheme, sortedVideos, archivedVideos]);

    // Comptage par thème pour les badges
    const themeCount = useMemo(() => {
        const counts = {};
        appThemes.forEach(t => {
            if (t === '📥 Archives') {
                counts[t] = sortedVideos.filter(v => archivedVideos.includes(v.id)).length;
            } else if (t === 'Tous') {
                counts[t] = sortedVideos.filter(v => v.category !== 'Vidéos Promotionnelles' && !archivedVideos.includes(v.id)).length;
            } else {
                counts[t] = sortedVideos.filter(v => v.category === t && !archivedVideos.includes(v.id)).length;
            }
        });
        return counts;
    }, [sortedVideos, appThemes, archivedVideos]);


    // Décider quelles vidéos afficher
    const displayedVideos = showAll ? filteredByTheme : latestVideos;

    return (
        <div className="app">
            <Header />

            {!showPromoGallery && (
                <SourceMonitor sources={sources} />
            )}



            {/* Vue Galerie Promo Dédiée */}
            {showPromoGallery ? (
                <>
                    <div className="section-header container">
                        <div>
                            <h2 className="section-title">⚡ Formats Courts (Promo)</h2>
                            <p className="section-subtitle">Aperçu intégral de vos vidéos de moins de 3 minutes ({allPromoVideos.length} vidéos)</p>
                        </div>
                        <button className="back-button" onClick={() => setShowPromoGallery(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '2rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '500' }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Retour à l'accueil
                        </button>
                    </div>

                    <main className="main container editorial-flow">
                        {allPromoVideos.length > 0 ? (
                            allPromoVideos.map((video) => (
                                <VibrantCard
                                    key={video.id}
                                    video={video}
                                    isArchived={archivedVideos.includes(video.id)}
                                    onArchive={() => toggleArchive(video.id)}
                                />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>Aucune vidéo courte trouvée pour le moment.</p>
                            </div>
                        )}
                    </main>
                </>
            ) : !showAll ? (
                <>
                    {allPromoVideos.length > 0 && (
                        <div className="section-header container" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <h2 className="section-title">⚡ Formats Courts (Promo)</h2>
                                <p className="section-subtitle">Vidéos de moins de 3 minutes pour une veille rapide</p>
                            </div>
                            <button className="explore-button" onClick={() => setShowPromoGallery(true)}>
                                Explorer la galerie
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <div className="section-header container">
                        <div>
                            <h2 className="section-title">🔥 Les 5 Dernières Vidéos</h2>
                            <p className="section-subtitle">Les publications les plus récentes de vos {sources.length} sources</p>
                        </div>
                        <button className="explore-button" onClick={() => setShowAll(true)}>
                            Explorer par thème
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <main className={`main container editorial-flow ${isRefreshing ? 'content-fade' : ''}`}>
                        {latestVideos.map((video) => (
                            <VibrantCard
                                key={video.id}
                                video={video}
                                isArchived={archivedVideos.includes(video.id)}
                                onArchive={() => toggleArchive(video.id)}
                            />
                        ))}
                    </main>
                </>
            ) : (
                <>
                    <div className="section-header container">
                        <div>
                            <h2 className="section-title">📚 Toutes les Vidéos</h2>
                            <p className="section-subtitle">{filteredByTheme.length} vidéo{filteredByTheme.length > 1 ? 's' : ''} {activeTheme !== 'Tous' ? `dans "${activeTheme}"` : 'au total'}</p>
                        </div>
                        <button className="explore-button back" onClick={() => { setShowAll(false); setActiveTheme('Tous'); }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Retour à l'accueil
                        </button>
                    </div>

                    <ThemeFilter
                        themes={appThemes}
                        activeTheme={activeTheme}
                        onThemeChange={setActiveTheme}
                        themeCount={themeCount}
                    />

                    <main className={`main container editorial-flow ${isRefreshing ? 'content-fade' : ''}`}>
                        {filteredByTheme.length > 0 ? (
                            filteredByTheme.map((video) => (
                                <VibrantCard
                                    key={video.id}
                                    video={video}
                                    isArchived={archivedVideos.includes(video.id)}
                                    onArchive={() => toggleArchive(video.id)}
                                />
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>Aucune vidéo trouvée pour le thème « {activeTheme} ».</p>
                                <button className="theme-pill" onClick={() => setActiveTheme('Tous')}>Voir toutes les vidéos</button>
                            </div>
                        )}
                    </main>
                </>
            )}

            <footer className="footer container">
                <p className="footer-copyright">AI Editorial Curation &copy; 2026 — {sources.length} sources · {allVideos.length} vidéos — Antigravity Agentic Framework</p>
            </footer>
        </div>
    )
}

export default App
