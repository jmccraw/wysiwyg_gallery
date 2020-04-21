<script>
	import Opener from './components/Opener.svelte';
	import StickyHeader from './components/StickyHeader.svelte';
	import GalleryContainer from './components/GalleryContainer.svelte';
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

<main>
	<Opener />
	<StickyHeader />
	<GalleryContainer />
</main>
