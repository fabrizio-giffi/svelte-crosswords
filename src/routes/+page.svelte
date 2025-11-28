<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h2 class="font-bold">Play a crossword from the archive</h2>
	<div>
		{#each data.crosswords as crossword}
			___________________________________
			<p>ID {crossword.id}</p>
			<div class="flex gap-3">
				<p>{crossword.hor}</p>
				<p>{crossword.ver}</p>
				<p>{crossword.created}</p>
			</div>
		{/each}
	</div>
</div>
