<script lang="ts">
	import Cell from '$lib/components/Cell.svelte';
	import Definition from '$lib/components/Definition.svelte';
	import { Crossword } from '$lib/crossword.svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
	let crossword = new Crossword(
		data.horizontal,
		data.vertical,
		data.id,
		data.cells,
		data.definitions
	);
</script>

<main>
	<section class="play-mode">
		<div class="crossword-container">
			{#each crossword.cells as row}
				<div class="flex">
					{#each row as cell}
						<Cell
							bind:black={cell.black}
							number={cell.number}
							computeGridNumbersCallback={crossword.computeGridNumbers}
						/>
					{/each}
				</div>
			{/each}
		</div>
		<div class="definitions-container">
			{#each Object.entries(crossword.definitions) as [direction, definitionsList]}
				<h3>{direction}</h3>
				<ul>
					{#each definitionsList as definition}
						<li>
							<Definition number={definition.number} bind:text={definition.text} />
						</li>
					{/each}
				</ul>
			{/each}number
		</div>
	</section>
</main>
