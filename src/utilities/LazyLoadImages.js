export let _lazyImages = null;
export let lazyImagesObserver = null;

/**
 * Sets the _lazyImages variable
 */
export function setLazyImages( _els ) {
  _lazyImages = _els;
}

/**
 * Loads all of the images as a fallback for older browsers
 */
function loadImagesFallback() {
  _lazyImages.forEach( ( _lazyImage ) => {
    const src = _lazyImage.dataset.src;

    _lazyImage.classList.remove( 'is-lazy' );
    _lazyImage.setAttribute( 'src', src );
    _lazyImage.parentElement.classList.add( 'is-loaded' );
  } );
}

/**
 * Checks for images that need lazy loading (have the data-src attribute and 'is-lazy' attribute)
 * @param {Array} observersArray The IntersectionObserver objects
 */
function checkForLazyLoadImages( observersArray ) {
  observersArray.forEach( ( observedItem ) => {
    let _lazyImage;
    let src;

    if ( observedItem.isIntersecting ) {
      _lazyImage = observedItem.target;
      src = _lazyImage.dataset.src;

      _lazyImage.setAttribute( 'src', src );
      window.setTimeout( () => {
        _lazyImage.classList.remove( 'is-lazy' );
        _lazyImage.parentElement.classList.add( 'is-loaded' );
      }, 250 );
      lazyImagesObserver.unobserve( _lazyImage );
    }
  } );
}

export function watchForLazyImages() {
  // Checks if the browser supports the IntersectionObserver and uses that, else,
  // just loads all the images and hides the Tallies
  // Modified from: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  if ( window.IntersectionObserver ) {
    lazyImagesObserver = new IntersectionObserver( checkForLazyLoadImages );
    _lazyImages.forEach( ( _lazyImage ) => {
      lazyImagesObserver.observe( _lazyImage );
    } );
  } else {
    loadImagesFallback();
  }
}
