<script lang="ts">
	export let skills: {
		text: string;
		icon: string;
	}[];
	let clazz: string = '';
	export { clazz as class };
</script>

<div class="table text-[1.6rem] text-gray-600 {clazz}">
	{#each skills as skill}
		<div class="table-row">
			<img class="table-cell my-[0.2rem] mr-2 h-[1.2em]" src={skill.icon} alt={skill.text} />
			<div class="table-cell">
				{skill.text}
			</div>
		</div>
	{/each}
</div>
