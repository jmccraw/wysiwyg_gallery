<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let header;
  let subheader;

  /**
   * Dispatch a message to add a new header section to the page
   * @event event The click event
   */
  function dispatchNewHeader( event ) {
    window.console.log( 'DISPATCHING: ', header, subheader );
    if ( undefined === header ) return;

    dispatch( 'addheader', {
      header: header.innerHTML,
      subheader: subheader.innerHTML
    } );

    header = '';
    subheader = '';
  }
</script>

<style type="text/scss">
  @import '../styles/vars';

  aside {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .add-button {
    background-color: none;
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
      margin-top: 110px;
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

  .decades-container-hed-team.subhead.alt {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    margin-top: 30px;
    opacity: 1;
    position: relative;
    text-align: center;
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

  [contenteditable] {
    border: 1px dotted $decades-blue;
  }
</style>

<aside>
  <!-- <label for="new-header">New Header Text:</label>
  <input id="new-header" name="new-header" type="text" placeholder="New Header" bind:value={header} />
  <label for="new-subheader">New Subheader Text (Optional):</label>
  <input id="new-subheader" name="new-subheader" type="text" placeholder="New Subheader" bind:value={subheader} /> -->


  <h2 class="decades-container-hed headline serif no-motion is-lazy-thing" contenteditable bind:this={header}>Header Text</h2>
  <span class="decades-container-hed-team subhead alt" contenteditable bind:this={subheader}>Optional Subheader</span>


  <button class="add-button" type="button" on:click={dispatchNewHeader}>Add New Header</button>
</aside>
