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
      header: header,
      subheader: subheader
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
</style>

<aside>
  <label for="new-header">New Header Text:</label>
  <input id="new-header" name="new-header" type="text" placeholder="New Header" bind:value={header} />
  <label for="new-subheader">New Subheader Text (Optional):</label>
  <input id="new-subheader" name="new-subheader" type="text" placeholder="New Subheader" bind:value={subheader} />
  <button class="add-button" type="button" on:click={dispatchNewHeader}>Add New Header</button>
</aside>
