const { ipcRenderer } = require('electron');

const webview = document.getElementById('navegador'); // El navegador web
const menu = document.getElementById('menu'); // El menú principal

const btnHome = document.getElementById('btnHome'); // Botón Home
const btnAtras = document.getElementById('btnAtras'); // Botón atrás
const btnAdelante = document.getElementById('btnAdelante'); // Botón adelante
const btnRecargar = document.getElementById('btnRecargar'); // Botón recargar

const minButton = document.getElementById('min-button'); // Minimizar ventana
const maxButton = document.getElementById('max-button'); // Maximizar ventana
const closeButton = document.getElementById('close-button'); // Cerrar ventana

const btnScoreSaber = document.getElementById('btnScoreSaber');
const btnScoreSaberReloaded = document.getElementById('btnScoreSaberReloaded');
const btnBeatLeader = document.getElementById('btnBeatLeader');

/**
 * Ajustar altura del <webview> y menú*/
 /** SIDAAAAAAAAAA */
function ajustarResolucion() {
  const alturaVentana = window.innerHeight; // Altura de la ventana
  const alturaBarra = document.getElementById('barra-superior').offsetHeight; // Altura de la barra

  // Calcular espacio restante para webview o el menú
  const alturaDisponible = alturaVentana - alturaBarra;

  // Aplicar la altura calculada al webview y al menú
  if (webview) {
    webview.style.height = `${alturaDisponible}px`;
    webview.style.width = '100%'; // Ancho completo
  }
  // Que conste que toda esa gilipollez es porque puse "block" en lugar de "flex" en el webview y me armé tremendo
  // cacao mental solamente para ver que era esa santa puta mierda
  if (menu) {
    menu.style.height = `${alturaDisponible}px`;
  }

  console.log('Resolución ajustada:', { alturaVentana, alturaBarra, alturaDisponible });
}

/* Llama a la función al cargar */
window.onload = () => {
  ajustarResolucion();
};

/* Llama a la función al cambiar el tamaño de la ventana */
window.onresize = () => {
  ajustarResolucion();
};

/* Control de Navegación */
btnHome.addEventListener('click', () => {
  menu.style.display = 'flex';
  webview.style.display = 'none'; // Ocultar el navegador (no me apetece que salga pa poner un url, gracias)
  webview.src = '';
});

btnAtras.addEventListener('click', () => {
  if (webview && webview.canGoBack()) {
    webview.goBack(); // Página anterior
  }
});

btnAdelante.addEventListener('click', () => {
  if (webview && webview.canGoForward()) {
    webview.goForward(); // Página siguiente
  }
});

btnRecargar.addEventListener('click', () => {
  if (webview) webview.reload(); // Recargar página
});

/* Botones del menú */
btnScoreSaber.addEventListener('click', () => {
  abrirEnWebview('https://scoresaber.com/');
});
btnScoreSaberReloaded.addEventListener('click', () => {
  abrirEnWebview('https://ssr.fascinated.cc/');
});
btnBeatLeader.addEventListener('click', () => {
  abrirEnWebview('https://beatleader.xyz/');
});

function abrirEnWebview(url) {
  menu.style.display = 'none';
  webview.style.display = 'flex'; // <---- ESTO ME HA DADO 7 DOLORES DE CABEZA
  webview.src = url;
}

/* Control de los botones de la ventana */
minButton.addEventListener('click', () => {
  ipcRenderer.send('ventana-minimizar'); // Minimizar ventana
});

maxButton.addEventListener('click', () => {
  ipcRenderer.send('ventana-maximizar'); // Maximizar ventana
});

closeButton.addEventListener('click', () => {
  ipcRenderer.send('ventana-cerrar'); // Cerrar ventana
});

/* Efecto 3D en los botones del menú */
const botonesMenu = document.querySelectorAll('.menu-button');
botonesMenu.forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    button.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  });
});