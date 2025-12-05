import { Model, type RelationMappings, type RelationMappingsThunk } from 'objection';
import CrosswordsModel from './CrosswordsModel';

export default class CellsModel extends Model {
	static get tableName() {
		return 'cells';
	}

	id!: number;
	number: number | null = null;
	letter: string | null = null;
	black!: boolean;
	solution: string | null = null;

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		crossword: {
			relation: Model.BelongsToOneRelation,
			modelClass: CrosswordsModel,
			join: {
				from: 'cells.crossword',
				to: 'crosswords.id'
			}
		}
	};

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['black', 'crossword'],
			properties: {
				id: { type: 'integer' },
				number: { type: 'integer' },
				letter: { type: 'string' },
				black: { type: 'boolean' },
				solution: { type: 'string' }
			}
		};
	}
}
