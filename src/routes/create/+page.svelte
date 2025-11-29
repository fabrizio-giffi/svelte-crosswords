<script lang="ts">
	import Cell from '$lib/components/Cell.svelte';
	import { Crossword } from '$lib/crossword.svelte';
	let hor: number = 1;
	let ver: number = 1;
	let crossword: Crossword;

	function createCrossword(hor: number, ver: number) {
		if (crossword && !confirm('Are you sure you want to reset the grid?')) return;
		crossword = new Crossword(hor, ver);
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
		<button type="submit" on:click|preventDefault={() => createCrossword(hor, ver)}
			>{crossword ? 'Reset' : 'Create'} grid</button
		>
	</form>

	<section class="create-mode">
		{#if crossword}
			<div class="crossword-container">
				{#each crossword.cells as row}
					<div class="flex">
						{#each row as cell}
							<Cell
								bind:black={cell.black}
								bind:number={cell.number}
								computeGridNumbersCallback={crossword.computeGridNumbers}
							/>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<style>
	</style>
</div>
