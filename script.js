// © Zero - Código libre no comercial

// 1. Cargar el SVG y animar los corazones
fetch('treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

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

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');
        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown(); // <-- Aquí inicia tu nuevo contador
          playBackgroundMusic();
        }, 1200);
      }, totalDuration);
    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  });

// 2. Efecto de texto (Tus funciones originales)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = `Para el amor de mi vida:\n\nDesde el primer momento supe que eras tú. Tu sonrisa, tu voz, tu forma de ser… todo en ti me hace sentir en casa.\n\nGracias por acompañarme en cada paso, por entenderme incluso en silencio, y por llenar mis días de amor.\n\nTe amo más de lo que las palabras pueden expresar.\n\nHoy, quiero dar un paso más y preguntarte: ¿Aceptarias ser mi novia? Si tu corazón dice que sí, este reloj comenzará a marcar el inicio de nuestra hermosa historia y el camino hacia una vida juntos.`;
  } else {
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
      setTimeout(showSignature, 600);
    }
  }
  type();
}

function showSignature() {
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

// 3. Pétalos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);
    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, duration + 2000);
    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

// --- 4. FUNCIÓN DE CONTADOR (LA QUE PEDISTE) ---
function showCountdown() {
  const container = document.getElementById('countdown');
  if (!container) return;

  // FECHAS (30 de Marzo y 20 de Junio de 2025)
  const fechaRelacion = new Date('2025-03-30T00:00:00'); 
  const fechaNoviazgoFormal = new Date('2025-06-20T00:00:00'); 

  function update() {
    const now = new Date();

    // 1. Llevamos Juntos (Días totales)
    let diffTotal = now - fechaRelacion;
    let diasTotales = Math.floor(diffTotal / (1000 * 60 * 60 * 24));

    // 2. Una Vida Juntos (Detalle desde el 30 de marzo)
    let diffA = now - fechaRelacion;
    let aniosA = Math.floor(diffA / (1000 * 60 * 60 * 24 * 365.25));
    let diasA = Math.floor((diffA / (1000 * 60 * 60 * 24)) % 365.25);
    let horasA = Math.floor((diffA / (1000 * 60 * 60)) % 24);
    let minsA = Math.floor((diffA / (1000 * 60)) % 60);
    let segsA = Math.floor((diffA / 1000) % 60);

    // 3. LA FRASE QUE ELEGISTE (20 de Junio)
    let diffJ = now - fechaNoviazgoFormal;
    let aniosJ = Math.floor(diffJ / (1000 * 60 * 60 * 24 * 365.25));
    let diasJ = Math.floor((diffJ / (1000 * 60 * 60 * 24)) % 365.25);
    let horasJ = Math.floor((diffJ / (1000 * 60 * 60)) % 24);
    let minsJ = Math.floor((diffJ / (1000 * 60)) % 60);
    let segsJ = Math.floor((diffJ / 1000) % 60);

    // RENDERIZADO CON TU FRASE ESPECIAL
    container.innerHTML =
      `Llevamos Juntos: <b>${diasTotales}</b> días<br>` +
      `Una Vida Juntos: <b>${aniosA} años ${diasA} días ${horasA}h ${minsA}m ${segsA}s</b><br>` +
      `Desde que nuestras almas decidieron caminar de la mano formalmente: <b>${aniosJ} años ${diasJ} días ${horasJ}h ${minsJ}m ${segsJ}s</b>`;
    
    container.classList.add('visible');
  }

  update();
  setInterval(update, 1000);
}

// 5. Música
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
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
  audio.play().catch(() => { btn.textContent = '▶️ Música'; });
  btn.onclick = () => {
    if (audio.paused) { audio.play(); btn.textContent = '🔊 Música'; }
    else { audio.pause(); btn.textContent = '🔈 Música'; }
  };
}
