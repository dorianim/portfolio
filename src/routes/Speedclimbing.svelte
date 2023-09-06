<script lang="ts">
	import Counts from '../components/Counts.svelte';
	import BeanGallery from '../components/BeanGallery.svelte';
	import CompetitionResultTimeline, {
		compTypeString,
		type CompType,
		type CompResult
	} from '../components/CompetitionResultTimeline.svelte';

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
	];

	// ls --quoting-style={escape,shell,c} -1 static/speedclimbing/gallery | sed '$!s/$/,/'
	const images = [
		'EC_Arco-22-1_FASI_c_*.jpg',
		'EC_Arco-22-1_FASI_r.jpg',
		'ECH_Munich-22-1_DAV_c.jpg',
		'YWCH_Voronezh-22-1_IFSC%2FJan%20Virt_c.jpg',
		'ECH_Munich-22-4_IFSC%2FDimitris%20Tosidis_c.jpg',
		'EC_Mezzolombardo-22-1_Davide%20Terenzi_c.jpg',
		'ECH_Munich-22-3_IFSC%2FDimitris%20Tosidis_c_*.jpg',
		'EGA_Krakow-23-2_Team%20Deutschland%2FMaurice%20Stach_c_*.jpg',
		'EGA_Krakow-23-1_Team%20Deutschland%2FMaurice%20Stach_c.jpg',
		'EYC_Puurs-21-1_Michael%20Timmermaus_c_*.jpg',
		'EGA_Krakow-23-3_Team%20Deutschland%2FMaurice%20Stach_r.jpg',
		'EYC_Duisburg-21-1_DAV_r.jpg',
		'EYC_Puurs-21-2_Michael%20Timmermaus_r_*.jpg',
		'EYC_Zilina-21-1_Viviana%20Lucke_c.JPG',
		'GCH_Bochum-23-1_DAV%2FThomas%20Schermer_l.jpg',
		'EYC_Puurs-21-3_Michael%20Timmermaus_c_*.jpg',
		'YWCH_Voronezh-22-2_IFSC%2FJan%20Virt_l.jpg',
		'GCH_Ulm-23-1_DAV%2FMarco%20Kost_r_*.jpg',
		'WC_Chamonix-23-1_IFSC%2FJan%20Virt_r.jpg',
		'WC_Villars-23-1_Viviana%20Lucke_c.jpg',
		'GCH_Bochum-23-2_DAV%2FThomas%20Schermer_c_*.jpg',
		'EC_Bologna-23-1_FASI_c.jpg',
		'WC_Villars-23-2_Viviana%20Lucke_c.jpg',
		'EC_Hamburg-22-1_DAV_c_*.jpg'
	].map((el) => {
		const data = el.split('.')[0].split('_');
		const type = data[0] as CompType;
		const location = data[1].split('-')[0];
		const year = parseInt(data[1].split('-')[1]) + 2000;
		const copyright = data[2];
		const alignment = data[3] as 'l' | 'r' | 'c';
		const elevate = data.includes('*');

		return {
			src: `/speedclimbing/gallery/${encodeURIComponent(el)}`,
			elevate: elevate,
			copyright: decodeURIComponent(copyright),
			description: `${compTypeString(type)} ${location} ${year}`,
			alignment
		};
	});
</script>

<span class="text-4xl font-bold text-white" id="speedclimbing">Speedclimbing</span>

<Counts />

<div class="w-full flex flex-col xl:flex-row gap-10 justify-between">
	<div class="flex flex-col gap-2">
		<span class="text-2xl font-bold text-white">My journey...</span>
		<p class="">
			When I was just four years old, my dad introduced me to climbing at a local gym, and I was
			immediately hooked. By the age of five, I joined the <a
				class="text-blue-500"
				href="https://climbingteam.de">Climbingteam Stuttgart</a
			>
			and started competing in kids' climbing events that included lead, bouldering, and classic speed.
			<br />
			As I got older, I began competing at the state and then national level, mainly in lead and bouldering
			since speed climbing wasn't as popular back then.
			<br />
			Around the age of 15, I tried speed climbing for the first time and fell in love with it. I improved
			quickly and even won a bronze medal in my first national speed youth cup in 2017.
			<br />
			While I still participated in lead and bouldering, I gradually shifted my focus towards speed climbing.
			In 2020, I decided to fully commit to it. The following year, I achieved a big milestone by qualifying
			for my first international speed competition, the European Youth Cup in Bochum, where I came in
			fourth.
			<br />
			Since then, I've had my share of ups and downs, but I'm making good progress. In 2023, I reached
			another major milestone by competing in a World Cup event.
			<br />
			If you're curious about what comes next, you can follow my journey on Instagram or Mastodon to
			stay in the loop.
		</p>
		<span class="text-2xl font-bold text-white">In the press</span>
		<div class="grid grid-cols-1 gap-3">
			{#each press as item}
				<a
					class="grid max-md:grid-rows-[12rem_auto] md:grid-cols-[8rem_auto] items-center border-gray-700 border rounded-lg relative overflow-hidden h-min gap-3"
					href={item.url}
					target="_blank"
				>
					<div
						class="h-full w-full overflow-hidden bg-top bg-cover"
						style="background-image: url({item.thumbnail});"
					/>

					<div class="flex flex-col p-3 max-md:pt-0">
						<span class="text-lg font-bold">{item.title}</span>
						<span>{item.subtitle}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="min-w-[200px] md:min-w-[400px]">
		<span class="text-2xl font-bold text-white">Recent competition results:</span>
		<CompetitionResultTimeline {results} />
	</div>
</div>

<span class="text-2xl font-bold text-white">Memories</span>
<BeanGallery {images} columns={6} />
