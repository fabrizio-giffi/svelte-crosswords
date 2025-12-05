export type Crossword = {
	horizontal: number;
	vertical: number;
	created: string;
};

export type Cell = {
	number: CellNumber;
	letter: CellLetter;
	black: CellBlack;
};

export type Cells = Cell[][];
export type DbCells = Cell[];

export type CellNumber = number | null;
export type CellLetter = string | null;
export type CellBlack = boolean;

export type Definition = {
	number: number;
	text: string | null;
	direction: 'horizontal' | 'vertical';
};
export type Definitions = { horizontal: Definition[]; vertical: Definition[] };
export type DbDefinitions = Definition[];
