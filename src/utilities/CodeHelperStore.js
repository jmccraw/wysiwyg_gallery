import { writable } from 'svelte/store';

const openerCodeStore = writable( false );
const galleryCodeStore = writable( [] );
const relatedStoriesCodeStore = writable( false );

export { openerCodeStore, galleryCodeStore, relatedStoriesCodeStore };
