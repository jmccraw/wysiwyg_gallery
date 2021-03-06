<script>
  import OpenerHelper from './OpenerHelper.svelte';
  import { onMount } from 'svelte';
  import { storeValue, getValue } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';
  import { getMaxImageSize, isImageWithinSizeBounds } from '../utilities/ImageSizeChecker.js';
  import { changeToPlainText } from '../utilities/ChangeToPlainText.js';
  import { openerCodeStore } from '../utilities/CodeHelperStore.js';
  import { isSerifHed } from '../utilities/SerifHedStore.js';

  let desktopImages = getValue( 'desktopImages', 'object' ) || [
    {
      id: 1,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_desktop_1.jpg',
      alt: 'Cowboys opener image'
    },
    {
      id: 2,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_desktop_2.jpg',
      alt: 'Cowboys opener image 2'
    },
    {
      id: 3,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_desktop_4.jpg',
      alt: 'Cowboys opener image 3'
    },
    {
      id: 4,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_desktop_5.jpg',
      alt: 'Cowboys opener image 4'
    }
  ];
  let mobileImages = getValue( 'mobileImages', 'object' ) || [
    {
      id: 1,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_mobile_1-v3.jpg',
      alt: 'Cowboys opener mobile image'
    },
    {
      id: 2,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_mobile_2-v3.jpg',
      alt: 'Cowboys opener mobile image 2'
    },
    {
      id: 3,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_mobile_3-v3.jpg',
      alt: 'Cowboys opener mobile image 3'
    },
    {
      id: 4,
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/opener/cowboys_opener_mobile_4-v3.jpg',
      alt: 'Cowboys opener mobile image 4'
    }
  ];
  let images = {
    desktop: desktopImages,
    mobile: mobileImages
  };
  let hed = getValue( 'hed', null ) || '60 years of Cowboys football';
  let dek = getValue( 'dek', null ) || 'This week 60 years ago, the Dallas pro football franchise became the Cowboys, and with it a long list of players, coaches and on-field plays and events have forged the team.';
  let byline = getValue( 'byline', null ) || 'By Name McName';

  let desktopSrc = '';
  let mobileSrc = '';
  let altText = '';
  let isActive = false;
  let currDesktopID = desktopImages.length;
  let currMobileID = mobileImages.length;
  let _opener;
  let desktopPlaceholderImage;
  let mobilePlaceholderImage;

  let openerCodeHelperProps = {
    desktopImages: desktopImages,
    mobileImages: mobileImages,
    isSerif: $isSerifHed,
    hed: hed,
    dek: dek,
    byline: byline
  };
  openerCodeStore.set( openerCodeHelperProps );

  /**
   * On text element blur, save this new value
   * @event event The blur event
   */
  function storeTextChange( event, element ) {
    const entry = {};
    const newHTML = event.target.innerHTML;

    if ( 'hed' === element ) {
      hed = newHTML;
      entry.hed = hed;
      storeValue( 'hed', hed );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.hed = hed;
    } else if ( 'dek' === element ) {
      dek = newHTML;
      entry.dek = dek;
      storeValue( 'dek', dek );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.dek = dek;
    } else if ( 'byline' === element ) {
      byline = newHTML;
      entry.byline = byline;
      storeValue( 'byline', byline );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.byline = byline;
    }

    window.console.log( 'ENTRY:', entry );
  }

  /**
   * Add a new opener image to the gallery, but do so in a way that takes into
   * account mobile and desktop separately
   */
  function addNewOpenerImage() {
    if ( '' === desktopSrc && '' === mobileSrc ) return;

    if ( '' !== desktopSrc ) {
      desktopImages = desktopImages.concat( {
        id: ++currDesktopID,
        src: desktopSrc,
        alt: altText
      } );
      storeValue( 'desktopImages', desktopImages );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.desktopImages = desktopImages;
    }

    if ( '' !== mobileSrc ) {
      mobileImages = mobileImages.concat( {
        id: ++currMobileID,
        src: mobileSrc,
        alt: altText
      } );
      storeValue( 'mobileImages', mobileImages );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.mobileImages = mobileImages;
    }

    images = {
      desktop: desktopImages,
      mobile: mobileImages
    };

    desktopSrc = '';
    mobileSrc = '';
    altText = '';
    isActive = false;

    window.setTimeout( () => {
      isActive = true;
    }, 250 );
  }

  /**
   * Receive the adjust images request, and then see which image sets to adjust
   * @event event The dispatch event
   */
  function adjustImages( event ) {
    if ( 'desktop' === event.detail.type ) {
      desktopImages = event.detail.items;
      storeValue( 'desktopImages', desktopImages );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.desktopImages = desktopImages;
    } else {
      mobileImages = event.detail.items;
      storeValue( 'mobileImages', mobileImages );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.mobileImages = mobileImages;
    }
  }

  /**
   * Receive the delete image request, and then see which image needs to be removed
   * @event event The dispatch event
   */
  function deleteImage( event ) {
    if ( 'desktop' === event.detail.type ) {
      desktopImages.splice( event.detail.index, 1 );
      desktopImages = desktopImages;
      images.desktop = desktopImages;
      storeValue( 'desktopImages', desktopImages );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.desktopImages = desktopImages;
    } else {
      mobileImages.splice( event.detail.index, 1 );
      mobileImages = mobileImages;
      images.mobile = mobileImages;
      storeValue( 'mobileImages', mobileImages );
      // openerCodeStore.set( openerCodeHelperProps );
      $openerCodeStore.mobileImages = mobileImages;
    }
  }

  /**
   * Receive the make hed serif request, and then toggle the class to make the title serif
   * @event event The dispatch event
   */
  function makeHedSerif( event ) {
    $isSerifHed = event.detail.isSerif;
    $openerCodeStore.isSerif = $isSerifHed;
  }

  /**
   * Determine if the image is within acceptable size bounds
   * @event event The load event
   */
  function checkImageFileSize( event ) {
    const _target = event.target;
    const targetSource = _target.src;
    if ( undefined === targetSource ) return false;
    const isProperSize = isImageWithinSizeBounds( _target );

    isProperSize.then( ( success, failure ) => {
      // window.console.log( 'AWAITING', success );
      // Remove image link and prompt explainer saying photo is too large
      if ( false === success ) {
        if ( targetSource === desktopSrc ) {
          desktopSrc = '';
        } else if ( targetSource === mobileSrc ) {
          mobileSrc = '';
        }
        alert( `That image URL is for a file over ${getMaxImageSize()}MB. Please use a smaller file for best performance.` );
      }
    } )
    .catch( error => {
      window.console.error( 'ERROR', 'Failed to load the image file for size checking.' );
    } );
  }

  onMount( () => {
    window.setTimeout( () => {
      isActive = true;
    }, 1000 );
  } );
</script>

<style type="text/scss">
  @import '../styles/vars';

  :root {
    --decades-vh: 100vh;
    --t-delay: 0.5s;
  }

  .decades-opener {
    align-items: center;
    background-color: #000;
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    height: var(--decades-vh, calc(100vh - 30px));
    justify-content: center;
    margin-bottom: 0;
    overflow: hidden;
    padding-bottom: 0;
    position: relative;
    width: 100vw;
  }

  .decades-opener::before {
    background-color: #000;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .decades-opener.is-active::before {
    opacity: 0.64;
    transition: opacity 0.75s ease-in-out 0s;
  }

  .decades-opener > p:empty,
  .decades-opener > br {
    display: none;
  }

  .decades-opener-dek {
    display: block;
  }

  @media screen and (min-width: 768px) {
    .decades-opener {
      height: 100vh;
      width: 100%;
    }
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .decades-opener {
      overflow: hidden;
    }
  }

  .decades-opener-image {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    transform: translateX(-101vw);
    width: 100%;
  }

  .decades-opener.is-active .decades-opener-image:nth-child(2) {
    transition-delay: var(--t-delay, 0.5s);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(3) {
    transition-delay: calc(var(--t-delay, 0.5s) * 2);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(4) {
    transition-delay: calc(var(--t-delay, 0.5s) * 3);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(5) {
    transition-delay: calc(var(--t-delay, 0.5s) * 4);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(6) {
    transition-delay: calc(var(--t-delay, 0.5s) * 5);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(7) {
    transition-delay: calc(var(--t-delay, 0.5s) * 6);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(8) {
    transition-delay: calc(var(--t-delay, 0.5s) * 7);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(9) {
    transition-delay: calc(var(--t-delay, 0.5s) * 8);
  }

  .decades-opener.is-active .decades-opener-image:nth-child(10) {
    transition-delay: calc(var(--t-delay, 0.5s) * 9);
  }

  .decades-opener-image.is-desktop {
    display: block;
  }

  @media screen and (max-width: 767px) {
    .decades-opener-image {
      display: none;
    }
  }

  .decades-opener-image.is-mobile {
    display: block;
    object-position: top center;
  }

  @media screen and (min-width: 768px) {
    .decades-opener-image.is-mobile {
      display: none;
    }
  }

  @media screen and (max-width: 900px) and (max-height: 500px) and (orientation: landscape) {
    .decades-opener-image.is-mobile.is-desktop {
      display: block;
    }

    .decades-opener-image.is-mobile.is-mobile {
      display: none;
    }
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .decades-opener-image.is-mobile {
      height: auto;
    }
  }

  .decades-opener.is-active .decades-opener-image {
    transform: translateX(0);
    transition: transform 0s linear 0s;
  }

  .decades-opener-hed {
    color: #fff;
    font-weight: 700;
    margin-bottom: 9px;
    max-width: 250px;
    opacity: 0;
    padding-left: 24px;
    padding-right: 24px;
    text-align: center;
    transform: translateY(15px);
    z-index: 2;
  }

  @media screen and (min-width: 625px) {
    .decades-opener-hed {
      margin-bottom: 9px;
      max-width: 450px;
    }
  }

  @media screen and (min-width: 768px) {
    .decades-opener-hed {
      max-width: 590px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .decades-opener-hed {
      font-size: 96px;
      letter-spacing: normal;
      line-height: 0.79;
      margin-bottom: 12px;
      max-width: 590px;
    }
  }

  @media screen and (max-width: 900px) and (max-height: 500px) {
    .decades-opener-hed {
      font-size: 36px;
      letter-spacing: 0.6px;
      line-height: 32px;
      margin-bottom: 2px;
      max-width: 365px;
    }
  }

  .decades-opener.is-active .decades-opener-hed {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.25s ease-in-out 0s,
      transform 0.25s ease-in-out 0s;
  }

  .decades-opener-dek {
    color: #fff;
    margin: 0;
    max-width: 288px;
    opacity: 0;
    padding: 0 16px;
    text-align: center;
    transform: translateY(15px);
    z-index: 2;
  }

  @media screen and (max-width: 768px) and (max-height: 500px) {
    .decades-opener-dek {
      max-width: 450px;
    }
  }

  @media screen and (min-width: 768px) {
    .decades-opener-dek {
      max-width: 610px;
      padding: 0;
    }
  }

  .decades-opener.is-active .decades-opener-dek {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.25s ease-in-out 0.25s,
      transform 0.25s ease-in-out 0.25s;
  }

  .decades-opener-byline.byline {
    margin-top: 5px;
  }

  @media screen and (min-width: 768px) {
    .decades-opener-byline.byline {
      margin-top: 8px;
    }
  }

  .decades-opener-button {
    background-color: transparent;
    border: 3px solid blue;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 48px;
    margin: 20px auto 0;
    outline: none;
    opacity: 0;
    position: relative;
    touch-action: manipulation;
    transform: translateY(15px);
    width: 48px;
  }

  .decades-opener-button svg {
    height: 20px;
    left: 50%;
    padding: 0 0 0 2px;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(90deg);
  }

  @media screen and (min-width: 768px) {
    .decades-opener-button {
      margin-bottom: 120px;
      margin-top: 19px;
    }
  }

  @media screen and (max-width: 900px) and (max-height: 500px) {
    .decades-opener-button {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 1024px) {
    .decades-opener-button {
      margin-bottom: 90px;
    }
  }

  .decades-opener.is-active .decades-opener-button {
    opacity: 1;
    transform: translateY(0);
    transition: background-color 0.25s ease-in-out,
      border-color 0.25s ease-in-out,
      opacity 0.25s ease-in-out 0.5s,
      transform 0.5s ease-in-out 0.5s;
  }

  @media screen and (min-width: 768px) {
    .decades-opener-button:hover {
      background-color: blue;
    }
  }

  .decades-opener-button:active {
    background-color: #fff;
    border-color: #fff;
    transition: none;
  }

  .decades-opener-button:active svg path {
    stroke: blue;
    transition: none;
  }

  .decades-opener-button svg path {
    stroke: #fff;
    transition: stroke 0.25s ease-in-out;
  }

  .decades-maker-new-header-image-inputs {
    display: block;
    margin-bottom: 16px;
    width: 100%;
  }

  .decades-maker-new-header-image-button {
    background-color: $purple;
    border-radius: 4px;
    border: none;
    color: #fff;
    display: block;
    padding: 8px 16px;
    transition: background-color 0.25s ease-in-out;

    &:hover {
      background-color: $purple-hover;
    }

    &:active {
      background-color: $purple-active;
    }
  }

  .image-placeholder-test {
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1px;
  }

  [contenteditable] {
    border: 1px dotted $decades-blue;
  }

  .decades-opener.is-toggled {
    [contenteditable] {
      border: none;
    }
  }

  pre {
    display: none;
  }
</style>

<header class="decades-opener" class:is-active={isActive} class:is-toggled={$isToggled} bind:this={_opener}>
  <div class="decades-opener-images is-desktop">
    {#each desktopImages as desktopImage(desktopImage.id)}
      <img class="decades-opener-image is-desktop" {...desktopImage}>
    {/each}
  </div>

  <div class="decades-opener-images is-mobile">
    {#each mobileImages as mobileImage(mobileImage.id)}
      <img class="decades-opener-image is-mobile" {...mobileImage}>
    {/each}
  </div>

  <h1 class="decades-opener-hed headline" class:serif={$isSerifHed} contenteditable on:blur={e => { changeToPlainText( e ); storeTextChange( e, 'hed' ); }}>{@html hed}</h1>
  <p class="decades-opener-dek deck"><span contenteditable on:blur={e => { changeToPlainText( e ); storeTextChange( e, 'dek' ); }}>{@html dek}</span> <span class="decades-opener-byline byline" contenteditable on:blur={e => { changeToPlainText( e ); storeTextChange( e, 'byline' ); }}>{@html byline}</span><button class="decades-opener-button" type="button"><svg height="21" viewBox="0 0 13 21" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m15 20 9 9 9-9" fill="none" stroke="#000" stroke-width="3" transform="matrix(0 -1 1 0 -18.5 34.5)"/></svg></button></p>

  <OpenerHelper {images} on:deleteimage={deleteImage} on:adjustimages={adjustImages} on:makeserif={makeHedSerif}>
    <input id="desktop-opener-url" class="decades-maker-new-header-image-inputs" slot="decades-maker-new-header-image-desktop-src" type="text" placeholder="https://desktop" required="true" bind:value={desktopSrc} />
    <input id="mobile-opener-url" class="decades-maker-new-header-image-inputs" slot="decades-maker-new-header-image-mobile-src" type="text" placeholder="https://mobile" required="true" bind:value={mobileSrc} />
    <input id="opener-alt-text" class="decades-maker-new-header-image-inputs" slot="decades-maker-new-header-image-alt" type="text" placeholder="Descriptive image text" required="false" bind:value={altText} />
    <button class="decades-maker-new-header-image-button credit" slot="decades-maker-new-header-image-button" on:click={addNewOpenerImage}>Add New Header Image</button>
  </OpenerHelper>

  <img class="image-placeholder-test" src="{desktopSrc}" bind:this={desktopPlaceholderImage} on:load={checkImageFileSize} />
  <img class="image-placeholder-test" src="{mobileSrc}" bind:this={mobilePlaceholderImage} on:load={checkImageFileSize} />
</header>
