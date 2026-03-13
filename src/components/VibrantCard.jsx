import React from 'react'

const VibrantCard = ({ video, isArchived, onArchive }) => {
    // Auto-generate YouTube thumbnail from videoId
    const thumbnail = video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

    return (
        <section className="magazine-row">
            <div className="magazine-image-container">
                <img src={thumbnail} alt={video.title} loading="lazy" className="magazine-image" />
            </div>

            <div className="magazine-content">
                <span className="category-badge">{video.category}</span>
                <h2 className="magazine-title">{video.title}</h2>

                {video.highlights && video.highlights.length > 0 && (
                    <ul className="highlights-list">
                        {video.highlights.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                )}

                <div className="magazine-footer">
                    <span className="video-author">{video.author}</span>
                    <div className="card-actions">
                        <button
                            onClick={onArchive}
                            className={`archive-button ${isArchived ? 'archived' : ''}`}
                            title={isArchived ? "Désarchiver" : "Marquer comme lu (Archiver)"}
                        >
                            {isArchived ? (
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="none">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                                </svg>
                            )}
                        </button>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="cta-button">
                            Regarder
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VibrantCard
