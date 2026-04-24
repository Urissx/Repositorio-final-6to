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
