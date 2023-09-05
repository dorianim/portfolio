<script lang="ts">
	import { onMount } from 'svelte';
	import BeanImage from './BeanImage.svelte';
	import { getScrollProgress } from '$lib/scroll';
	import type { Image } from './ImageBrowseModal.svelte';
	import ImageBrowseModal from './ImageBrowseModal.svelte';

	export let images: Image[];
	export let columns = 7;
	let clazz = '';
	export { clazz as class };

	let columnCount = columns;

	let element: HTMLElement | undefined;
	let scrollProgress = 0;
	let maximizeImage: number | undefined;

	onMount(() => {
		window.addEventListener('scroll', () => {
			scrollProgress = getScrollProgress(element);
		});
		scrollProgress = getScrollProgress(element);
	});

	const getImageIndex = (i: number, j: number) => {
		return i * Math.floor(images.length / columnCount) + j;
	};

	const getImage = (i: number, j: number) => {
		return images[getImageIndex(i, j)];
	};

	const getAlignmentClass = (image: Image) => {
		if (image.alignment === 'l') return 'bg-left';
		if (image.alignment === 'r') return 'bg-right';
		return 'bg-center';
	};

	$: columnCount = Math.min(images.length, columns);
	$: console.log(maximizeImage);
</script>

<div class="lg:px-8 xl:px-12 {clazz}" bind:this={element}>
	<div class="flex flex-row flex-wrap gap-2 justify-center content-center w-full">
		{#each Array(columnCount) as _, i}
			{#if i === 3}
				<div class="lg:hidden h-1 w-full" />
			{/if}

			<div class="flex flex-col grow gap-2 items-center content-center">
				{#each Array(Math.floor(images.length / columnCount)) as _, j}
					<!-- svelte-ignore a11y-missing-attribute a11y-no-static-element-interactions a11y-click-events-have-key-events -->
					<a class="cursor-pointer contents" on:click={() => (maximizeImage = getImageIndex(i, j))}>
						{#if getImage(i, j).elevate}
							<BeanImage
								class="w-full z-10"
								src={getImage(i, j).src}
								style="transform: rotate(-12deg) translateY({30 +
									-(20 + (getImageIndex(i, j) / images.length) * 100) * scrollProgress}%);"
								innerClass={getAlignmentClass(getImage(i, j))}
							/>
						{:else}
							<BeanImage
								class="w-[60%] z-0"
								src={getImage(i, j).src}
								innerClass={getAlignmentClass(getImage(i, j))}
							/>
						{/if}
					</a>
				{/each}
			</div>
		{/each}
	</div>
</div>

<ImageBrowseModal {images} bind:showImage={maximizeImage} />
