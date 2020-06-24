<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let text;

  /**
   * Dispatch a message to add a new paragraph section to the page
   * @event event The click event
   */
  function dispatchNewParagraph( event ) {
    dispatch( 'addtext', {
      text: text
    } );
    text = '';
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
  <label for="new-paragraph">New Paragraph Text:</label>
  <textarea placeholder="New paragraph text." bind:value={text}></textarea>
  <button class="add-button" type="button" on:click={dispatchNewParagraph}>Add New Paragraph</button>
</aside>