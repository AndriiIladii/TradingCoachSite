// initModal.js
export function initModal() {
  const modalContainer = document.querySelector(".modal__container");
  const modal = document.getElementById("modal");
  const modalForm = document.querySelector(".modal__form");
  const closeBtn = document.getElementById("close");
  const openModalBtns = document.querySelectorAll(
    ".header__contact--btn, .hero__btn, .service__section--btn, .about__contact--btn"
  );

  if (!modalContainer || !modal || !modalForm) return;

  const addHidden = () => {
    modalContainer.classList.remove("show");
    modalContainer.setAttribute("aria-hidden", "true");
  };
  const removeHidden = () => {
    modalContainer.classList.add("show");
    modalContainer.setAttribute("aria-hidden", "false");
  };

  const resetFormUI = () => {
    modalForm
      .querySelectorAll(".input-error")
      .forEach((i) => i.classList.remove("input-error"));
    modalForm
      .querySelectorAll(".error__text")
      .forEach((p) => (p.style.display = "none"));
  };

  const openModal = () => {
    removeHidden();
    modal.setAttribute("tabindex", "-1");
    modal.focus();
  };

  const closeModal = () => {
    addHidden();
    modalForm.reset();
    resetFormUI();
  };

  try {
    emailjs.init("SKcsEiQVkv2-_H0KY");
  } catch (e) {
    console.error("EmailJS init error:", e);
  }

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("show")) {
      closeModal();
    }
  });

  openModalBtns.forEach((btn) => {
    if (!btn.hasAttribute("type")) btn.setAttribute("type", "button");
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;

    modalForm.querySelectorAll(".form__input").forEach((input) => {
      const field = input.closest(".form__field");
      const errorText = field?.querySelector(".error__text");

      if (!input.value.trim() || !input.checkValidity()) {
        isValid = false;
        if (errorText) errorText.style.display = "block";
        input.classList.add("input-error");
      } else {
        if (errorText) errorText.style.display = "none";
        input.classList.remove("input-error");
      }
    });

    if (!isValid) return;
    const fd = new FormData(modalForm);
    const params = {
      senderName: (fd.get("name") || "").toString().trim(),
      senderEmail: (fd.get("email") || "").toString().trim(),
      senderPhone: (fd.get("tel") || "").toString().trim(),
      contactMethod: (fd.get("contact_method") || "").toString(),
      pageTitle: "Oleksandr Boiko",
    };

    const serviceId = "service_8p9t7mk";
    const templateId = "template_8obbw8p";

    const submitBtn = modalForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;

    try {
      await emailjs.send(serviceId, templateId, params);
      closeModal();

      await Swal.fire({ title: "Your Email was sent!", icon: "success" });
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
}
