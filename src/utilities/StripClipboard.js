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

  // Get any selection text the user might have highlighted. We'll be sure to replace this
  // with the clipboard contents, instead of overwriting the whole text input area
  const selection = window.getSelection().toString();
  const selectionSearch = new RegExp( selection, 'i' );

  window.console.log( 'CLIPBOARD pasted text', selection, _target, pastedText );

  // Change the innerHTML, replacing the selected text with the pasted text
  _target.innerHTML = _target.innerHTML.replace( selectionSearch, pastedText );
}
