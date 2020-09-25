/**
 * To prevent the clipboard from inserting superfluous information, such as
 * the styles from the orignating page, we need get the clipboard
 * contents as plain text.
 * Modified from: https://stackoverflow.com/a/12028136/1472477
 * @event event The paste event
 */
export function stripClipboard( event ) {
  event.preventDefault();
  const _target = event.target;
  const pastedText = ( event.originalEvent || event ).clipboardData.getData( 'text/plain' );
  window.console.log( 'CLIPBOARD pasted text', event, _target, pastedText );

  _target.innerHTML = pastedText;
}
