import { useState } from 'react';

const SourceFilter = ({ sources, selectedSources, onApply }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // pending = set of checked handles (all checked = no filter)
    const allHandles = sources.map(s => s.handle);
    const initPending = () => selectedSources.length === 0 ? new Set(allHandles) : new Set(selectedSources);
    const [pending, setPending] = useState(initPending);

    const openPanel = () => {
        setPending(initPending());
        setIsExpanded(true);
    };

    const toggle = (handle) => {
        setPending(prev => {
            const next = new Set(prev);
            next.has(handle) ? next.delete(handle) : next.add(handle);
            return next;
        });
    };

    const handleApply = () => {
        const isAll = allHandles.every(h => pending.has(h));
        onApply(isAll ? [] : [...pending]);
        setIsExpanded(false);
    };

    const handleReset = () => {
        setPending(new Set(allHandles));
        onApply([]);
        setIsExpanded(false);
    };

    const pendingCount = pending.size;
    const isFiltered = selectedSources.length > 0;

    return (
        <div className="source-filter-container container">
            <div className="source-filter-header">
                <span className="theme-filter-label">Sources</span>

                <button className="source-filter-toggle" onClick={isExpanded ? () => setIsExpanded(false) : openPanel}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {isFiltered
                        ? `${selectedSources.length} source${selectedSources.length > 1 ? 's' : ''} sélectionnée${selectedSources.length > 1 ? 's' : ''}`
                        : `Toutes les sources (${sources.length})`
                    }
                    <svg
                        className={`chevron ${isExpanded ? 'expanded' : ''}`}
                        viewBox="0 0 24 24" width="14" height="14" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {isFiltered && (
                    <button className="source-filter-reset" onClick={handleReset} title="Réinitialiser le filtre">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Réinitialiser
                    </button>
                )}
            </div>

            {isExpanded && (
                <div className="source-filter-panel">
                    <div className="source-filter-panel-header">
                        <span className="source-filter-panel-count">{pendingCount} / {sources.length} sélectionnées</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="source-filter-quick" onClick={() => setPending(new Set(allHandles))}>Tout</button>
                            <button className="source-filter-quick" onClick={() => setPending(new Set())}>Aucune</button>
                        </div>
                    </div>

                    <div className="source-filter-pills">
                        {sources.map(source => {
                            const checked = pending.has(source.handle);
                            return (
                                <button
                                    key={source.handle}
                                    className={`source-filter-pill ${checked ? 'active' : ''}`}
                                    onClick={() => toggle(source.handle)}
                                >
                                    <img src={source.avatar} alt={source.name} className="source-filter-avatar" />
                                    <span>{source.name}</span>
                                    <span className="source-filter-check">
                                        {checked
                                            ? <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                            : <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
                                        }
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="source-filter-panel-footer">
                        <button className="source-filter-cancel" onClick={() => setIsExpanded(false)}>Annuler</button>
                        <button
                            className="source-filter-apply"
                            onClick={handleApply}
                            disabled={pendingCount === 0}
                        >
                            Appliquer la sélection
                            {pendingCount > 0 && pendingCount < sources.length && ` (${pendingCount})`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SourceFilter;
