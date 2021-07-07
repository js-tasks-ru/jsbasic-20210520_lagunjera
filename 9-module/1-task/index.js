export default function promiseClick(button) {
  return new Promise((resolve) => {
    button.addEventListener('click', (ev) => {
      resolve(ev);
    }, { once: true });
  });
}
