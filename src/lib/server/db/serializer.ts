import { Model } from 'objection';

export function serializeResponse<T extends Model>(response: T[]): T[] {
	return response.map((model) => model.toJSON() as T);
}
