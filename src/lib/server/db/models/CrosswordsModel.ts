import { Model, type RelationMappings, type RelationMappingsThunk } from 'objection';
import CellsModel from './CellsModel';
import DefinitionsModel from './DefinitionsModel';

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

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		cells: {
			relation: Model.HasManyRelation,
			modelClass: CellsModel,
			join: {
				from: 'crossword.id',
				to: 'cells.crosswordId'
			}
		},
		definitions: {
			relation: Model.HasManyRelation,
			modelClass: DefinitionsModel,
			join: {
				from: 'crossword.id',
				to: 'cells.crosswordId'
			}
		}
	};

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['hor', 'ver'],
			properties: {
				id: { type: 'integer' },
				hor: { type: 'integer' },
				ver: { type: 'integer' },
				created: { type: 'string' },
				cells: {
					type: 'object',
					properties: {
						hor: { type: 'integer' },
						ver: { type: 'integer' },
						number: { type: 'integer' },
						letter: { type: 'string' },
						black: { type: 'boolean' },
						solution: { type: 'string' }
					}
				}
			}
		};
	}
}
