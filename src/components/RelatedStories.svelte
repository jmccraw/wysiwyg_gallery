<script>
  import RelatedStoriesHelper from './RelatedStoriesHelper.svelte';
  import RelatedStoriesCodeHelper from './RelatedStoriesCodeHelper.svelte';
  import { storeValue, getValue } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';

  let relatedLinks = getValue( 'relatedLinks', 'object' ) || [];
  let link;
  let title;

  /**
   * Store the relatedLinks to localStorage
   */
  function storeLinks() {
    storeValue( 'relatedLinks', relatedLinks );
  }

  /**
   * Receive a dispatch stating which Related Story index to delete
   * @event event The dispatch event
   */
  function deleteRelatedLink( event ) {
    const index = event.detail.index;;

    if ( 0 === index && relatedLinks[1] ) {
      relatedLinks[1].classList = relatedLinks[0].classList;
    }

    relatedLinks.splice( index, 1 );
    relatedLinks = relatedLinks;
    storeLinks();
  }

  /**
   * Adds the new Related Stories link and clears the input fields for more
   */
  function addNewLink() {
    if ( '' === link || '' === title ) return;

    const relatedLink = {
      title: title,
      link: link
    };

    relatedLinks = relatedLinks.concat( relatedLink );
    storeLinks();
    title = '';
    link = '';
  }
</script>

<style type="text/scss">
  @import '../styles/vars';

  .decades-related-stories {
    border-bottom: 6px solid #000;
    border-top: 6px solid #000;
    margin: 22px auto 48px;
    max-width: 600px;
    opacity: 1;
    padding: 35px 0 30px;
    position: relative;
    text-align: center;
    transition: opacity 0.25s ease-in-out 0.25s;
    width: 100%;

    @media screen and (max-width: 623px) {
      max-width: calc(100vw - 48px);
    }

    @media screen and (max-width: 359px) {
      max-width: calc(100vw - 32px);
    }

    @media screen and (min-width: 768px) {
      padding-bottom: 32px;
      padding-top: 39px;
    }
  }

  .decades-related-stories-hed {
    color: $decades-red;
    font: 400 16px/1.19 'BentonSansBold', sans-serif;
    -webkit-font-smoothing: antialiased;
    margin: 0 auto -8px;
  }

  .decades-related-stories-link-container {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 0;

    > br {
      display: none;
    }
  }

  :global(.decades-related-stories-link.subhead.alt.small) {
    background-image: none;
    color: $decades-related-black;
    display: inline-block;
    font-family: 'BentonSans', sans-serif;
    font-weight: 400;
    margin-bottom: 7px;
    padding-left: 24px;
    padding-right: 24px;
    position: relative;
    text-decoration: none;
    text-shadow: none;
    transition: color 0.25s ease-in-out,
      border-bottom 0.25s ease-in-out;

    @media screen and (min-width: 768px) {
      margin-bottom: 9px;
    }

    @media screen and (max-width: 623px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  :global(.decades-related-stories-link.subhead.alt.small:hover) {
    @media screen and (min-width: 768px) {
      color: $decades-red;

      span {
        border-bottom-style: solid;
      }
    }
  }

  :global(.decades-related-stories-link.subhead.alt.small:active) {
    color: $decades-active-red;

    span {
      border-bottom: 1px solid currentColor;
    }
  }

  :global(.decades-related-stories-link span) {
    border-bottom: 1px dashed $decades-red;
    transition: border-bottom-color 0.25s ease-in-out;
  }

  .decades-related-stories-credits-byline.caption {
    color: #fff;
    margin: 0 auto;
    max-width: 500px;
    padding: 28px 24px 75px;
    text-align: center;

    @media screen and (max-width: 623px) {
      padding-left: 44px;
      padding-right: 44px;
    }

    @media screen and (max-width: 359px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  div {
    display: flex;
    flex-flow: row wrap;
    margin-top: 50px;
  }

  label {
    text-align: left;
    width: 30%;
  }

  input {
    width: 65%;
  }

  pre {
    display: none;
  }
</style>

<aside class="decades-related-stories">
  <h4 class="decades-related-stories-hed">Related Stories</h4>
  <p class="decades-related-stories-link-container">
    <RelatedStoriesHelper {relatedLinks} on:deletelink={deleteRelatedLink} />
  </p>

  {#if ! $isToggled}
  <div>
    <label for="related-link">Related Story Link:</label>
    <input id="related-link" name="related-link" type="text" placeholder="https://espn.com" bind:value={link}>
    <label for="related-title">Related Story Title:</label>
    <input id="related-title" name="related-title" type="text" placeholder="The world leader in sports" bind:value={title}>
    <button type="button" on:click={addNewLink}>Add New Related Story</button>
  </div>
  {/if}
</aside>

<pre id="related-stories-code">
  <RelatedStoriesCodeHelper {relatedLinks} />
</pre>