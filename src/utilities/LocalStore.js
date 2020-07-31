const storage = window.localStorage;

/**
 * Store the given value in the given key, transforming it to a String when necessary
 * @param {String} key The key store name
 * @param {String|Number|Boolean|Object} value The value to be stored
 */
export function storeValue( key, value ) {
  storage[key] = 'object' === typeof value ? JSON.stringify( value ) : value;
}

/**
 * Return the given key's value, if it exists, and transform to the specified type
 * @param {String} key The item being searched for
 * @param {String} format The expected return format of the data
 */
export function getValue( key, format ) {
  const value = storage[key];

  if ( ! value ) {
    return false;
  }

  if ( 'object' === format ) {
    return JSON.parse( value );
  } else if ( 'number' === format ) {
    return +value;
  } else if ( 'boolean' === format ) {
    return 'true' === value;
  }

  return value;
}

