import React from 'react';

const NavigationTabs = ({ activeSection, onSectionChange, counts }) => {
    return (
        <nav className="navigation-tabs-container container">
            <div className="navigation-tabs">
                <button
                    className={`tab-item ${activeSection === 'tutorials' ? 'active' : ''}`}
                    onClick={() => onSectionChange('tutorials')}
                >
                    <span className="tab-label">📚 Tutoriels Complets</span>
                    <span className="tab-date">{counts.tutorials} vidéos (&gt; 5 min)</span>
                </button>
                <button
                    className={`tab-item ${activeSection === 'shorts' ? 'active' : ''}`}
                    onClick={() => onSectionChange('shorts')}
                >
                    <span className="tab-label">⚡ Vidéos Courtes</span>
                    <span className="tab-date">{counts.shorts} vidéos (≤ 5 min)</span>
                </button>
            </div>
            <div className="live-status">
                <span className="pulse-dot"></span>
                VEILLE AUTOMATIQUE ACTIVE
            </div>
        </nav>
    );
};

export default NavigationTabs;
