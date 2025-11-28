<script lang="ts">
	export let label = '';
	export let disabled = false;
	let props = { ...$$restProps };
</script>

<button
	class={`${props.class} rounded-sm !border bg-gray-300 !px-3 !py-2 hover:cursor-pointer hover:bg-blue-200`}
	{disabled}
	style={props.style}
>
	{label}
	<slot />
</button>
