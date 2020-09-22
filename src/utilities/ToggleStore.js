import { writable } from 'svelte/store';

const isToggled = writable( false );

export { isToggled };
