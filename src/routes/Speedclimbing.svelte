<script lang="ts">
	import { onMount } from 'svelte';
	import Counts from '../components/Counts.svelte';
	import PodiumGold from 'svelte-material-icons/PodiumGold.svelte';
	import PodiumSilver from 'svelte-material-icons/PodiumSilver.svelte';
	import PodiumBronze from 'svelte-material-icons/PodiumBronze.svelte';
	import Web from 'svelte-material-icons/Web.svelte';
	import CircleSmall from 'svelte-material-icons/CircleSmall.svelte';
	import TelevisionClassic from 'svelte-material-icons/TelevisionClassic.svelte';
	import ImagePill from '../components/ImagePill.svelte';
	import PillGallery from '../components/PillGallery.svelte';

	type CompType = 'SGCH' | 'GCH' | 'EYC' | 'YWCH' | 'UWCH' | 'EC' | 'ECH' | 'EGA' | 'WC';
	type CompResult = {
		type: CompType;
		location: string;
		date: Date;
		rank: number;
	};

	const press: {
		url: string;
		thumbnail: string;
		title: string;
		subtitle?: string;
		type: 'video' | 'article';
	}[] = [
		{
			url: 'https://www.youtube.com/watch?v=idNTl3PYWo8',
			thumbnail: '/speedclimbing/thumbnail_swr_youtube_23.jpg',
			title: 'Speedkletterer Dorian Zedler',
			subtitle: 'Portrait by SWR Sport',
			type: 'video'
		},
		{
			url: 'https://www.swrfernsehen.de/landesschau-bw/deutsche-meisterschaft-im-speedklettern-100.html',
			thumbnail: '/speedclimbing/thumbnail_gch_23.png',
			title: 'Deutsche Meisterschaft im Speedklettern',
			subtitle: 'Report about the German championships 2023 by SWR Sport',
			type: 'video'
		}
	];

	const results: CompResult[] = [
		{
			type: 'EYC' as CompType,
			location: 'Bochum',
			date: new Date(2021, 6, 4),
			rank: 4
		},
		{
			type: 'EYC' as CompType,
			location: 'Imst',
			date: new Date(2021, 6, 13),
			rank: 8
		},
		{
			type: 'EYC' as CompType,
			location: 'Puurs',
			date: new Date(2021, 7, 4),
			rank: 3
		},
		{
			type: 'SGCH' as CompType,
			location: 'Erlangen',
			date: new Date(2021, 7, 10),
			rank: 1
		},
		{
			type: 'EYC' as CompType,
			location: 'Zilina',
			date: new Date(2021, 7, 31),
			rank: 6
		},
		{
			type: 'YWCH' as CompType,
			location: 'Voronezh',
			date: new Date(2021, 8, 31),
			rank: 15
		},
		{
			type: 'EC' as CompType,
			location: 'Arco',
			date: new Date(2022, 6, 5),
			rank: 19
		},
		{
			type: 'UWCH' as CompType,
			location: 'Innsbruck',
			date: new Date(2022, 6, 17),
			rank: 6
		},
		{
			type: 'ECH' as CompType,
			location: 'Munich',
			date: new Date(2022, 8, 18),
			rank: 20
		},
		{
			type: 'SGCH' as CompType,
			location: 'Augsburg',
			date: new Date(2022, 7, 3),
			rank: 1
		},
		{
			type: 'EC' as CompType,
			location: 'Hamburg',
			date: new Date(2022, 9, 25),
			rank: 13
		},
		{
			type: 'GCH' as CompType,
			location: 'Ulm',
			date: new Date(2022, 10, 1),
			rank: 3
		},
		{
			type: 'EC' as CompType,
			location: 'Liébana',
			date: new Date(2023, 5, 14),
			rank: 7
		},
		{
			type: 'SGCH' as CompType,
			location: 'Augsburg',
			date: new Date(2023, 6, 18),
			rank: 1
		},
		{
			type: 'WC' as CompType,
			location: 'Villats-sur-Ollon',
			date: new Date(2023, 7, 2),
			rank: 54
		},
		{
			type: 'WC' as CompType,
			location: 'Chamonix',
			date: new Date(2023, 7, 7),
			rank: 51
		},
		{
			type: 'GCH' as CompType,
			location: 'Duisburg',
			date: new Date(2023, 7, 8),
			rank: 3
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

	// ls --quoting-style={escape,shell,c} -1 static/speedclimbing/gallery | sed '$!s/$/,/'
	const images = [
		'EC_Hamburg-22-1_DAV_*.jpg',
		'EC_Hamburg-23-2_DAV.jpg',
		'ECH_Munich-22-1_DAV.jpg',
		'ECH_Munich-22-2_DAV.jpg',
		'ECH_Munich-22-3_IFSC%2FDimitris%20Tosidis_*.jpg',
		'ECH_Munich-22-4_IFSC%2FDimitris%20Tosidis.jpg',
		'EGA_Krakow-23-1_Team%20Deutschland%2FMaurice%20Stach.jpg',
		'EGA_Krakow-23-2_Team%20Deutschland%2FMaurice%20Stach_*.jpg',
		'EGA_Krakow-23-3_Team%20Deutschland%2FMaurice%20Stach.jpg',
		'GCH_Bochum-23-1_DAV%2FThomas%20Schermer.jpg',
		'GCH_Bochum-23-2_DAV%2FThomas%20Schermer_*.jpg',
		'GCH_Ulm-23-1_DAV%2FMarco%20Kost_*.jpg',
		'WC_Chamonix_23_1_IFSC%2FJan%20Virt.jpg',
		'WC_Villars-23-1_Viviana%20Lucke.jpg',
		'WC_Villars-23-2_Viviana%20Lucke.jpg'
	].map((el) => {
		const data = el.split('.')[0].split('_');
		const type = data[0] as CompType;
		const location = data[1].split('-')[0];
		const year = data[1].split('-')[1];
		const copyright = data[2];
		const elevate = data.includes('*');

		return {
			src: `/speedclimbing/gallery/${encodeURIComponent(el)}`,
			elevate: elevate,
			copyright: decodeURIComponent(copyright),
			description: `${compTypeString(type)} ${location} ${year}`
		};
	});
</script>

<span class="text-4xl font-bold text-white" id="speedclimbing">Speedclimbing</span>

<Counts />

<div class="p-6 w-full flex flex-col xl:flex-row gap-10 justify-between">
	<div class="flex flex-col gap-2">
		<span class="text-xl font-bold text-white">My story...</span>
		<p class="">
			When I was four years old, my Dad took me to the climbing gym for the first time. I was
			immediately fascinated by the sport and started climbing regularly. At the age of 5, I joined
			the <a href="https://climbingteam.de">Climbingteam Stuttgart</a>
			and started to compete in kids-cups, which was a combination of lead, bouldering and classic speed.
			<br />
			As I grew older, I started to compete at state and later at national level, at the time, speed
			was not really a thing yet, so I competed in lead and bouldering.
			<br />
			When I was about 15 years old, I touched the normspeed wall for the first time. It was love at
			first sight. I started to improove rapidly and won a bronze medal on my first national speed youth
			cup in 2017.
			<br />
			After that, I still competed in lead and bouldering, but speed was slowly starting to become my
			main focus. In 2020 I ultimately decided to compeletely focus on speed. In 2021, I was able to
			qualify for my first international speed competition, the European Youth Cup in Bochum, where I
			placed 4th.
			<br />
			Since then, there have been lots of ups and downs, but overall I am making good progress and was
			able to accomplish my big dream of competing in a worldcup in 2023.
			<br />
			Wanna know how the story goes on? Follow me on Instagram to stay up to date!
		</p>
		<span class="text-xl font-bold text-white">In the press</span>
		<div class="grid grid-cols-1 gap-3">
			{#each press as item}
				<a
					class="grid grid-cols-[8rem_auto] items-center border-gray-700 border rounded-lg relative overflow-clip h-min gap-3"
					href={item.url}
					target="_blank"
				>
					<img class="h-full rounded-lg object-cover" src={item.thumbnail} alt="thumbnail" />

					<div class="flex flex-col p-3">
						<span class="text-lg font-bold">{item.title}</span>
						<span>{item.subtitle}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="min-w-[200px] md:min-w-[400px]">
		<span class="text-xl font-bold text-white">Recent competition results:</span>
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
	</div>
</div>

<PillGallery {images} columns={6} />

<div class="h-[1000px] w-full" />
