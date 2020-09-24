<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import GalleryItemHelper from './GalleryItemHelper.svelte';
  import GalleryItemHeaderHelper from './GalleryItemHeaderHelper.svelte';
  import GalleryItemTextHelper from './GalleryItemTextHelper.svelte';
  import GallerySlideshow from './GallerySlideshow.svelte';
  import GallerySlideshowHelper from './GallerySlideshowHelper.svelte';
  import GalleryCodeHelper from './GalleryCodeHelper.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import { setLazyImages, watchForLazyImages } from '../utilities/LazyLoadImages.js';
  import { storeValue, getValue } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';
  import { isSerifHed } from '../utilities/SerifHedStore.js';
  import { checkImageFileSize } from '../utilities/ImageSizeChecker.js';

  let items = getValue( 'items', 'object' ) || [
    {
      id: 1,
      type: 'image',
      classList: 'is-borderless',
      imageClass: '',
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/1959_cowboys.jpg',
      caption: {
        date: '1959',
        title: 'New faces of the franchise',
        text: 'Tex Schramm (left) and Tom Landry agree to become the first president/general manager and coach for the expansion franchise. With his famed fedora, Landry directed the Cowboys for 29 years, winning 250 games and two Super Bowls.',
        credit: 'AP Photo'
      }
    },
    {
      id: 2,
      type: 'image',
      classList: '',
      imageClass: '',
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/1960_cowboys-v2.jpg',
      caption: {
        date: '1960',
        title: 'Staying close to home',
        text: 'Don Meredith, a quarterback out of SMU, was the Cowboys’ first star and was named the NFL Player of the Year in 1966. After his surprise retirement in 1968, he became even more famous as a Monday Night Football analyst.',
        credit: 'AP Photo/DWF'
      }
    },
    {
      id: 3,
      type: 'image',
      classList: '',
      imageClass: '',
      src: 'https://a.espncdn.com/prod/styles/pagetype/otl/20200319_cowboys_60/images/1967_cowboys.jpg',
      caption: {
        date: '1967',
        title: 'Cold as ice',
        text: 'Quarterback Bart Starr scored on a sneak with 13 seconds to play as Green Bay wins the NFL championship against the Cowboys in the “Ice Bowl.” Game-time temperature at Lambeau Field was -15 degrees with a wind chill of -48.',
        credit: 'Press-Gazette/USA TODAY Sports'
      }
    }
  ];

  let currID = items.length;
  let isInitial = true;
  let imageSrc = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
  let slideSrc1 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
  let slideSrc2 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
  let slideSrc3 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
  let slideSrc4 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
  let slideSrc5 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
  let isFullWidth = false;
  let isFullWidthSlideshow = false;
  let isVisible1 = true;
  let isVisible2 = true;
  let isVisible3 = true;
  let isVisible4 = true;
  let isVisible5 = true;
  let year;
  let title;
  let text;
  let credit;
  let title1;
  let title2;
  let title3;
  let title4;
  let title5;
  let text1;
  let text2;
  let text3;
  let text4;
  let text5;
  let credit1;
  let credit2;
  let credit3;
  let credit4;
  let credit5;
  let aspectRatio = 0.75;

  /**
   * Toggles the page from Editor view to Preview view
   */
  function toggleRealPage() {

    // If not toggled, switch to Preview view, and vice versa
    if ( ! $isToggled ) {
      isToggled.set( true );
    } else {
      isToggled.set( false );
    }
  }

  /**
   * Saves the items array to localstorage
   */
  function saveItems() {
    storeValue( 'items', items );
  }

  /**
   * Resets the photo gallery item helper
   */
  function resetPhotoHelperItem() {
    isFullWidth = false;
    imageSrc = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
    year.innerHTML = '19XX';
    title.innerHTML = 'Title';
    text.innerHTML = 'Body text tk.';
    credit.innerHTML = 'Photo Credit TK';
  }

  /**
   * Resets the gallery slideshow item helper
   */
  function resetSlideshowHelperItem() {
    isFullWidthSlideshow = false;
    slideSrc1 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
    slideSrc2 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
    slideSrc3 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
    slideSrc4 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
    slideSrc5 = 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg';
    title1.innerHTML = 'Title';
    title2.innerHTML = 'Title';
    title3.innerHTML = 'Title';
    title4.innerHTML = 'Title';
    title5.innerHTML = 'Title';
    text1.innerHTML = 'Body text tk.';
    text2.innerHTML = 'Body text tk.';
    text3.innerHTML = 'Body text tk.';
    text4.innerHTML = 'Body text tk.';
    text5.innerHTML = 'Body text tk.';
    credit1.innerHTML = 'Photo Credit TK';
    credit2.innerHTML = 'Photo Credit TK';
    credit3.innerHTML = 'Photo Credit TK';
    credit4.innerHTML = 'Photo Credit TK';
    credit5.innerHTML = 'Photo Credit TK';
    isVisible1 = true;
    isVisible2 = true;
    isVisible3 = true;
    isVisible4 = true;
    isVisible5 = true;
    aspectRatio = 0.75;
  }

  /**
   * Adds a new photo gallery item to the page
   */
  function addNewPhoto() {
    isInitial = false;
    items = items.concat( {
      id: ++currID,
      type: 'image',
      classList: '',
      imageClass: isFullWidth ? 'is-full-width' : '',
      src: imageSrc,
      caption: {
        date: year.innerHTML,
        title: title.innerHTML,
        text: text.innerHTML,
        credit: credit.innerHTML
      }
    } );
    saveItems();
    resetPhotoHelperItem();
  }

  /**
   * Adds a new gallery slideshow option to the page
   */
  function addNewSlideshow() {
    isInitial = false;
    const slideshowData = {
      id: ++currID,
      type: 'gallery',
      classList: '',
      imageClass: isFullWidthSlideshow ? 'is-full-width' : '',
      aspectRatio: aspectRatio,
      slides: []
    };

    if ( isVisible1 ) {
      slideshowData.slides.push( {
        src: slideSrc1,
        caption: {
          title: title1.innerHTML,
          text: text1.innerHTML,
          credit: credit1.innerHTML
        }
      } );
    }

    if ( isVisible2 ) {
      slideshowData.slides.push( {
        src: slideSrc2,
        caption: {
          title: title2.innerHTML,
          text: text2.innerHTML,
          credit: credit2.innerHTML
        }
      } );
    }

    if ( isVisible3 ) {
      slideshowData.slides.push( {
        src: slideSrc3,
        caption: {
          title: title3.innerHTML,
          text: text3.innerHTML,
          credit: credit3.innerHTML
        }
      } );
    }

    if ( isVisible4 ) {
      slideshowData.slides.push( {
        src: slideSrc4,
        caption: {
          title: title4.innerHTML,
          text: text4.innerHTML,
          credit: credit4.innerHTML
        }
      } );
    }

    if ( isVisible5 ) {
      slideshowData.slides.push( {
        src: slideSrc5,
        caption: {
          title: title5.innerHTML,
          text: text5.innerHTML,
          credit: credit5.innerHTML
        }
      } );
    }

    items = items.concat( slideshowData );
    saveItems();
    resetSlideshowHelperItem();
  }

  /**
   * Deletes the given gallery item
   * @event event The click event origination
   */
  function deleteGalleryItem( event ) {
    const index = +event.target.dataset.index;
    isInitial = false;

    if ( 0 === index && items[1] ) {
      items[1].classList = items[0].classList;
    }

    items.splice( +event.target.dataset.index, 1 );
    items = items;
    saveItems();
  }

  /**
   * Receive a message to add a new header item to the page
   * @event event The dispatch event
   */
  function addNewHeaderItem( event ) {
    isInitial = false;
    const header = event.detail.header;
    const subheader = event.detail.subheader;

    items = items.concat( {
      id: ++currID,
      type: 'header',
      header: header,
      subheader: subheader
    } );
    saveItems();
  }

  /**
   * Receive a message to add a new paragraph item to the page
   * @event event The dispatch event
   */
  function addNewParagraph( event ) {
    isInitial = false;
    const text = event.detail.text;
    const isSerif = event.detail.isSerif;

    items = items.concat( {
      id: ++currID,
      type: 'paragraph',
      isSerif: isSerif,
      text: text
    } );
    saveItems();
  }

  function handleDndConsider(e) {
    isInitial = false;
    items = e.detail.items;
  }

  function handleDndFinalize(e) {
    isInitial = false;
    items = e.detail.items;
    saveItems();
  }

  onMount( () => {
    setLazyImages( document.querySelectorAll( '.decades-gallery-image.is-lazy' ) );
    watchForLazyImages();
  } );
</script>

<style type="text/scss">
  /*
  * Project CSS for the Decade's Best
  * Gallery embeds
  */
  @import '../styles/vars';

  .decades-gallery {
    margin: 0 auto;
    max-width: 600px;
    overflow: hidden;
    position: relative;
    width: calc(100% - 32px);

    @media screen and (min-width: 375px) {
      width: calc(100% - 36px);
    }

    @media screen and (min-width: 414px) {
      width: calc(100% - 72px);
    }

    @media screen and (min-width: 664px) {
      width: 100%;
    }
  }

  .decades-gallery.is-big {
    margin-top: -46px;
    max-width: 1000px;
    opacity: 0;
    transform: translateY(150px);
    width: 100vw;

    @media screen and (max-width: 623px) {
      margin-top: -24px;
    }
  }

  .decades-gallery.is-big:last-child {
    margin-top: 32px;
    opacity: 1;
    transform: none;

    .decades-gallery-nav {
      opacity: 1;
    }
  }

  .decades-gallery-slider {
    display: flex;
    flex-shrink: 1;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    transition: transform 0.5s ease-in-out;
  }

  .decades-gallery-item {
    border-top: 1px solid $decades-blue;
    border-top: 1px solid var(--decades-accent, $decades-blue);
    flex-shrink: 0;
    margin: 0 auto 21px;
    max-width: 600px;
    width: calc(100% - 32px);

    &:last-of-type {
      margin-bottom: 0;
    }

    &.is-template {
      padding-top: 23px;
    }

    @media screen and (min-width: 375px) {
      width: calc(100vw - 36px);
    }

    @media screen and (min-width: 414px) {
      width: calc(100vw - 72px);
    }

    @media screen and (min-width: 664px) {
      width: 100vw;
    }
  }

  .decades-gallery .decades-gallery-item {
    width: 100%;
  }

  .decades-gallery-item .body-text a {
    border-bottom: 1px dotted $decades-blue;
    border-bottom: 1px dotted var(--decades-accent, $decades-blue);
    color: currentColor;
    text-decoration: none;
    transition: color 0.25s ease-in-out;

    @media screen and (min-width: 768px) {
      &:hover {
        border-bottom-style: solid;
        color: $decades-black;
      }
    }

    &:active {
      border-bottom: 1px solid currentColor;
      color: $decades-blue;
      color: var(--decades-accent, $decades-blue);
    }
  }

  .decades-gallery.is-big .decades-gallery-item {
    margin-left: 0;
    margin-right: 0;
    max-width: 1000px;

    &:last-of-type {
      margin-bottom: 26px;
    }
  }

  .decades-gallery-slideshow-container {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    width: 110%;

    .decades-gallery-item {
      display: none;
      border-top: none;
      margin-right: 24px;
      margin-top: 0;

      &.is-visible {
        display: block;
      }

      &:last-of-type {
        padding-right: 24px;
      }
    }

    .decades-gallery-item.is-full-width {
      max-width: 1000px;
      width: 100vw;
    }

    .decades-gallery-image {
      padding-top: 0;
    }

    .decades-gallery-slideshow-reset-button {
      display: none;

      &.is-visible {
        display: block;
      }
    }
  }

  .decades-gallery-image {
    height: auto;
    // max-height: calc(600px * 0.745);
    opacity: 1;
    padding-top: 23px;
    pointer-events: none;
    transition: opacity 0.25s ease-in;
    width: 100%;

    &.is-lazy {
      opacity: 0;
    }
  }

  .decades-gallery-image.is-full-width {
    margin-left: -16px;
    width: 100vw;

    @media screen and (min-width: 375px) {
      margin-left: -18px;
    }

    @media screen and (min-width: 414px) {
      margin-left: -36px;
    }

    @media screen and (min-width: 672px) {
      margin-left: calc((100vw - 600px) / -2);
      max-width: 1000px;
    }

    @media screen and (min-width: 1000px) {
      margin-left: -200px;
    }
  }

  .decades-gallery-item:not(.is-template):first-of-type {
    border-top: none;
  }

  .decades-gallery.is-inline .decades-gallery-item,
  .decades-gallery-item.is-borderless {
    border-top: none;
  }

  .decades-container-hed:not(.no-motion) + .decades-gallery-item .decades-gallery-image {
    border-top: none;
    margin-top: -46px;
  }

  .decades-container-hed.no-motion + .decades-gallery-item .decades-gallery-image {
    border-top: none;
    padding-top: 14px;
  }

  .decades-gallery.is-big .decades-gallery-image {
    border-top: none;
    max-height: 734px;
    padding-top: 0;

    @media screen and (max-width: 999px) {
      max-height: 73.4vw;
    }
  }

  .decades-gallery-caption {
    color: #000;
    font-weight: normal;
    opacity: 1;
    margin: 7px auto 0;
    max-width: calc(100vw - 32px);
    transition: opacity 0.25s ease-in;

    @media screen and (min-width: 375px) {
      max-width: calc(100vw - 36px);
    }

    @media screen and (min-width: 414px) {
      max-width: calc(100vw - 72px);
    }

    @media screen and (min-width: 664px) {
      max-width: 600px;
    }

    @media screen and (min-width: 768px) {
      margin-top: 8px;
    }
  }

  .decades-gallery-image.is-lazy + .decades-gallery-caption {
    opacity: 0;
  }

  .decades-gallery.is-big .decades-gallery-caption {
    opacity: 0;
    margin-top: 14px;
    transition: opacity 0.25s ease-in-out;
  }

  .decades-gallery.is-big .decades-gallery-item.is-active .decades-gallery-caption {
    opacity: 1;
  }

  .decades-gallery-date {
    color: $decades-blue;
    color: var(--decades-accent, $decades-blue);
    line-height: 21px;
  }

  .decades-gallery-caption-index {
    color: $decades-red;
    font-size: 15px;
  }

  .decades-gallery-caption .body-text {
    margin: 0;

    .credit {
      color: $decades-credit-color;
      display: inline;
    }

    .credit.is-right {
      display: block;
      margin-right: -1px;
      margin-top: -3px;
      text-align: right;
    }

    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
  }

  // TODO FIXME Adjust top so it's centered no matter what length caption text
  .decades-gallery-nav {
    align-items: center;
    display: flex;
    justify-content: space-between;
    left: 0;
    opacity: 0;
    padding: 0 20px;
    position: absolute;
    // Half of the 432px height of gallery image, minus 24px for half button height, plus half padding-top
    top: 208px;
    transition: opacity 0.25s ease-in-out 0.25s;
    width: calc(100% - 40px);
    z-index: 3;

    &.is-visible {
      opacity: 1;
    }

    @media screen and (max-width: 623px) {
      padding-left: 16px;
      padding-right: 16px;
      top: calc((100% - 44px) * 0.75 / 2 - 16px);
      top: calc((100% - 44px) * var(--decades-ratio, 0.75) / 2 - 16px);
      width: calc(100% - 32px);
    }

    @media screen and (max-width: 359px) {
      top: calc((100% - 32px) * 0.75 / 2 - 16px);
      top: calc((100% - 32px) * var(--decades-ratio, 0.75) / 2 - 16px);
    }
  }

  .decades-gallery.is-big .decades-gallery-nav {
    // Half of the 745px height of the big gallery image, minus 24px for half the height of buttons
    top: 349px;

    @media screen and (max-width: 999px) {
      top: calc(37.25vw - 24px);
    }

    @media screen and (max-width: 623px) {
      top: calc(37.25vw - 16px);
    }
  }

  .decades-gallery.is-inline .decades-gallery-nav {
    opacity: 1;
    top: 92px;
    transition: opacity 0.25s ease-in-out 0.25s;

    &.is-lazy-thing {
      opacity: 0;
    }

    @media screen and (min-width: 375px) {
      top: calc((75vw - 36px) / 2 - 16px);
      top: calc((100vw - 36px) * var(--decades-ratio, 0.75) / 2 - 16px);
    }

    @media screen and (min-width: 414px) {
      top: calc((75vw - 72px) / 2 - 16px);
      top: calc((100vw - 72px) * var(--decades-ratio, 0.75) / 2 - 16px);
    }

    @media screen and (min-width: 664px) {
      top: calc(600px * 0.75 / 2 - 22px);
      top: calc(600px * var(--decades-ratio, 0.75) / 2 - 22px);
    }
  }

  .decades-gallery-nav-button {
    background-color: rgba(255, 255, 255, 0.85);
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    height: 44px;
    outline: none;
    padding: 5px 0 0;
    position: relative;
    touch-action: manipulation;
    transition: background-color 0.25s ease-in-out,
      opacity 0.25s ease-in-out 1.25s;
    width: 44px;

    &.is-left svg {
      transform: rotate(180deg) translateX(1px);

      @media screen and (max-width: 663px) {
        transform: rotate(180deg) translateX(2px);
      }
    }

    svg path {
      stroke: $decades-red;
      transition: stroke 0.25s ease-in-out;
    }

    @media screen and (max-width: 663px) {
      height: 32px;
      padding-left: 3px;
      width: 32px;
    }
  }

  .decades-gallery-nav-button:hover {
    @media screen and (min-width: 768px) {
      background-color: rgba(221, 0, 0, 0.85);

      svg path {
        stroke: #fff;
      }
    }
  }

  .decades-gallery-nav-button:active {
    background-color: $decades-active-red;
    transition: none;

    svg path {
      stroke: #fff;
      transition: none;
    }
  }

  .decades-gallery-nav-button svg {
    @media screen and (max-width: 623px) {
      height: 15px;
    }
  }

  // Header/Subheader Styles
  .decades-container-hed {
    color: $decades-red;
    display: inline-block;
    font-size: 200px;
    margin-left: calc(50% - 268px); // half the screen, minus half the well width // 232px; // calc((1000px - 536px) / 2) 1000px gallery, with 536px well
    margin-top: 48px;
    line-height: 0.75;
    opacity: 0;
    padding: 12px 0 21px;
    position: relative;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-24px);
    z-index: 3;

    &::before,
    &::after {
      background-color: $decades-red;
      bottom: -7px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      content: '';
      height: 8px;
      left: 0;
      position: absolute;
      right: 0;
    }

    &::after {
      bottom: auto;
      top: -7px;

      @media screen and (min-width: 376px) and (max-width: 623px) {
        top: -9px;
      }
    }

    @media screen and (max-width: 999px) {
      font-size: 148px;
      margin-left: calc((100vw - 600px) / 2);
      padding-bottom: 14px;
      padding-top: 9px;
      transform: translateX(0);
    }

    @media screen and (max-width: 623px) {
      font-size: 100px;
      margin-left: 24px;
      padding-bottom: 7px;
      padding-top: 7px;
    }

    @media screen and (max-width: 359px) {
      margin-left: 16px;
    }
  }

  .decades-container-hed.no-motion {
    color: $decades-red;
    display: block;
    font-size: 30px;
    line-height: 0.87;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px;
    opacity: 1;
    text-align: center;
    text-shadow: none;
    transition: color 0.25s ease-in-out 0.35s;
    width: calc(100% - 32px);

    &::before {
      display: none;
    }

    @media screen and (min-width: 375px) {
      width: calc(100% - 36px);
    }

    @media screen and (min-width: 414px) {
      padding-bottom: 8px;
      padding-top: 15px;
      width: calc(100% - 72px);
    }

    @media screen and (min-width: 664px) {
      width: 100%;
    }

    @media screen and (min-width: 768px) {
      font-size: 48px;
      letter-spacing: 0.3px;
      line-height: 1.13;
      margin-top: 83px;
      padding-bottom: 13px;
    }
  }

  .decades-container:first-of-type .decades-container-hed.no-motion {
    margin-top: 72px;

    @media screen and (min-width: 768px) {
      margin-top: 106px;
    }
  }

  .decades-container-hed.no-motion::after {
    background-color: #000;
    box-shadow: none;
    height: 6px;
    top: -38px;
    transition: height 0.25s ease-in-out 0.25s;

    @media screen and (min-width: 768px) {
      top: -62px;
    }
  }

  .decades-container-hed.no-motion.is-lazy-thing::after {
    height: 1px;
  }

  .decades-container-hed.no-motion .word-break {
    display: block;

    @media screen and (min-width: 768px) {
      display: inline;
    }
  }

  .decades-container-hed.no-motion .decades-container-hed-team.subhead.alt {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    margin-top: 30px;
    opacity: 1;
    position: relative;
    text-transform: uppercase;
    transition: opacity 0.25s ease-in-out 0.45s;

    &::before {
      background-color: currentColor;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      right: 0;
      top: -16px;
    }

    @media screen and (min-width: 768px) {
      font-size: 20px;
      margin-top: 22px;
      padding-top: 1px;
    }
  }

  // Form Styles

  [contenteditable] {
    border: 1px dotted $decades-blue;
  }

  button {
    margin-top: 24px;
  }

  .decades-gallery-item-container.is-toggled {
    pointer-events: none;

    [contenteditable] {
      border: none;
    }

    button {
      display: none;
    }
  }

  .toggle-page-view {
    background-color: $purple;
    border: none;
    border-radius: 4px;
    bottom: 16px;
    color: #fff;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.75));
    left: 16px;
    outline: none;
    opacity: 0.5;
    padding: 16px 16px 14px;
    position: fixed;
    text-transform: uppercase;
    touch-action: manipulation;
    transition: background-color 0.25s ease-in-out,
      opacity 0.25s ease-in-out;
    width: 225px;
    z-index: 9999;

    &:hover {
      opacity: 1;
    }

    &:active {
      background-color: $purple-active;
    }
  }

  pre {
    display: none;
  }

  .add-new-gallery-slideshow-full-width-container {
    margin-top: 16px;

    input {
      margin-bottom: 8px;
    }
  }

  :global(button.credit) {
    border: none;
    border-radius: 4px;
    color: $decades-black;
    cursor: pointer;
    outline: none;
    touch-action: manipulation;
  }

  :global(.decades-gallery-delete-button.credit) {
    background-color: transparent;
    border: none;
    color: $decades-red;
    height: 20px;
    margin-bottom: -20px;
    padding: 0;
    text-decoration: underline;
  }

  :global(.add-new-gallery-item-button.credit),
  :global(.add-new-gallery-slideshow-item-button.credit) {
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
</style>

<article class="decades-gallery-item-container" class:is-toggled={$isToggled} use:dndzone={{items: items}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
{#each items as item, index (item.id)}
  {#if 'image' === item.type}
    <figure class="decades-gallery-item {item.className}">
      <button class="decades-gallery-delete-button credit" type="button" data-index="{index}" on:click={deleteGalleryItem}>Delete Image</button>
      <img class="decades-gallery-image {item.imageClass} {isInitial ? 'is-lazy' : ''}" in:fade="{{ duration: 500 }}" src="{isInitial ? 'https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg' : item.src}" data-src="{item.src}">
      <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-date">{@html item.caption.date}</span> {@html item.caption.title} <p class="body-text">{@html item.caption.text} <span class="credit">{@html item.caption.credit}</span></p></figcaption>
    </figure>
  {:else if 'gallery' === item.type}
    <div>
      <button class="decades-gallery-delete-button credit" type="button" data-index="{index}" on:click={deleteGalleryItem}>Delete Slideshow</button>
      <GallerySlideshow {...item} index={index} />
    </div>
  {:else if 'header' === item.type}
    <div>
      <button class="decades-gallery-delete-button credit" type="button" data-index="{index}" on:click={deleteGalleryItem}>Delete Header</button>
      <h2 class="decades-container-hed headline no-motion is-lazy-thing" class:serif={$isSerifHed}>{@html item.header} {#if item.subheader}<span class="decades-container-hed-team subhead alt">{@html item.subheader}</span>{/if}</h2>
    </div>
  {:else if 'paragraph' === item.type}
    <div>
      <button class="decades-gallery-delete-button credit" class:serif={item.isSerif} type="button" data-index="{index}" on:click={deleteGalleryItem}>Delete Paragraph</button>
      <p class="body-text serif">{@html item.text}</p>
    </div>
  {/if}
{/each}
</article>

{#if ! $isToggled}

<GalleryItemHeaderHelper on:addheader={addNewHeaderItem} />

<GalleryItemTextHelper on:addtext={addNewParagraph} />

<GalleryItemHelper>
  <figure class="decades-gallery-item is-template" slot="new-gallery-item">
    <img class="decades-gallery-image {isFullWidth ? 'is-full-width' : ''}" src="{imageSrc}" on:load={checkImageFileSize} data-placeholder="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg">
    <label for="image-type">Full-width Image:</label>
    <input id="image-type" class="image-type" name="image-full-width" type="checkbox" bind:checked={isFullWidth}>
    <label for="image-src">Image URL at 2x:</label>
    <input id="image-src" name="image-src" type="text" placeholder="Image URL" bind:value={imageSrc}>
    <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-date" contenteditable bind:this={year}>19XX</span> <span contenteditable bind:this={title}>Title</span> <p class="body-text"><span contenteditable bind:this={text}>Body text tk.</span> <span class="credit" contenteditable bind:this={credit}>Photo Credit TK</span></p></figcaption>
  </figure>

  <button class="add-new-gallery-item-button credit" slot="add-new-gallery-item-button" type="button" on:click={addNewPhoto}>Add New Image</button>
</GalleryItemHelper>

<GallerySlideshowHelper>
  <div class="decades-gallery-slideshow-container" slot="new-gallery-slideshow-item">
    <figure class="decades-gallery-item is-template {isFullWidthSlideshow ? 'is-full-width' : ''}" class:is-visible={isVisible1}>
      <img class="decades-gallery-image" src="{slideSrc1}" on:load={checkImageFileSize} data-placeholder="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg">
      <label for="slideshow-src">Image URL at 2x:</label>
      <input id="slideshow-src" name="slideshow-src" type="text" placeholder="Image URL" bind:value={slideSrc1}>
      <figcaption class="decades-gallery-caption subhead alt"><span contenteditable bind:this={title1}>Title</span> <p class="body-text"><span contenteditable bind:this={text1}>Body text tk.</span> <span class="credit" contenteditable bind:this={credit1}>Photo Credit TK</span></p></figcaption>
      <button class="decades-gallery-slideshow-item-delete-button credit" type="button" on:click="{() => { isVisible1 = false }}">Delete Slide</button>
    </figure>

    <figure class="decades-gallery-item is-template {isFullWidthSlideshow ? 'is-full-width' : ''}" class:is-visible={isVisible2}>
      <img class="decades-gallery-image" src="{slideSrc2}" on:load={checkImageFileSize} data-placeholder="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg">
      <label for="slideshow2-src">Image URL at 2x:</label>
      <input id="slideshow2-src" name="slideshow2-src" type="text" placeholder="Image URL" bind:value={slideSrc2}>
      <figcaption class="decades-gallery-caption subhead alt"><span contenteditable bind:this={title2}>Title</span> <p class="body-text"><span contenteditable bind:this={text2}>Body text tk.</span> <span class="credit" contenteditable bind:this={credit2}>Photo Credit TK</span></p></figcaption>
      <button class="decades-gallery-slideshow-item-delete-button credit" type="button" on:click="{() => { isVisible2 = false }}">Delete Slide</button>
    </figure>

    <figure class="decades-gallery-item is-template {isFullWidthSlideshow ? 'is-full-width' : ''}" class:is-visible={isVisible3}>
      <img class="decades-gallery-image" src="{slideSrc3}" on:load={checkImageFileSize} data-placeholder="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg">
      <label for="slideshow3-src">Image URL at 2x:</label>
      <input id="slideshow3-src" name="slideshow3-src" type="text" placeholder="Image URL" bind:value={slideSrc3}>
      <figcaption class="decades-gallery-caption subhead alt"><span contenteditable bind:this={title3}>Title</span> <p class="body-text"><span contenteditable bind:this={text3}>Body text tk.</span> <span class="credit" contenteditable bind:this={credit3}>Photo Credit TK</span></p></figcaption>
      <button class="decades-gallery-slideshow-item-delete-button credit" type="button" on:click="{() => { isVisible3 = false }}">Delete Slide</button>
    </figure>

    <figure class="decades-gallery-item is-template {isFullWidthSlideshow ? 'is-full-width' : ''}" class:is-visible={isVisible4}>
      <img class="decades-gallery-image" src="{slideSrc4}" on:load={checkImageFileSize} data-placeholder="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg">
      <label for="slideshow4-src">Image URL at 2x:</label>
      <input id="slideshow4-src" name="slideshow4-src" type="text" placeholder="Image URL" bind:value={slideSrc4}>
      <figcaption class="decades-gallery-caption subhead alt"><span contenteditable bind:this={title4}>Title</span> <p class="body-text"><span contenteditable bind:this={text4}>Body text tk.</span> <span class="credit" contenteditable bind:this={credit4}>Photo Credit TK</span></p></figcaption>
      <button class="decades-gallery-slideshow-item-delete-button credit" type="button" on:click="{() => { isVisible4 = false }}">Delete Slide</button>
    </figure>

    <figure class="decades-gallery-item is-template {isFullWidthSlideshow ? 'is-full-width' : ''}" class:is-visible={isVisible5}>
      <img class="decades-gallery-image" src="{slideSrc5}" on:load={checkImageFileSize} data-placeholder="https://a.espncdn.com/prod/styles/pagetype/otl/20191212_decades_best/images/placeholder/decades-well-image-placeholder.jpg">
      <label for="slideshow5-src">Image URL at 2x:</label>
      <input id="slideshow5-src" name="slideshow5-src" type="text" placeholder="Image URL" bind:value={slideSrc5}>
      <figcaption class="decades-gallery-caption subhead alt"><span contenteditable bind:this={title5}>Title</span> <p class="body-text"><span contenteditable bind:this={text5}>Body text tk.</span> <span class="credit" contenteditable bind:this={credit5}>Photo Credit TK</span></p></figcaption>
      <button class="decades-gallery-slideshow-item-delete-button credit" type="button" on:click="{() => { isVisible5 = false }}">Delete Slide</button>
    </figure>

    <button class="decades-gallery-slideshow-reset-button credit" class:is-visible="{!isVisible1 && !isVisible2 && !isVisible3 && !isVisible4 && !isVisible5}" type="button" on:click={resetSlideshowHelperItem}>Reset Slideshow Helper</button>
  </div>

  <div class="add-new-gallery-slideshow-full-width-container" slot="add-new-gallery-slideshow-full-width-container">
    <label for="slideshow-type">Full-width Slideshow:</label>
    <input id="slideshow-type" class="slideshow-type" name="slideshow-full-width" type="checkbox" bind:checked={isFullWidthSlideshow}>
    <label for="slideshow-aspect-ratio" style="display:block">Set image aspect ratio (height / width, e.g., 9 / 16 = 0.5625):</label>
    <input id="slideshow-aspect-ratio" class="slideshow-aspect-ratio" name="slideshow-aspect-ratio" type="text" bind:value={aspectRatio}>
  </div>
  <button class="add-new-gallery-slideshow-item-button credit" slot="add-new-gallery-slideshow-item-button" type="button" on:click={addNewSlideshow}>Add New Slideshow</button>
</GallerySlideshowHelper>

{/if}

<button class="toggle-page-view pill credit" type="button" on:click={toggleRealPage}>Toggle to {$isToggled ? 'Editor' : 'Page Preview'}</button>

<pre id="gallery-code">
  <GalleryCodeHelper {items} />
</pre>
