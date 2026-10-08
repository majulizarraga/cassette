document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // SISTEMA DE SEGURIDAD / PIN (111025)
  // =========================================
  const SECRET_PIN = "111025";
  const errorMessages = [
    "nopi, intenta de nuevo",
    "intenta una vez más",
    "intenta de nuevo:(",
    "te olvidaste la fecha?",
    "oño:("
  ];
  let errorCount = 0;
  let isLockedOut = false;

  const lockOverlay = document.getElementById("lockOverlay");
  const pinInputs = document.querySelectorAll(".pin-digit");
  const pinFeedback = document.getElementById("pinFeedback");

  pinInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (isLockedOut) return;
      const val = e.target.value.replace(/\D/g, "");
      e.target.value = val;

      if (val && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }
      checkPinFull();
    });

    input.addEventListener("keydown", (e) => {
      if (isLockedOut) return;
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        pinInputs[index - 1].focus();
      }
    });
  });

  function checkPinFull() {
    let currentPin = "";
    pinInputs.forEach(inp => currentPin += inp.value);

    if (currentPin.length === 6) {
      if (currentPin === SECRET_PIN) {
        pinFeedback.textContent = "";
        lockOverlay.style.opacity = "0";
        lockOverlay.style.pointerEvents = "none";
        setTimeout(() => {
          lockOverlay.classList.add("hidden");
        }, 700);
      } else {
        handlePinError();
      }
    }
  }

  function handlePinError() {
    if (errorCount < errorMessages.length) {
      pinFeedback.textContent = errorMessages[errorCount];
      errorCount++;
      clearPinInputs();
    } else {
      isLockedOut = true;
      pinFeedback.textContent = "error:'(";
      pinInputs.forEach(inp => {
        inp.value = "";
        inp.disabled = true;
      });
    }
  }

  function clearPinInputs() {
    setTimeout(() => {
      pinInputs.forEach(inp => inp.value = "");
      pinInputs[0].focus();
    }, 300);
  }

  // =========================================
  // CASSETTE, AUDIO Y VOLTEO (LADO A / LADO B)
  // =========================================
  let currentIndex = 0;
  let isPlaying = false;
  let isFlipped = false;

  const audioPlayer = document.getElementById("audioPlayer");
  const cassetteCard = document.getElementById("cassetteCard");
  const cassetteBody = document.getElementById("cassetteBody");
  const cassetteLabel = document.getElementById("cassetteLabel");
  const cassetteBodyB = document.getElementById("cassetteBodyB");
  const cassetteLabelB = document.getElementById("cassetteLabelB");
  const swipeArea = document.getElementById("swipeArea");
  
  const noteText = document.getElementById("noteText");
  const songTitle = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const songTitleB = document.getElementById("songTitleB");
  const songLyrics = document.getElementById("songLyrics");
  const spotifyLink = document.getElementById("spotifyLink");
  const progressBar = document.getElementById("progressBar");
  const progressBarB = document.getElementById("progressBarB");
  const statusDot = document.getElementById("statusDot");
  const carouselDotsContainer = document.getElementById("carouselDots");

  // Botonera de reproducción
  const playerPrevBtn = document.getElementById("playerPrevBtn");
  const playerPlayBtn = document.getElementById("playerPlayBtn");
  const playerNextBtn = document.getElementById("playerNextBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");

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

  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = parseInt(urlParams.get("track"), 10);
  if (!isNaN(trackParam) && trackParam >= 1 && trackParam <= cassetteCollection.length) {
    currentIndex = trackParam - 1;
  }

  function loadTrack(index) {
    const track = cassetteCollection[index];
    if (!track) return;

    audioPlayer.pause();
    isPlaying = false;
    updatePlayUI(false);

    // Contenido
    noteText.textContent = track.note;
    songTitle.textContent = track.title;
    songTitleB.textContent = track.title;
    songArtist.textContent = track.artist;
    songLyrics.textContent = `"${track.lyrics}"`;
    spotifyLink.href = track.spotifyUrl;

    // Colores LADO A y LADO B
    cassetteBody.style.backgroundColor = track.colors.shell;
    cassetteLabel.style.backgroundColor = track.colors.label;
    cassetteBodyB.style.backgroundColor = track.colors.shell;
    cassetteLabelB.style.backgroundColor = track.colors.label;

    audioPlayer.src = track.audioUrl;
    progressBar.style.width = "0%";
    progressBarB.style.width = "0%";

    updateDots();
  }

  function updatePlayUI(playing) {
    if (playing) {
      cassetteCard.classList.add("spinning");
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
      statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse";
    } else {
      cassetteCard.classList.remove("spinning");
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
      statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-stone-400";
    }
  }

  function togglePlay() {
    if (!audioPlayer.src) return;

    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
      updatePlayUI(false);
    } else {
      audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayUI(true);
      }).catch(err => {
        console.warn("Autoplay prevenido o archivo no encontrado:", err);
      });
    }
  }

  playerPlayBtn.addEventListener("click", togglePlay);

  audioPlayer.addEventListener("timeupdate", () => {
    if (audioPlayer.duration) {
      const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${pct}%`;
      progressBarB.style.width = `${pct}%`;
    }
  });

  audioPlayer.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayUI(false);
    progressBar.style.width = "0%";
    progressBarB.style.width = "0%";
  });

  // =========================================
  // VOLTEAR EL CASSETTE AL DAR CLICK
  // =========================================
  function toggleFlip() {
    isFlipped = !isFlipped;
    if (isFlipped) {
      cassetteCard.classList.add("is-flipped");
    } else {
      cassetteCard.classList.remove("is-flipped");
    }
  }

  // =========================================
  // NAVEGACIÓN Y SWIPE SIN ANIMACIONES BRUSCAS
  // =========================================
  function nextTrack() {
    currentIndex = (currentIndex + 1) % cassetteCollection.length;
    loadTrack(currentIndex);
  }

  function prevTrack() {
    currentIndex = (currentIndex - 1 + cassetteCollection.length) % cassetteCollection.length;
    loadTrack(currentIndex);
  }

  playerNextBtn.addEventListener("click", nextTrack);
  playerPrevBtn.addEventListener("click", prevTrack);

  // Soporte Swipe táctil limpio + clic para voltear
  let touchStartX = 0;
  let touchEndX = 0;
  let touchMoved = false;

  swipeArea.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchEndX = touchStartX;
    touchMoved = false;
  }, { passive: true });

  swipeArea.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
    if (Math.abs(touchEndX - touchStartX) > 10) {
      touchMoved = true;
    }
  }, { passive: true });

  swipeArea.addEventListener("touchend", () => {
    const diff = touchEndX - touchStartX;

    // Si se deslizó con el dedo más de 45px, cambia de canción directamente sin animación
    if (touchMoved && Math.abs(diff) > 45) {
      if (diff < 0) {
        nextTrack();
      } else {
        prevTrack();
      }
    } else if (!touchMoved) {
      // Si fue solo un tap (sin deslizar), dar vuelta al cassette
      toggleFlip();
    }
  });

  // Clic en computadoras de escritorio para voltear
  swipeArea.addEventListener("click", () => {
    if (!('ontouchstart' in window)) {
      toggleFlip();
    }
  });

  // Inicializar
  initDots();
  loadTrack(currentIndex);
});
