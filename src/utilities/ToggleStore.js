import { writable } from 'svelte/store';

const isToggled = writable( false );
const isSerifHed = writable( false );

export { isToggled, isSerifHed };
