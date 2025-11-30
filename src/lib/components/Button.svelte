<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined;
	interface Props {
		type: ButtonType;
		label?: string;
		disabled?: boolean;
		onclickCallback: () => void;
		children: Snippet;
	}

	function onClickHandler(event: MouseEvent) {
		event?.preventDefault();
		onclickCallback();
	}

	let { type = 'button', label, disabled = false, onclickCallback, children }: Props = $props();
</script>

<button
	class={'rounded-sm !border bg-gray-300 !px-3 !py-2 hover:cursor-pointer hover:bg-blue-200'}
	{type}
	{disabled}
	onclick={(event: MouseEvent) => {
		onClickHandler(event);
	}}
>
	{label}
	{@render children?.()}
</button>
