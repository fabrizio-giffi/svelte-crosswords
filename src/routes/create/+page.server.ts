import type { Actions } from './$types';
import { createCrossword } from '$lib/server/db';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		createCrossword(formData);
		return { success: true };
	}
} satisfies Actions;
