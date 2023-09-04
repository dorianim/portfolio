<script lang="ts">
	import { onMount } from 'svelte';
	import Counts from '../components/Counts.svelte';
	import PodiumGold from 'svelte-material-icons/PodiumGold.svelte';
	import PodiumSilver from 'svelte-material-icons/PodiumSilver.svelte';
	import PodiumBronze from 'svelte-material-icons/PodiumBronze.svelte';
	import Web from 'svelte-material-icons/Web.svelte';
	import CircleSmall from 'svelte-material-icons/CircleSmall.svelte';

	type CompType = 'SGCH' | 'GCH' | 'EYC' | 'YWCH' | 'UWCH' | 'EC' | 'ECH' | 'EGA' | 'WC';
	type CompResult = {
		type: CompType;
		location: string;
		date: Date;
		rank: number;
	};

	const videos: {
		url: string;
		thumbnail: string;
		title: string;
		subtitle?: string;
	}[] = [
		{
			url: 'https://www.youtube.com/watch?v=idNTl3PYWo8',
			thumbnail: '/speedclimbing/thumbnail_swr_youtube_23.jpg',
			title: 'Speedkletterer Dorian Zedler',
			subtitle: 'Portrait by SWR Sport'
		},
		{
			url: 'https://www.swrfernsehen.de/landesschau-bw/deutsche-meisterschaft-im-speedklettern-100.html',
			thumbnail: '/speedclimbing/thumbnail_gch_23.png',
			title: 'Deutsche Meisterschaft im Speedklettern',
			subtitle: 'Documentary about the German championships 2023 by SWR Sport'
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

	const images = [];

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
		<span class="text-xl font-bold text-white">Get to know me better</span>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each videos as video}
				<a class="flex flex-col" href={video.url} target="_blank">
					<img class="w-full" src={video.thumbnail} alt="video tumbnail" />
					<span class="text-lg font-bold">{video.title}</span>
					<span>{video.subtitle}</span>
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

<div>
	<span class="text-xl font-bold text-white">Gallery</span>
</div>
