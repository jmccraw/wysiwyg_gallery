<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let text;
  let isSerif;

  /**
   * Dispatch a message to add a new paragraph section to the page
   * @event event The click event
   */
  function dispatchNewParagraph( event ) {
    if ( undefined === text ) return;

    dispatch( 'addtext', {
      text: text.innerHTML,
      isSerif: isSerif
    } );
    text.innerHTML = 'New paragraph of text.';
    isSerif = false;
  }
</script>

<style type="text/scss">
  @import '../styles/vars';

  aside {
    border: 2px solid $light-gray;
    margin-bottom: 60px;
    margin-top: 70px;
    padding: 20px;
  }

  .paragraph-hed {
    font-family: sans-serif;
    font-weight: 700;
    margin-bottom: 5px;
    margin-top: 5px;
    text-transform: uppercase;
  }

  .body-text {
    margin-top: 15px;
  }

  .add-button {
    background-color: $purple;
    border-radius: 4px;
    border: none;
    color: #fff;
    display: block;
    margin-top: -4px;
    padding: 8px 16px;
    transition: background-color 0.25s ease-in-out;

    &:hover {
      background-color: $purple-hover;
    }

    &:active {
      background-color: $purple-active;
    }
  }

  [contenteditable] {
    border: 1px dotted $decades-blue;
  }
</style>

<aside>
  <p class="paragraph-hed">New Paragraph Text:</p>
  <label for="paragraph-serif">Make serif:</label>
  <input type="checkbox" id="paragraph-serif" name="paragraph-serif" bind:checked={isSerif} />
  <p class="body-text" class:serif={isSerif} contenteditable bind:this={text}>New paragraph of text.</p>
  <button class="add-button credit" type="button" on:click={dispatchNewParagraph}>Add New Paragraph</button>
</aside>