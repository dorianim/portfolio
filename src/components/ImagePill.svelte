<script lang="ts">
	export let src: string;
	let clazz = '';
	export { clazz as class };
	export let innerClass = 'bg-center';
	export let style = '';
	export let rotate = true;
</script>

<div
	class="block aspect-[1/2] overflow-clip drop-shadow-2xl rounded-full {rotate &&
		'-rotate-12'} {clazz}"
	{style}
>
	<div
		class="h-full ml-[-25%] w-[150%] {rotate && 'rotate-12'} bg-cover {innerClass}"
		style="background-image: url('{src}')"
	/>
</div>
