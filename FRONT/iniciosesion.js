function validarYRedirigir(event, elemento) {
    // 1. Buscamos el formulario
    const formulario = elemento.closest('form');

    // 2. Si el formulario no es válido, dejamos que el navegador actúe (muestra "complete este campo")
    if (!formulario.checkValidity()) {
        return; 
    }

    // 3. Si es válido, evitamos que la página se recargue sola
    event.preventDefault();

    // 4. Guardamos la sesión en el LocalStorage
    localStorage.setItem("sesionActiva", "true");
    console.log("Sesión guardada con éxito"); // Para revisar en consola

    // 5. Redirigimos al inicio
    const url = elemento.getAttribute("data-url");
    if (url) {
        window.location.replace(url); // 'replace' es mejor que 'href' aquí porque fuerza la actualización de la página
    } else {
        console.error("No se definió una URL de destino.");
    }
}