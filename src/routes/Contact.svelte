<script lang="ts">
	import { Turnstile } from 'svelte-turnstile';
	import Loading from 'svelte-material-icons/Loading.svelte';

	export let turnstileSiteKey: string;
	export let formrecevrUrl: string;

	let turnstilePassed = false;
	let turnstile: Turnstile;
	let formSubmitResult: Promise<undefined> | undefined;
	let loading: boolean = false;
	let message: string = '';

	const submitForm = async (form: HTMLFormElement): Promise<undefined> => {
		let data = new FormData(form);
		let resp = await fetch(form.action, {
			method: form.method,
			body: data,
			headers: {
				Accept: 'application/json'
			}
		});

		if (turnstileSiteKey) {
			turnstilePassed = false;
			turnstile.reset();
		}

		if (resp.status === 200) {
			form.reset();
			return undefined;
		}

		throw new Error('Form submission failed');
	};

	const handleSubmit = async (e: Event) => {
		let form = e.target;
		if (!(form instanceof HTMLFormElement)) {
			return;
		}
		loading = true;
		formSubmitResult = submitForm(form);

		try {
			await formSubmitResult;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};
</script>

<span class="text-4xl font-bold text-white" id="contact">Contact</span>

<p>Do you have a question or just want to say hello? Feel free to drop me a message:</p>

{#if formSubmitResult}
	{#await formSubmitResult}
		<div
			id="status-toast"
			class="px-4 py-3 leading-normal rounded-lg alert text-blue-700 bg-blue-100"
			role="alert"
		>
			Please wait ...
		</div>
	{:then _}
		<div
			id="status-toast"
			class="px-4 py-3 leading-normal rounded-lg alert text-green-700 bg-green-100"
			role="alert"
		>
			Thank you for your message!
		</div>
	{:catch}
		<div
			id="status-toast"
			class="px-4 py-3 leading-normal rounded-lg alert text-red-700 bg-red-100"
			role="alert"
		>
			Oh no! An error occurred while submitting your form. Please contact my on a different way.
		</div>
	{/await}
{/if}

<form
	on:submit|preventDefault={handleSubmit}
	action={formrecevrUrl}
	name="contact"
	method="post"
	id="contact-form"
	class="w-full"
>
	<div id="status-toast" class="hide" role="alert" />
	<div class="grid grid-cols-1 gap-6">
		<label class="block">
			<span>How can I reach you?</span>
			<input
				name="contact"
				type="text"
				class="block mt-1 p-2 w-full rounded-md bg-gray-100 border-2 border-transparent dark:bg-gray-600 focus:border-blue-500"
				style="outline:none"
				placeholder="Phone number / Email"
				required
			/>
		</label>
		<label class="block">
			<span>What do you want to tell me?</span>
			<textarea
				bind:value={message}
				name="message"
				class="block mt-1 p-2 w-full rounded-md bg-gray-100 border-2 border-transparent dark:bg-gray-600 focus:border-blue-500"
				style="outline:none"
				placeholder="Your message :)"
				required
				rows="4"
			/>
		</label>

		{#if message.length > 0}
			<Turnstile
				siteKey={turnstileSiteKey}
				on:turnstile-callback={() => (turnstilePassed = true)}
				bind:this={turnstile}
			/>
		{/if}

		<button
			id="submit-button"
			type="submit"
			class="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			disabled={!turnstilePassed || loading}
		>
			{#if loading}
				<Loading class="animate-spin text-xl mx-auto" />
			{:else}
				Submit
			{/if}
		</button>
	</div>
	<input type="hidden" name="pageTitle" value="home:Home of Dorian 👋" />
</form>
