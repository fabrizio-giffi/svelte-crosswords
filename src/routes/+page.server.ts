import { getAllCrosswords } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await getAllCrosswords();
	return { crosswords: response };
};
