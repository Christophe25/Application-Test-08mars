const https = require('https');

const videoId = 'im3qcqUU3Y0'; // known short

https.get(`https://www.youtube.com/watch?v=${videoId}`, (res) => {
    let data = '';
    res.on('data', c => {
        if (data.length < 1000000) data += c; // 1MB
    });
    res.on('end', () => {
        const idx = data.indexOf('approxDurationMs');
        console.log('Index:', idx, 'Total length:', data.length);
        const match = data.match(/approxDurationMs["\s:]+['"]?(\d+)['"]?/);
        console.log('Match:', match ? match[1] : 'none');

        // Let's also try to find the length dynamically
        const start = idx > -1 ? Math.max(0, idx - 50) : 0;
        if (idx > -1) {
            console.log('Snippet:', data.substring(start, idx + 100));
        }
    });
});
