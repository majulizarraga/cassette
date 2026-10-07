document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let isPlaying = false;

  // Elementos DOM
  const audioPlayer = document.getElementById("audioPlayer");
  const cassetteBody = document.getElementById("cassetteBody");
  const cassetteLabel = document.getElementById("cassetteLabel");
  const swipeArea = document.getElementById("swipeArea");
  
  const noteText = document.getElementById("noteText");
  const songTitle = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const songLyrics = document.getElementById("songLyrics");
  const spotifyLink = document.getElementById("spotifyLink");
  const progressBar = document.getElementById("progressBar");
  const statusDot = document.getElementById("statusDot");
  const carouselDotsContainer = document.getElementById("carouselDots");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Crear los 12 puntos tipo Instagram
  function initDots() {
    carouselDotsContainer.innerHTML = "";
    cassetteCollection.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${idx === currentIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Pista ${idx + 1}`);
      dot.addEventListener("click", () => {
        if (idx !== currentIndex) {
          currentIndex = idx;
          loadTrack(currentIndex);
        }
      });
      carouselDotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = carouselDotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, idx) => {
      dot.className = `carousel-dot ${idx === currentIndex ? "active" : ""}`;
    });
  }

  // Leer parámetro ?track=X
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = parseInt(urlParams.get("track"), 10);
  if (!isNaN(trackParam) && trackParam >= 1 && trackParam <= cassetteCollection.length) {
    currentIndex = trackParam - 1;
  }

  // Cargar pista en la interfaz
  function loadTrack(index) {
    const track = cassetteCollection[index];
    if (!track) return;

    // Pausar si estaba reproduciendo
    audioPlayer.pause();
    isPlaying = false;
    cassetteBody.classList.remove("spinning");
    progressBar.style.width = "0%";
    statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-stone-400";

    // Contenido
    noteText.textContent = track.note;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    songLyrics.textContent = `"${track.lyrics}"`;
    spotifyLink.href = track.spotifyUrl;

    // Colores
    cassetteBody.style.backgroundColor = track.colors.shell;
    cassetteLabel.style.backgroundColor = track.colors.label;

    // Audio
    audioPlayer.src = track.audioUrl;

    updateDots();
  }

  // Reproducir / Pausar
  function togglePlay() {
    if (!audioPlayer.src) return;

    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
      cassetteBody.classList.remove("spinning");
      statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-stone-400";
    } else {
      audioPlayer.play().then(() => {
        isPlaying = true;
        cassetteBody.classList.add("spinning");
        statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse";
      }).catch(err => {
        console.warn("Autoplay prevenido o archivo no encontrado:", err);
      });
    }
  }

  // Barra de progreso
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
    statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-stone-400";
  });

  // Evento clic en cassette
  swipeArea.addEventListener("click", togglePlay);

  // Navegación
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

  // Animación de cambio
  function animateTransition(direction, callback) {
    const offset = direction === "left" ? "-30px" : "30px";
    swipeArea.style.transform = `translateX(${offset}) scale(0.96)`;
    swipeArea.style.opacity = "0.5";
    
    setTimeout(() => {
      callback();
      swipeArea.style.transform = `translateX(${direction === "left" ? "30px" : "-30px"}) scale(0.96)`;
      setTimeout(() => {
        swipeArea.style.transform = "translateX(0) scale(1)";
        swipeArea.style.opacity = "1";
      }, 40);
    }, 120);
  }

  // Soporte para gestos táctiles Swipe en móvil
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
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextTrack();
      } else {
        prevTrack();
      }
    }
  }

  // Inicialización
  initDots();
  loadTrack(currentIndex);
});
