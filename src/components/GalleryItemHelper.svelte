<script>
  import { fade } from 'svelte/transition';
</script>

<style>
  aside {
    margin-bottom: 80px;
    margin-top: 20px;
  }

  .subhead.small {
    font-size: 30px;
    letter-spacing: 1px;
    margin-bottom: -11px;
  }

  .add-button {
    background-color: none;
    border-radius: 50%;
  }
</style>

<aside>
  <h2 class="subhead small">Add New Single Image</h2>
  <slot name="new-gallery-item" class="gallery-item"></slot>
  <slot name="add-new-gallery-item-button" class="add-button"></slot>
</aside>
