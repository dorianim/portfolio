<script lang="ts">
	import { browser } from '$app/environment';
	import { getScrollProgress } from '$lib/scroll';
	import { onMount } from 'svelte';

	let stats: {
		count: number;
		label: string;
		unit?: string;
		stepSize: number;
		currentValue?: number;
		digits?: number;
	}[] = [
		{
			count: new Date().getFullYear() - 2014,
			unit: 'years',
			label: 'competition climbing',
			stepSize: 0.25
		},
		{
			count: 35,
			label: 'speed competitions',
			stepSize: 1
		},
		{
			count: 17,
			label: 'international speed competitions',
			stepSize: 0.5
		},
		{
			count: 5.84,
			unit: 's',
			label: 'Personal Best',
			stepSize: 0.15,
			digits: 2
		}
	];

	let element: HTMLElement | undefined;
	let scrollProgress = 0;
	let animationRan = false;

	onMount(() => {
		window.addEventListener('scroll', () => (scrollProgress = getScrollProgress(element)));
	});

	const animateNumbers = () => {
		if (animationRan) return;
		animationRan = true;

		const handle = setInterval(() => {
			for (let stat of stats) {
				if (!stat.currentValue) stat.currentValue = 0;
				stat.currentValue += stat.stepSize;
				if (stat.currentValue > stat.count) stat.currentValue = stat.count;
			}

			stats = stats;
		}, 50);

		setTimeout(() => {
			clearInterval(handle);
		}, 5000);
	};

	const setFinalNumbers = () => {
		for (let stat of stats) {
			stat.currentValue = stat.count;
		}
	};

	$: {
		scrollProgress = getScrollProgress(element);
	}

	$: {
		if (scrollProgress > 0.2) {
			animateNumbers();
		} else if (!browser) {
			setFinalNumbers();
		}
	}
</script>

<div
	bind:this={element}
	class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 justify-between"
>
	{#each stats as stat}
		<div class="flex flex-col items-center justify-center gap-1">
			<span class="relative text-5xl font-bold">
				{(stat.currentValue ?? 0).toFixed(stat.digits ?? 0)}
				{#if stat.unit}
					<span class="absolute bottom-0 right-0 translate-x-[100%] pl-3 text-gray-600 text-2xl">
						{stat.unit}
					</span>
				{/if}
			</span>
			<span class="text-xl text-center text-gray-600">{stat.label}</span>
		</div>
	{/each}
</div>
