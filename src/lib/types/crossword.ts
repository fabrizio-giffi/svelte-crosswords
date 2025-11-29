export type Crossword = {
	id: number;
	hor: number;
	ver: number;
	created: string;
};

export type Cell = {
	number: CellNumber;
	letter: CellLetter;
	black: CellBlack;
};

export type CellNumber = number | null;
export type CellLetter = string | null;
export type CellBlack = boolean;

export type Definition = { gridNumber: number; text: string | null };
export type Definitions = { horizontal: Definition[]; vertical: Definition[] };
