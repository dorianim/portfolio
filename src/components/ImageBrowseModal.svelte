<script lang="ts" context="module">
	export type Image = {
		src: string;
		copyright: string;
		description: string;
		elevate?: boolean;
		alignment: 'l' | 'r' | 'c';
	};
</script>

<script lang="ts">
	import Copyright from 'svelte-material-icons/Copyright.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import { mod } from '$lib/mod';
	import { fade } from 'svelte/transition';

	export let images: Image[];
	export let showImage: number | undefined;

	let dialog: HTMLDialogElement;

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			showImage = undefined;
		}
	};

	$: {
		if (!dialog) break $;
		if (showImage !== undefined) dialog.showModal();
		else dialog.close();
	}
</script>

{#if showImage !== undefined}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed left-0 top-0 z-[1001] grid h-screen w-screen grid-cols-4 grid-rows-[64px_1fr] overflow-y-hidden bg-[#0000007f]"
	>
		<!-- header -->
		<div class="z-[1000] col-span-4 col-start-1 row-span-1 row-start-1 transition-transform">
			<div
				class="z-[1001] grid grid-cols-1 grid-rows-1 h-16 bg-gradient-to-b from-black/60 transition-transform duration-200"
			>
				<div
					class="justify-self-center col-start-1 h-16 flex flex-col pt-1 items-center text-white"
				>
					<span class="text-lg">
						{images[showImage].description}
					</span>
					<span class="flex flex-row items-center text-sm">
						<Copyright />
						{images[showImage].copyright}</span
					>
				</div>

				<button
					class="justify-self-end col-start-1 mx-2 p-2 text-xl md:mx-4 md:p-3 md:text-4xl rounded-full bg-[#0000007f] transition hover:bg-gray-500 text-white"
					on:click={() => (showImage = undefined)}
				>
					<Close />
				</button>
			</div>
		</div>

		<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
		<div
			class="column-span-1 z-[999] col-start-1 row-span-1 row-start-2 mb-[60px] justify-self-start"
			on:click={() => (showImage = mod((showImage ?? 0) - 1, images.length))}
		>
			<div class="group flex h-full place-items-center">
				<button
					class="mx-2 p-2 text-xl md:mx-4 md:p-3 md:text-4xl rounded-full bg-[#0000007f] transition group-hover:bg-gray-500 text-white"
				>
					<ChevronLeft class="" />
				</button>
			</div>
		</div>

		{#if showImage !== undefined}
			<div class="col-span-4 col-start-1 row-span-3 row-start-1">
				<div class="flex h-full select-none place-content-center place-items-center">
					<div class="h-full w-full">
						<img
							class="h-full w-full object-contain"
							src={images[showImage].src}
							alt="{images[showImage].description}, (C) {images[showImage].copyright}"
						/>
					</div>
				</div>
			</div>
		{/if}

		<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
		<div
			class="z-[999] col-span-1 col-start-4 row-span-1 row-start-2 mb-[60px] justify-self-end"
			on:click={() => (showImage = mod((showImage ?? 0) + 1, images.length))}
		>
			<div class="group flex h-full place-items-center">
				<button
					class="mx-2 p-2 text-xl md:mx-4 md:p-3 md:text-4xl rounded-full bg-[#0000007f] transition group-hover:bg-gray-500 text-white"
				>
					<ChevronRight class="" />
				</button>
			</div>
		</div>

		<!-- footer -->
		<div class="z-[1000] col-span-4 col-start-1 row-span-1 row-start-3 transition-transform">
			<div
				class="z-[1001] flex h-16 place-items-center justify-center bg-gradient-to-t from-black/40 transition-transform duration-200"
			>
				<span class="text-white text-lg">
					{showImage + 1} / {images.length}
				</span>
			</div>
		</div>
	</div>
{/if}

<svelte:window on:keydown={handleKeydown} />

<style>
</style>
