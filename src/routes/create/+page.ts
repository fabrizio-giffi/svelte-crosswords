import { Crossword } from '$lib/crossword.svelte';
import { browser } from '$app/environment';

export function load() {
	const { horizontal, vertical, id, cells, definitions } = loadFromStorage();
	const crossword = new Crossword(horizontal, vertical, id, cells, definitions);
	return { crossword };
}

function loadFromStorage() {
	const id = (browser && JSON.parse(localStorage.getItem('id'))) || -1;
	const horizontal = (browser && JSON.parse(localStorage.getItem('horizontal'))) || 1;
	const vertical = (browser && JSON.parse(localStorage.getItem('vertical'))) || 1;
	const cells = (browser && JSON.parse(localStorage.getItem('cells'))) || [
		[{ number: null, letter: null, black: false }]
	];
	const definitions = (browser && JSON.parse(localStorage.getItem('definitions'))) || {
		horizontal: [],
		vertical: []
	};
	return { horizontal, vertical, id, cells, definitions };
}
