import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createCrossword } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
	const crossword = await request.json();
	createCrossword(crossword);
	return json(crossword);
};
