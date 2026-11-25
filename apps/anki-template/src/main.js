import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const target = document.getElementById("app");
if (!target) throw new Error("Anki template root element was not found");

const app = mount(App, {
  target,
});
export default app;
