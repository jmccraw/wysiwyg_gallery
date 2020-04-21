<script>
  import { fade } from 'svelte/transition';

  export let images = {};

  let _el;
  let callToAction = 'Expand';

  function toggleImageAdder() {
    _el.classList.toggle( 'is-visible' );

    if ( 'Expand' === callToAction ) {
      callToAction = 'Close';
    } else {
      callToAction = 'Expand';
    }
  }
</script>

<style>
  .decades-maker-new-header-image {
    background-color: #fff;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.35);
    left: 40px;
    max-height: 20px;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    opacity: 0.25;
    padding: 16px;
    position: absolute;
    top: 40px;
    transition: max-height 0.25s ease-in-out,
      opacity 0.25s ease-in-out;
    width: 250px;
    z-index: 99999;
  }

  .decades-maker-new-header-image.is-visible {
    opacity: 1;
    max-height: 400px;
  }

  .decades-maker-new-header-image:hover {
    opacity: 1;
  }

  .decades-maker-new-header-images-desktop,
  .decades-maker-new-header-images-mobile {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .desktop-images {
    height: auto;
    margin-bottom: 16px;
    width: 200px;
  }

  .mobile-images {
    height: 200px;
    margin-bottom: 16px;
    width: auto;
  }

  .decades-maker-new-header-image-inputs {
    color: red;
  }

  .decades-maker-new-header-image-button {
    background-color: rgb(248, 43, 43);
    border-radius: 5px;
    border: none;
    color: #fff;
    display: block;
    font: 400 16px/1 Arial, sans-serif;
    height: 30px;
    margin: 0 auto;
    width: 80%;
  }

  .decades-maker-new-header-image-header {
    height: 40px;
  }
</style>

<aside class="decades-maker-new-header-image" bind:this={_el}>
  <header class="decades-maker-new-header-image-header">
    <button on:click={toggleImageAdder} type="button">{callToAction} Opener Image Editor</button>
  </header>

  <div class="decades-maker-new-header-image-desktop">
    <strong>Desktop Images</strong>
    <div class="decades-maker-new-header-images-desktop">
      {#each images.desktop as desktopImage}
        <img class="desktop-images" in:fade="{{ duration: 250 }}" {...desktopImage}>
      {/each}
    </div>
  </div>

  <div class="decades-maker-new-header-image-mobile">
    <strong>Mobile Images</strong>
    <div class="decades-maker-new-header-images-mobile">
      {#each images.mobile as mobileImage}
        <img class="mobile-images" in:fade="{{ duration: 250 }}" {...mobileImage}>
      {/each}
    </div>
  </div>

  <slot name="decades-maker-new-header-image-desktop-src" class="decades-maker-new-header-image-inputs"></slot>
  <slot name="decades-maker-new-header-image-mobile-src" class="decades-maker-new-header-image-inputs"></slot>
  <slot name="decades-maker-new-header-image-alt" class="decades-maker-new-header-image-inputs"></slot>
  <slot name="decades-maker-new-header-image-button" class="decades-maker-new-header-image-button"></slot>
</aside>
