<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h2 class="font-bold">Play a crossword from the archive</h2>
	<div>
		{#each data.crosswords as crossword}
			___________________________________
			<a href="/play/{crossword.id}">
				<p>ID {crossword.id}</p>
				<div class="flex gap-3">
					<p>{crossword.horizontal}</p>
					<p>{crossword.vertical}</p>
					<p>{crossword.created}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
