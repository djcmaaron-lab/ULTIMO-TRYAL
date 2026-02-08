// ============================================
// GOOD CALL TRAVEL - OVERLAY APP v1.0
// (Clean — no API, no cards, no modes)
// ============================================

// ============================================
// STATE
// ============================================
let sequenceIndex = 0;
let flyerIndex = 0;
let mediaIndex = 0;
let companyInfoIndex = 0;
let boardCurrentPage = 0;
let boardPageTimer = null;
let rotationTimer = null;

// ============================================
// HELPERS
// ============================================
function getContainer() {
    return document.getElementById('displayContainer');
}

function clearContainer() {
    const c = getContainer();
    if (c) c.innerHTML = '';
}

function formatMoney(value) {
    return Number(value).toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ============================================
// RENDER: FLYER (destination with image)
// ============================================
function renderFlyer() {
    const dest = FLYER_DESTINATIONS[flyerIndex % FLYER_DESTINATIONS.length];
    flyerIndex++;

    const simbolo = dest.moneda === 'PEN' ? 'S/' : '$';
    const container = getContainer();

    container.innerHTML = `
        <div class="dynamic-content fade-in">
            <div class="destination-card">
                <img class="destination-image" src="${dest.image}" alt="${dest.nombre}" 
                     onerror="this.src='https://via.placeholder.com/1080x400/003D7A/FFC107?text=${dest.nombre}';">
                <div class="destination-info">
                    <div class="destination-name">${dest.emoji} ${dest.nombre}</div>
                    <div class="destination-price">DESDE ${simbolo}${formatMoney(dest.precio)}</div>
                    <div class="destination-note">Precio por persona • Solo Ida</div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// RENDER: MEDIA (promo/team images)
// ============================================
function renderMedia() {
    const images = [
        MEDIA_URLS.IMAGEN_1,
        MEDIA_URLS.IMAGEN_EQUIPO,
        MEDIA_URLS.IMAGEN_2
    ];

    const imageUrl = images[mediaIndex % images.length];
    mediaIndex++;

    const container = getContainer();
    container.innerHTML = `
        <div class="dynamic-content fade-in">
            <div class="team-image-container">
                <img src="${imageUrl}" alt="Good Call Travel" 
                     onerror="this.src='https://via.placeholder.com/1080x1920/003D7A/FFC107?text=GOOD+CALL';">
            </div>
        </div>
    `;
}

// ============================================
// RENDER: AIRPORT BOARD
// ============================================
function renderBoard() {
    const container = getContainer();
    boardCurrentPage = 0;

    container.innerHTML = `
        <div class="dynamic-content fade-in">
            <div class="airport-board">
                <div class="board-header">
                    <span class="board-title">✈️ VUELOS DISPONIBLES</span>
                </div>
                <div class="board-columns">
                    <span class="board-col-label dest">DESTINO</span>
                    <span class="board-col-label price">DESDE</span>
                </div>
                <div class="board-rows" id="boardRows"></div>
                <div class="board-page-indicator" id="boardPageIndicator">
                    <div class="board-dot active" data-page="0"></div>
                    <div class="board-dot" data-page="1"></div>
                </div>
                <div class="board-footer">
                    <span class="board-footer-text">PRECIOS POR PERSONA • SUJETOS A DISPONIBILIDAD</span>
                </div>
            </div>
        </div>
    `;

    // Show page 1
    renderBoardPage(0);

    // Switch to page 2 at halfway (15s)
    boardPageTimer = setTimeout(() => {
        switchBoardPage(1);
    }, BOARD_DURATION / 2);
}

function renderBoardPage(pageNum) {
    const rows = document.getElementById('boardRows');
    if (!rows) return;

    const data = pageNum === 0 ? BOARD_PAGE_1 : BOARD_PAGE_2;
    boardCurrentPage = pageNum;

    // Update dots
    document.querySelectorAll('.board-dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.page) === pageNum);
    });

    // Build rows HTML
    let html = '';
    data.forEach((item, i) => {
        const simbolo = item.moneda === 'PEN' ? 'S/' : '$';
        html += `
            <div class="board-row" style="animation-delay: ${i * 0.12}s;">
                <div class="board-row-dest">
                    <span class="board-emoji">${item.emoji}</span>
                    <span class="board-city">${item.ciudad}</span>
                    <span class="board-code">${item.codigo}</span>
                </div>
                <div class="board-row-price">
                    <span class="board-currency">${simbolo}</span>
                    <span class="board-amount">${formatMoney(item.precio)}</span>
                </div>
            </div>
        `;
    });

    rows.innerHTML = html;
    rows.classList.remove('fade-out');
    rows.classList.add('fade-in');
}

function switchBoardPage(pageNum) {
    const rows = document.getElementById('boardRows');
    if (!rows) return;

    // Fade out current
    rows.classList.remove('fade-in');
    rows.classList.add('fade-out');

    setTimeout(() => {
        renderBoardPage(pageNum);
    }, 400);
}

// ============================================
// COMPANY INFO AVISOS (independent rotation)
// ============================================
function renderAvisos() {
    const container = document.getElementById('avisosContainer');
    if (!container) return;

    const info = COMPANY_INFO[companyInfoIndex % COMPANY_INFO.length];
    const logoHtml = info.logoPng 
        ? `<img class="mincetur-logo" src="${info.logoPng}" alt="Logo" onerror="this.style.display='none'">` 
        : '';

    container.innerHTML = `
        <div class="aviso-ruc">
            <div style="display:flex;align-items:center;justify-content:center;gap:14px;">
                ${logoHtml}
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                    ${info.icon ? `<div style="font-size:36px;margin-bottom:4px;">${info.icon}</div>` : ''}
                    <div class="aviso-username">${info.title}</div>
                    <div class="aviso-text">${info.text}</div>
                </div>
            </div>
        </div>
    `;
}

function rotateCompanyInfo() {
    companyInfoIndex++;
    renderAvisos();
}

// ============================================
// MAIN ROTATION ENGINE
// ============================================
function getDuration(type) {
    switch (type) {
        case 'flyer': return FLYER_DURATION;
        case 'media': return MEDIA_DURATION;
        case 'board': return BOARD_DURATION;
        default: return FLYER_DURATION;
    }
}

function renderStep(step) {
    clearContainer();

    // Clear any pending board page timer
    if (boardPageTimer) {
        clearTimeout(boardPageTimer);
        boardPageTimer = null;
    }

    switch (step.type) {
        case 'flyer':
            renderFlyer();
            break;
        case 'media':
            renderMedia();
            break;
        case 'board':
            renderBoard();
            break;
    }
}

function rotateNext() {
    const step = ROTATION_SEQUENCE[sequenceIndex % ROTATION_SEQUENCE.length];
    const duration = getDuration(step.type);

    renderStep(step);
    sequenceIndex++;

    rotationTimer = setTimeout(rotateNext, duration);
}

// ============================================
// TYPEWRITER EFFECT (preserved from original)
// ============================================
function typewriterEffect() {
    const title = document.querySelector('.main-title');
    if (!title) return;

    title.classList.remove('typing', 'glow');
    void title.offsetWidth; // force reflow
    title.classList.add('typing');

    setTimeout(() => {
        title.classList.remove('typing');
        title.classList.add('glow');
        setTimeout(() => title.classList.remove('glow'), 3000);
    }, 4000);
}

// ============================================
// INIT
// ============================================
function init() {
    // Initial aviso
    renderAvisos();

    // Start main rotation
    rotateNext();

    // Company info rotation (independent)
    setInterval(rotateCompanyInfo, COMPANY_INFO_DURATION);

    // Typewriter effect on title
    setInterval(typewriterEffect, 60000);
    setTimeout(typewriterEffect, 500);

    console.log('✈️ Good Call Travel Overlay v1.0 — Running');
}

init();
