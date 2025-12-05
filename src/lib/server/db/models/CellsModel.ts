import { Model, type RelationMappings, type RelationMappingsThunk } from 'objection';
import CrosswordsModel from './CrosswordsModel';

export default class CellsModel extends Model {
	static get tableName() {
		return 'cells';
	}

	hor!: number;
	ver!: number;
	number?: number;
	letter?: string;
	black!: boolean;
	solution?: string;

	crosswordId!: number;

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		owner: {
			relation: Model.BelongsToOneRelation,
			modelClass: CrosswordsModel,
			join: {
				from: 'cells.crosswordId',
				to: 'crosswords.id'
			}
		}
	};

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['hor', 'ver', 'black', 'crossword'],
			properties: {
				hor: { type: 'integer' },
				ver: { type: 'integer' },
				number: { type: 'integer' },
				letter: { type: 'string' },
				black: { type: 'boolean' },
				solution: { type: 'string' }
			}
		};
	}
}
