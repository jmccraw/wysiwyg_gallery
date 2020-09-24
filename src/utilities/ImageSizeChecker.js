// Make the max image size default to 3
let maxImageSize = 3;

/**
 * Returns the maxImageSize
 */
export function getMaxImageSize() {
  return maxImageSize;
}

/**
 * Set a new max image size (in megabytes), or else default to the current
 * @param {Number} newImageSize The new image size
 */
export function setMaxImageSize( newImageSize ) {
  maxImageSize = newImageSize || maxImageSize;
}

/**
 * Check the given image size against the max image size
 * @param {Number} imageSize The image size to check against
 * @return {Boolean} Whether the indicated image size is within bounds (true)
 */
function checkIfInBounds( imageSize ) {
  return imageSize <= maxImageSize;
}

/**
 * Convert the image size (in bytes) to megabytes (using base-10)
 * Modified from Stack Overflow: https://stackoverflow.com/a/18650828/1472477
 * @param {Number} imageBytes The image size to convert
 * @return {Number} The convereted image size
 */
function convertImageToMegabytes( imageBytes ) {
  if ( 0 === imageBytes ) return 0;

  // We'll use base-10 to simulate size on disc, instead of 1024 8-bit conversion
  const k = 1000;

  return parseFloat( ( imageBytes / Math.pow( k, 2 ) ).toFixed( 2 ) );
}

/**
 * Receive an image element and make a fetch request to get the header information
 * for its size and passes it off for checking
 * @param {Object} _image The image element to check against
 * @return {Promise}
 */
export async function isImageWithinSizeBounds( _image ) {
  if ( undefined === _image ) return true;
  return new Promise( ( resolve, reject ) => {

    fetch( _image.src, { method: 'HEAD' } )
    .then( resp => {
      if ( 200 === resp.status ) {
        return resp.headers.get( 'Content-Length' );
      } else {
        throw new Error( 'No response found' );
      }
    } )
    .then( imageSize => {
      window.console.log( 'fetched: ', imageSize, checkIfInBounds( convertImageToMegabytes( +imageSize ) ) );
      resolve( checkIfInBounds( convertImageToMegabytes( +imageSize ) ) );
    } )
    .catch( error => {
      window.console.error( error );
      reject( false );
    } );
  } );
}

/**
 * Determine if the image is within acceptable size bounds
 * @event event The load event
 */
export function checkImageFileSize( event ) {
  const _target = event.target;
  if ( undefined === _target.src ) return false;

  const isProperSize = isImageWithinSizeBounds( _target );

  isProperSize.then( ( success, failure ) => {
    // window.console.log( galleryImage, 'isProperSize: ', isProperSize );
    // window.console.log( 'EVENT', _target );

    window.console.log( 'success, failure', success, failure );

    // Remove image link and prompt explainer saying photo is too large
    if ( false === success ) {
      window.console.log( 'galleryImage: ', _target.src, typeof _target );

      _target.src = _target.dataset.placeholder || '';
      alert( `That image URL is for a file over ${getMaxImageSize()}MB. Please use a smaller file for best performance.` );
    }
  } )
  .catch( error => {
    window.console.error( 'ERROR', error );
  } );
}
