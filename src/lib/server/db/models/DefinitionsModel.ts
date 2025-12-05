import { Model, type RelationMappings, type RelationMappingsThunk } from 'objection';
import CrosswordsModel from './CrosswordsModel';

export default class DefinitionsModel extends Model {
	static get tableName() {
		return 'definitions';
	}

	id!: number;
	direction!: string;
	text!: string;
	number!: number;

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		crossword: {
			relation: Model.BelongsToOneRelation,
			modelClass: CrosswordsModel,
			join: {
				from: 'definitions.crossword',
				to: 'crosswords.id'
			}
		}
	};

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['direction', 'text', 'number', 'crossword'],
			properties: {
				id: { type: 'integer' },
				direction: { type: 'string' },
				text: { type: 'string' },
				number: { type: 'integer' },
				crossword: { type: 'integer' }
			}
		};
	}
}
