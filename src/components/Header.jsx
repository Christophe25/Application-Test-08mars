import React from 'react'

const Header = () => {
    const date = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        weekday: 'long',
        year: 'numeric'
    });

    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo text-gradient">
                    AI EDITORIAL
                </div>
                <div className="edition-date" id="current-date">
                    {date}
                </div>
            </div>
        </header>
    )
}

export default Header
