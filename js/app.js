document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let isPlaying = false;

  // Elementos DOM
  const audioPlayer = document.getElementById("audioPlayer");
  const cassetteBody = document.getElementById("cassetteBody");
  const cassetteLabel = document.getElementById("cassetteLabel");
  const swipeArea = document.getElementById("swipeArea");
  
  const trackBadge = document.getElementById("trackBadge");
  const noteText = document.getElementById("noteText");
  const noteSign = document.getElementById("noteSign");
  const songTitle = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const songLyrics = document.getElementById("songLyrics");
  const spotifyLink = document.getElementById("spotifyLink");
  const progressBar = document.getElementById("progressBar");
  const statusDot = document.getElementById("statusDot");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Leer parámetro ?track=X de la URL (para cada NFC)
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = parseInt(urlParams.get("track"), 10);
  if (!isNaN(trackParam) && trackParam >= 1 && trackParam <= cassetteCollection.length) {
    currentIndex = trackParam - 1;
  }

  // Cargar pista en la interfaz
  function loadTrack(index) {
    const track = cassetteCollection[index];
    if (!track) return;

    // Pausar si estaba sonando
    audioPlayer.pause();
    isPlaying = false;
    cassetteBody.classList.remove("spinning");
    progressBar.style.width = "0%";
    statusDot.className = "absolute w-2 h-2 rounded-full bg-stone-400";

    // Contenido
    trackBadge.textContent = `CINTA #${track.id}`;
    noteText.textContent = track.note;
    noteSign.textContent = track.signature;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    songLyrics.textContent = `"${track.lyrics}"`;
    spotifyLink.href = track.spotifyUrl;

    // Colores pasteles armónicos
    cassetteBody.style.backgroundColor = track.colors.shell;
    cassetteLabel.style.backgroundColor = track.colors.label;

    // Asignar archivo de audio
    audioPlayer.src = track.audioUrl;
  }

  // Reproducir / Pausar
  function togglePlay() {
    if (!audioPlayer.src) return;

    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
      cassetteBody.classList.remove("spinning");
      statusDot.className = "absolute w-2 h-2 rounded-full bg-stone-400";
    } else {
      audioPlayer.play().then(() => {
        isPlaying = true;
        cassetteBody.classList.add("spinning");
        statusDot.className = "absolute w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
      }).catch(err => {
        console.warn("Autoplay prevenido o archivo no encontrado:", err);
      });
    }
  }

  // Actualizar barra de progreso
  audioPlayer.addEventListener("timeupdate", () => {
    if (audioPlayer.duration) {
      const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${pct}%`;
    }
  });

  audioPlayer.addEventListener("ended", () => {
    isPlaying = false;
    cassetteBody.classList.remove("spinning");
    progressBar.style.width = "0%";
    statusDot.className = "absolute w-2 h-2 rounded-full bg-stone-400";
  });

  // Tocar cassette para reproducir
  swipeArea.addEventListener("click", togglePlay);

  // Navegación siguiente / anterior
  function nextTrack() {
    currentIndex = (currentIndex + 1) % cassetteCollection.length;
    animateTransition("left", () => loadTrack(currentIndex));
  }

  function prevTrack() {
    currentIndex = (currentIndex - 1 + cassetteCollection.length) % cassetteCollection.length;
    animateTransition("right", () => loadTrack(currentIndex));
  }

  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  // Animación de deslizamiento
  function animateTransition(direction, callback) {
    const offset = direction === "left" ? "-40px" : "40px";
    swipeArea.style.transform = `translateX(${offset}) scale(0.95)`;
    swipeArea.style.opacity = "0.4";
    
    setTimeout(() => {
      callback();
      swipeArea.style.transform = `translateX(${direction === "left" ? "40px" : "-40px"}) scale(0.95)`;
      setTimeout(() => {
        swipeArea.style.transform = "translateX(0) scale(1)";
        swipeArea.style.opacity = "1";
      }, 50);
    }, 150);
  }

  // Soporte para gestos táctiles (Swipe en móvil)
  let touchStartX = 0;
  let touchEndX = 0;

  swipeArea.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  swipeArea.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, { passive: true });

  function handleGesture() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) { // umbral de deslizamiento
      if (diff < 0) {
        nextTrack(); // Swipe hacia la izquierda
      } else {
        prevTrack(); // Swipe hacia la derecha
      }
    }
  }

  // Carga inicial
  loadTrack(currentIndex);
});
