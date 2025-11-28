<script lang="ts">
	import Cell from '$lib/components/Cell.svelte';
	import type { Cell as CellType } from '$lib/types/crossword';
	let hor: number = 1;
	let ver: number = 1;
	let cells: CellType[][] = [[]];

	function createCells(): void {
		cells = Array(ver)
			.fill(null)
			.map(() =>
				Array(hor)
					.fill(null)
					.map(() => ({ number: null, letter: null, black: false }))
			);
	}

	function assignNumbers(): void {
		let sequenceNumber = 1;

		cells.forEach((row) => row.forEach((cell) => (cell.number = null)));

		for (let row = 0; row < ver; row++) {
			for (let col = 0; col < hor; col++) {
				if (!cells[row][col].black && (isHorizontalStart(row, col) || isVerticalStart(row, col))) {
					cells[row][col].number = sequenceNumber++;
				}
			}
		}
	}

	function isHorizontalStart(row, col) {
		return (col === 0 || cells[row][col - 1].black) && col < hor - 1 && !cells[row][col + 1].black;
	}

	function isVerticalStart(row, col) {
		return (row === 0 || cells[row - 1][col].black) && row < ver - 1 && !cells[row + 1][col].black;
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
		<button type="submit" on:click|preventDefault={createCells}>Create grid</button>

		<section class="create-mode">
			<div>
				{#each cells as row}
					<div class="flex">
						{#each row as cell}
							<Cell bind:black={cell.black} bind:number={cell.number} />
						{/each}
					</div>
				{/each}
			</div>
			<button on:click={assignNumbers}>Assign numbers </button>
		</section>
	</form>
</div>
