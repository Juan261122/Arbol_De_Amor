//© Zero - Código libre no comercial


// Cargar el SVG y animar los corazones
fetch('treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    // Animación de "dibujo" para todos los paths
    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    // Forzar reflow y luego animar
    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      // Después de la animación de dibujo, mueve y agranda el SVG
      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');
        // Mostrar texto con efecto typing
        setTimeout(() => {
          showDedicationText();
          // Mostrar petalos flotando
          startFloatingObjects();
          // Mostrar cuenta regresiva
          showCountdown();
          // Iniciar música de fondo
          playBackgroundMusic();
        }, 1200); //Tiempo para agrandar el SVG
      }, totalDuration);
    }, 50);

    // Selecciona los corazones (formas rojas)
    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  });

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { //seguidores
  let text = getURLParam('text');
  if (!text) {
    text = `Para el amor de mi vida:\n\nDesde el primer momento supe que eras tú. Tu sonrisa, tu voz, tu forma de ser… todo en ti me hace sentir en casa.\n\nGracias por acompañarme en cada paso, por entenderme incluso en silencio, y por llenar mis días de amor.\n\nTe amo más de lo que las palabras pueden expresar.\n\nHoy, quiero dar un paso más y preguntarte: ¿Aceptarias ser mi novia? Si tu corazón dice que sí, este reloj comenzará a marcar el inicio de nuestra hermosa historia y el camino hacia una vida juntos.`;  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      // Al terminar el typing, mostrar la firma animada
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma manuscrita animada
function showSignature() {
  // Cambia para buscar la firma dentro del contenedor de dedicatoria
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con amor, Lazarito";
  signature.classList.add('visible');
}



// Controlador de objetos flotantes
function showCountdown() {
  const container = document.getElementById('countdown');
  
  // FECHAS DE INICIO
  const inicioRelacion = new Date('2025-03-30T00:00:00'); 
  const fechaAniversario = new Date('2026-03-30T00:00:00');
  const fechaJunio = new Date('2026-06-20T00:00:00');

  function update() {
    const now = new Date();

    // 1. Llevamos Juntos (Contador simple de días totales como al inicio)
    let diffInicio = now - inicioRelacion;
    let diasTotales = Math.floor(diffInicio / (1000 * 60 * 60 * 24));

    // 2. Una Vida Juntos (Detallado a partir del 30 de Marzo 2026)
    let vidaJuntosHTML = "";
    if (now >= fechaAniversario) {
      let diffAniv = now - fechaAniversario;
      let dias = Math.floor(diffAniv / (1000 * 60 * 60 * 24));
      let horas = Math.floor((diffAniv / (1000 * 60 * 60)) % 24);
      let mins = Math.floor((diffAniv / (1000 * 60)) % 60);
      let segs = Math.floor((diffAniv / 1000) % 60);
      // "1 año" porque ya se cumplió la fecha de aniversario
      vidaJuntosHTML = `Una Vida Juntos: <b>1 año, ${dias}d ${horas}h ${mins}m ${segs}s</b><br>`;
    } else {
      vidaJuntosHTML = `Una Vida Juntos: <b>0 años, 0d 0h 0m 0s</b><br>`;
    }

    // 3. Contador 20 de Junio (Detallado a partir de esa fecha)
    let junioHTML = "";
    if (now >= fechaJunio) {
      let diffJun = now - fechaJunio;
      let diasJ = Math.floor(diffJun / (1000 * 60 * 60 * 24));
      let horasJ = Math.floor((diffJun / (1000 * 60 * 60)) % 24);
      let minsJ = Math.floor((diffJun / (1000 * 60)) % 60);
      let segsJ = Math.floor((diffJun / 1000) % 60);
      junioHTML = `Desde el 20 de Junio: <b>0 años, ${diasJ}d ${horasJ}h ${minsJ}m ${segsJ}s</b>`;
    } else {
      // Mientras no llegue la fecha, se puede mostrar en 0 o una cuenta regresiva
      junioHTML = `Desde el 20 de Junio: <b>0 años, 0d 0h 0m 0s</b>`;
    }

    // Renderizado final conservando tu estilo
    container.innerHTML =
      `Llevamos Juntos: <b>${diasTotales}</b> días<br>` +
      vidaJuntosHTML +
      junioHTML;
    
    container.classList.add('visible');
  }

  update();
  setInterval(update, 1000);
}


// Cuenta regresiva o fecha especial
function showCountdown() {
  const container = document.getElementById('countdown');
  let startParam = getURLParam('start');
  let eventParam = getURLParam('event');
  let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2025-03-30T00:00:00'); 
  let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2026-03-30T00:00:00');

  function update() {
    const now = new Date();
    let diff = now - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let eventDiff = eventDate - now;
    let eventDays = Math.max(0, Math.floor(eventDiff / (1000 * 60 * 60 * 24)));
    let eventHours = Math.max(0, Math.floor((eventDiff / (1000 * 60 * 60)) % 24));
    let eventMinutes = Math.max(0, Math.floor((eventDiff / (1000 * 60)) % 60));
    let eventSeconds = Math.max(0, Math.floor((eventDiff / 1000) % 60));

    container.innerHTML =
      `Llevamos Juntos: <b>${days}</b> días<br>` +
      `Una Vida Juntos: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
    container.classList.add('visible');
  }
  update();
  setInterval(update, 1000);
}

// --- Música de fondo ---
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
  // Intentar reproducir inmediatamente
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    // Si falla el autoplay, esperar click en el botón
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}

// Intentar reproducir la música lo antes posible (al cargar la página)
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});
