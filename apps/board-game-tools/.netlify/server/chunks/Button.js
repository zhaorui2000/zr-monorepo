import { P as spread_attributes, F as clsx, D as pop, A as push } from "./index.js";
import { c as cx, a as cva } from "./index3.js";
function Button($$payload, $$props) {
  push();
  let {
    color = "",
    size = "",
    disabled = false,
    loading = false,
    soft = false,
    dash = false,
    circle = false,
    outline = false,
    content,
    className,
    ghost = false,
    square = false,
    responsive = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const buttonVariants = cva("btn", {
    variants: {
      color: {
        neutral: ["btn-neutral"],
        primary: ["btn-primary"],
        secondary: ["btn-secondary"],
        accent: ["btn-accent"],
        info: ["btn-info"],
        success: ["btn-success"],
        warning: ["btn-warning"],
        error: ["btn-error"]
      },
      soft: { true: ["btn-soft"] },
      dash: { true: ["btn-dash"] },
      outline: { true: ["btn-outline"] },
      active: { true: ["btn-active"] },
      ghost: { true: ["btn-ghost"] },
      wide: { true: ["btn-wide"] },
      disabled: { true: ["btn-disabled"] },
      square: { true: ["btn-square"] },
      circle: { true: ["btn-circle"] },
      block: { true: ["btn-block"] },
      responsive: {
        true: [
          "btn-xs",
          "sm:btn-sm",
          "md:btn-md",
          "lg:btn-lg",
          "xl:btn-xl",
          "2xl:btn-2xl"
        ]
      },
      size: {
        "": "",
        xs: ["btn-xs"],
        sm: ["btn-sm"],
        md: [""],
        lg: ["btn-lg"],
        xl: ["btn-xl"]
      }
    },
    defaultVariants: {}
  });
  $$payload.out += `<button${spread_attributes(
    {
      class: clsx(cx(
        buttonVariants({
          responsive,
          color,
          size,
          disabled,
          square,
          dash,
          ghost,
          soft,
          outline,
          circle
        }),
        className
      )),
      ...restProps
    }
  )}>`;
  if (loading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="loading loading-spinner"></span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (!loading) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></button>`;
  pop();
}
export {
  Button as B
};
