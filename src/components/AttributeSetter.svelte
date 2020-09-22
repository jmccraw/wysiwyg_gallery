<script>
  import { isToggled } from '../utilities/ToggleStore.js';
	export let accentColor;
	export let highlightColor;
	export let analytics;
</script>

<style type="text/scss">
  @import '../styles/vars';

	.decades-attribute-container {
    border: 2px solid $light-gray;
    box-sizing: border-box;
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
    position: relative;
  }

  label {
    display: inline-block;
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  input {
    display: inline-block;
  }
</style>

{#if ! $isToggled}
<aside class="decades-attribute-container">
  <label for="accent-color">Accent Color (RGB, RGBA, Hex; default #d00):</label>
  <slot name="new-accent-color" class="accent-color"></slot>
  <label for="highlight-color">Accent Color (a darker variant for interactions):</label>
  <slot name="new-highlight-color" class="highlight-color"></slot>
  <label for="analytics-name">Analytics Tracking Name (lowercase, hyphens, no spaces):</label>
  <slot name="new-analytics-name" class="analytics-name"></slot>
</aside>
{/if}
