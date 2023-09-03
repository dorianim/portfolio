<script lang="ts">
	const stats: {
		count: number;
		label: string;
		unit?: string;
	}[] = [
		{
			count: new Date().getFullYear() - 2014,
			unit: 'years',
			label: 'competition climbing'
		},
		{
			count: 35,
			label: 'speed competitions'
		},
		{
			count: 17,
			label: 'international speed competitions'
		},
		{
			count: 5.84,
			unit: 's',
			label: 'Personal Best'
		}
	];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 justify-between">
	{#each stats as stat}
		<div class="flex flex-col items-center justify-center gap-1">
			<span class="text-5xl font-bold">
				{stat.count}
				{#if stat.unit}
					<span class="text-gray-600 text-2xl">{stat.unit}</span>
				{/if}
			</span>
			<span class="text-xl text-gray-600">{stat.label}</span>
		</div>
	{/each}
</div>
