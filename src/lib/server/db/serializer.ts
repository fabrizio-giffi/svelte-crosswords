import { Model, type ModelObject } from 'objection';

export function serializeOne<T extends Model>(response: T): ModelObject<T> {
	return response.toJSON();
}

export function serializeMany<T extends Model>(response: T[]): T[] {
	return response.map((model) => model.toJSON() as T);
}
