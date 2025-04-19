export default function preventDefault(node, eventName) {
  function handle(event) {
    event.preventDefault();
  }
  if (Array.isArray(eventName)) {
    eventName.forEach((name) => {
      node.addEventListener(name, handle);
    });
  } else {
    node.addEventListener(eventName, handle);
  }
  return {
    destroy() {
      if (Array.isArray(eventName)) {
        eventName.forEach((name) => {
          node.removeEventListener(name, handle);
        });
      } else {
        node.removeEventListener(eventName, handle);
      }
    },
  };
}
