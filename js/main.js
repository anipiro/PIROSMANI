// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", () => list.classList.toggle("open"));
  }

  // ===== Mark active link =====
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // ===== Gallery modal =====
  const modal = document.getElementById("modal");
  if (modal) {
    const modalImg = modal.querySelector("img");
    const modalCap = modal.querySelector(".modal-caption");
    const close = modal.querySelector(".modal-close");

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        const title = card.querySelector("h3")?.textContent || "";
        const desc = card.querySelector("p")?.textContent || "";
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCap.textContent = `${title} — ${desc}`;
        modal.classList.add("open");
      });
    });

    const closeModal = () => modal.classList.remove("open");
    close.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // ===== Back to top =====
  const toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 400);
    });
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // ===== Contact form validation =====
  const form = document.getElementById("contactForm");
  if (form) {
    const msg = document.getElementById("formMsg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !message) {
        msg.style.color = "#e07a6a";
        msg.textContent = "Please fill in every field.";
        return;
      }
      if (!emailOk) {
        msg.style.color = "#e07a6a";
        msg.textContent = "Please enter a valid email address.";
        return;
      }
      msg.style.color = "";
      msg.textContent = `Thank you, ${name}. Your message has been received.`;
      form.reset();
    });
  }
});

// Time-of-day greeting on home page
(function(){
  const el = document.getElementById("greeting");
  if (!el) return;
  const h = new Date().getHours();
  el.textContent = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
})();
