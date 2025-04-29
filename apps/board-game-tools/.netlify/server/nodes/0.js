import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DDefIsK9.js","_app/immutable/chunks/DMgJVOKm.js","_app/immutable/chunks/DMq4l-h9.js","_app/immutable/chunks/DuZoAYNu.js","_app/immutable/chunks/aWX8WPOB.js"];
export const stylesheets = ["_app/immutable/assets/0.c6vV5VeQ.css"];
export const fonts = [];
