export default function connectWebSocket(url) {
  function heartbeat() {
    clearTimeout(this.pingTimeout);
    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  }
  const client = new WebSocket(url);
  client.onerror = console.error;
  client.onopen = heartbeat;
  client.onping = heartbeat;
  client.onclose = function clear() {
    clearTimeout(this.pingTimeout);
  };
  return client;
}
