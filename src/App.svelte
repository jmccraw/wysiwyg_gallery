<script>
	import Opener from './components/Opener.svelte';
	import StickyHeader from './components/StickyHeader.svelte';
	import AttributeSetter from './components/AttributeSetter.svelte';
	import GalleryContainer from './components/GalleryContainer.svelte';

	let accentColor;
	let highlightColor;
	let analytics;
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
		<input id="accent-color" name="accent-color" type="text" placeholder="#d00" bind:value={accentColor} accentColor={accentColor} slot="new-accent-color" />
		<input id="highlight-color" name="highlight-color" type="text" placeholder="" bind:value={highlightColor} highlightColor={highlightColor} slot="new-highlight-color" />
		<input id="analytics-name" name="analytics-name" type="text" placeholder="cowboy-60" bind:value={analytics} analytics={analytics} slot="new-analytics-name" />
	</AttributeSetter>
	<GalleryContainer />
</main>
