import "../styles/main.scss";

function startProgress() {
  const progress = document.querySelector(".outer");
  const data = document.querySelector(".number");

  let interval = null;
  let index = 0;

  interval = setInterval(() => {
    if (index >= 90) {
      clearInterval(interval);
    } else {
      index++;
      data.innerText = `${index}%`;
      progress.style.background = `conic-gradient(#029837 ${
        index * 3.6
      }deg, #f7fff6 ${index * 3}deg)`;
    }
  }, 30);
}

startProgress();

const accordionBox = document.querySelectorAll(".faq__accordion");

accordionBox.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
