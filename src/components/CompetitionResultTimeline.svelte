<script lang="ts" context="module">
	export type CompType = 'SGCH' | 'GCH' | 'EYC' | 'YWCH' | 'UWCH' | 'EC' | 'ECH' | 'EGA' | 'WC';
	export type CompResult = {
		type: CompType;
		location: string;
		date: Date;
		rank: number;
	};

	export const compTypeString = (type: CompType): string => {
		switch (type) {
			case 'SGCH':
				return 'South German Championship';
			case 'GCH':
				return 'German Championship';
			case 'EYC':
				return 'European Youth Cup';
			case 'YWCH':
				return 'Youth World Championship';
			case 'UWCH':
				return 'University World Championship';
			case 'EC':
				return 'European Cup';
			case 'ECH':
				return 'European Championship';
			case 'EGA':
				return 'European Games';
			case 'WC':
				return 'World Cup';
		}
	};
</script>

<script lang="ts">
	import PodiumGold from 'svelte-material-icons/PodiumGold.svelte';
	import PodiumSilver from 'svelte-material-icons/PodiumSilver.svelte';
	import PodiumBronze from 'svelte-material-icons/PodiumBronze.svelte';
	import Web from 'svelte-material-icons/Web.svelte';
	import CircleSmall from 'svelte-material-icons/CircleSmall.svelte';

	export let results: CompResult[];

	const resultsByYear = Object.entries(
		results
			.sort((a, b) => b.date.getTime() - a.date.getTime())
			.reduce((acc, cur) => {
				const year = cur.date.getFullYear();
				if (!acc[year]) {
					acc[year] = [];
				}
				acc[year].push(cur);
				return acc;
			}, {} as Record<number, typeof results>)
	).sort(([a], [b]) => parseInt(b) - parseInt(a));
</script>

<ol class="relative border-l border-gray-200 dark:border-gray-700 pt-2">
	{#each resultsByYear as [year, results]}
		<li class="mt-3 ml-4">
			<div
				class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
			/>
			<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
				{year}
			</time>
			<div class="mt-2 grid grid-cols-[2rem_2.5rem_auto]">
				{#each results as result}
					<div
						class="contents {result.rank === 1 && 'text-gold'} {result.rank === 2 &&
							'text-silver'} {result.rank === 3 && 'text-bronze'} {result.type === 'WC' &&
							'font-bold'}"
					>
						<span class="w-auto">
							{#if result.rank === 1}
								<PodiumGold />
							{:else if result.rank === 2}
								<PodiumBronze />
							{:else if result.rank === 3}
								<PodiumSilver />
							{:else if result.type === 'WC' || result.type === 'UWCH' || result.type === 'YWCH'}
								<Web />
							{:else}
								<CircleSmall />
							{/if}
						</span>

						<span>{result.rank}.</span>
						<span>
							{compTypeString(result.type)}
							{result.location}</span
						>
					</div>
				{/each}
			</div>
		</li>
	{/each}
</ol>
