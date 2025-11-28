<script lang="ts">
	export let number: number | undefined = undefined;
	export let letter: string | undefined = undefined;
	export let black: boolean = false;

	function toggleBlack() {
		black = !black;
	}
</script>

<button type="button" class={`cell ${black && 'cell-black'}`} on:click={toggleBlack}>
	<span class="cell-number">
		{#if number !== undefined}
			{number}
		{/if}
	</span>
	<span>
		{#if letter !== undefined}
			{letter}
		{/if}
	</span>
</button>

<style>
	.cell {
		position: relative;
		width: 3em;
		height: 3em;
		display: flex;
		align-items: center;
		justify-content: center;
		outline: 1px solid var(--cell-black);
		border-radius: 5%;
		text-align: center;
		background-color: var(--cell-white);
		text-transform: uppercase;
		transition:
			background-color 0.3s,
			outline-color 0.3s;
	}

	.cell-number {
		position: absolute;
		top: 0;
		left: 0.1rem;
		font-size: x-small;
	}

	.cell-black {
		background-color: var(--cell-black);
		outline: 1px solid var(--cell-outline-white);
	}

	.cell:hover {
		background-color: var(--cell-hover);
		outline-color: var(--cell-hover-outline);
	}

	.cell-black:hover {
		background-color: var(--cell-black-hover);
	}
</style>
