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
	import { mod } from '$lib/mod';

	export let images: Image[];
	export let showImage: number | undefined;

	let dialog: HTMLDialogElement;

	$: {
		if (!dialog) break $;
		if (showImage !== undefined) dialog.showModal();
		else dialog.close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="bg-transparent"
	bind:this={dialog}
	on:close={() => (showImage = undefined)}
	on:click|self={() => dialog.close()}
>
	<div class="h-[90vh] w-[80vw] flex flex-col items-center gap-4">
		{#if showImage !== undefined}
			<span class="flex flex-row gap-2 items-center text-white">
				{images[showImage].description}
				<Copyright />
				{images[showImage].copyright}
			</span>
			<img
				class="h-full object-contain"
				src={images[showImage].src}
				alt="{images[showImage].description}, (C) {images[showImage].copyright}"
			/>
			<span class="text-white">
				{showImage + 1} / {images.length}
			</span>
		{/if}

		<button
			class="absolute top-[50%] left-0 translate-y-[-50%] h-[100%] w-[50%] text-white text-4xl"
			on:click={() => (showImage = mod((showImage ?? 0) - 1, images.length))}
		>
			<ChevronLeft />
		</button>

		<button
			class="absolute top-[50%] right-0 translate-y-[-50%] h-[100%] w-[50%] text-white text-4xl rotate-180"
			on:click={() => (showImage = mod((showImage ?? 0) + 1, images.length))}
		>
			<ChevronLeft />
		</button>

		<button
			class="absolute top-0 right-0 text-white text-4xl"
			on:click={() => (showImage = undefined)}
		>
			<Close />
		</button>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.3s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
