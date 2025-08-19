export function initBurgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".burger__menu");
  const menuLinks = document.querySelectorAll(".burger__link");

  if (!hamburger || !navMenu) return;

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
}
