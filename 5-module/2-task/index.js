function toggleText() {
  let text = document.querySelector("#text");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-text-button")) {
      text.hidden = !text.hidden;
    }
  });
}
