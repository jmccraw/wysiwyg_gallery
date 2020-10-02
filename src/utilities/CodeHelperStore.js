import { writable } from 'svelte/store';

const accentCodeStore = writable( '' );
const activeCodeStore = writable( '' );
const analyticsCodeStore = writable( '' );
const openerCodeStore = writable( '' );
const galleryCodeStore = writable( [] );
const relatedStoriesCodeStore = writable( [] );

export { accentCodeStore, activeCodeStore, analyticsCodeStore, openerCodeStore, galleryCodeStore, relatedStoriesCodeStore };
