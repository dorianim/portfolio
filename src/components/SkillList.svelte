<script lang="ts">
	export let skills: {
		text: string;
		icon: string;
		id: string;
	}[];
	let clazz: string = '';
	export { clazz as class };
</script>

<div class="table text-[1.6rem] {clazz}">
	{#each skills as skill}
		<div class="table-row">
			<img class="table-cell my-[0.2rem] mr-2 h-[1.2em]" src={skill.icon} alt={skill.text} />
			<a class="table-cell hover:underline" href="#{skill.id}">
				{skill.text}
			</a>
		</div>
	{/each}
</div>
