import { Model, type RelationMappings, type RelationMappingsThunk } from 'objection';
import CrosswordsModel from './CrosswordsModel';

export default class DefinitionsModel extends Model {
	static get tableName() {
		return 'definitions';
	}

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
}
