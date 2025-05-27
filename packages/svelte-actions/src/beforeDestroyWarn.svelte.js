export default function beforeDestroyWarn() {
  function handle(event) {
    event.preventDefault();
    event.returnValue = "";
  }
  window.addEventListener("beforeunload", handle);
  return {
    destroy() {
      window.removeEventListener("beforeunload", handle);
    },
  };
}
