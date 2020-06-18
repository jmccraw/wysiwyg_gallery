<script>
	export let accentColor;
	export let highlightColor;
	export let analytics;
</script>

<style type="text/scss">
	.decades-attribute-container {
    margin: 20px auto;
    max-width: 600px;
    position: relative;
  }

  label {
    display: inline-block;
  }

  input {
    display: inline-block;
  }
</style>

<aside class="decades-attribute-container">
  <label for="accent-color">Accent Color (RGB, RGBA, Hex; default #d00):</label>
  <slot name="new-accent-color" class="accent-color"></slot>
  <label for="highlight-color">Accent Color in a darker variant (for hover and other interactions):</label>
  <slot name="new-highlight-color" class="highlight-color"></slot>
  <label for="analytics-name">Analytics tracking name (lowercase, with limited hyphens):</label>
  <slot name="new-analytics-name" class="analytics-name"></slot>
</aside>
