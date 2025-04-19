export default function preventDefault(node, eventName) {
  function handle(event) {
    event.preventDefault();
  }

  node.addEventListener(eventName, handle);

  return {
    destroy() {
      node.removeEventListener(eventName, handle);
    },
  };
}
