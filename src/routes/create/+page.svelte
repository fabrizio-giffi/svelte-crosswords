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
				if (isWordStart(row, col)) {
					cells[row][col].number = sequenceNumber++;
				}
			}
		}
	}

	function isWordStart(row: number, col: number) {
		const cellIsBlack: boolean = cells[row][col].black;
		return !cellIsBlack && (_isHorizontalWordStart(row, col) || _isVerticalWordStart(row, col));
	}

	function _isHorizontalWordStart(row: number, col: number) {
		const isLeftEdge: boolean = col === 0;
		const isRightEdge: boolean = col === hor - 1;
		const previousCellIsBlack: boolean = col > 0 ? cells[row][col - 1].black : false;
		const nextCellIsBlack: boolean = col < hor - 1 ? cells[row][col + 1].black : false;
		return (isLeftEdge || previousCellIsBlack) && !isRightEdge && !nextCellIsBlack;
	}

	function _isVerticalWordStart(row: number, col: number) {
		const isTopEdge: boolean = row === 0;
		const isBottomEdge: boolean = row === ver - 1;
		const previousCellIsBlack: boolean = row > 0 ? cells[row - 1][col].black : false;
		const nextCellIsBlack: boolean = row < ver - 1 ? cells[row + 1][col].black : false;
		return (isTopEdge || previousCellIsBlack) && !isBottomEdge && !nextCellIsBlack;
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
