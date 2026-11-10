function mostrarMensaje(texto, clase) {
    const mensaje = document.querySelector("#mensaje")
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${clase}`
    mensaje.style.display = "block"
    setTimeout(() => {
        mensaje.style.display = "none"
    }, 3000);
}