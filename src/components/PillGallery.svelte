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

<div class="lg:p-8 xl:p-12" bind:this={element}>
	<div class="flex flex-row gap-2 justify-center content-center w-full">
		{#each Array(columnCount) as _, i}
			<div class="flex flex-col grow gap-2 items-center content-center">
				{#each Array(Math.floor(images.length / columnCount)) as _, j}
					<!-- svelte-ignore a11y-missing-attribute a11y-no-static-element-interactions a11y-click-events-have-key-events -->
					<a class="cursor-pointer contents" on:click={() => (maximizeImage = getImage(i, j))}>
						{#if getImage(i, j).elevate}
							<ImagePill
								class="w-full z-10"
								src={getImage(i, j).src}
								style="transform: rotate(-12deg) translateY({element?.offsetHeight * 0.1 +
									-element?.offsetHeight * 0.3 * scrollProgress}px);"
							/>
						{:else}
							<ImagePill class="w-[60%] z-0" src={getImage(i, j).src} />
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
