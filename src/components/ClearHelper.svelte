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
    background-color: $decades-red;
    border: 1px solid currentColor;
    border-radius: 8px;
    bottom: 16px;
    color: #fff;
    cursor: pointer;
    display: block;
    font: 400 16px/1 'BentonSansReg', Arial, sans-serif;
    letter-spacing: 0.5px;
    margin: 100px auto;
    outline: none;
    padding: 16px 16px 14px;
    text-transform: uppercase;
    transition: background-color 0.25s ease-in-out;
    touch-action: manipulation;

    &:hover {
      background-color: $decades-active-red;
    }
  }
</style>

{#if ! $isToggled}<button type="button" on:click={clearLocalStore}>Reset All Content</button>{/if}