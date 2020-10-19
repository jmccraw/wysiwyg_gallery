<script>
  import { fade } from 'svelte/transition';
</script>

<style type="text/scss">
  @import '../styles/vars';
  aside {
    margin-bottom: 80px;
    margin-top: 20px;
  }

  .subhead.small {
    font-size: 30px;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }

  .add-button {
    background-color: none;
    border-radius: 50%;
  }
</style>

<aside>
  <h2 class="subhead small">Add New Slideshow Images</h2>
  <slot name="new-gallery-slideshow-item" class="gallery-item"></slot>
  <slot name="add-new-gallery-slideshow-full-width-container"></slot>
  <slot name="add-new-gallery-slideshow-item-button" class="add-button"></slot>
</aside>
