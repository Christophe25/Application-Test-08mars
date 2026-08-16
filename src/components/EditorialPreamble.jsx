import React, { useState } from 'react';

const EditorialPreamble = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="editorial-preamble container" style={{ marginBottom: '2rem', marginTop: '1.5rem' }}>
            <div style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '28px 32px',
                boxShadow: 'var(--shadow-premium)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Petit badge décoratif */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '6px',
                    height: '100%',
                    background: 'var(--accent-gradient)'
                }}></div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px',
                    marginBottom: isCollapsed ? '0' : '20px'
                }}>
                    <div>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: 'var(--accent-color)',
                            display: 'block',
                            marginBottom: '6px'
                        }}>
                            Édito de la Veille IA
                        </span>
                        <h1 style={{
                            fontFamily: "'Playfair Display', 'Outfit', serif",
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: 'var(--primary-text)',
                            margin: '0',
                            lineHeight: '1.2'
                        }}>
                            Sujets &amp; Outils du Moment
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            background: 'rgba(15, 23, 42, 0.04)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'var(--transition-smooth)',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.04)'}
                    >
                        <svg
                            viewBox="0 0 24 24" width="16" height="16" fill="none"
                            stroke="var(--secondary-text)" strokeWidth="2.5"
                            style={{
                                transition: 'transform 0.3s ease',
                                transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0)'
                            }}
                        >
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                    </button>
                </div>

                {!isCollapsed && (
                    <div style={{
                        animation: 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}>
                        <p style={{
                            fontStyle: 'italic',
                            fontSize: '1.05rem',
                            color: 'var(--secondary-text)',
                            borderLeft: '3px solid rgba(99, 102, 241, 0.3)',
                            paddingLeft: '16px',
                            marginBottom: '24px',
                            lineHeight: '1.5',
                            fontFamily: "'Playfair Display', serif"
                        }}>
                            « Cette mi-août 2026 est marquée par une accélération sans précédent des cas d'usage avancés de Claude et des stratégies de capture de valeur en langage naturel. »
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '24px'
                        }}>
                            {/* Card 1 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ fontSize: '1.5rem', marginTop: '-2px' }}>💡</span>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px', color: 'var(--primary-text)' }}>
                                        L'écosystème Claude &amp; Design
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', lineHeight: '1.4' }}>
                                        L'intégration des directives de design Apple directement sous forme de skills pour Claude d'Anthropic redéfinit le pont entre développement et direction artistique.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ fontSize: '1.5rem', marginTop: '-2px' }}>⚡</span>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px', color: 'var(--primary-text)' }}>
                                        Vibe Coding &amp; No-Code
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', lineHeight: '1.4' }}>
                                        Le code s'écrit désormais sans barrières via Cursor ou Claude Code, tandis que la capture de leads à grande échelle se fait intégralement en langage naturel.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ fontSize: '1.5rem', marginTop: '-2px' }}>🔍</span>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px', color: 'var(--primary-text)' }}>
                                        SEO IA &amp; Matériel
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', lineHeight: '1.4' }}>
                                        L'alliance hybride entre Claude et DataForSEO bouleverse le référencement, alors que l'apparition de Longcat 2.0 remet en cause la suprématie des GPU NVIDIA.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ fontSize: '1.5rem', marginTop: '-2px' }}>🧠</span>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px', color: 'var(--primary-text)' }}>
                                        Productivité Cognitive
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', lineHeight: '1.4' }}>
                                        Le concept de « World Mental Modeling » d'Eliott Meunier et les vagues d'ouverture open-source transforment la gestion des connaissances personnelles (PKM).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorialPreamble;
