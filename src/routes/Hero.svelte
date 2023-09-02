<script lang="ts">
	import SkillList from '../components/SkillList.svelte';

	const coreSkills = [
		{
			text: 'Speedclimber',
			icon: '/hero/speed_hold.png'
		},
		{
			text: 'Software Developer',
			icon: '/hero/technologist.png'
		},
		{
			text: 'CS-Student',
			icon: '/hero/student.png'
		}
	];

	const images = [
		{
			src: '/hero/ec_liebana_23.jpg',
			alt: 'Dorian Zedler climbing in Spain',
			position: 'center'
		},
		{
			src: '/hero/wc_villars_23.jpg',
			alt: 'Dorian Zedler climbing in Switzerland',
			position: 'center'
		},
		{
			src: '/hero/hackatum_22.jpg',
			alt: 'Dorian Zedler at Hackatum',
			position: 'center'
		}
	];
</script>

<div class="w-full flex flex-row flex-wrap items-center justify-center gap-6 lg:gap-12">
	<div class="flex flex-col gap-3 w-full lg:w-1/3 justify-center items-start">
		<h1 class="text-3xl text-gray-600 tracking-loose">Hi, I am</h1>
		<h2 class="text-6xl font-bold leading-relaxed md:leading-snug">Dorian Zedler</h2>

		<SkillList skills={coreSkills} class="hidden lg:block" />

		<a
			href="#"
			class="hidden lg:block bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg mt-3 py-2 px-4 border border-yellow-300 hover:border-transparent"
		>
			Learn more about me
		</a>
	</div>

	<div class="px-[3%] grow flex gap-[7%] items-center content-center">
		{#each images as image, i}
			{#if i === 1}
				<div class="block grow aspect-[1/2] overflow-clip drop-shadow-2xl rounded-full -rotate-12">
					<div
						class="h-full ml-[-25%] w-[150%] rotate-12 bg-cover bg-center"
						style="background-image: url('{image.src}')"
					/>
				</div>
			{:else}
				<div
					class="block grow-[0.7] aspect-[1/2] overflow-clip drop-shadow-2xl rounded-full -rotate-12"
				>
					<div
						class="h-full ml-[-25%] w-[150%] rotate-12 bg-cover bg-left"
						style="background-image: url('{image.src}')"
					/>
				</div>
			{/if}
		{/each}
	</div>

	<div class="flex lg:hidden z-50 flex-col gap-3 w-full lg:w-1/3 justify-center items-start">
		<SkillList skills={coreSkills} />

		<a
			href="#"
			class="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg mt-3 py-2 px-4 border border-yellow-300 hover:border-transparent"
		>
			Learn more about me
		</a>
	</div>
</div>
