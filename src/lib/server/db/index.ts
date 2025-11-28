import { DATABASENAME } from '$env/static/private';
import { Model } from 'objection';
import { serializeResponse } from './serializer';
import CrosswordsModel from './models';
import knex from 'knex';
import type { CreateCrosswordPayload, CreateCrosswordResponse } from './types.ts';
import type { Crossword } from '$lib/types/crossword';

// Initialize knex.
const knexInstance = knex({
	client: 'sqlite3',
	useNullAsDefault: true,
	connection: {
		filename: DATABASENAME
	}
});

Model.knex(knexInstance);

export async function getAllCrosswords(limit = 20): Promise<Crossword[]> {
	const response = await CrosswordsModel.query().limit(limit);
	return serializeResponse(response);
}

export async function createCrossword(
	formData: CreateCrosswordPayload
): Promise<CreateCrosswordResponse> {
	try {
		const result = await CrosswordsModel.query().insert({
			hor: Number(formData.get('hor')),
			ver: Number(formData.get('ver'))
		});
		return { msg: 'All good' };
	} catch (err) {
		console.error(err);
		return { msg: err };
	}
}
