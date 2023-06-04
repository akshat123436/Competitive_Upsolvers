const flashdiv = document.querySelectorAll(".flashdiv");
const flashbutton = document.querySelectorAll(".flashbutton");

for (let i = 0; i < flashbutton.length; i++) {
  flashbutton[i].addEventListener("click", () => {
    for (let j = 0; j < flashdiv.length; j++) {
      flashdiv[j].style.display = "none";
    }
  });
}
