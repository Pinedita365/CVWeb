/* ==========================================================================
   CONFIGURACIÓN — EDITA AQUÍ TUS ENLACES
   Cambia estas dos variables por las URLs reales de tus redes sociales.
========================================================================== */
const LINKEDIN_URL = "https://www.linkedin.com/in/javi-pineda-28860b436"; // ej: https://www.linkedin.com/in/tu-usuario
const INSTAGRAM_URL = "https://www.instagram.com/j_pinedaa06/"; // ej: https://www.instagram.com/tu-usuario
const GITHUB_URL = "https://github.com/Pinedita365"; // ej: https://github.com/tu-usuario

document.addEventListener("DOMContentLoaded", () => {
  wireSocialLinks();
  setFooterYear();
  setupHeaderShrink();
  setupMobileNav();
  setupSmoothScrollClose();
  setupScrollReveal();
  setupSkillBars();
  setupCarousel();
  setupLightbox();
});

/* Inserta las URLs de redes sociales en los enlaces correspondientes */
function wireSocialLinks() {
  const links = [
    document.getElementById("linkedinLink"),
    document.getElementById("footerLinkedin"),
  ];
  const instaLinks = [
    document.getElementById("instagramLink"),
    document.getElementById("footerInstagram"),
  ];
  const githubLinks = [
    document.getElementById("githubLink"),
    document.getElementById("footerGithub"),
  ];

  links.forEach((el) => el && (el.href = LINKEDIN_URL));
  instaLinks.forEach((el) => el && (el.href = INSTAGRAM_URL));
  githubLinks.forEach((el) => el && (el.href = GITHUB_URL));
}

function setFooterYear() {
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* Header: reduce tamaño y añade sombra/fondo al hacer scroll */
function setupHeaderShrink() {
  const header = document.getElementById("siteHeader");
  const SCROLL_THRESHOLD = 40;

  const onScroll = () => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    header.classList.toggle("scrolled", scrolled);
    document.body.classList.toggle("header-shrink", scrolled);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Menú hamburguesa en móvil */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.classList.toggle("is-active", isOpen);
  });
}

/* Cierra el menú móvil al pulsar un enlace de navegación */
function setupSmoothScrollClose() {
  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("navToggle");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-active");
    });
  });
}

/* Efecto "scroll reveal": fade-in + slide-up al entrar en el viewport */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (index % 6) * 90;
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

/* Anima las barras de progreso de idiomas cuando entran en pantalla */
function setupSkillBars() {
  const bars = document.querySelectorAll(".progress-fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute("data-percent") || "0";
          bar.style.width = percent + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* Carrusel de títulos: efecto "coverflow", contador, barra de progreso y autoplay */
function setupCarousel() {
  const track = document.getElementById("carouselTrack");
  const viewport = track && track.parentElement;
  const carousel = document.getElementById("titulosCarousel");
  const dotsWrap = document.getElementById("carouselDots");
  if (!track || !viewport || !carousel || !dotsWrap) return;

  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const progressFill = document.getElementById("carouselProgressFill");
  const currentLabel = document.getElementById("carouselCurrent");
  const totalLabel = document.getElementById("carouselTotal");
  const AUTOPLAY_MS = 5000;
  let current = 0;
  let autoplayId = null;

  if (totalLabel) totalLabel.textContent = slides.length;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Ir al título ${i + 1}`);
    dot.addEventListener("click", () => {
      goTo(i);
      startAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function updatePosition() {
    const slide = slides[current];
    const offset = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
    if (currentLabel) currentLabel.textContent = current + 1;
    updatePosition();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function restartProgress() {
    if (!progressFill) return;
    progressFill.classList.remove("is-animating", "is-paused");
    void progressFill.offsetWidth; // fuerza el reflow para reiniciar la animación
    progressFill.style.animationDuration = `${AUTOPLAY_MS}ms`;
    progressFill.classList.add("is-animating");
  }

  function startAutoplay() {
    stopAutoplay();
    restartProgress();
    autoplayId = setInterval(next, AUTOPLAY_MS);
  }

  function pauseAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = null;
    if (progressFill) progressFill.classList.add("is-paused");
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = null;
  }

  nextBtn.addEventListener("click", () => {
    next();
    startAutoplay();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    startAutoplay();
  });

  carousel.addEventListener("mouseenter", pauseAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", pauseAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  window.addEventListener("resize", updatePosition);

  goTo(0);
  startAutoplay();
}

/* Lightbox: amplía el título/certificado al hacer clic en su imagen */
function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".carousel-card img").forEach((img) => {
    img.addEventListener("click", () => open(img.src, img.alt));
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}
