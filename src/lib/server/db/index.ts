import { DATABASENAME } from '$env/static/private';
import { Model } from 'objection';
import { serializeMany, serializeOne } from './serializer';
import CrosswordsModel from './models/CrosswordsModel';
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

export async function getAllCrosswords(limit = 20): Promise<CrosswordsModel[]> {
	const response = await CrosswordsModel.query()
		.limit(limit)
		.withGraphFetched('[cells, definitions]');

	return serializeMany(response);
}

export async function getCrosswordById(id: number): Promise<Crossword | undefined> {
	const response = await CrosswordsModel.query()
		.findById(id)
		.withGraphFetched('[cells, definitions]');

	if (!response) {
		throw new Error('Not found');
	}
	return serializeOne(response);
}

export async function createCrossword(
	formData: CreateCrosswordPayload
): Promise<CreateCrosswordResponse> {
	try {
		const result = await CrosswordsModel.query().insert({
			horizontal: Number(formData.get('horizontal')),
			vertical: Number(formData.get('vertical'))
		});
		return { msg: 'All good' };
	} catch (err) {
		console.error(err);
		return { msg: err };
	}
}
