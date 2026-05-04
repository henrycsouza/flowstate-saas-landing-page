const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");

const revealSections = () => {
  const triggerBottom = window.innerHeight * 0.88;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    }
  });
};

const updateActiveMenu = () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 220) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
};

const smoothScroll = () => {
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
};

const updateYear = () => {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
};

const enhanceHeaderOnScroll = () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(10,10,10,0.95)";
    header.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
  } else {
    header.style.background = "rgba(10,10,10,0.85)";
    header.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
  }
};

window.addEventListener("scroll", () => {
  revealSections();
  updateActiveMenu();
  enhanceHeaderOnScroll();
});

window.addEventListener("load", () => {
  revealSections();
  updateActiveMenu();
  smoothScroll();
  updateYear();
  enhanceHeaderOnScroll();
});