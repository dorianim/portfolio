<script lang="ts">
	type CompType = 'SouthGerman' | 'German' | 'EYC' | 'YWCH' | 'EC' | 'ECH' | 'EGA' | 'WC';

	const results: {
		type: CompType;
		location: string;
		date: Date;
		rank: number;
	}[] = [
		{
			type: 'EYC',
			location: 'Bochum',
			date: new Date(2021, 6, 4),
			rank: 4
		},
		{
			type: 'EYC',
			location: 'Imst',
			date: new Date(2021, 6, 13),
			rank: 8
		},
		{
			type: 'EYC',
			location: 'Gaflenz',
			date: new Date(2021, 6, 27),
			rank: 13
		}
	];
</script>

<span class="text-4xl font-bold">Speedclimbing</span>

<div class="w-full justify-between flex flex-row flex-wrap">
	<div class="w-[40%]">
		Some comp results:
		<ul>
			{#each results as result}
				<li>{result.rank} {result.type} {result.location} {result.date.toDateString()}</li>
			{/each}
		</ul>
	</div>

	<div class="w-[40%]">Blablabalabla</div>
</div>
