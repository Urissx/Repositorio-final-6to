let isMoving = false;

// Añadimos el parámetro 'trackId'
function moveCarousel(direction, trackId) {
    if (isMoving) return;
    isMoving = true;

    // Buscamos el track específico que se clickeó
    const track = document.getElementById(trackId);
    const gameWidth = track.querySelector(".game").offsetWidth + 10; 

    if (direction === 1) {
        track.style.transition = "transform 0.4s ease-in-out";
        track.style.transform = `translateX(-${gameWidth}px)`;

        setTimeout(() => {
            track.style.transition = "none";
            track.appendChild(track.firstElementChild);
            track.style.transform = `translateX(0)`;
            isMoving = false;
        }, 400);
    } else {
        track.style.transition = "none";
        track.prepend(track.lastElementChild);
        track.style.transform = `translateX(-${gameWidth}px)`;

        setTimeout(() => {
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(0)`;
            setTimeout(() => { isMoving = false; }, 400);
        }, 10);
    }
}
function irAlJuego(elemento) {
    // Obtenemos la URL del atributo data-url
    const url = elemento.getAttribute("data-url");
    
    if (url) {
        window.location.href = url; // Redirige a la página
    } else {
        console.error("No se definió una URL para este juego");
    }
}