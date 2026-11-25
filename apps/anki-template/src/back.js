import { mount } from "svelte";
import "./app.css";
import BackApp from "./BackApp.svelte";

const target = document.getElementById("app");
if (!target) throw new Error("Anki template root element was not found");

const app = mount(BackApp, { target });
export default app;
