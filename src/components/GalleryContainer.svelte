<script>
  import GalleryItem from './GalleryItem.svelte';

</script>

<style type="text/scss">
  /*
  * Project CSS for the Decade's Best
  * Container for Photos and Galleries
  */
  @import '../styles/vars';

  .decades-container {
    margin: 16px auto 0;
    max-width: 600px;
    padding: 0 calc(50vw - 600px);
    position: relative;

    @media screen and (min-width: 768px) {
      margin-top: 40px;
    }
  }

  .decades-container > .body-text {
    color: #333;
    font-size: 18px;
    line-height: 1.56;
    margin-bottom: 25px;
    opacity: 1;
    padding: 0 16px;
    transition: opacity 0.25s ease-in-out 0.25s;

    &.is-lazy-thing {
      opacity: 0;
    }

    @media screen and (min-width: 375px) {
      padding-left: 18px;
      padding-right: 18px;
    }

    @media screen and (min-width: 414px) {
      padding-left: 36px;
      padding-right: 36px;
    }

    @media screen and (min-width: 664px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .decades-container > .body-text:last-of-type {
    margin-bottom: 15px;
  }

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

    &.is-lazy-thing {
      color: #fff;
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

  .decades-container-hed.no-motion.is-lazy-thing .decades-container-hed-team.subhead.alt {
    opacity: 0;
  }

  // RELATED STORIES IN A GALLERY SECTION
  .decades-gallery-related-stories {
    margin-bottom: 35px;
    opacity: 1;
    padding: 0 16px;
    position: relative;
    transition: opacity 0.25s ease-in-out 0.25s;

    &.is-lazy-thing {
      opacity: 0;
    }

    @media screen and (min-width: 375px) {
      padding-left: 18px;
      padding-right: 18px;
    }

    @media screen and (min-width: 414px) {
      padding-left: 36px;
      padding-right: 36px;
    }

    @media screen and (min-width: 664px) {
      padding-left: 0;
      padding-right: 0;
    }

    @media screen and (min-width: 768px) {
      margin-bottom: 45px;
    }
  }

  .decades-gallery-related-stories-hed.subhead.alt {
    color: $decades-related-black;
    font-size: 16px;
    font-weight: 400;

    @media screen and (min-width: 414px) {
      display: inline;
    }
  }

  .decades-gallery-related-stories-link.deck {
    border-bottom: 1px dotted $decades-red;
    color: $decades-related-black;
    display: inline;
    line-height: 24px;
    text-decoration: none;
    transition: color 0.25s ease-in-out,
      border-bottom 0.25s ease-in-out;
  }

  .decades-gallery-related-stories-link.deck:hover {
    @media screen and (min-width: 768px) {
      border-bottom-style: solid;
      color: $decades-red;
    }
  }

  .decades-gallery-related-stories-link.deck:active {
    border-bottom: 1px solid currentColor;
    color: $decades-active-red;
  }
</style>

<article class="decades-container">
  <GalleryItem />
</article>
