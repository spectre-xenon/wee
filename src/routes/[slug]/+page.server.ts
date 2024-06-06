import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { LinkQuery } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const { slug } = params;

	const result = (await platform?.env.DB.prepare('SELECT id , big_url FROM links WHERE id = ?')
		.bind(slug)
		.first()) as LinkQuery;

	console.log(result);
	if (!result) return {};

	redirect(302, result.big_url);
};
