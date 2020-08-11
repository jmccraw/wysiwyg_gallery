<script>
  import GallerySlideshow from './GallerySlideshow.svelte';

  export let items
</script>


<article class="decades-container">
{#each items as item, index}
  {#if 'image' === item.type}
    <figure class="decades-gallery-item {item.className ? item.className : ''}">
      <img class="decades-gallery-image {item.imageClass ? item.imageClass : ''} is-lazy" src="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg" data-src="{item.src}">
      <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-date">{@html item.caption.date}</span> {@html item.caption.title} <p class="body-text">{@html item.caption.text} <span class="credit">{@html item.caption.credit}</span></p></figcaption>
    </figure>
  {:else if 'gallery' === item.type}
    <GallerySlideshow {...item} index={index} />
  {:else if 'header' === item.type}
    <h2 class="decades-container-hed headline serif no-motion is-lazy-thing">{@html item.header} {#if item.subheader}<span class="decades-container-hed-team subhead alt">{@html item.subheader}</span>{/if}</h2>
  {:else if 'paragraph' === item.type}
    <p class="body-text serif">{@html item.text}</p>
  {/if}
{/each}
</article>