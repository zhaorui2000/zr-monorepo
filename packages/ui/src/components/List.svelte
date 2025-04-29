<script>
    const {title,children} = $props()
</script>
<ul class="list bg-base-100 rounded-box shadow-md">
    {#if title}
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
            {@render title?.()}
        </li>
    {/if}
    {@render children?.()}
  </ul>