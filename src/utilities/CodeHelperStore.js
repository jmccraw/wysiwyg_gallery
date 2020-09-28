import { writable } from 'svelte/store';

const opener = writable( false );
const stickyHeader = writable( false );
const gallery = writable( false );
const relatedStories = writable( false );
const scripts = writable( false );

export { opener, stickyHeader, gallery, relatedStories, scripts };
