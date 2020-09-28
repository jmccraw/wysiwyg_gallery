<script>
  import { onMount } from 'svelte';
  import GalleryCodeHelper from './GalleryCodeHelper.svelte';
  import { getValue } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';
  import { opener, stickyHeader, gallery, relatedStories, scripts } from '../utilities/CodeHelperStore.js';

  $: items = $gallery;

  let _codeHelper;
  let _textarea;
  let _opener;
  let _stickyHeader;
  let _gallery;
  let _relatedStories;
  let _scripts;

  /**
   * Gets the innerHTML from all the other components and constructs the textarea element
   */
  function buildTextareaCode() {
    const scribeHTML = '<noptags><photo1-wide>';
    const _article = document.createElement( 'article' );
    const openerHTML = _opener.innerHTML;
    const stickyHTML = _stickyHeader.outerHTML;
    const galleryHTML = _gallery.innerHTML;
    const relatedStoriesHTML = _relatedStories.innerHTML;
    const scriptsHTML = _scripts.innerHTML;

    _article.classList.add( 'decades' );
    _article.insertAdjacentHTML( 'beforeend', openerHTML );
    _article.insertAdjacentHTML( 'beforeend', stickyHTML );
    _article.insertAdjacentHTML( 'beforeend', galleryHTML );
    _article.insertAdjacentHTML( 'beforeend', relatedStoriesHTML );

    _textarea.value = scribeHTML + _article.outerHTML + scriptsHTML;
  }

  onMount( () => {
    _textarea = document.querySelector( '.code-helper__code' );
    _opener = document.getElementById( 'opener-code' );
    _stickyHeader = document.querySelector( '.decades-opener-sticky-header' );
    _gallery = document.getElementById( 'gallery-code' );
    _relatedStories = document.getElementById( 'related-stories-code' );
    _scripts = document.getElementById( 'scripts-code' );

    _codeHelper = document.getElementById( 'code-helper-container' );

    buildTextareaCode();
  } );
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
</style>

<pre id="scripts-code">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/ScrollToPlugin.min.js"></script>
  <script src="https://a.espncdn.com/prod/scripts/pagetype/otl/20191212_decades_best/vendor/hammer.min.js"></script>
</pre>

{#if ! $isToggled}
<aside class="code-helper">
  <h3 class="subhead small">Copy-Paste to Scribe Story Field</h3>

  <pre id="code-helper-container">
    <GalleryCodeHelper {items} />
  </pre>

  <textarea class="code-helper__code"></textarea>
</aside>
{/if}