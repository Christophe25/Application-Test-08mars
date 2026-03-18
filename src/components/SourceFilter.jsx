import { useState } from 'react';

const SourceFilter = ({ sources, activeSource, onSourceChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="source-filter-container container">
            <div className="source-filter-header">
                <div className="theme-filter-label">Filtrer par source</div>
                {activeSource && (
                    <button className="source-filter-reset" onClick={() => onSourceChange(null)}>
                        Toutes les sources
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
                <button className="source-filter-toggle" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Masquer' : 'Choisir une source'}
                    <svg
                        className={`chevron ${isExpanded ? 'expanded' : ''}`}
                        viewBox="0 0 24 24" width="14" height="14" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div className="source-filter-pills">
                    {sources.map((source) => (
                        <button
                            key={source.handle}
                            className={`source-filter-pill ${activeSource === source.handle ? 'active' : ''}`}
                            onClick={() => {
                                onSourceChange(activeSource === source.handle ? null : source.handle);
                                setIsExpanded(false);
                            }}
                        >
                            <img src={source.avatar} alt={source.name} className="source-filter-avatar" />
                            <span>{source.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SourceFilter;
