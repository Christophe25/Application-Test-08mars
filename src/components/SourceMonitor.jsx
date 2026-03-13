import React, { useState } from 'react';

const SourceMonitor = ({ sources }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const themeCount = [...new Set(sources.map(s => s.theme))].length;

    return (
        <div className="source-monitor container">
            <button
                className="source-monitor-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="source-monitor-info">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="source-count">{sources.length} sources surveillées</span>
                    <span className="source-themes">{themeCount} thèmes</span>
                </div>
                <span className="source-monitor-status">
                    <span className="status-dot-green"></span>
                    Actif
                </span>
                <svg
                    className={`chevron ${isExpanded ? 'expanded' : ''}`}
                    viewBox="0 0 24 24" width="16" height="16" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isExpanded && (
                <div className="source-monitor-list">
                    {sources.map((source) => (
                        <a
                            key={source.handle}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-item"
                        >
                            <img src={source.avatar} alt={source.name} className="source-avatar" />
                            <div className="source-details">
                                <span className="source-name">{source.name}</span>
                                <span className="source-handle">{source.handle}</span>
                            </div>
                            <span className="source-theme-badge">{source.theme}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SourceMonitor;
