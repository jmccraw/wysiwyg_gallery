<script>
  export let desktopImages;
  export let mobileImages;
  export let isSerif;
  export let hed;
  export let dek;
  export let byline;
</script>

<header class="decades-opener">
  <div class="decades-opener-images is-desktop">
    {#each desktopImages as desktopImage}
      <img class="decades-opener-image is-desktop" {...desktopImage}>
    {/each}
  </div>
  <div class="decades-opener-images is-mobile">
    {#each mobileImages as mobileImage}
      <img class="decades-opener-image is-mobile" {...mobileImage}>
    {/each}
  </div>

  <h1 class="decades-opener-hed headline" class:serif={isSerif}>{@html hed}</h1>
  <p class="decades-opener-dek deck"><span>{@html dek}</span> <span class="decades-opener-byline byline">{@html byline}</span><button class="decades-opener-button" type="button"><svg height="21" viewBox="0 0 13 21" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m15 20 9 9 9-9" fill="none" stroke="#000" stroke-width="3" transform="matrix(0 -1 1 0 -18.5 34.5)"/></svg></button></p>
</header>