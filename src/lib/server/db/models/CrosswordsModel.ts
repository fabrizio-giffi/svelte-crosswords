import { Model, type RelationMappings, type RelationMappingsThunk } from 'objection';
import CellsModel from './CellsModel';
import DefinitionsModel from './DefinitionsModel';

export default class CrosswordsModel extends Model {
	static get tableName() {
		return 'crosswords';
	}

	id!: number;
	horizontal!: number;
	vertical!: number;
	created!: string;

	$beforeInsert() {
		this.created = new Date().toISOString();
	}

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		cells: {
			relation: Model.HasManyRelation,
			modelClass: CellsModel,
			join: {
				from: 'crosswords.id',
				to: 'cells.crossword'
			}
		},
		definitions: {
			relation: Model.HasManyRelation,
			modelClass: DefinitionsModel,
			join: {
				from: 'crosswords.id',
				to: 'definitions.crossword'
			}
		}
	};

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['horizontal', 'vertical'],
			properties: {
				id: { type: 'integer' },
				horizontal: { type: 'integer' },
				vertical: { type: 'integer' },
				created: { type: 'string' }
			}
		};
	}
}
