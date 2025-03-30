<script>
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
  ];
</script>

<div class="dropdown z-9999">
  <div tabindex="0" role="button" class="btn m-1 hover:opacity-75 opacity-25">
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
    class="dropdown-content z-1 bg-base-300 rounded-box w-content p-2 shadow-2xl max-h-80 overflow-y-auto"
  >
    {#each themeList as theme}
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
          aria-label={theme}
          value={theme}
          data-set-theme={theme}
        />
      </li>
    {/each}
  </ul>
</div>
