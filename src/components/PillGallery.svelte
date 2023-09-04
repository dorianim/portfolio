<script lang="ts">
	import { onMount } from 'svelte';
	import ImagePill from './ImagePill.svelte';
	import { getScrollProgress } from '$lib/scroll';
	import Modal from './Modal.svelte';

	type Image = {
		src: string;
		copyright: string;
		description: string;
		elevate?: boolean;
	};

	export let images: Image[];
	export let columns = 7;

	let columnCount = columns;

	let element: HTMLElement | undefined;
	let scrollProgress = 0;
	let maximizeImage: Image | undefined;

	onMount(() => {
		window.addEventListener('scroll', () => {
			scrollProgress = getScrollProgress(element);
		});
	});

	const getImage = (i: number, j: number) => {
		return images[i * Math.floor(images.length / columnCount) + j];
	};

	$: columnCount = Math.min(images.length, columns);
</script>

<span class="text-xl font-bold text-white">Gallery</span>

<div bind:this={element}>
	<div class="flex flex-row gap-3 justify-center">
		{#each Array(columnCount) as _, i}
			<div class="flex flex-col gap-4 items-center">
				{#each Array(Math.floor(images.length / columnCount)) as _, j}
					<!-- svelte-ignore a11y-missing-attribute a11y-no-static-element-interactions a11y-click-events-have-key-events -->
					<a class="cursor-pointer" on:click={() => (maximizeImage = getImage(i, j))}>
						{#if getImage(i, j).elevate}
							<ImagePill
								class="h-[300px] z-10"
								src={getImage(i, j).src}
								style="transform: rotate(-12deg) translateY({element?.offsetHeight * 0.1 +
									-element?.offsetHeight * 0.3 * scrollProgress}px);"
							/>
						{:else}
							<ImagePill class="h-[200px] z-0" src={getImage(i, j).src} />
						{/if}
					</a>
				{/each}
			</div>
		{/each}
	</div>
</div>

<Modal showModal={maximizeImage !== undefined}>
	<div class="flex flex-col items-center justify-center gap-4">
		<img
			src={maximizeImage?.src}
			alt="{maximizeImage?.description}, (C) {maximizeImage?.copyright}"
		/>
		{maximizeImage?.description}, (C) {maximizeImage?.copyright}
	</div>
</Modal>
