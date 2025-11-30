import { Crossword } from '$lib/crossword.svelte';
import { browser } from '$app/environment';

export function load() {
	const { hor, ver, cells, definitions } = loadFromStorage();
	const crossword = new Crossword(hor, ver, cells, definitions);
	return { crossword };
}

function loadFromStorage() {
	const hor = (browser && JSON.parse(localStorage.getItem('hor'))) || 1;
	const ver = (browser && JSON.parse(localStorage.getItem('ver'))) || 1;
	const cells = (browser && JSON.parse(localStorage.getItem('cells'))) || [
		[{ number: null, letter: null, black: false }]
	];
	const definitions = (browser && JSON.parse(localStorage.getItem('definitions'))) || {
		horizontal: [],
		vertical: []
	};
	return { hor, ver, cells, definitions };
}
