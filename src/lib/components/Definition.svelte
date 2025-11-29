<script lang="ts">
	import type { Definition } from '$lib/types/crossword';
	let {
		gridNumber,
		text = $bindable()
	}: { gridNumber: Definition['gridNumber']; text: Definition['text'] } = $props();
</script>

<div>
	<span class="definition-grid-number">
		{gridNumber}
	</span>
	<label>
		<input name="definition-text" bind:value={text} type="text" />
	</label>
</div>
