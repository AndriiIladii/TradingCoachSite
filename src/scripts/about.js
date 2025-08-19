import "../styles/main.scss";
import { initBurgerMenu } from "./modules/burger";
import { initModal } from "./modules/modal";

initBurgerMenu();
initModal();

AOS.init({
  once: true,
});
