<script>
  import { fade } from 'svelte/transition';
</script>

<style type="text/scss">
  @import '../styles/vars';
  aside {
    margin-bottom: 80px;
    margin-top: 20px;
  }

  .add-button {
    background-color: none;
    border-radius: 50%;
  }
</style>

<aside>
  <slot name="new-gallery-slideshow-item" class="gallery-item"></slot>
  <slot name="add-new-gallery-slideshow-item-button" class="add-button"></slot>
</aside>
