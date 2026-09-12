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
