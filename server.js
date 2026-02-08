const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

// Último comando recibido del controlador
let lastCommand = { id: 0, target: '', action: '', value: null };

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // ========== COMMAND ENDPOINT ==========
    if (req.url === '/command') {
        if (req.method === 'POST') {
            // Recibir comando del controlador
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                try {
                    const cmd = JSON.parse(body);
                    lastCommand = {
                        id: Date.now(),
                        target: cmd.target,
                        action: cmd.action,
                        value: cmd.value || null
                    };
                    console.log(`[CMD] ${cmd.target} -> ${cmd.action}${cmd.value ? ' (' + cmd.value + ')' : ''}`);
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
            // El overlay pide el último comando
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(lastCommand));
            return;
        }
    }

    // ========== STATIC FILES ==========
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Quitar query strings
    filePath = filePath.split('?')[0];
    
    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.log(`[404] ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`=== Good Call Travel Server ===`);
    console.log(`Running on port ${PORT}`);
    console.log(`Overlay:      http://localhost:${PORT}/index.html`);
    console.log(`Controlador:  http://localhost:${PORT}/controlador.html`);
    console.log(`Comandos:     http://localhost:${PORT}/command`);
});
