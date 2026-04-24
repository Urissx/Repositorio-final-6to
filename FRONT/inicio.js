const track = document.getElementById("track");
let isMoving = false; // Bloqueo para evitar bugs si clickean muy rápido

function moveCarousel(direction) {
    if (isMoving) return; // Si está animando, no hace nada
    isMoving = true;

    const gameWidth = document.querySelector(".game").offsetWidth + 10; // Ancho + margen

    if (direction === 1) {
        // --- HACIA LA DERECHA (Siguiente) ---
        track.style.transition = "transform 0.4s ease-in-out";
        track.style.transform = `translateX(-${gameWidth}px)`;

        // Cuando termina la animación, movemos el primer hijo al final
        setTimeout(() => {
            track.style.transition = "none"; // Quitamos animación para resetear
            track.appendChild(track.firstElementChild); // Mueve el 1ro al final
            track.style.transform = `translateX(0)`; // Resetea posición del track
            isMoving = false;
        }, 400);

    } else {
        // --- HACIA LA IZQUIERDA (Anterior) ---
        // 1. Antes de animar, movemos el último al principio (sin que se vea)
        track.style.transition = "none";
        track.prepend(track.lastElementChild);
        
        // 2. Lo movemos visualmente a la izquierda para que "aparezca" por la izquierda
        track.style.transform = `translateX(-${gameWidth}px)`;

        // 3. Animamos hacia la posición 0
        setTimeout(() => {
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(0)`;
            setTimeout(() => { isMoving = false; }, 400);
        }, 10);
    }
}
const searchInput = document.getElementById('gameSearch');
const allGames = document.querySelectorAll('.game');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase(); // Lo que el usuario escribe en minúsculas

    allGames.forEach(game => {
        const gameName = game.getAttribute('data-name').toLowerCase();
        
        if (gameName.includes(term)) {
            game.style.display = "block"; // Muestra si coincide
        } else {
            game.style.display = "none";  // Oculta si no coincide
        }
    });

    // Opcional: Si el usuario borra todo, reseteamos el carrusel a la posición 0
    if (term === "") {
        track.style.transform = `translateX(0)`;
    }
});

// 1. Datos de tus juegos (puedes añadir más aquí)
const juegos = [
    { nombre: "free fire", imagen: "OIP (6).webp" },
    { nombre: "Zelda Adventure", imagen: "OIP (5).webp" },
    { nombre: "FIFA 2026", imagen: "OIP (4).webp" },
    { nombre: "Minecraft", imagen: "OIP (3).webp" },
    { nombre: "Storm Fighter", imagen: "OIP (2).webp" },
    { nombre: "League of Legends", imagen: "OIP (1).webp" },
    { nombre: "Valorant", imagen: "OIP.webp" }
];

const searchInput = document.getElementById('gameSearch');
const suggestionsBox = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
    const texto = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = ""; // Limpiar resultados anteriores

    if (texto.length > 0) {
        // Filtrar juegos que coincidan
        const filtrados = juegos.filter(j => j.nombre.toLowerCase().includes(texto));

        if (filtrados.length > 0) {
            filtrados.forEach(juego => {
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.innerHTML = `
                    <img src="${juego.imagen}" alt="">
                    <span>${juego.nombre}</span>
                `;
                
                // Al hacer clic en una sugerencia
                div.onclick = () => {
                    searchInput.value = juego.nombre;
                    suggestionsBox.style.display = "none";
                    // Aquí podrías redirigir a la página del juego
                    console.log("Seleccionaste: " + juego.nombre);
                };

                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = "block";
        } else {
            suggestionsBox.style.display = "none";
        }
    } else {
        suggestionsBox.style.display = "none";
    }
});

// Cerrar el menú si haces clic fuera de la búsqueda
document.addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        suggestionsBox.style.display = "none";
    }
});