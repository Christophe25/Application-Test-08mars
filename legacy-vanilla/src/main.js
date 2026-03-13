const videos = [
    {
        id: "hero-1",
        title: "Claude Code détrône OpenClaw : La Nouveauté Anthropic qui change tout",
        summary: "Anthropic frappe un grand coup avec Claude Code. Découvrez comment cet outil redéfinit le développement agentique en 2026.",
        category: "Infrastructure",
        author: "Bapt IA",
        avatar: "https://yt3.googleusercontent.com/vP_I-nFvV6R-w1iYjF9V1W1R4Z1xX7-8J9_9V1W1R4Z1xX7-8J9_9V1W1R4Z1xX7-8J9_9=s176-c-k-c0x00ffffff-no-rj",
        thumbnail: "https://i.ytimg.com/vi/vG_I-nFvV6R/hq720.jpg",
        views: "2K vues",
        url: "https://www.youtube.com/@BaptIA/videos"
    },
    {
        id: "card-1",
        title: "Gemini 3.1 Pro : Des sites animés en un seul prompt ?",
        summary: "Le nouveau modèle de Google explose les benchmarks. Capacité inédite de génération de sites web complexes et interactifs.",
        category: "IA",
        author: "Bapt IA",
        avatar: "https://i.pravatar.cc/100?u=bapt",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        views: "6.1K vues",
        url: "https://www.youtube.com/@BaptIA/videos"
    },
    {
        id: "card-2",
        title: "Le Guide Claude COWORK Ultime : Méthode Complète 2026",
        summary: "Comment automatiser intégralement son workflow avec Claude Cowork. La bible de l'efficacité pour les solopreneurs IA.",
        category: "Productivité",
        author: "Bapt IA",
        avatar: "https://i.pravatar.cc/100?u=bapt",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        views: "4.1K vues",
        url: "https://www.youtube.com/@BaptIA/videos"
    },
    {
        id: "card-3",
        title: "N8N vs Antigravity : Pourquoi l'ère des automatisations est finie",
        summary: "Le passage du no-code classique aux infrastructures d'agents autonomes. Pourquoi vous devez changer de paradigme maintenant.",
        category: "Infrastructure",
        author: "Bapt IA",
        avatar: "https://i.pravatar.cc/100?u=bapt",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        views: "6.2K vues",
        url: "https://www.youtube.com/@BaptIA/videos"
    },
    {
        id: "card-4",
        title: "Le futur du Montage Vidéo : Claude remplace les monteurs ?",
        summary: "Analyse disruptive sur l'impact des agents IA dans l'industrie créative. Comment s'adapter pour rester pertinent.",
        category: "Business",
        author: "Bapt IA",
        avatar: "https://i.pravatar.cc/100?u=bapt",
        thumbnail: "https://images.unsplash.com/photo-1492691523567-61723429a3d2?auto=format&fit=crop&w=800&q=80",
        views: "9.3K vues",
        url: "https://www.youtube.com/@BaptIA/videos"
    },
    {
        id: "card-5",
        title: "Les 5 Meilleurs Business IA à lancer en 2026",
        summary: "Où se situe la valeur cette année ? 5 opportunités concrètes basées sur les nouvelles infrastructures agentiques.",
        category: "Opportunité",
        author: "Bapt IA",
        avatar: "https://i.pravatar.cc/100?u=bapt",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
        views: "1.7K vues",
        url: "https://www.youtube.com/@BaptIA/videos"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    renderContent();
    setupCurationAutomation();
});

function updateDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', weekday: 'long' });
    dateEl.textContent = `Édition du ${formattedDate}`;
}

function renderContent() {
    const heroSection = document.getElementById('hero');
    const gridSection = document.getElementById('grid');
    if (!heroSection || !gridSection) return;

    const heroVideo = videos[0];
    const otherVideos = videos.slice(1);

    // Render Hero
    heroSection.innerHTML = createCardHTML(heroVideo, true);

    // Render Grid
    gridSection.innerHTML = otherVideos.map(video => createCardHTML(video, false)).join('');
}

function createCardHTML(video, isHero) {
    const cardClass = isHero ? 'vibrant-card hero-card' : 'vibrant-card grid-card';

    return `
        <a href="${video.url}" target="_blank" class="${cardClass}">
            <div class="card-image">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="badge">${video.category}</span>
                <h2 class="card-title">${video.title}</h2>
                <p class="card-summary">${video.summary}</p>
                <div class="card-meta">
                    <img src="${video.avatar}" alt="${video.author}" class="author-avatar">
                    <div class="author-info">
                        <span class="author-name">${video.author}</span>
                    </div>
                    <span class="view-count">${video.views}</span>
                </div>
            </div>
        </a>
    `;
}

/**
 * Simule la curation automatisée mentionnée dans productdesign.md
 * En environnement réel, ceci appellerait un webhook n8n ou une API YouTube.
 */
function setupCurationAutomation() {
    console.log("Curation Automatisée active : Recherche des derniers contenus YouTube...");
    // Simulation d'une mise à jour dynamique
    const lastUpdate = localStorage.getItem('last_curation_update');
    const now = new Date().getTime();

    if (!lastUpdate || (now - lastUpdate > 3600000)) { // Update every hour
        localStorage.setItem('last_curation_update', now);
        console.log("Curation rafraîchie avec succès.");
    }
}
