// ========================================
// LIBRO DIGITAL CON 22 IMÁGENES
// ========================================

const titulos = [
    "Periódico",
    "Bordes",
    "Cambio de fondo",
    "Captcha",
    "Historia",
    "Encuesta",
    "Proyecto",
    "Registro de estudiantes",
    "Elimina imágenes",
    "Agrega imagen",
    "Vídeo",
    "Tarjetas en 3 d",
    "Práctica",
    "Menú de comida preferida",
    "Reproductor de música",
    "Tamaño de texto",
    "Traductor",
    "Juego",
    "Agrega info",
    "Carrusel de efecto",
    "Agrega 5 imágenes",
    "Infografía xp"
];

const contenedor = document.getElementById("hojas");
const cubierta = document.getElementById("cubierta");
const libro = document.getElementById("libro");

const TOTAL_HOJAS = 12;

let hojas = [];
let posicion = 0;

// ========================================
// CREAR EL ÍNDICE
// ========================================

function crearIndice() {
    let html = `
        <h2>ÍNDICE DE PRÁCTICAS</h2>
        <div class="indice">
    `;

    titulos.forEach((titulo, i) => {
        html += `
            <div class="indice-item">
                ${i + 1}. ${titulo}
            </div>
        `;
    });

    html += `</div>`;

    return html;
}

// ========================================
// CREAR UNA PÁGINA DE IMAGEN
// ========================================

function crearPagina(numero) {
    const titulo = titulos[numero - 1];

    return `
        <h2>${titulo}</h2>

        <div class="contenedor-imagen">
            <img
                src="img/img-${numero}.jpeg"
                alt="${titulo}"
                onerror="this.style.display='none'; this.parentElement.innerHTML='<p style=\\'color:#9b2452;text-align:center;font-size:13px\\'>No se encontró img-${numero}.jpeg. Revisa la carpeta img.</p>'"
            >
        </div>

        <div class="numero-pagina">
            Página ${numero}
        </div>
    `;
}

// ========================================
// CREAR LAS HOJAS DEL LIBRO
// ========================================

function crearLibro() {

    for (let i = 0; i < TOTAL_HOJAS; i++) {

        let frente = "";
        let reverso = "";

        if (i === 0) {
            frente = `
                <div class="final">
                    <h2>¡BIENVENIDO!</h2>
                    <p>Mi libro de prácticas digitales</p>
                    <p>✦ ✧ ✦</p>
                </div>
            `;

            reverso = crearIndice();
        } else {

            const numero1 = (i * 2) - 1;
            const numero2 = i * 2;

            frente = crearPagina(numero1);
            reverso = crearPagina(numero2);
        }

        const hoja = document.createElement("div");

        hoja.className = "hoja";

        hoja.innerHTML = `
            <div class="cara frente">
                ${frente}
            </div>

            <div class="cara reverso">
                ${reverso}
            </div>
        `;

        contenedor.appendChild(hoja);

        hojas.push(hoja);
    }

    actualizarHojas();
}

// ========================================
// ORDEN DE LAS HOJAS
// ========================================

function actualizarHojas() {

    hojas.forEach((hoja, i) => {

        if (i < posicion) {
            hoja.classList.add("volteada");
            hoja.style.zIndex = i + 1;
        } else {
            hoja.classList.remove("volteada");
            hoja.style.zIndex = TOTAL_HOJAS - i;
        }

    });

    if (posicion === TOTAL_HOJAS) {
        cubierta.style.display = "none";
    }
}

// ========================================
// ABRIR LA PORTADA
// ========================================

cubierta.addEventListener("click", function() {

    if (posicion === 0) {
        cubierta.classList.add("abierta");
        posicion = 1;

        setTimeout(() => {
            cubierta.style.zIndex = 0;
            actualizarHojas();
        }, 600);
    }

});

// ========================================
// PASAR Y REGRESAR PÁGINAS
// ========================================

libro.addEventListener("click", function(event) {

    if (event.target.closest("#cubierta")) {
        return;
    }

    if (cubierta.classList.contains("abierta") === false) {
        return;
    }

    const rect = libro.getBoundingClientRect();
    const mitad = rect.left + rect.width / 2;

    if (event.clientX > mitad) {
        avanzar();
    } else {
        regresar();
    }

});

// ========================================
// AVANZAR
// ========================================

function avanzar() {

    if (posicion < TOTAL_HOJAS) {

        hojas[posicion].classList.add("volteada");

        posicion++;

        actualizarHojas();

    } else {

        cerrarLibro();
    }
}

// ========================================
// REGRESAR
// ========================================

function regresar() {

    if (posicion > 0) {

        posicion--;

        hojas[posicion].classList.remove("volteada");

        actualizarHojas();

    } else {

        cubierta.style.display = "block";
        cubierta.style.zIndex = 100;
        cubierta.classList.remove("abierta");
    }
}

// ========================================
// CERRAR Y VOLVER A EMPEZAR
// ========================================

function cerrarLibro() {

    posicion = 0;

    hojas.forEach(hoja => {
        hoja.classList.remove("volteada");
    });

    cubierta.style.display = "block";
    cubierta.style.zIndex = 100;
    cubierta.classList.remove("abierta");

    actualizarHojas();
}

// ========================================
// INICIAR LIBRO
// ========================================

crearLibro();