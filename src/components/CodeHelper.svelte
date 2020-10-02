<script>
  import { onMount } from 'svelte';
  import OpenerCodeHelper from './OpenerCodeHelper.svelte';
  import StickyHeader from './StickyHeader.svelte';
  import GalleryCodeHelper from './GalleryCodeHelper.svelte';
  import RelatedStoriesCodeHelper from './RelatedStoriesCodeHelper.svelte';
  import { getValue } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';
  import {
    accentCodeStore,
    activeCodeStore,
    analyticsCodeStore,
    openerCodeStore,
    galleryCodeStore,
    relatedStoriesCodeStore
    } from '../utilities/CodeHelperStore.js';

  $: items = $galleryCodeStore;
  $: openerCodeHelperProps = $openerCodeStore;
  $: relatedLinks = $relatedStoriesCodeStore;
  $: accentHelper = '' !== $accentCodeStore ? `--decades-accent:${$accentCodeStore};` : '';
  $: activeHelper = '' !== $activeCodeStore ? `--decades-accent-active:${$activeCodeStore};` : '';

  let hasMounted = false;
  let _codeHelper;
  let _textarea;

  /**
   * Gets the innerHTML from all the other components and constructs the textarea element
   * @param {Array} unnecessaryItems The items used to reactively rerun this function
   */
  function buildTextareaCode( unnecessaryItems = null ) {
    if ( ! hasMounted ) return;

    const scribeHTML = '<noptags><photo1-wide>';

    // Set a timeout for a small bit of time because otherwise the <pre>
    // hasn't had a chance to update yet
    window.setTimeout( () => {
      _textarea.value = scribeHTML + _codeHelper.innerHTML;
      // window.console.log( unnecessaryItems );
    }, 50 );
  }

  onMount( () => {
    _textarea = document.querySelector( '.code-helper__code' );
    _codeHelper = document.getElementById( 'code-helper-container' );
    hasMounted = true;

    buildTextareaCode();
  } );

  $: if ( items || relatedLinks || openerCodeHelperProps || $activeCodeStore || $accentCodeStore || $analyticsCodeStore ) {
    buildTextareaCode();
  }
</script>

<style type="text/scss">
  @import '../styles/vars';

  .code-helper {
    margin: 0 auto 100px;
    max-width: 600px;
    position: relative;
    width: 100%;
  }

  h3 {
    margin-bottom: 16px;
    text-align: center;
  }

  .code-helper__code {
    height: 250px;
    position: relative;
    width: 100%;
  }

  pre {
    display: none;
  }

  #code-helper-container {
    background-color: rgba(125, 50, 125, 0.5);
    // display: block;
    max-width: 600px;
    overflow: hidden;
  }

  h4.subhead.small {
    margin-bottom: 16px;
    margin-top: 32px;
    text-align: center;
  }

  h4 + textarea {
    min-height: 100px;
    width: 100%;
  }

  .code-helper.is-toggled {
    display: none;
  }
</style>

<aside class="code-helper" class:is-toggled={$isToggled}>
  <h3 class="subhead small">Copy-Paste to Scribe Story Field</h3>

  <pre id="code-helper-container">
    <main class="decades" style="{accentHelper} {activeHelper}" data-analytics="{$analyticsCodeStore}">
      <OpenerCodeHelper {...openerCodeHelperProps} />
      <StickyHeader />
      <GalleryCodeHelper {items} />
      <RelatedStoriesCodeHelper {relatedLinks} />
    </main>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/ScrollToPlugin.min.js"></script>
    <script src="https://a.espncdn.com/prod/scripts/pagetype/otl/20191212_decades_best/vendor/hammer.min.js"></script>
  </pre>

  <textarea class="code-helper__code"></textarea>

  <h4 class="subhead small">Copy-Paste to Scribe Headfile Body (CSS) Field</h4>
  <textarea>pagetype/otl/tungsten/HCo_tungsten.css,fonts/bentonsans.css,fonts/bentonsansmedium.css,fonts/bentonsansbold.css,pagetype/otl/publico/publico-secure.css,pagetype/otl/longform_styleguide/css/styleguide.css,pagetype/otl/20200302_female_nba_coaches/css/style-v15.css&disableOptimizations=true&minify=false</textarea>

  <h4 class="subhead small">Copy-Paste to Scribe Headfile Storage (JS) Field</h4>
  <textarea>pagetype/otl/20200302_female_nba_coaches/main-v6.js&disableOptimizations=true&minify=false</textarea>
</aside>