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
  // CASSETTE & AUDIO
  // =========================================
  let currentIndex = 0;
  let isPlaying = false;

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

  function initDots() {
    carouselDotsContainer.innerHTML = "";
    cassetteCollection.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${idx === currentIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Pista ${idx + 1}`);
      dot.addEventListener("click", () => {
        if (idx !== currentIndex) {
          const dir = idx > currentIndex ? "left" : "right";
          currentIndex = idx;
          appleTransition(dir, () => loadTrack(currentIndex));
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
    cassetteBody.classList.remove("spinning");
    progressBar.style.width = "0%";
    statusDot.className = "absolute w-1.5 h-1.5 rounded-full bg-stone-400";

    noteText.textContent = track.note;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    songLyrics.textContent = `"${track.lyrics}"`;
    spotifyLink.href = track.spotifyUrl;

    cassetteBody.style.backgroundColor = track.colors.shell;
    cassetteLabel.style.backgroundColor = track.colors.label;

    audioPlayer.src = track.audioUrl;

    updateDots();
  }

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

  function appleTransition(direction, callback) {
    swipeArea.classList.add("apple-spring");
    const exitX = direction === "left" ? -120 : 120;
    const rotate = direction === "left" ? -5 : 5;
    
    swipeArea.style.transform = `translateX(${exitX}px) rotate(${rotate}deg) scale(0.92)`;
    swipeArea.style.opacity = "0";

    setTimeout(() => {
      callback();
      swipeArea.classList.remove("apple-spring");
      const enterX = direction === "left" ? 100 : -100;
      swipeArea.style.transform = `translateX(${enterX}px) rotate(${-rotate}deg) scale(0.94)`;
      swipeArea.style.opacity = "0";

      requestAnimationFrame(() => {
        swipeArea.classList.add("apple-spring");
        swipeArea.style.transform = "translateX(0) rotate(0deg) scale(1)";
        swipeArea.style.opacity = "1";
      });
    }, 180);
  }

  function nextTrack() {
    currentIndex = (currentIndex + 1) % cassetteCollection.length;
    appleTransition("left", () => loadTrack(currentIndex));
  }

  function prevTrack() {
    currentIndex = (currentIndex - 1 + cassetteCollection.length) % cassetteCollection.length;
    appleTransition("right", () => loadTrack(currentIndex));
  }

  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  // Gesto táctil Swipe
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  swipeArea.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    swipeArea.classList.remove("apple-spring");
  }, { passive: true });

  swipeArea.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    const rotate = deltaX * 0.04;
    swipeArea.style.transform = `translateX(${deltaX * 0.75}px) rotate(${rotate}deg) scale(${1 - Math.abs(deltaX) * 0.0004})`;
  }, { passive: true });

  swipeArea.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) < 8) {
      swipeArea.classList.add("apple-spring");
      swipeArea.style.transform = "translateX(0) rotate(0deg) scale(1)";
      togglePlay();
      return;
    }

    if (deltaX < -50) {
      nextTrack();
    } else if (deltaX > 50) {
      prevTrack();
    } else {
      swipeArea.classList.add("apple-spring");
      swipeArea.style.transform = "translateX(0) rotate(0deg) scale(1)";
    }
  });

  swipeArea.addEventListener("click", () => {
    if (!('ontouchstart' in window)) {
      togglePlay();
    }
  });

  initDots();
  loadTrack(currentIndex);
});
