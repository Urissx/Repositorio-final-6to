let isMoving = false;

function moveCarousel(direction, trackId) {
    if (isMoving) return;
    isMoving = true;

    const track = document.getElementById(trackId);
    // Seleccionamos el primer hijo real para medirlo exactamente (sea juego o equipo)
    const firstItem = track.firstElementChild;
    
    // Calculamos el ancho exacto incluyendo el espacio entre elementos (gap/margin)
    const style = window.getComputedStyle(firstItem);
    const marginRight = parseFloat(style.marginRight) || 0;
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const itemFullWidth = firstItem.offsetWidth + marginRight + marginLeft; 

    if (direction === 1) {
        // Movimiento hacia adelante
        track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(-${itemFullWidth}px)`;

        setTimeout(() => {
            track.style.transition = "none";
            track.appendChild(track.firstElementChild); // Mueve al final
            track.style.transform = `translateX(0)`;
            isMoving = false;
        }, 400);
    } else {
        // Movimiento hacia atrás
        track.style.transition = "none";
        track.prepend(track.lastElementChild); // Mueve al principio antes de animar
        track.style.transform = `translateX(-${itemFullWidth}px)`;

        // Forzamos un "reflow" para que el navegador registre el cambio de posición instantáneo
        track.offsetHeight; 

        setTimeout(() => {
            track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            track.style.transform = `translateX(0)`;
            setTimeout(() => { isMoving = false; }, 400);
        }, 10);
    }
}

function irAlJuego(elemento) {
    const url = elemento.getAttribute("data-url");
    if (url) {
        window.location.href = url;
    } else {
        console.error("No se definió una URL");
    }
}