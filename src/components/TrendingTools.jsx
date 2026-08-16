import React, { useState, useMemo } from 'react';

const TrendingTools = ({ videos }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Open by default for maximum professional visibility

    // List of tools with their search terms and details
    const toolsConfig = [
        {
            name: "Claude & Claude Code",
            keywords: [/claude/i],
            desc: "L'écosystème d'Anthropic (Sonnet 5, CLI Code, Skills) domine la création de code et l'automatisation de tâches complexes.",
            color: "rgba(99, 102, 241, 0.08)",
            textColor: "var(--accent-color)"
        },
        {
            name: "DeepSeek V4 / Flash",
            keywords: [/deepseek/i],
            desc: "La déferlante open-source chinoise qui bouscule le marché avec ses modèles raisonnants ultra-performants et économiques.",
            color: "rgba(168, 85, 247, 0.08)",
            textColor: "#a855f7"
        },
        {
            name: "n8n & Agents Autonomes",
            keywords: [/n8n/i, /agent/i, /make/i],
            desc: "Le cœur des architectures d'automatisation modernes pour interconnecter les services et faire collaborer des équipes d'IA.",
            color: "rgba(34, 197, 94, 0.08)",
            textColor: "#22c55e"
        },
        {
            name: "NotebookLM & RAG",
            keywords: [/notebooklm/i, /rag/i],
            desc: "L'outil de recherche de Google et les techniques de Retrieval-Augmented Generation pour propulser les bases de connaissances privées.",
            color: "rgba(245, 158, 11, 0.08)",
            textColor: "#f59e0b"
        }
    ];

    // Compute counts dynamically (Memoized to prevent unnecessary regex evaluations on every render)
    const toolsData = useMemo(() => {
        return toolsConfig.map(tool => {
            const count = videos.filter(v => 
                tool.keywords.some(regex => regex.test(v.title) || (v.summary && regex.test(v.summary)))
            ).length;
            return { ...tool, count };
        });
    }, [videos]);

    return (
        <div className="trending-tools container" style={{ marginBottom: '2.5rem', marginTop: '1rem' }}>
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '20px',
                    padding: '16px 24px',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    outline: 'none',
                    boxShadow: 'var(--shadow-soft)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = 'var(--shadow-premium)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.4rem' }}>📈</span>
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Radar des Technologies Stars
                        </span>
                        <p style={{ fontSize: '0.8rem', color: 'var(--secondary-text)', marginTop: '2px', fontWeight: '500' }}>
                            Synthèse des 4 outils les plus cités dans vos curations de veille
                        </p>
                    </div>
                </div>
                <svg
                    className={`chevron ${!isCollapsed ? 'expanded' : ''}`}
                    viewBox="0 0 24 24" width="18" height="18" fill="none"
                    stroke="var(--secondary-text)" strokeWidth="2.5"
                    style={{ transition: 'transform 0.3s ease', transform: !isCollapsed ? 'rotate(180deg)' : 'rotate(0)' }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {!isCollapsed && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px',
                    marginTop: '12px',
                    animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}>
                    {toolsData.map((tool, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'white',
                                border: '1px solid var(--border-color)',
                                borderRadius: '16px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'var(--transition-smooth)',
                                boxShadow: 'var(--shadow-soft)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-premium)'; e.currentTarget.style.borderColor = tool.textColor; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-text)' }}>{tool.name}</h4>
                                    <span style={{ 
                                        fontSize: '0.72rem', 
                                        fontWeight: '800', 
                                        color: tool.textColor, 
                                        background: tool.color, 
                                        padding: '4px 10px', 
                                        borderRadius: '100px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {tool.count} vidéos
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', lineHeight: '1.5' }}>
                                    {tool.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingTools;
