<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher, onMount } from 'svelte';
  import { dndzone } from 'svelte-dnd-action';
  import { storeValue, getValue } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';
  import { isSerifHed } from '../utilities/SerifHedStore.js';

  export let images = {};

  const dispatch = createEventDispatcher();

  let callToAction = 'Expand';
  let isSerifChecked = getValue( 'isSerifHed', 'boolean' ) || false;
  let _el;

  function toggleImageAdder() {
    _el.classList.toggle( 'is-visible' );

    if ( 'Expand' === callToAction ) {
      callToAction = 'Close';
    } else {
      callToAction = 'Expand';
    }
  }

  /**
   * Dispatch a message indicating the headline should use serif font
   */
  function makeHedSerif() {
    const newIsSerif = ! isSerifChecked;

    isSerifHed.set( newIsSerif );
    dispatch( 'makeserif', {
      isserif: newIsSerif
    } );
    storeValue( 'isSerifHed', newIsSerif );
  }

  /**
   * Dispatch a message indicating a particular image should be deleted
   * @event event The click event
   */
  function deleteOpenerImage( event ) {
    const data = event.target.parentElement;
    const index = +data.dataset.index;
    const type = data.dataset.type;

    dispatch( 'deleteimage', {
      index: index,
      type: type
    } );
  }

  function handleDndConsiderDesktop(e) {
    // window.console.log( e );
    images.desktop = e.detail.items;
  }

  function handleDndFinalizeDesktop(e) {
    images.desktop = e.detail.items;
    dispatch( 'adjustimages', {
      items: e.detail.items,
      type: 'desktop'
    } );
  }

  function handleDndConsiderMobile(e) {
    images.mobile = e.detail.items;
  }

  function handleDndFinalizeMobile(e) {
    images.mobile = e.detail.items;
    dispatch( 'adjustimages', {
      items: e.detail.items,
      type: 'mobile'
    } );
  }

  onMount( () => {
    if ( isSerifChecked ) {
      isSerifHed.set( true );
      dispatch( 'makeserif', {
        isserif: true
      } );
    }
  } );
</script>

<style type="text/scss">
  @import '../styles/vars';

  .opener-image-toggle-button {
    background-color: $purple;
    border: none;
    color: #fff;
    height: 100%;
    margin: -16px 0 0;
    width: 100%;
  }

  .decades-maker-new-header-image {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.35);
    left: 40px;
    max-height: 20px;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
    opacity: 0.25;
    padding: 16px;
    position: absolute;
    top: 40px;
    transition: max-height 0.25s ease-in-out,
      opacity 0.25s ease-in-out;
    width: 250px;
    z-index: 99999;

    &.is-toggled {
      display: none;
    }
  }

  .decades-maker-new-header-image.is-visible {
    border-radius: 4px 4px 0 0;
    max-height: 400px;
    opacity: 1;
    overflow-y: auto;
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
    width: 200px;
  }

  .mobile-images {
    height: 200px;
    width: auto;
  }

  .decades-maker-new-header-image > label {
    display: block;
    margin-bottom: 4px;
  }

  .decades-maker-new-header-image-header {
    height: 52px;
    margin-bottom: 24px;
    margin-left: -16px;
    position: relative;
    width: calc(100% + 32px);
  }

  :global(.decades-opener-images-figure) {
    align-items: center;
    border: 1px solid transparent;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 20px 10px;
    position: relative;
    transition: border-color 0.25s ease-in-out;
    width: 100%;

    &:hover {
      border-color: $decades-grey-3;
    }
  }

  .decades-maker-hed-text-serif {
    margin-bottom: 16px;
  }

  :global(.decades-opener-image-delete-button) {
    background-color: transparent;
    border: none;
    bottom: 0;
    color: $decades-red;
    cursor: pointer;
    font: 400 13px/1 Arial, sans-serif;
    height: 20px;
    outline: none;
    opacity: 0;
    position: absolute;
    right: 10px;
    text-decoration: underline;
    transition: opacity 0.25s ease-in-out;
  }

  :global(.decades-opener-images-figure:hover .decades-opener-image-delete-button) {
    opacity: 1;
  }
</style>

<aside class="decades-maker-new-header-image" class:is-toggled={$isToggled} bind:this={_el}>
  <header class="decades-maker-new-header-image-header">
    <button class="opener-image-toggle-button credit" on:click={toggleImageAdder} type="button">{callToAction} Opener Image Editor</button>
  </header>

  <div class="decades-maker-hed-text-serif">
    <label for="hed-serif">Use serif font for headlines:</label>
    <input id="hed-serif" name="hed-serif" type="checkbox" bind:checked={isSerifChecked} on:click={makeHedSerif} />
  </div>

  <div class="decades-maker-new-header-image-desktop">
    <strong>Desktop Images</strong>
    <div class="decades-maker-new-header-images-desktop" use:dndzone={{items: images.desktop}} on:consider={handleDndConsiderDesktop} on:finalize={handleDndFinalizeDesktop} type="desktop">
      {#each images.desktop as desktopImage, index (desktopImage.id)}
      <figure class="decades-opener-images-figure" data-index="{index}" data-type="desktop">
        <img class="desktop-images" in:fade="{{ duration: 250 }}" {...desktopImage}>
        <button class="decades-opener-image-delete-button" type="button" title="Delete this image" on:click={deleteOpenerImage}>Delete Image</button>
      </figure>
      {/each}
    </div>
  </div>

  <div class="decades-maker-new-header-image-mobile">
    <strong>Mobile Images</strong>
    <div class="decades-maker-new-header-images-mobile" use:dndzone={{items: images.mobile}} on:consider={handleDndConsiderMobile} on:finalize={handleDndFinalizeMobile} type="mobile">
      {#each images.mobile as mobileImage, index (mobileImage.id)}
      <figure class="decades-opener-images-figure" data-index="{index}" data-type="mobile">
        <img class="mobile-images" in:fade="{{ duration: 250 }}" {...mobileImage}>
        <button class="decades-opener-image-delete-button" type="button" title="Delete this image" on:click={deleteOpenerImage}>Delete Image</button>
      </figure>
      {/each}
    </div>
  </div>

  <label for="desktop-opener-url">Desktop Image URL:</label>
  <slot name="decades-maker-new-header-image-desktop-src"></slot>
  <label for="mobile-opener-url">Mobile Image URL:</label>
  <slot name="decades-maker-new-header-image-mobile-src"></slot>
  <label for="opener-alt-text">Optional Alt Text for Visually Impaired:</label>
  <slot name="decades-maker-new-header-image-alt"></slot>
  <slot name="decades-maker-new-header-image-button"></slot>
</aside>
