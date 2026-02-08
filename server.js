const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

// Último comando del controlador
let lastCommand = { id: 0, target: '', action: '', value: null };

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    // COMMAND ENDPOINT
    if (req.url === '/command') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', c => body += c);
            req.on('end', () => {
                try {
                    const cmd = JSON.parse(body);
                    lastCommand = { id: Date.now(), target: cmd.target, action: cmd.action, value: cmd.value || null };
                    console.log(`[CMD] ${cmd.target} -> ${cmd.action}${cmd.value != null ? ' (' + cmd.value + ')' : ''}`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true, id: lastCommand.id }));
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
            return;
        }
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(lastCommand));
            return;
        }
    }

    // STATIC FILES
    let filePath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(fullPath).toLowerCase();

    fs.readFile(fullPath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not Found'); return; }
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`=== Good Call Travel Server v4.0 ===`);
    console.log(`Port: ${PORT}`);
    console.log(`Overlay:     /index.html`);
    console.log(`Controller:  /controlador.html`);
});
