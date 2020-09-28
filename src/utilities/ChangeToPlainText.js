/**
 * To prevent the clipboard from inserting superfluous information, such as
 * the styles from the orignating page, we need change the input to plain
 * text and then reinsert it.
 * @event event The paste event
 */
export function changeToPlainText( event ) {
  const _target = event.target;

  _target.innerHTML = _target.innerText;
}
