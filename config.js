// ============================================
// GOOD CALL TRAVEL - OVERLAY CONFIG v1.0
// ============================================

// ============================================
// TIEMPOS DE ROTACIÓN
// ============================================
const FLYER_DURATION = 8000;        // Flyers de destinos (8s)
const MEDIA_DURATION = 8000;        // Fotos empresa/equipo (8s)
const BOARD_DURATION = 30000;       // Tablero aeropuerto (30s)
const COMPANY_INFO_DURATION = 10000; // Rotación avisos empresa (10s)

// ============================================
// IMÁGENES (IMGUR)
// ============================================
const MEDIA_URLS = {
    IMAGEN_1: 'https://i.imgur.com/fy043jb.png',
    IMAGEN_2: 'https://i.imgur.com/yEf5Qyx.png',
    IMAGEN_EQUIPO: 'https://i.imgur.com/iX2pwMo.png'
};

// ============================================
// INFORMACIÓN DE LA EMPRESA (avisos rotativos)
// ============================================
const COMPANY_INFO = [
    { 
        icon: '', 
        title: 'EMPRESA INSCRITA EN', 
        text: 'MINCETUR', 
        logoPng: 'https://i.imgur.com/lWf49TO.png' 
    },
    { 
        icon: '💎', 
        title: 'RUC EMPRESARIAL', 
        text: '20606424761' 
    },
    { 
        icon: '🚀', 
        title: '6 AÑOS DE', 
        text: 'EXPERIENCIA' 
    },
    { 
        icon: '📱', 
        title: 'COTIZA POR WHATSAPP', 
        text: '961 737 795' 
    }
];

// ============================================
// DESTINOS FLYERS (con imagen)
// ============================================
const FLYER_DESTINATIONS = [
    {
        origen: 'LIM',
        destino: 'CUZ',
        emoji: '🏔️',
        nombre: 'CUSCO',
        image: 'https://i.imgur.com/WY5Gzr6.png',
        precio: 450,
        moneda: 'PEN'
    },
    {
        origen: 'LIM',
        destino: 'AQP',
        emoji: '🌋',
        nombre: 'AREQUIPA',
        image: 'https://i.imgur.com/bJy2sdd.png',
        precio: 380,
        moneda: 'PEN'
    },
    {
        origen: 'LIM',
        destino: 'PIU',
        emoji: '🏖️',
        nombre: 'PIURA',
        image: 'https://i.imgur.com/lZQoxcJ.png',
        precio: 280,
        moneda: 'PEN'
    },
    {
        origen: 'LIM',
        destino: 'IQT',
        emoji: '🌴',
        nombre: 'IQUITOS',
        image: 'https://i.imgur.com/1TZ07B6.png',
        precio: 520,
        moneda: 'PEN'
    },
    {
        origen: 'LIM',
        destino: 'MIA',
        emoji: '🌴',
        nombre: 'MIAMI',
        image: 'https://i.imgur.com/Wkxahjw.png',
        precio: 1160,
        moneda: 'USD'
    },
    {
        origen: 'LIM',
        destino: 'MAD',
        emoji: '🇪🇸',
        nombre: 'MADRID',
        image: 'https://i.imgur.com/D2HFJaq.png',
        precio: 890,
        moneda: 'USD'
    }
];

// ============================================
// TABLERO AEROPUERTO - OFERTAS
// Página 1 y Página 2 (15s cada una = 30s total)
// ============================================
const BOARD_PAGE_1 = [
    { emoji: '🏔️', ciudad: 'CUSCO',     codigo: 'CUZ', precio: 450,  moneda: 'PEN' },
    { emoji: '🌋', ciudad: 'AREQUIPA',  codigo: 'AQP', precio: 380,  moneda: 'PEN' },
    { emoji: '🏖️', ciudad: 'PIURA',     codigo: 'PIU', precio: 280,  moneda: 'PEN' },
    { emoji: '🌴', ciudad: 'IQUITOS',   codigo: 'IQT', precio: 520,  moneda: 'PEN' },
    { emoji: '🌿', ciudad: 'TARAPOTO',  codigo: 'TPP', precio: 350,  moneda: 'PEN' },
    { emoji: '☀️', ciudad: 'TRUJILLO',  codigo: 'TRU', precio: 250,  moneda: 'PEN' },
];

const BOARD_PAGE_2 = [
    { emoji: '🌴', ciudad: 'MIAMI',     codigo: 'MIA', precio: 1160, moneda: 'USD' },
    { emoji: '🇪🇸', ciudad: 'MADRID',    codigo: 'MAD', precio: 890,  moneda: 'USD' },
    { emoji: '🏖️', ciudad: 'CANCÚN',    codigo: 'CUN', precio: 750,  moneda: 'USD' },
    { emoji: '🇨🇴', ciudad: 'BOGOTÁ',    codigo: 'BOG', precio: 480,  moneda: 'USD' },
    { emoji: '🗽', ciudad: 'NUEVA YORK', codigo: 'JFK', precio: 1350, moneda: 'USD' },
    { emoji: '🗼', ciudad: 'PARÍS',      codigo: 'CDG', precio: 980,  moneda: 'USD' },
];

// ============================================
// NOMBRES DE CIUDADES (referencia)
// ============================================
const CIUDADES_NOMBRES = {
    'LIM': 'Lima',    'CUZ': 'Cusco',    'AQP': 'Arequipa',
    'PIU': 'Piura',   'IQT': 'Iquitos',  'TRU': 'Trujillo',
    'CIX': 'Chiclayo','TPP': 'Tarapoto', 'JUL': 'Juliaca',
    'PEM': 'Pto Maldonado', 'TCQ': 'Tacna', 'TBP': 'Tumbes',
    'CJA': 'Cajamarca', 'AYP': 'Ayacucho', 'PCL': 'Pucallpa',
    'HUU': 'Huánuco', 'JAU': 'Huancayo', 'BOG': 'Bogotá',
    'MDE': 'Medellín', 'CLO': 'Cali',    'CTG': 'Cartagena',
    'UIO': 'Quito',   'GYE': 'Guayaquil','SCL': 'Santiago',
    'EZE': 'Buenos Aires', 'GRU': 'São Paulo', 'GIG': 'Río de Janeiro',
    'MIA': 'Miami',   'LAX': 'Los Ángeles', 'JFK': 'Nueva York',
    'MCO': 'Orlando', 'MAD': 'Madrid',   'BCN': 'Barcelona',
    'LHR': 'Londres', 'CDG': 'París',    'FCO': 'Roma',
    'MXP': 'Milán',   'CUN': 'Cancún',   'PUJ': 'Punta Cana'
};

// ============================================
// SECUENCIA DE ROTACIÓN
// Tipos: 'flyer', 'board', 'media'
// ============================================
const ROTATION_SEQUENCE = [
    { type: 'flyer' },
    { type: 'flyer' },
    { type: 'board' },
    { type: 'flyer' },
    { type: 'media' },
    { type: 'flyer' },
    { type: 'flyer' },
    { type: 'board' },
    { type: 'media' },
    { type: 'flyer' },
    { type: 'media' },
];
