import * as db from '$lib/server/db/index';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { slug } = params;
	const crosswordId = Number(slug);

	if (isNaN(crosswordId)) {
		error(400, {
			message: 'Crossword ID should be an integer'
		});
	}

	return await db.getCrosswordById(crosswordId);
};
