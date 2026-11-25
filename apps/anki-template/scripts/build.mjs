import { build } from "vite";

for (const side of ["front", "back"]) {
  process.env.ANKI_TEMPLATE_SIDE = side;
  await build();
}
