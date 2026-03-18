const fs = require('fs');
const https = require('https');

const SOURCES = [
    { handle: '@EtienneTillierStudio', name: 'Etienne Tillier', id: 'UCUlm3shqkgVNHLomYWZsfYA', theme: 'Vibe Coding & Dev IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@Simon_bcome', name: 'Simon Music', id: 'UCaryUIRfj7KAikH_ogrOzig', theme: 'Business & Monétisation IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@HenriExplorIA', name: 'Henri · ExplorIA', id: 'UCxx03UqvjTy9w8iomLwTSuQ', theme: 'Outils & Modèles IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@elliottpierret', name: 'Elliott Pierret', id: 'UCnJAGhDDEPdvY2g4ipf9PMQ', theme: 'Vibe Coding & Dev IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@RenaudDekode', name: 'Renaud Dékode', id: 'UCOWu-2h4IpoEjhsRlTuesFg', theme: 'Actualités Tech', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@ousmanedf', name: 'Ousmane Automatise', id: 'UC1o5Eo5Qf12_f6D836PsoPw', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@yassine-sdiri', name: 'Yassine Sdiri', id: 'UC94UeaPuTt_L51RkDxj9d_w', theme: 'Business & Monétisation IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@cedric_effi10', name: 'Cédric Girard', id: 'UCjhLy8XRh4Q0NM2CD6pFPYQ', theme: 'Outils & Modèles IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@EliottMeunier', name: 'Eliott Meunier', id: 'UCPo1nFSGNkyzrA9yvtkEvIw', theme: 'Productivité & Second Cerveau', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@reverdybusiness', name: 'Lucas Reverdy', id: 'UCabbBG5KYGtdTibrl_XHLOw', theme: 'Business & Monétisation IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@JulienSnsn', name: 'Julien Sanson', id: 'UCK85rF_WKv1N6ojTzVbj3yw', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@NerdyKings', name: 'Nerdy Kings', id: 'UCp7vimq7dYKiVAJLPyI0GcA', theme: 'Outils & Modèles IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@iAlan_automatise', name: 'iAlan', id: 'UCdROsT8FZ2pacpipymmmaPw', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@LouisGraffeuil', name: 'Louis Graffeuil', id: 'UChkCdoCUCNYizE8d9TXsi4A', theme: 'Vibe Coding & Dev IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@Hugo_Buisson', name: 'Hugo Buisson', id: 'UCeZvp_y5meYlfcGCFhl6UJQ', theme: 'Outils & Modèles IA', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@audelalia', name: 'Au-delà l\'IA', id: 'UCNSPV84q4QlUtle6MS_7v1Q', theme: 'Productivité & Second Cerveau', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@thomasbssh', name: 'Thomas Berton', id: 'UCxOWUTmenPJj5V6_g2-CS1g', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@JonasEkanbo', name: 'Jonas Ekanbo', id: 'UCF2fb5WylqKbw0SgOlJKXMA', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@LudovicSalenne', name: 'Ludo Salenne', id: 'UCnnYqSNKKygemgmxC9PyLTw', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@AurelienAutomatisation', name: 'Aurélien Fagioli', id: 'UCdL89Z0gQUDc1HT1882AGLw', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@BaptIA', name: 'Baptiste Simard - IA', id: 'UCzabGLybo9x307MkDtqTyFQ', theme: 'Agents & Automatisation', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' },
    { handle: '@LudovicNedelec', name: 'Ludovic Nédélec', id: 'UCMJ00y5KeFDKzYh9D6Lc41A', theme: 'Productivité & Second Cerveau', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nL7W9X9Tj9s_c_fG_pQ_m_M_M0=s176-c-k-c0x00ffffff-no-rj' }
];

const THEMES = [
    "Tous",
    "Agents & Automatisation",
    "Vibe Coding & Dev IA",
    "Outils & Modèles IA",
    "Business & Monétisation IA",
    "Productivité & Second Cerveau",
    "Actualités Tech"
];

const fetchOnce = (source, url, redirectDepth = 0) => new Promise((resolve, reject) => {
    if (redirectDepth > 5) {
        reject(new Error('Too many redirects'));
        return;
    }
    const targetUrl = url || `https://www.youtube.com/feeds/videos.xml?channel_id=${source.id}`;
    const parsed = new URL(targetUrl);
    const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/xml, text/xml, */*'
        },
        timeout: 15000
    };
    const req = https.get(options, (res) => {
        // Follow redirects (301, 302, 303, 307, 308)
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            resolve(fetchOnce(source, res.headers.location, redirectDepth + 1));
            return;
        }
        if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
        }
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout after 15s'));
    });
});

const fetchWithRetry = async (source, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetchOnce(source);
        } catch (e) {
            console.error(`⚠️ Tentative ${i + 1}/${retries} échouée pour ${source.handle}: ${e.message}`);
            if (i === retries - 1) throw e;
            await new Promise(r => setTimeout(r, 2000 * (i + 1)));
        }
    }
};

const fetchDuration = (videoId) => {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.youtube.com',
            path: `/watch?v=${videoId}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 10000
        };
        const req = https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                if (data.length < 1000000) data += chunk; // 1MB is enough for durations
            });
            res.on('end', () => {
                try {
                    const match = data.match(/"approxDurationMs":"(\d+)"/);
                    if (match) {
                        const seconds = parseInt(match[1]) / 1000;
                        resolve(seconds);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
        req.on('timeout', () => {
            req.destroy();
            resolve(null);
        });
    });
};

const decodeHtmlEntities = (str) => str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

const parseFeed = (xml, source) => {
    const videos = [];
    const entries = xml.split('<entry>');
    entries.shift(); // Remove header

    for (const entry of entries) {
        try {
            const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
            if (!videoIdMatch) continue;
            const videoId = videoIdMatch[1];

            const titleMatch = entry.match(/<title>(.*?)<\/title>/);
            const rawTitle = titleMatch ? titleMatch[1].replace('<![CDATA[', '').replace(']]>', '') : 'Sans titre';
            const title = decodeHtmlEntities(rawTitle);
            
            const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
            const published = publishedMatch ? publishedMatch[1] : new Date().toISOString();
            
            const author = source.name;
            const summary = `Nouveauté de ${author} : ${title.substring(0, 100)}...`;

            videos.push({
                id: videoId,
                videoId: videoId,
                title: title,
                author: author,
                source: source.handle,
                date: published.split('T')[0],
                url: `https://www.youtube.com/watch?v=${videoId}`,
                category: source.theme,
                summary: summary
            });
        } catch (e) {
            console.error(`Error parsing entry for ${source.handle}:`, e.message);
        }
    }
    return videos;
};

async function main() {
    console.log("🚀 Démarrage de l'actualisation des vidéos (Optimisé)...");
    let allFetchedVideos = [];

    // 1. Fetch feeds
    for (const source of SOURCES) {
        try {
            const xml = await fetchWithRetry(source);
            const videos = parseFeed(xml, source);
            console.log(`✅ ${videos.length} vidéos trouvées pour ${source.handle}.`);
            allFetchedVideos = allFetchedVideos.concat(videos);
        } catch (e) {
            console.error(`❌ Échec définitif pour ${source.handle}:`, e.message);
        }
    }

    // 2. Filter 2 months
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    let filteredVideos = allFetchedVideos
        .filter(v => new Date(v.date) >= twoMonthsAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`📊 Filtrage effectué. Traitement des durées pour ${filteredVideos.length} vidéos...`);

    // 3. Detect Durations (Scraping)
    // Small batches to stay safe
    const BATCH_SIZE = 8;
    for (let i = 0; i < filteredVideos.length; i += BATCH_SIZE) {
        const batch = filteredVideos.slice(i, i + BATCH_SIZE);
        console.log(`⏱️ Analyse durée batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(filteredVideos.length / BATCH_SIZE)}...`);

        await Promise.all(batch.map(async (video) => {
            // Détection via scraping de durée
            const durationSec = await fetchDuration(video.videoId);
            if (durationSec !== null && durationSec < 270) {
                video.category = "Vidéos Promotionnelles";
                video.isShort = true;
                video.duration = Math.round(durationSec);
            // Fallback : détection via hashtag #shorts dans le titre
            } else if (/\#shorts?\b/i.test(video.title)) {
                video.category = "Vidéos Promotionnelles";
                video.isShort = true;
            }
        }));

        await new Promise(r => setTimeout(r, 200));
    }

    if (allFetchedVideos.length === 0) {
        console.error("❌ Erreur : Aucune vidéo n'a pu être récupérée. Annulation de la mise à jour pour éviter d'écraser les données.");
        process.exit(1);
    }

    if (filteredVideos.length === 0) {
        console.error("❌ Erreur : Aucune vidéo dans la fenêtre des 2 derniers mois. Annulation pour éviter d'écraser les données.");
        process.exit(1);
    }

    const promoCount = filteredVideos.filter(v => v.isShort).length;
    console.log(`📊 Résumé : ${filteredVideos.length} vidéos au total, dont ${promoCount} formats courts.`);
    console.log(`💾 src/data.js mise à jour...`);

    const dataContent = `// Fichier généré automatiquement le ${new Date().toISOString()}
// Ne pas modifier manuellement

export const lastUpdate = "${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}";

export const sources = ${JSON.stringify(SOURCES, null, 4)};

export const themes = ${JSON.stringify(THEMES, null, 4)};

export const allVideos = ${JSON.stringify(filteredVideos, null, 4)};
`;

    fs.writeFileSync('src/data.js', dataContent);
    console.log("✅ Terminé !");
}

main();
