<script lang="ts">
	import type { PageData } from './$types';
	import Contact from './Contact.svelte';
	import Hero from './Hero.svelte';
	import SoftwareProjects from './SoftwareProjects.svelte';
	import Speedclimbing from './Speedclimbing.svelte';

	export let data: PageData;
</script>

<Hero />
<Speedclimbing />

{#if data.turnstileSiteKey !== undefined && data.formrecevrUrl !== undefined}
	<Contact turnstileSiteKey={data.turnstileSiteKey} formrecevrUrl={data.formrecevrUrl} />
{/if}
