<script>
  export let relatedLinks;
</script>

<aside class="decades-related-stories">
  <h4 class="decades-related-stories-hed">Related Stories</h4>
  <p class="decades-related-stories-link-container">
    {#each relatedLinks as {title, link}}
    <a href="{link}" class="decades-related-stories-link subhead alt small" rel="noopener"><span>{@html title}</span></a>
    {/each}
  </p>
</aside>