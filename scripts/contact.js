import "../styles/main.scss";
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".burger__menu");
const menuLinks = document.querySelectorAll(".burger__link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

const modal = document.querySelector(".modal__container");
const modalForm = document.querySelector(".modal__form");
const closeBtn = document.getElementById("close");
const openModalBtns = document.querySelectorAll(
  ".header__contact--btn, .hero__btn, .service__section--btn, .about__contact--btn"
);
if (!modal || !modalForm) {
  console.warn("Modal or form not found in DOM");
}

const openModal = () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
};
const closeModal = () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
};

openModalBtns.forEach((btn) => {
  if (!btn.hasAttribute("type")) btn.setAttribute("type", "button");
  btn.addEventListener("click", openModal);
});

if (closeBtn) closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

try {
  emailjs.init("SKcsEiQVkv2-_H0KY");
} catch (e) {
  console.error("EmailJS init error:", e);
}

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!modalForm.checkValidity()) {
    modalForm.reportValidity();
    return;
  }

  closeModal();

  const params = {
    senderName: document.getElementById("name").value.trim(),
    senderEmail: document.getElementById("email").value.trim(),
    senderPhone: document.getElementById("tel").value.trim(),
    contactMethod: document.getElementById("contact_method").value,
    pageTitle: "Oleksandr Boiko",
  };

  const serviceId = "service_8p9t7mk";
  const templateId = "template_8obbw8p";

  const submitBtn = modalForm.querySelector('[type="submit"]');
  submitBtn.disabled = true;

  try {
    await emailjs.send(serviceId, templateId, params);
    await Swal.fire({ title: "Your Email was sent!", icon: "success" });
    modalForm.reset();
    closeModal();
  } catch (error) {
    console.error("FAILED...", error);
    Swal.fire({
      title: "Error sending email",
      text: "Please try again later.",
      icon: "error",
    });
  } finally {
    submitBtn.disabled = false;
  }
});
