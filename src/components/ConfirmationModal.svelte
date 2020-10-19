<script>
  import { confirmationMessage } from '../utilities/ConfirmationModalStore.js';

  let isModalling = false;
  let _message;

  $: {
    launchModal( $confirmationMessage );
  }

  /**
   * Launches the modal animation with the included text
   * @param {String} message The message to display
   */
  function launchModal( message ) {
    if ( ! _message || isModalling || '' === message ) return;

    isModalling = true;
    _message.innerHTML = message;
    _message.parentElement.classList.add( 'is-visible' );
    window.setTimeout( () => {
      _message.parentElement.classList.remove( 'is-visible' );
      $confirmationMessage = '';
      isModalling = false;
    }, 2000 );
  }
</script>

<style type="text/scss">
  @import '../styles/vars';

  .confirmation-modal {
    background-color: #fff;
    bottom: 24px;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.75));
    height: 60px;
    opacity: 0;
    position: fixed;
    right: 24px;
    transform: translate3d(0, 60px, 0);
    transition: transform 0.35s ease-in-out,
      opacity 0.2s ease-in-out;
    width: 300px;
  }

  :global(.confirmation-modal.is-visible) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .confirmation-modal__message {
    color: $green;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
  }
</style>

<aside class="confirmation-modal">
  <p class="confirmation-modal__message body-text" bind:this={_message}></p>
</aside>