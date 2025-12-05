<script lang="ts">
	import type { Definition } from '$lib/types/crossword';
	let { number, text = $bindable() }: { number: Definition['number']; text: Definition['text'] } =
		$props();
</script>

<div>
	<span class="definition-grid-number">
		{number}
	</span>
	<label>
		<input name="definition-text" bind:value={text} type="text" />
	</label>
</div>
