<script>
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import themeList from "daisyui/functions/themeOrder.js";
  import getRandomIntInclusive from "@zr/utils/Number/getRandomIntInclusive";
  import { cn } from "./common/cn.js";
  const { className = "", ...restProps } = $props();
  let currentTheme = $state("");
  export function randomTheme() {
    const randomIndex = getRandomIntInclusive(0, themeList.length - 1);
    const randomTheme = themeList[randomIndex];
    document.documentElement.setAttribute("data-theme", randomTheme);
    localStorage.setItem("theme", randomTheme);
    currentTheme = randomTheme;
  }
  onMount(() => {
    themeChange(false);
    currentTheme = localStorage.getItem("theme") || "light";
  });
</script>

<div class="dropdown z-dropdown">
  <div tabindex="0" role="button" class="btn m-1">
    主题
    <svg
      width="12px"
      height="12px"
      class="inline-block h-2 w-2 fill-current opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
    >
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
      ></path>
    </svg>
  </div>
  <ul
    class={cn(
      "dropdown-content z-raised bg-base-300 rounded-box w-content p-2 shadow-2xl overflow-y-auto",
      className,
    )}
  >
    {#each themeList as theme}
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label={theme}
          value={theme}
          data-set-theme={theme}
          checked={currentTheme === theme}
        />
      </li>
    {/each}
  </ul>
</div>
