import { Model } from 'objection';

export default class CrosswordsModel extends Model {
	static get tableName() {
		return 'crosswords';
	}

	static get idColumn() {
		return 'id';
	}

	id!: number;
	hor!: number;
	ver!: number;
	created!: string;
	
	$beforeInsert() {
		this.created = new Date().toISOString();
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['hor', 'ver'],
			properties: {
				id: { type: 'integer' },
				hor: { type: 'integer' },
				ver: { type: 'integer' },
				created: { type: 'string' }
			}
		};
	}
}
