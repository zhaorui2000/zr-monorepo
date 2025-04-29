import { WebSocket } from "ws";
export default function (port = 25106) {
  const ws = new WebSocket(`ws://localhost:${port}`);
  return ws;
}
