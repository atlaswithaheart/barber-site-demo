const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const bookingModal = document.querySelector("#bookingModal");
const bookingButton = document.querySelector("#bookingButton");
const modalClose = document.querySelector("#modalClose");


// MOBILE MENU

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});


// BOOKING MODAL

function openBooking() {
  bookingModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBooking() {
  bookingModal.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(
  ".header-book, .hero-button, .mobile-book"
).forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    openBooking();
  });
});

bookingButton.addEventListener("click", openBooking);

modalClose.addEventListener("click", closeBooking);

bookingModal.addEventListener("click", event => {
  if (event.target === bookingModal) {
    closeBooking();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeBooking();
  }
});


// BOOKING FORM

const bookingForm = document.querySelector(".booking-form");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  const button = bookingForm.querySelector(".form-submit");

  button.textContent = "Appointment Requested ✓";

  setTimeout(() => {
    closeBooking();
    button.textContent = "Continue →";
  }, 1400);
});


// IMAGE REVEALS

const revealElements = document.querySelectorAll(
  ".service-row, .barber-card, .gallery-image, .shop-content"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(25px)";
  element.style.transition =
    "opacity .7s ease, transform .7s ease";

  revealObserver.observe(element);
});


// REVEAL STYLE

const style = document.createElement("style");

style.textContent = `
  .service-row.visible,
  .barber-card.visible,
  .gallery-image.visible,
  .shop-content.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(style);


// HERO PARALLAX

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {
  if (window.scrollY < window.innerHeight) {
    heroImage.style.transform =
      `scale(1.02) translateY(${window.scrollY * 0.08}px)`;
  }
});