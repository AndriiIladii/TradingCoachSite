import "../styles/main.scss";
import { initBurgerMenu } from "./modules/burger";
import { initModal } from "./modules/modal";

const accordionBox = document.querySelectorAll(".faq__accordion");

accordionBox.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

initBurgerMenu();
initModal();

AOS.init({
  once: true,
});
