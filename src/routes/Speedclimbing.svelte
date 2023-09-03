<script lang="ts">
	import Counts from '../components/Counts.svelte';

	type CompType = 'SouthGerman' | 'German' | 'EYC' | 'YWCH' | 'UWCH' | 'EC' | 'ECH' | 'EGA' | 'WC';
	type CompResult = {
		type: CompType;
		location: string;
		date: Date;
		rank: number;
	};

	const results: CompResult[] = [
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
			location: 'Puurs',
			date: new Date(2021, 7, 4),
			rank: 3
		},
		{
			type: 'EYC',
			location: 'Zilina',
			date: new Date(2021, 7, 31),
			rank: 6
		},
		{
			type: 'YWCH',
			location: 'Voronezh',
			date: new Date(2021, 8, 31),
			rank: 15
		},
		{
			type: 'EC',
			location: 'Arco',
			date: new Date(2022, 6, 5),
			rank: 19
		},
		{
			type: 'UWCH',
			location: 'Innsbruck',
			date: new Date(2022, 6, 17),
			rank: 6
		},
		{
			type: 'ECH',
			location: 'Munich',
			date: new Date(2022, 8, 18),
			rank: 20
		},
		{
			type: 'EC',
			location: 'Hamburg',
			date: new Date(2022, 9, 25),
			rank: 13
		},
		{
			type: 'EC',
			location: 'Liébana',
			date: new Date(2023, 5, 14),
			rank: 7
		},
		{
			type: 'WC',
			location: 'Villats-sur-Ollon',
			date: new Date(2023, 7, 2),
			rank: 54
		},
		{
			type: 'WC',
			location: 'Chamonix',
			date: new Date(2023, 7, 9),
			rank: 51
		}
	].sort((a, b) => b.date.getTime() - a.date.getTime());

	const resultsByYear = Object.entries(
		results.reduce((acc, cur) => {
			const year = cur.date.getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(cur);
			return acc;
		}, {} as Record<number, typeof results>)
	).sort(([a], [b]) => parseInt(b) - parseInt(a));

	const compTypeString = (type: CompType): string => {
		switch (type) {
			case 'SouthGerman':
				return 'South German Championship';
			case 'German':
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

<span class="text-4xl font-bold">Speedclimbing</span>

<Counts />

<div class="p-6 w-full flex flex-row flex-wrap justify-between">
	<div class="max-w-xl">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus, diam non egestas
		porta, quam arcu aliquet lectus, sit amet mattis elit turpis ut mauris. Etiam et dapibus magna,
		et fringilla risus. Cras dignissim vel neque id pulvinar. Phasellus quis odio lectus. Praesent
		eleifend, nulla non congue tristique, arcu purus consequat mi, vel molestie tortor massa ac
		eros. Morbi eu egestas lorem, id tincidunt dui. Etiam ut tellus odio. Duis commodo mattis lectus
		id dignissim. In ornare nisl sit amet eros maximus maximus. Suspendisse sit amet luctus dolor.
		Vestibulum accumsan, nibh sed maximus imperdiet, elit neque gravida orci, a laoreet augue dui
		quis enim. Etiam fringilla, mauris in pellentesque fermentum, magna tortor hendrerit eros, sed
		dapibus est dolor non tortor. Nam a iaculis orci, eget varius diam. In hac habitasse platea
		dictumst. Phasellus quis turpis nunc. Pellentesque purus velit, varius ut libero a, posuere
		laoreet magna. Pellentesque imperdiet orci vel varius tincidunt. Nulla vel orci porta, accumsan
		eros in, faucibus tortor. Nam sed elit id odio sagittis commodo.
	</div>
	<div class="">
		<ol class="relative border-l border-gray-200 dark:border-gray-700">
			{#each resultsByYear as [year, results]}
				<li class="mb-10 ml-4">
					<div
						class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
					/>
					<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						{year}
					</time>
					<ul class="list-disc list-inside">
						{#each results as result}
							<li>{result.rank}. {compTypeString(result.type)} in {result.location}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ol>
	</div>
</div>
