import React from 'react';

const ThemeFilter = ({ themes, activeTheme, onThemeChange, themeCount }) => {
    return (
        <div className="theme-filter-container container">
            <div className="theme-filter-label">Filtrer par thème</div>
            <div className="theme-filter-pills">
                {themes.map((theme) => (
                    <button
                        key={theme}
                        className={`theme-pill ${activeTheme === theme ? 'active' : ''}`}
                        onClick={() => onThemeChange(theme)}
                    >
                        {theme}
                        {themeCount && <span className="theme-pill-count">{themeCount[theme]}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeFilter;
