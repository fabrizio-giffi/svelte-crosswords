<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Cell from '$lib/components/Cell.svelte';
	import Definition from '$lib/components/Definition.svelte';
	import { Crossword } from '$lib/crossword.svelte.js';

	export let data: { crossword: Crossword };
	let { crossword } = data;
	let horizontal = crossword.horizontal;
	let vertical = crossword.vertical;
	let responseState = '';

	function createCrossword(horizontal: number, vertical: number) {
		if (crossword.workInProgress && !confirm('Are you sure you want to reset the grid?')) return;
		crossword = new Crossword(horizontal, vertical);
	}

	async function saveCrossword() {
		const response = crossword.saveToDb();
		responseState = await response;
	}
</script>

<div>
	<form>
		<div class="flex gap-5">
			<label>
				Horizontal squares
				<input name="horizontal" bind:value={horizontal} type="number" step="1" min="1" />
			</label>
			<label>
				Vertical squares
				<input name="vertical" bind:value={vertical} type="number" step="1" min="1" />
			</label>
		</div>
		<Button type="submit" onclickCallback={() => createCrossword(horizontal, vertical)}>
			{crossword.workInProgress ? 'Reset' : 'Create'} grid
		</Button>
		<Button type="button" onclickCallback={() => saveCrossword()}>Anvedi ao</Button>
	</form>

	<section class="create-mode">
		{#if crossword.workInProgress}
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
								<Definition gridNumber={definition.gridNumber} bind:text={definition.text} />
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		{/if}
	</section>

	<style>
	</style>
</div>
