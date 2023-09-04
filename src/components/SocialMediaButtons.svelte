<script lang="ts">
	import Mastodon from 'svelte-material-icons/Mastodon.svelte';
	import Git from 'svelte-material-icons/Git.svelte';
	import Github from 'svelte-material-icons/Github.svelte';
	import Instagram from 'svelte-material-icons/Instagram.svelte';

	export let mastodon: string;
	export let git: string;
	export let github: string;
	export let instagram: string;

	let clazz = '';
	export { clazz as class };
</script>

<div class="flex flex-row gap-3 text-[2rem] {clazz}">
	<a target="_blank" href={mastodon}>
		<Mastodon />
	</a>

	<a target="_blank" href={git}>
		<Git />
	</a>

	<a target="_blank" href={github}>
		<Github />
	</a>

	<a target="_blank" href={instagram}>
		<Instagram />
	</a>
</div>
