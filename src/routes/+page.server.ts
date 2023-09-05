import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ platform }) => {
	let turnstileSiteKey: string | undefined;
	let formrecevrUrl: string | undefined;

	if (platform?.env?.TURNSTILE_SITE_KEY !== undefined) {
		turnstileSiteKey = platform.env.TURNSTILE_SITE_KEY;
	} else {
		turnstileSiteKey = process.env.TURNSTILE_SITE_KEY;
	}

	if (platform?.env?.FORMRECEVR_URL !== undefined) {
		formrecevrUrl = platform.env.FORMRECEVR_URL;
	} else {
		formrecevrUrl = process.env.FORMRECEVR_URL;
	}

	return {
		turnstileSiteKey,
		formrecevrUrl
	};
};
