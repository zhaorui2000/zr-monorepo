import { cva } from "class-variance-authority";

export default cva("", {
  variants: {
    bg: {
      100: ["bg-base-100"],
      200: ["bg-base-200"],
      300: ["bg-base-300"]
    },
  },
});