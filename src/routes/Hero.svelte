<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SkillList from '../components/SkillList.svelte';
	import SocialMediaButtons from '../components/SocialMediaButtons.svelte';
	import { getScrollProgress } from '$lib/scroll';
	import BeanImage from '../components/BeanImage.svelte';

	const coreSkills = [
		{
			id: 'speedclimbing',
			text: 'Speedclimber',
			icon: '/hero/speed_hold.png'
		},
		{
			id: 'software-projects',
			text: 'Software Developer',
			icon: '/hero/technologist.png'
		},
		{
			id: 'study',
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

	let element: HTMLElement | undefined;
	let scrollProgress = 0.5;

	onMount(() => {
		window.addEventListener('scroll', () => {
			scrollProgress = getScrollProgress(element);
		});
		scrollProgress = getScrollProgress(element);
	});
</script>

<div
	bind:this={element}
	id="hero"
	class="w-full py-12 md:py-24 lg:py-48 flex flex-row flex-wrap items-center justify-center gap-6 lg:gap-12"
>
	<div class="flex flex-col gap-6 w-full lg:w-1/3 justify-center items-start">
		<h1 class="text-3xl tracking-loose">Hi, I am</h1>
		<h2 class="text-5xl font-bold text-white leading-relaxed md:leading-snug">Dorian Zedler</h2>

		<SkillList skills={coreSkills} class="hidden lg:block" />
		<SocialMediaButtons class="hidden lg:flex" />
	</div>

	<div class="px-[3%] grow flex gap-[7%] items-center content-center">
		{#each images as image, i}
			{#if i === 1}
				<BeanImage src={image.src} class="grow" />
			{:else}
				<BeanImage
					src={image.src}
					class="grow-[0.6]"
					innerClass="bg-left"
					style="transform: rotate(-12deg) translateY({150 * (i === 0 ? 1 : -1) +
						300 * scrollProgress * (i === 0 ? -1 : 1)}px);"
				/>
			{/if}
		{/each}
	</div>

	<div class="flex lg:hidden z-50 flex-col gap-6 w-full lg:w-1/3 justify-center items-start">
		<SkillList skills={coreSkills} />
		<SocialMediaButtons />
	</div>
</div>
