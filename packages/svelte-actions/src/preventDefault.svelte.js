export default function preventDefault(
  node,
  { eventName, beforePrevent = () => true }
) {
  function handle(event) {
    if (!beforePrevent(event)) return;
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
