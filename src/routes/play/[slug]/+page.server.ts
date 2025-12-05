import * as db from '$lib/server/db/index';

export const load = async ({ params }) => {
	const { slug } = params;
	const crosswordId = Number(slug);
	try {
		return await db.getCrosswordById(crosswordId);
	} catch (error) {
		console.log(error);
	}
};
