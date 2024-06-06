import { nanoid } from 'nanoid';

import type { LinkQuery } from '$lib/types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ platform, request }) => {
		const data = await request.formData();
		const bigUrl = data.get('bigUrl') as string;

		// Check link is valid
		const isValid = isValidUrl(bigUrl);
		if (!isValid)
			return fail(400, {
				invalid: true,
				message: 'Not a valid url'
			});

		// Check link doesn't already exist
		const result = (await platform?.env.DB.prepare('SELECT id FROM links WHERE big_url = ?')
			.bind(bigUrl)
			.first()) as LinkQuery;

		if (result)
			return fail(403, {
				exists: true,
				message: 'Link already exists',
				link: result.id
			});

		// Generate id and add link to DB
		const id = nanoid(6);

		await platform?.env?.DB.prepare('INSERT INTO links VALUES (?,?,?)').bind(id, bigUrl, 0).run();

		return {
			success: true,
			message: 'Shorten was successful',
			link: id
		};
	}
} satisfies Actions;

const isValidUrl = (string: string) => {
	try {
		new URL(string);
		return true;
	} catch (_) {
		return false;
	}
};
