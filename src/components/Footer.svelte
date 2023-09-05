<script>
	import SocialMediaButtons from './SocialMediaButtons.svelte';
</script>

<footer class="bg-black flex py-[50px]">
	<div
		class="container mx-auto h-full px-8 font-Raleway text-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
	>
		<div class="flex flex-col gap-2">
			<span class="text-xl">Dorian Zedler</span>
			<SocialMediaButtons />
		</div>

		<p class=" lg:text-center">
			This website is open source:<br />
			<a target="_blank" href="https://github.com/dorianim/portfolio">
				github.com/dorianim/portfolio
			</a>
		</p>

		<ul class="flex flex-col gap-2">
			<li><a href="/imprint#imprint">Imprint</a></li>
			<li><a href="/imprint#privacy-policy">Privacy Policy</a></li>
		</ul>
	</div>
</footer>
