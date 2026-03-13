import React from 'react';

const NavigationTabs = ({ activeTab, onTabChange, editions }) => {
    return (
        <nav className="navigation-tabs-container container">
            <div className="navigation-tabs">
                {Object.keys(editions).map((key) => (
                    <button
                        key={key}
                        className={`tab-item ${activeTab === key ? 'active' : ''}`}
                        onClick={() => onTabChange(key)}
                    >
                        <span className="tab-label">{editions[key].label}</span>
                        <span className="tab-date">{editions[key].date}</span>
                    </button>
                ))}
            </div>
            <div className="live-status">
                <span className="pulse-dot"></span>
                LIVE UPDATES ACTIVE
            </div>
        </nav>
    );
};

export default NavigationTabs;
