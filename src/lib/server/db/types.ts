export interface CreateCrosswordPayload extends FormData {
	get(name: string): FormDataEntryValue | null;
}

export type CreateCrosswordResponse = {
	msg: string;
};
