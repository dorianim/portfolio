<script lang="ts">
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
</script>

<div class="container mx-auto p-8 lg:pt-12 flex flex-col gap-8">
	<slot />
</div>

<Footer />
