<script lang="ts">
	export let src: string;
	let clazz = '';
	export { clazz as class };
	export let innerClass = 'bg-center';
	export let rotate = true;
	export let style = rotate ? 'transform: rotate(-12deg)' : '';
	export let innerStyle = rotate ? 'transform: rotate(12deg)' : '';
</script>

<div class="block aspect-[1/2] overflow-hidden drop-shadow-lg rounded-full {clazz}" {style}>
	<div
		class="h-full ml-[-25%] w-[150%] bg-cover {innerClass}"
		style="background-image: url('{src}'); {innerStyle}"
	/>
</div>
