import { writable } from 'svelte/store';

const confirmationMessage = writable( '' );

export { confirmationMessage };
