import { N as ensure_array_like, E as attr_class, F as clsx, O as bind_props, D as pop, A as push, P as spread_attributes, K as escape_html } from "../../../chunks/index.js";
import { a as cva, c as cx } from "../../../chunks/index3.js";
import { B as Button } from "../../../chunks/Button.js";
import "../../../chunks/index4.js";
function Steps($$payload, $$props) {
  push();
  const stepVariants = cva("steps", {
    variants: {
      direction: {
        horizontal: ["steps-horizontal"],
        vertical: ["steps-vertical"]
      }
    }
  });
  const stepItemVariants = cva("", {
    variants: {
      color: {
        undefined: [""],
        primary: ["step-primary"],
        secondary: ["step-secondary"],
        accent: ["step-accent"],
        neutral: ["step-neutral"],
        info: ["step-info"],
        success: ["step-success"],
        warning: ["step-warning"],
        error: ["step-error"]
      }
    }
  });
  let {
    direction = "horizontal",
    items,
    currentStep = void 0,
    children,
    color
  } = $$props;
  const each_array = ensure_array_like(items);
  $$payload.out += `<ul${attr_class(clsx(stepVariants({ direction })))}><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let { className } = each_array[i];
    $$payload.out += `<li${attr_class(clsx(cx(
      "step",
      {
        [stepItemVariants({ color })]: i <= currentStep
      },
      className
    )))}>`;
    children?.($$payload, i);
    $$payload.out += `<!----></li>`;
  }
  $$payload.out += `<!--]--></ul>`;
  bind_props($$props, { currentStep });
  pop();
}
function Icon($$payload, $$props) {
  push();
  const {
    className,
    color,
    iconClass,
    responsive,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const iconVariants = cva("icon", {
    variants: {
      color: {
        primary: ["text-primary border-primary"],
        secondary: ["text-secondary border-secondary"],
        accent: ["text-accent border-accent"],
        neutral: ["text-neutral border-neutral"],
        info: ["text-info border-info"],
        success: ["text-success border-success"],
        warning: ["text-warning border-warning"],
        error: ["text-error border-error"]
      },
      responsive: {
        true: [
          "text-xs",
          "sm:text-sm",
          "md:text-md",
          "lg:text-lg",
          "xl:text-xl",
          "2xl:text-2xl"
        ]
      }
    }
  });
  $$payload.out += `<span${spread_attributes(
    {
      ...restProps,
      class: clsx(cx(iconVariants({ color, responsive }), iconClass, className))
    }
  )}></span>`;
  pop();
}
function Badge($$payload, $$props) {
  push();
  let {
    color = "",
    size = "",
    soft = false,
    outline = false,
    dash = false,
    ghost = false,
    responsive = false,
    className,
    children
  } = $$props;
  const badgeVariants = cva("badge", {
    variants: {
      responsive: {
        true: [
          "badge-xs",
          "sm:badge-sm",
          "md:badge-md",
          "lg:badge-lg",
          "xl:badge-xl",
          "2xl:badge-xl"
        ]
      },
      size: {
        xs: ["badge-xs"],
        sm: ["badge-sm"],
        md: ["badge-md"],
        lg: ["badge-lg"],
        xl: ["badge-xl"]
      },
      color: {
        primary: ["badge-primary"],
        secondary: ["badge-secondary"],
        accent: ["badge-accent"],
        neutral: ["badge-neutral"],
        info: ["badge-info"],
        success: ["badge-success"],
        warning: ["badge-warning"],
        error: ["badge-error"]
      },
      soft: { true: ["badge-soft"] },
      outline: { true: ["badge-outline"] },
      dash: { true: ["badge-dash"] },
      ghost: { true: ["badge-ghost"] }
    }
  });
  $$payload.out += `<span${attr_class(clsx(cx(
    badgeVariants({
      color,
      size,
      soft,
      outline,
      dash,
      ghost,
      responsive
    }),
    className
  )))}>`;
  children?.($$payload);
  $$payload.out += `<!----></span>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let normalItems = [
    { title: "翻牌" },
    { title: "放置资源" },
    { title: "回合开始判定" },
    { title: "回收人物" },
    { title: "回合结束判定" }
  ];
  let specialItems = [
    { title: "收获" },
    { title: "交食物" },
    { title: "动物繁殖" }
  ];
  let round = 1;
  let isSpecialRound = [4, 7, 9, 11, 13, 14].includes(round);
  let currentStep = -1;
  normalItems.length + (isSpecialRound ? specialItems.length : 0);
  $$payload.out += `<div class="grid p-4" style="grid-template-rows: min-content 1fr min-content;"><div class="flex text-2xl items-center justify-center gap-x-2"><span>回合</span>`;
  Badge($$payload, {
    color: "primary",
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(round)}`;
    }
  });
  $$payload.out += `<!----></div> <div class="flex flex-col justify-around items-center">`;
  Button($$payload, {
    color: "primary",
    size: "lg",
    circle: true,
    className: "scale-300",
    onclick: () => currentStep++,
    children: ($$payload2) => {
      Icon($$payload2, {
        iconClass: "icon-[material-symbols--next-plan-rounded]"
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div>`;
  Button($$payload, {
    color: "secondary",
    size: "sm",
    onclick: () => currentStep >= 0 && currentStep--,
    children: ($$payload2) => {
      $$payload2.out += `<!---->撤销`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="grid" style="grid-template-columns: 1fr 1fr;">`;
  {
    let children = function($$payload2, i) {
      $$payload2.out += `<!---->${escape_html(normalItems[i]?.title)}`;
    };
    Steps($$payload, {
      direction: "vertical",
      color: "primary",
      currentStep,
      items: normalItems,
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----> `;
  if (isSpecialRound) {
    $$payload.out += "<!--[-->";
    {
      let children = function($$payload2, i) {
        $$payload2.out += `<!---->${escape_html(specialItems[i]?.title)}`;
      };
      Steps($$payload, {
        direction: "vertical",
        color: "primary",
        currentStep: currentStep - normalItems.length,
        items: specialItems,
        children,
        $$slots: { default: true }
      });
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}
export {
  _page as default
};
