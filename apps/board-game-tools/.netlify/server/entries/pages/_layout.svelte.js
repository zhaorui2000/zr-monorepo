import { E as attr_class, F as clsx, D as pop, A as push, G as slot } from "../../chunks/index.js";
import { c as cx, a as cva } from "../../chunks/index3.js";
function Navbar($$payload, $$props) {
  push();
  const navbarVariants = cva("navbar bg-base-100 shadow-sm", {
    variants: {
      color: {
        primary: ["bg-primary", "text-primary-content"],
        secondary: "bg-secondary text-secondary-content",
        accent: "bg-accent text-accent-content",
        neutral: "bg-neutral text-neutral-content",
        info: "bg-info text-info-content",
        success: "bg-success text-success-content",
        warning: "bg-warning text-warning-content",
        error: "bg-error text-error-content"
      }
    }
  });
  let { start, end, color, children } = $$props;
  $$payload.out += `<div${attr_class(clsx(cx(navbarVariants({ color }))))}><div class="navbar-start">`;
  start?.($$payload);
  $$payload.out += `<!----></div> <div class="navbar-center"><a class="btn btn-ghost text-xl">`;
  children?.($$payload);
  $$payload.out += `<!----></a></div> <div class="navbar-end">`;
  end?.($$payload);
  $$payload.out += `<!----></div></div>`;
  pop();
}
function _layout($$payload, $$props) {
  $$payload.out += `<div class="h-full w-full grid" style="grid-template-rows: min-content 1fr;">`;
  Navbar($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->------`;
    }
  });
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
}
export {
  _layout as default
};
