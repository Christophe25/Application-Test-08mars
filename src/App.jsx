import React, { useState, useMemo } from 'react'
import Header from './components/Header'
import NavigationTabs from './components/NavigationTabs'
import ThemeFilter from './components/ThemeFilter'
import SourceFilter from './components/SourceFilter'
import SourceMonitor from './components/SourceMonitor'
import VibrantCard from './components/VibrantCard'
import { allVideos, sources, themes, lastUpdate } from './data'
import './index.css'

function App() {
    const [activeSection, setActiveSection] = useState('tutorials'); // 'tutorials' vs 'shorts'
    const [activeTheme, setActiveTheme] = useState('Tous');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState(lastUpdate);

    const handleRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            const now = new Date();
            setLastSyncTime(`${now.toLocaleTimeString()} ${now.toLocaleDateString()}`);
        }, 2000);
    };

    // Sélection multiple de sources (vide = toutes), persistée en localStorage
    const [selectedSources, setSelectedSources] = useState(() => {
        try {
            const saved = localStorage.getItem('veilleia_sources');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const handleSourceApply = (handles) => {
        setSelectedSources(handles);
        localStorage.setItem('veilleia_sources', JSON.stringify(handles));
    };

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

    // Fenêtre glissante de 2 mois
    const twoMonthsAgo = useMemo(() => {
        const d = new Date();
        d.setMonth(d.getMonth() - 2);
        return d;
    }, []);

    // Toutes les vidéos triées par date, filtrées sur 2 mois + sources sélectionnées
    const sortedVideos = useMemo(() => {
        return [...allVideos]
            .filter(v => new Date(v.date) >= twoMonthsAgo)
            .filter(v => selectedSources.length === 0 || selectedSources.includes(v.source))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [twoMonthsAgo, selectedSources]);

    // Séparer les vidéos de la section courante
    const currentSectionVideos = useMemo(() => {
        return sortedVideos.filter(v => activeSection === 'shorts' ? v.isShort : !v.isShort);
    }, [sortedVideos, activeSection]);

    // Les 5 plus récentes pour la page d'accueil de la section courante (exclut les archives)
    const latestVideos = useMemo(() =>
        currentSectionVideos
            .filter(v => !archivedVideos.includes(v.id))
            .slice(0, 5),
        [currentSectionVideos, archivedVideos]);

    // Thèmes dynamiques incluant les archives
    const appThemes = useMemo(() => [...themes, '📥 Archives'], []);

    // Vidéos filtrées par thème dans la section courante
    const filteredByTheme = useMemo(() => {
        if (activeTheme === '📥 Archives') return currentSectionVideos.filter(v => archivedVideos.includes(v.id));
        if (activeTheme === 'Tous') return currentSectionVideos.filter(v => !archivedVideos.includes(v.id));
        return currentSectionVideos.filter(v => v.category === activeTheme && !archivedVideos.includes(v.id));
    }, [activeTheme, currentSectionVideos, archivedVideos]);

    // Comptage par thème pour les badges de la section courante
    const themeCount = useMemo(() => {
        const counts = {};
        appThemes.forEach(t => {
            if (t === '📥 Archives') counts[t] = currentSectionVideos.filter(v => archivedVideos.includes(v.id)).length;
            else if (t === 'Tous') counts[t] = currentSectionVideos.filter(v => !archivedVideos.includes(v.id)).length;
            else counts[t] = currentSectionVideos.filter(v => v.category === t && !archivedVideos.includes(v.id)).length;
        });
        return counts;
    }, [currentSectionVideos, appThemes, archivedVideos]);

    // Comptage global par section pour les onglets principaux (respecte les filtres de sources)
    const sectionCounts = useMemo(() => {
        return {
            tutorials: sortedVideos.filter(v => !v.isShort).length,
            shorts: sortedVideos.filter(v => v.isShort).length
        };
    }, [sortedVideos]);

    const isSourceFiltered = selectedSources.length > 0;

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setActiveTheme('Tous'); // Réinitialiser le thème lors du changement d'onglet
    };

    return (
        <div className="app">
            <Header />

            <NavigationTabs
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                counts={sectionCounts}
            />

            <SourceMonitor sources={sources} isRefreshing={isRefreshing} />

            {/* Filtre sources — visible sur toutes les vues */}
            <SourceFilter
                sources={sources}
                selectedSources={selectedSources}
                onApply={handleSourceApply}
            />

            {/* Barre d'actualisation simulée */}
            <div className="refresh-bar container">
                <span className="sync-info">Dernière synchronisation : {lastSyncTime}</span>
                <button
                    className={`refresh-button ${isRefreshing ? 'spinning' : ''}`}
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                    {isRefreshing ? 'Scan en cours...' : 'Actualiser les sources'}
                </button>
            </div>

            {!showAll ? (
                <>
                    <div className="section-header container">
                        <div>
                            <h2 className="section-title">
                                {activeSection === 'shorts' ? '⚡ Les 5 Plus Récentes Vidéos Courtes' : '🔥 Les 5 Plus Récents Tutoriels'}
                            </h2>
                            <p className="section-subtitle">
                                {isSourceFiltered
                                    ? `${selectedSources.length} source${selectedSources.length > 1 ? 's' : ''} sélectionnée${selectedSources.length > 1 ? 's' : ''} sur ${sources.length}`
                                    : `Les publications les plus récentes de vos ${sources.length} sources`
                                }
                            </p>
                        </div>
                        <button className="explore-button" onClick={() => setShowAll(true)}>
                            Explorer par thème
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <main className={`main container editorial-flow ${isRefreshing ? 'content-fade' : ''}`}>
                        {latestVideos.length > 0 ? latestVideos.map((video) => (
                            <VibrantCard
                                key={video.id}
                                video={video}
                                isArchived={archivedVideos.includes(video.id)}
                                onArchive={() => toggleArchive(video.id)}
                            />
                        )) : (
                            <div className="empty-state">
                                <p>Aucune vidéo trouvée pour les sources sélectionnées.</p>
                            </div>
                        )}
                    </main>
                </>
            ) : (
                <>
                    <div className="section-header container">
                        <div>
                            <h2 className="section-title">
                                {activeSection === 'shorts' ? '⚡ Toutes les Vidéos Courtes' : '📚 Tous les Tutoriels Complets'}
                            </h2>
                            <p className="section-subtitle">
                                {filteredByTheme.length} vidéo{filteredByTheme.length > 1 ? 's' : ''} {activeTheme !== 'Tous' ? `dans "${activeTheme}"` : 'au total'}
                            </p>
                        </div>
                        <button className="explore-button back" onClick={() => { setShowAll(false); setActiveTheme('Tous'); }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            {"Retour à l'accueil"}
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
