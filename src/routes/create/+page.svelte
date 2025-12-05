<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Cell from '$lib/components/Cell.svelte';
	import Definition from '$lib/components/Definition.svelte';
	import { Crossword } from '$lib/crossword.svelte.js';

	export let data: { crossword: Crossword };
	let { crossword } = data;
	let hor = crossword.hor;
	let ver = crossword.ver;
	let responseState = '';

	function createCrossword(hor: number, ver: number) {
		if (crossword.workInProgress && !confirm('Are you sure you want to reset the grid?')) return;
		crossword = Crossword.createEmptyGrid(hor, ver);
	}

	async function saveCrossword() {
		debugger
		const response = await fetch('/api/create', {
			method: 'POST',
			body: JSON.stringify(crossword),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(response);
		responseState = await response.json();
	}
</script>

<div>
	<form>
		<div class="flex gap-5">
			<label>
				Horizontal squares
				<input name="hor" bind:value={hor} type="number" step="1" min="1" />
			</label>
			<label>
				Vertical squares
				<input name="ver" bind:value={ver} type="number" step="1" min="1" />
			</label>
		</div>
		<Button type="submit" onclickCallback={() => createCrossword(hor, ver)}>
			{crossword.workInProgress ? 'Reset' : 'Create'} grid
		</Button>
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

	<Button type="button" onclickCallback={() => saveCrossword()}>Anvedi ao</Button>

	<style>
	</style>
</div>
