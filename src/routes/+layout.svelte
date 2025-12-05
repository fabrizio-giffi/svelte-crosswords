<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex h-14 justify-between bg-amber-100">
	<div class="flex items-center gap-3">
		<a href="/">Home </a>
		<a href="/create">Create</a>
		<a href="/play">Play</a>
	</div>
	<div class="flex items-center">
		<a href="#"> Login </a>
	</div>
</nav>

{@render children?.()}
