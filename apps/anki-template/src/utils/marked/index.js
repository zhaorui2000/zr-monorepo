import { marked } from "marked";
import markedRender from "@utils/markedRender.svelte.js";
import markedHooks from "@utils/markedHooks.svelte.js";

marked.use({ renderer: markedRender, hooks: markedHooks });
export default marked;
