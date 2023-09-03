<script lang="ts">
	import Counts from '../components/Counts.svelte';

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

<Counts />

<div class="w-full justify-between flex flex-row flex-wrap">
	<div class="w-[40%]">Some stats:</div>

	<div class="w-[40%]">Blablabalabla</div>
</div>
