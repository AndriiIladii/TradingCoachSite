export function initModal() {
  const modal = document.querySelector(".modal__container");
  const modalForm = document.querySelector(".modal__form");
  const closeBtn = document.getElementById("close");
  const openModalBtns = document.querySelectorAll(
    ".header__contact--btn, .hero__btn, .service__section--btn, .about__contact--btn"
  );

  if (!modal || !modalForm) return;

  const openModal = () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  };
  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modalForm.reset();
    modalForm
      .querySelectorAll(".input-error")
      .forEach((i) => i.classList.remove("input-error"));
    modalForm
      .querySelectorAll(".error__text")
      .forEach((p) => (p.style.display = "none"));
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
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
      const errorText = input
        .closest(".form__field")
        ?.querySelector(".error__text");

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

    closeModal();

    const params = {
      senderName: document.getElementById("name")?.value.trim(),
      senderEmail: document.getElementById("email")?.value.trim(),
      senderPhone: document.getElementById("tel")?.value.trim(),
      contactMethod: document.getElementById("contact_method")?.value,
      pageTitle: document.title,
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
}
