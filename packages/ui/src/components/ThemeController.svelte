<script>
  import { cx } from "class-variance-authority";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import getRandomIntInclusive from "@zr/utils/Number/getRandomIntInclusive";
  const themeList = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk",
    "ghibli",
  ];
  const { className, ...restProps } = $props();
  export function randomTheme() {
    const randomIndex = getRandomIntInclusive(0, themeList.length - 1);
    const randomTheme = themeList[randomIndex];
    document.documentElement.setAttribute("data-theme", randomTheme);
    localStorage.setItem("theme", randomTheme);
  }
  onMount(() => {
    themeChange(false);
  });
</script>

<div class="dropdown z-9999">
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
    class={cx(
      "dropdown-content z-1 bg-base-300 rounded-box w-content p-2 shadow-2xl overflow-y-auto",
      className
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
        />
      </li>
    {/each}
  </ul>
</div>
