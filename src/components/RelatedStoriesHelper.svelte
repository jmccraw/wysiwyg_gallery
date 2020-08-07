<script>
  import { createEventDispatcher } from 'svelte';
  import { isToggled } from '../utilities/ToggleStore.js';

  const dispatch = createEventDispatcher();

  export let relatedLinks;

  /**
   * Dispatch to the parent container that this link should be deleted
   * @event event The click event
   */
  function dispatchDelete( event ) {
    if ( 0 === relatedLinks.length ) return;

    dispatch( 'deletelink', {
      index: +event.target.dataset.index
    } );
  }
</script>

<style type="text/scss">
  @import '../styles/vars';
  aside {
    margin-bottom: 80px;
    margin-top: 20px;
  }

  .add-button {
    background-color: none;
    border-radius: 50%;
  }
</style>

{#each relatedLinks as {title, link}, index}
{#if ! $isToggled}<button type="button" on:click={dispatchDelete} data-index="{index}">Delete Related Link</button>{/if}
<a href="{link}" class="decades-related-stories-link subhead alt small" rel="noopener"><span>{@html title}</span></a>
{/each}
