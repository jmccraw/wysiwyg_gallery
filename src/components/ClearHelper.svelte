<script>
  import { clearStore } from '../utilities/LocalStore.js';
  import { isToggled } from '../utilities/ToggleStore.js';

  /**
   * Clear the entire LocalStore on confirm
   */
  function clearLocalStore() {
    const shouldClear = window.confirm( 'This erases all saved content and returns the page to ' +
      'the default state and cannot be undone.\nAre you sure you want to do this?\n(OK = Yes, Cancel = No)' );

    if ( shouldClear ) {
      clearStore();
      window.location.href = window.location.href;
    }
  }
</script>

<style type="text/scss">
  @import '../styles/vars';

  button {
    display: block;
    margin: 100px auto;
  }
</style>

{#if ! $isToggled}<button type="button" on:click={clearLocalStore}>Reset All Content</button>{/if}