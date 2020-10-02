<script>
	import Opener from './components/Opener.svelte';
	import StickyHeader from './components/StickyHeader.svelte';
	import AttributeSetter from './components/AttributeSetter.svelte';
	import GalleryContainer from './components/GalleryContainer.svelte';
	import RelatedStories from './components/RelatedStories.svelte';
	import ClearHelper from './components/ClearHelper.svelte';
	import CodeHelper from './components/CodeHelper.svelte';
	import { storeValue, getValue } from './utilities/LocalStore.js';
	import { accentCodeStore, activeCodeStore, analyticsCodeStore } from './utilities/CodeHelperStore.js';

	let accentColor = getValue( 'accentColor', 'string' ) || '';
	let highlightColor = getValue( 'highlightColor', 'string' ) || '';
	let analytics = getValue( 'analytics', 'string' ) || '';
	accentCodeStore.set( accentColor );
	activeCodeStore.set( highlightColor );
	analyticsCodeStore.set( analytics );

	/**
	 * Store the accent color on blur
	 */
	function storeAccent() {
		window.console.log( 'New Accent: ', accentColor );
		storeValue( 'accentColor', accentColor );
		accentCodeStore.set( accentColor );
	}

	/**
	 * Store the highlight color on blur
	 */
	function storeHighlight() {
		window.console.log( 'New Highlight: ', highlightColor );
		storeValue( 'highlightColor', highlightColor );
		activeCodeStore.set( highlightColor );
	}

	/**
	 * Store the analytics phrase on blur
	 */
	function storeAnalytics() {
		window.console.log( 'New Analytics Phrase: ', analytics );
		storeValue( 'analytics', analytics );
		analyticsCodeStore.set( analytics );
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://a.espncdn.com/combiner/c?v=19&css=pagetype%2Fotl%2Ftungsten%2FHCo_tungsten.css%2Cfonts%2Fbentonsans.css%2Cfonts%2Fbentonsansmedium.css%2Cfonts%2Fbentonsansbold.css%2Cpagetype%2Fotl%2Fpublico%2Fpublico-secure.css&disableOptimizations=true&minify=false&ver=1.0.13" />
	<link rel="stylesheet" href="https://a.espncdn.com/prod/styles/pagetype/otl/longform_styleguide/css/styleguide.css?ver=1.0.13" />
</svelte:head>

<style type="text/scss">
	main {
		position: relative;
	}
</style>

<main style="{accentColor ? `--decades-accent: ${accentColor};` : ''}{highlightColor ? `--decades-accent-active: ${highlightColor};` : ''}" data-analytics="{analytics}">
	<Opener />
	<StickyHeader />
	<AttributeSetter>
		<input id="accent-color" name="accent-color" type="text" placeholder="#d00" bind:value={accentColor} accentColor={accentColor} on:blur={storeAccent} slot="new-accent-color" />
		<input id="highlight-color" name="highlight-color" type="text" placeholder="" bind:value={highlightColor} highlightColor={highlightColor} on:blur={storeHighlight} slot="new-highlight-color" />
		<input id="analytics-name" name="analytics-name" type="text" placeholder="cowboy-60" bind:value={analytics} analytics={analytics} on:blur={storeAnalytics} slot="new-analytics-name" />
	</AttributeSetter>
	<GalleryContainer />
	<RelatedStories />
	<ClearHelper />
	<CodeHelper />
</main>
